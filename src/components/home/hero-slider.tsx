"use client";

import Image from "next/image";
import Link from "next/link";
import { useRef, useState } from "react";

import type { Swiper as SwiperInstance } from "swiper";
import { A11y, Autoplay } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";

import "swiper/css";

type Slide = {
  id: number;
  title: string;
  description: string;
  buttonLabel: string;
  href: string;
  image: string;
};

type ExtendedSlide = Slide & {
  realIndex: number;
  copyIndex: number;
  uniqueKey: string;
};

const slides: Slide[] = [
  {
    id: 1,
    title: "Санаагаа цаасан дээр",
    description: "Төлөвлөгч, тэмдэглэлийн дэвтрээр өдөр бүрээ цэгцлээрэй.",
    buttonLabel: "Дэвтэр үзэх",
    href: "/category/notebooks",
    image:
      "https://images.unsplash.com/photo-1517842645767-c639042777db?auto=format&fit=crop&w=2200&q=90",
  },
  {
    id: 2,
    title: "Өнгөөр бүтээ",
    description: "Зураг, урлалын хэрэгслээр санаагаа бодит болгоорой.",
    buttonLabel: "Урлалын хэрэгсэл",
    href: "/category/art-supplies",
    image:
      "https://images.unsplash.com/photo-1513364776144-60967b0f800f?auto=format&fit=crop&w=2200&q=90",
  },
  {
    id: 3,
    title: "Ширээгээ цэгцэл",
    description: "Өдөр тутмын ажилд хэрэгтэй жижиг зүйлс нэг дор.",
    buttonLabel: "Ширээний хэрэгсэл",
    href: "/category/desk-essentials",
    image:
      "https://images.unsplash.com/photo-1497366754035-f200968a6e72?auto=format&fit=crop&w=2200&q=90",
  },
];

const COPY_COUNT = 5;
const MIDDLE_COPY_INDEX = 2;
const SLIDE_COUNT = slides.length;
const INITIAL_PHYSICAL_INDEX = MIDDLE_COPY_INDEX * SLIDE_COUNT;

const extendedSlides: ExtendedSlide[] = Array.from(
  { length: COPY_COUNT },
  (_, copyIndex) =>
    slides.map((slide, realIndex) => ({
      ...slide,
      realIndex,
      copyIndex,
      uniqueKey: `${copyIndex}-${slide.id}`,
    })),
).flat();

function ArrowLeftIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" aria-hidden="true" className="h-6 w-6">
      <path
        d="M15 6l-6 6 6 6"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function ArrowRightIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" aria-hidden="true" className="h-6 w-6">
      <path
        d="m9 6 6 6-6 6"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function getRealIndex(physicalIndex: number) {
  return extendedSlides[physicalIndex]?.realIndex ?? 0;
}

