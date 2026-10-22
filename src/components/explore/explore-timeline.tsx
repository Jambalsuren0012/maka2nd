"use client";

import { useEffect, useRef, useState } from "react";

import type { Swiper as SwiperInstance } from "swiper";
import { A11y, Keyboard } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";

import "swiper/css";

type TimelineItem = {
  year: string;
  title: string;
  description: string;
  image: string;
};

const timelineItems: TimelineItem[] = [
  {
    year: "ЭХЛЭЛ",
    title: "Сургалтын хэрэглэгдэхүүнээс эхэлсэн түүх",
    description:
      "Математикийн үзүүлэн, тараах материалын дэлгүүрээр эхэлсэн Maka-гийн түүх өнөөдөр суралцах, бүтээхэд хэрэгтэй бичиг хэргийн сонголтуудаар үргэлжилж байна.",
    image:
      "https://images.unsplash.com/photo-1517842645767-c639042777db?auto=format&fit=crop&w=1800&q=90",
  },
  {
    year: "ЦАХИМ ДЭЛГҮҮР",
    title: "Сургалтын материалаа онлайнд",
    description:
      "Дэлгүүрийн цахим хуудсаар дамжуулан бүтээгдэхүүний сонголтоо танилцуулж, хэрэглэгчдэд онлайнаар захиалах боломж хүргэж байна.",
    image:
      "https://images.unsplash.com/photo-1494438639946-1ebd1d20bf85?auto=format&fit=crop&w=1800&q=90",
  },
  {
    year: "ӨНӨӨДӨР",
    title: "Maka.mn — бичиг хэрэг, бүтээлч санааны дэлгүүр",
    description:
      "Өдөр тутмын дэвтэр, үзэг бичгийн хэрэгсэл, зураг урлал болон ширээний хэрэгслүүдийг нэг дороос сонгоорой. Maka таны хичээл, ажил, бүтээлч санааг дэмжинэ.",
    image:
      "https://images.unsplash.com/photo-1455390582262-044cdead277a?auto=format&fit=crop&w=1800&q=90",
  },
];

export default function ExploreTimeline() {
  const swiperRef = useRef<SwiperInstance | null>(null);

  const timelineScrollRef = useRef<HTMLDivElement | null>(null);

  const yearRefs = useRef<Array<HTMLButtonElement | null>>([]);

  const [activeIndex, setActiveIndex] = useState(0);

  function goToYear(index: number) {
    const swiper = swiperRef.current;

    if (!swiper) {
      return;
    }

    swiper.slideTo(index, 850);
  }

  useEffect(() => {
    const scroller = timelineScrollRef.current;

    const activeButton = yearRefs.current[activeIndex];

    if (!scroller || !activeButton) {
      return;
    }

    const target =
      activeButton.offsetLeft -
      scroller.clientWidth / 2 +
      activeButton.offsetWidth / 2;

    scroller.scrollTo({
      left: Math.max(0, target),
      behavior: "smooth",
    });
  }, [activeIndex]);

  return (
    <section
      id="our-history"
      className="relative overflow-hidden bg-[#151515] text-white lg:rounded-t-[30px]"
    >
      <div className="flex min-h-[calc(100svh-88px)] flex-col">
        {/* HEADER */}
        <div className="mx-auto w-full max-w-[1920px] px-5 pb-5 pt-7 sm:px-8 sm:pb-7 sm:pt-9 lg:px-12">
          <div className="flex flex-col gap-2 sm:flex-row sm:items-end sm:justify-between">
            <div>
              <p className="text-[10px] font-semibold uppercase tracking-[0.24em] text-white/35 sm:text-[11px]">
                MAKA
              </p>

              <h1 className="mt-2 text-[30px] font-black tracking-[-0.055em] sm:text-4xl">
                Бидний түүх
              </h1>
            </div>

            <p className="hidden max-w-[500px] text-sm leading-6 text-white/40 sm:block">
              Өнгөрсөн хугацааны хөгжлийн замнал болон бидний дараагийн алхмууд.
            </p>
          </div>
        </div>

        {/* SLIDER */}
        <div className="flex flex-1 items-start lg:items-center">
          <div className="w-full px-4 sm:px-8 lg:px-0 lg:pl-12">
            <Swiper
              modules={[A11y, Keyboard]}
              onSwiper={(swiper) => {
                swiperRef.current = swiper;
              }}
              initialSlide={0}
              speed={850}
              grabCursor
              keyboard={{
                enabled: true,
              }}
              resistance
              resistanceRatio={0.72}
              slidesPerView={1}
              spaceBetween={14}
              breakpoints={{
                640: {
                  slidesPerView: 1,
                  spaceBetween: 16,
                },

                900: {
                  slidesPerView: 1.18,
                  spaceBetween: 22,
                },

                1280: {
                  slidesPerView: 1.48,
                  spaceBetween: 34,
                },

                1600: {
                  slidesPerView: 1.52,
                  spaceBetween: 38,
                },
              }}
              onSlideChange={(swiper) => {
                setActiveIndex(swiper.activeIndex);
              }}
              className="explore-history-swiper"
            >
              {timelineItems.map((item, index) => {
                const active = activeIndex === index;

                return (
                  <SwiperSlide key={`${item.year}-${index}`} className="h-auto">
                    <article
                      className={`history-slide overflow-hidden rounded-[18px] bg-[#202020] transition-opacity duration-700 lg:grid lg:grid-cols-2 lg:rounded-[22px] ${
                        active ? "opacity-100" : "opacity-30"
                      }`}
                    >
                      {/* IMAGE */}
                      <div className="relative h-[205px] overflow-hidden sm:h-[320px] lg:h-auto lg:min-h-[570px] xl:min-h-[620px]">
                        <div
                          className="absolute inset-0 bg-cover bg-center transition-transform duration-[1400ms] ease-[cubic-bezier(0.22,1,0.36,1)]"
                          style={{
                            backgroundImage: `url("${item.image}")`,
                            transform: active ? "scale(1)" : "scale(1.06)",
                          }}
                        />

                        <div className="absolute inset-0 bg-black/10" />
                      </div>

                      {/* CONTENT */}
                      <div className="flex min-h-[310px] flex-col px-7 pb-8 pt-8 sm:min-h-[360px] sm:px-9 sm:py-10 lg:min-h-[570px] lg:px-14 lg:py-14 xl:min-h-[620px] xl:px-16 xl:py-16">
                        <p
                          className={`text-[14px] font-bold text-white/50 transition-all duration-600 ${
                            active
                              ? "translate-y-0 opacity-100"
                              : "translate-y-3 opacity-0"
                          }`}
                        >
                          {item.year}
                        </p>

                        <h2
                          className={`mt-4 max-w-[540px] text-[26px] font-black leading-[1.06] tracking-[-0.055em] transition-all delay-75 duration-700 sm:text-4xl lg:mt-5 lg:text-[42px] ${
                            active
                              ? "translate-y-0 opacity-100"
                              : "translate-y-6 opacity-0"
                          }`}
                        >
                          {item.title}
                        </h2>

                        <p
                          className={`mt-6 max-w-[570px] text-[14px] leading-6 text-white/55 transition-all delay-150 duration-700 sm:text-[15px] sm:leading-7 lg:mt-8 lg:text-[17px] lg:leading-8 ${
                            active
                              ? "translate-y-0 opacity-100"
                              : "translate-y-7 opacity-0"
                          }`}
                        >
                          {item.description}
                        </p>

                        <div
                          className={`mt-auto pt-7 transition-all delay-200 duration-700 lg:pt-10 ${
                            active
                              ? "translate-y-0 opacity-100"
                              : "translate-y-5 opacity-0"
                          }`}
                        >
                          <div className="h-px w-12 bg-white/15 lg:w-14" />

                          <p className="mt-3 text-[10px] uppercase tracking-[0.18em] text-white/25 lg:mt-4 lg:text-xs">
                            MAKA · {item.year}
                          </p>
                        </div>
                      </div>
                    </article>
                  </SwiperSlide>
                );
              })}
            </Swiper>
          </div>
        </div>

        {/* TIMELINE */}
        <div className="w-full pb-7 pt-6 sm:pb-8 sm:pt-7 lg:mx-auto lg:max-w-[1920px] lg:px-12 lg:pb-9 lg:pt-8">
          <div
            ref={timelineScrollRef}
            className="timeline-scroll overflow-x-auto px-[42%] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden sm:px-8 lg:px-0"
          >
            <div className="flex w-max min-w-full items-center">
              {timelineItems.map((item, index) => {
                const active = activeIndex === index;

                return (
                  <div
                    key={`${item.year}-timeline-${index}`}
                    className="flex shrink-0 items-center"
                  >
                    <button
                      ref={(element) => {
                        yearRefs.current[index] = element;
                      }}
                      type="button"
                      onClick={() => goToYear(index)}
                      className={`relative shrink-0 px-1 text-[16px] font-black tracking-[-0.04em] transition-colors duration-400 sm:text-[18px] lg:text-[21px] ${
                        active
                          ? "text-white"
                          : "text-white/20 hover:text-white/55"
                      }`}
                    >
                      {item.year}

                      <span
                        className={`absolute -bottom-2 left-1/2 h-1.5 w-1.5 -translate-x-1/2 rounded-full bg-white transition-all duration-400 ${
                          active ? "scale-100 opacity-100" : "scale-0 opacity-0"
                        }`}
                      />
                    </button>

                    {index < timelineItems.length - 1 && (
                      <div className="mx-3 h-px w-10 bg-white/12 sm:w-12 lg:mx-5 lg:w-16">
                        <div
                          className={`h-full origin-left bg-white transition-all duration-700 ${
                            index < activeIndex
                              ? "scale-x-100 opacity-45"
                              : "scale-x-0 opacity-0"
                          }`}
                        />
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>

      <style jsx global>{`
        .explore-history-swiper {
          overflow: hidden;
        }

        .explore-history-swiper .swiper-wrapper {
          align-items: stretch;

          transition-timing-function: cubic-bezier(0.22, 1, 0.36, 1) !important;

          will-change: transform;
        }

        .explore-history-swiper .swiper-slide {
          height: auto;

          transition:
            opacity 700ms ease,
            transform 850ms cubic-bezier(0.22, 1, 0.36, 1);
        }

        .history-slide {
          height: 100%;
          will-change: opacity, transform;
        }

        .timeline-scroll {
          overscroll-behavior-x: contain;
          scroll-behavior: smooth;
        }

        @media (min-width: 900px) {
          .explore-history-swiper {
            overflow: visible;
            padding-right: 40px;
          }

          .explore-history-swiper .swiper-slide:not(.swiper-slide-active) {
            transform: scale(0.992);
          }

          .explore-history-swiper .swiper-slide-active {
            transform: scale(1);
          }
        }

        @media (max-width: 899px) {
          .explore-history-swiper .swiper-slide {
            opacity: 1 !important;
          }

          .explore-history-swiper
            .swiper-slide:not(.swiper-slide-active)
            .history-slide {
            opacity: 1;
          }
        }

        @media (prefers-reduced-motion: reduce) {
          .explore-history-swiper .swiper-wrapper,
          .explore-history-swiper .swiper-slide,
          .history-slide,
          .history-slide * {
            transition-duration: 1ms !important;
          }
        }
      `}</style>
    </section>
  );
}