export default function HeroSlider() {
  const swiperRef = useRef<SwiperInstance | null>(null);

  const animationLockRef = useRef(false);

  const [activeRealIndex, setActiveRealIndex] = useState(0);

  const [animationKey, setAnimationKey] = useState(0);

  const activeSlide = slides[activeRealIndex];

  function restartContentAnimation(realIndex: number) {
    setActiveRealIndex(realIndex);
    setAnimationKey((current) => current + 1);
  }

  function normalizeLoopPosition(swiper: SwiperInstance) {
    const realIndex = getRealIndex(swiper.activeIndex);

    const middlePhysicalIndex = INITIAL_PHYSICAL_INDEX + realIndex;

    if (swiper.activeIndex !== middlePhysicalIndex) {
      animationLockRef.current = true;

      requestAnimationFrame(() => {
        swiper.slideTo(middlePhysicalIndex, 0, false);

        requestAnimationFrame(() => {
          animationLockRef.current = false;
        });
      });
    }
  }

  function handleTransitionStart(swiper: SwiperInstance) {
    if (animationLockRef.current) {
      return;
    }

    const realIndex = getRealIndex(swiper.activeIndex);

    restartContentAnimation(realIndex);
  }

  function findNearestPhysicalIndex(realIndex: number) {
    const swiper = swiperRef.current;

    if (!swiper) {
      return INITIAL_PHYSICAL_INDEX + realIndex;
    }

    const currentIndex = swiper.activeIndex;

    let nearestIndex = INITIAL_PHYSICAL_INDEX + realIndex;

    let nearestDistance = Number.POSITIVE_INFINITY;

    for (let copyIndex = 0; copyIndex < COPY_COUNT; copyIndex += 1) {
      const candidateIndex = copyIndex * SLIDE_COUNT + realIndex;

      const distance = Math.abs(candidateIndex - currentIndex);

      if (distance < nearestDistance) {
        nearestDistance = distance;
        nearestIndex = candidateIndex;
      }
    }

    return nearestIndex;
  }

  function goToPrevious() {
    const swiper = swiperRef.current;

    if (!swiper || swiper.animating) {
      return;
    }

    swiper.slidePrev(950);

    swiper.autoplay?.start();
  }

  function goToNext() {
    const swiper = swiperRef.current;

    if (!swiper || swiper.animating) {
      return;
    }

    swiper.slideNext(950);

    swiper.autoplay?.start();
  }

  function goToSlide(realIndex: number) {
    const swiper = swiperRef.current;

    if (!swiper || swiper.animating) {
      return;
    }

    if (realIndex === activeRealIndex) {
      restartContentAnimation(realIndex);
      swiper.autoplay?.start();
      return;
    }

    const targetPhysicalIndex = findNearestPhysicalIndex(realIndex);

    swiper.slideTo(targetPhysicalIndex, 950);

    swiper.autoplay?.start();
  }

  return (
    <section className="relative overflow-hidden bg-neutral-50 py-3">
      <Swiper
        modules={[Autoplay, A11y]}
        initialSlide={INITIAL_PHYSICAL_INDEX}
        centeredSlides
        grabCursor
        simulateTouch
        followFinger
        shortSwipes
        longSwipes
        longSwipesMs={150}
        longSwipesRatio={0.12}
        threshold={4}
        touchRatio={1}
        resistance
        resistanceRatio={0.72}
        speed={950}
        slidesPerView={1.055}
        spaceBetween={14}
        preventClicks
        preventClicksPropagation
        watchSlidesProgress
        autoplay={{
          delay: 4800,
          disableOnInteraction: false,
          pauseOnMouseEnter: false,
          waitForTransition: true,
        }}
        breakpoints={{
          640: {
            slidesPerView: 1.06,
            spaceBetween: 16,
          },
          1024: {
            slidesPerView: 1.065,
            spaceBetween: 18,
          },
        }}
        onSwiper={(swiper) => {
          swiperRef.current = swiper;

          setActiveRealIndex(0);
          setAnimationKey(1);
        }}
        onSlideChangeTransitionStart={handleTransitionStart}
        onSlideChangeTransitionEnd={normalizeLoopPosition}
        className="hero-concept-slider"
      >
        {extendedSlides.map((slide, physicalIndex) => (
          <SwiperSlide key={slide.uniqueKey}>
            <article className="hero-slide relative h-[480px] overflow-hidden rounded-[24px] bg-neutral-900 sm:h-[560px] lg:h-[640px]">
              <Image
                src={slide.image}
                alt={slide.title}
                fill
                priority={
                  physicalIndex >= INITIAL_PHYSICAL_INDEX &&
                  physicalIndex < INITIAL_PHYSICAL_INDEX + SLIDE_COUNT
                }
                sizes="96vw"
                draggable={false}
                className="hero-media pointer-events-none select-none object-cover"
              />

              <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-black/10" />
            </article>
          </SwiperSlide>
        ))}
      </Swiper>

      {/* Active slide content */}
      <div className="pointer-events-none absolute inset-0 z-20 flex items-end justify-center py-3">
        <div className="pointer-events-none h-[480px] w-[94.3%] sm:h-[560px] sm:w-[94.1%] lg:h-[640px] lg:w-[93.9%]">
          <div className="flex h-full flex-col justify-end p-6 sm:p-9 lg:p-14">
            <div
              key={`content-${activeRealIndex}-${animationKey}`}
              className="flex flex-col"
            >
              <div className="flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
                <div className="overflow-hidden">
                  <div className="hero-title-reveal">
                    <h2 className="max-w-[880px] text-3xl font-bold tracking-[-0.055em] text-white sm:text-5xl lg:text-[58px]">
                      {activeSlide.title}
                    </h2>
                  </div>

                  <div className="overflow-hidden">
                    <p className="hero-description-reveal mt-3 max-w-xl text-sm leading-6 text-white/75 sm:text-base">
                      {activeSlide.description}
                    </p>
                  </div>
                </div>

                <Link
                  href={activeSlide.href}
                  draggable={false}
                  className="hero-cta-reveal pointer-events-auto inline-flex h-14 shrink-0 items-center justify-center self-start rounded-full bg-white px-8 text-sm font-semibold text-neutral-950 transition-colors duration-300 hover:bg-neutral-200 sm:h-16 sm:px-11 sm:text-base lg:self-auto"
                >
                  {activeSlide.buttonLabel}
                </Link>
              </div>

              <div className="mt-8 h-px bg-white/20" />

              <div className="mt-2 flex items-center justify-between">
                <button
                  type="button"
                  onClick={goToPrevious}
                  aria-label="Previous slide"
                  className="pointer-events-auto flex h-12 w-12 items-center justify-center rounded-full text-white transition-colors duration-300 hover:bg-white/10"
                >
                  <ArrowLeftIcon />
                </button>

                <div className="pointer-events-auto flex items-center gap-2">
                  {slides.map((slide, dotIndex) => {
                    const isActive = dotIndex === activeRealIndex;

                    return (
                      <button
                        key={slide.id}
                        type="button"
                        onClick={() => goToSlide(dotIndex)}
                        aria-label={`Go to slide ${dotIndex + 1}`}
                        className={`flex h-5 w-5 items-center justify-center rounded-full border transition-all duration-300 ${
                          isActive ? "border-white" : "border-transparent"
                        }`}
                      >
                        <span
                          className={`block rounded-full transition-all duration-300 ${
                            isActive
                              ? "h-1.5 w-1.5 bg-white"
                              : "h-1.5 w-1.5 bg-white/60"
                          }`}
                        />
                      </button>
                    );
                  })}
                </div>

                <button
                  type="button"
                  onClick={goToNext}
                  aria-label="Next slide"
                  className="pointer-events-auto flex h-12 w-12 items-center justify-center rounded-full text-white transition-colors duration-300 hover:bg-white/10"
                >
                  <ArrowRightIcon />
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      <style jsx global>{`
        .hero-concept-slider {
          overflow: visible;
          padding-bottom: 8px;
        }

        .hero-concept-slider .swiper-wrapper {
          align-items: stretch;
          transition-timing-function: cubic-bezier(0.22, 1, 0.36, 1) !important;
          will-change: transform;
        }

        .hero-concept-slider .swiper-slide {
          opacity: 1;
          transform: scale(0.985);

          transition: transform 1100ms cubic-bezier(0.22, 1, 0.36, 1);

          will-change: transform;
        }

        .hero-concept-slider .swiper-slide-active {
          opacity: 1;
          transform: scale(1);
        }

        .hero-concept-slider .hero-media {
          opacity: 0;
          transform: scale(1.06) translate3d(0, 0, 0);

          transition:
            opacity 950ms ease,
            transform 1500ms cubic-bezier(0.22, 1, 0.36, 1);

          will-change: opacity, transform;
        }

        .hero-concept-slider .swiper-slide-active .hero-media {
          opacity: 1;
          transform: scale(1) translate3d(0, 0, 0);
        }

        .hero-title-reveal {
          animation: hero-title-reveal 920ms cubic-bezier(0.22, 1, 0.36, 1) both;
          animation-delay: 250ms;
        }

        .hero-description-reveal {
          animation: hero-description-reveal 850ms
            cubic-bezier(0.22, 1, 0.36, 1) both;
          animation-delay: 4000ms;
        }

        .hero-cta-reveal {
          animation: hero-cta-reveal 1200ms cubic-bezier(0.22, 1, 0.36, 1) both;
          animation-delay: 400ms;
        }

        @keyframes hero-title-reveal {
          0% {
            opacity: 0;
            transform: translate3d(-70px, 46px, 0);
            clip-path: inset(0 100% 0 0);
          }

          45% {
            opacity: 1;
          }

          100% {
            opacity: 1;
            transform: translate3d(0, 0, 0);
            clip-path: inset(0 0 0 0);
          }
        }

        @keyframes hero-description-reveal {
          0% {
            opacity: 0;
            transform: translate3d(-45px, 25px, 0);
          }

          100% {
            opacity: 1;
            transform: translate3d(0, 0, 0);
          }
        }

        @keyframes hero-cta-reveal {
          0% {
            opacity: 0;
            transform: translate3d(65px, 28px, 0) scale(0.96);
          }

          100% {
            opacity: 1;
            transform: translate3d(0, 0, 0) scale(1);
          }
        }

        @media (prefers-reduced-motion: reduce) {
          .hero-concept-slider .swiper-wrapper,
          .hero-concept-slider .swiper-slide,
          .hero-concept-slider .hero-media {
            transition-duration: 1ms !important;
          }

          .hero-title-reveal,
          .hero-description-reveal,
          .hero-cta-reveal {
            animation-duration: 1ms !important;
            animation-delay: 0ms !important;
          }
        }
      `}</style>
    </section>
  );
}
