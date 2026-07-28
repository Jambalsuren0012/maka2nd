"use client";

import { useEffect, useRef } from "react";
import { Noto_Sans } from "next/font/google";

const notoSans = Noto_Sans({
  subsets: ["latin", "cyrillic"],
  weight: ["700", "800", "900"],
  display: "swap",
});

export default function TechnologyMarquee() {
  const sectionRef = useRef<HTMLElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);

  const hoveredRef = useRef(false);

  useEffect(() => {
    let animationFrame = 0;

    let autoPosition = 0;
    let scrollPosition = 0;

    let lastTime = performance.now();
    let lastScrollY = window.scrollY;

    const AUTO_SPEED = 20;
    const SCROLL_STRENGTH = 0.24;

    function animate(currentTime: number) {
      const trackElement = trackRef.current;

      if (!trackElement) {
        animationFrame = window.requestAnimationFrame(animate);

        return;
      }

      const deltaTime = Math.min((currentTime - lastTime) / 1000, 0.05);

      lastTime = currentTime;

      if (!hoveredRef.current) {
        autoPosition -= AUTO_SPEED * deltaTime;
      }

      /*
        Хэт их negative position үүсэхээс
        хамгаална.
      */
      if (autoPosition <= -1600) {
        autoPosition = 0;
      }

      const finalPosition = autoPosition + scrollPosition;

      trackElement.style.transform = `translate3d(${finalPosition}px, 0, 0)`;

      /*
        Scroll impulse аажмаар намдана.
      */
      scrollPosition *= 0.9;

      animationFrame = window.requestAnimationFrame(animate);
    }

    function handleScroll() {
      const currentScrollY = window.scrollY;

      const scrollDelta = currentScrollY - lastScrollY;

      lastScrollY = currentScrollY;

      scrollPosition -= scrollDelta * SCROLL_STRENGTH;
    }

    animationFrame = window.requestAnimationFrame(animate);

    window.addEventListener("scroll", handleScroll, {
      passive: true,
    });

    return () => {
      window.removeEventListener("scroll", handleScroll);

      window.cancelAnimationFrame(animationFrame);
    };
  }, []);

  const text = "Технологи өөд тэмүүл";

  return (
    <section
      ref={sectionRef}
      onMouseEnter={() => {
        hoveredRef.current = true;
      }}
      onMouseLeave={() => {
        hoveredRef.current = false;
      }}
      className="relative overflow-hidden border-y border-neutral-100 bg-white py-8 sm:py-12 lg:py-16"
    >
      <div
        ref={trackRef}
        className="technology-scroll-track flex w-max items-center"
      >
        {Array.from({
          length: 8,
        }).map((_, index) => (
          <div
            key={index}
            aria-hidden={index > 0}
            className="flex shrink-0 items-center"
          >
            <svg
              viewBox="0 0 1250 170"
              className="h-[64px] w-[470px] shrink-0 overflow-visible sm:h-[92px] sm:w-[680px] lg:h-[128px] lg:w-[950px] xl:h-[150px] xl:w-[1100px]"
              aria-hidden="true"
            >
              <text
                x="10"
                y="130"
                className={notoSans.className}
                fill="none"
                stroke="rgba(23,23,23,0.14)"
                strokeWidth="1.8"
                strokeLinejoin="round"
                strokeLinecap="round"
                style={{
                  fontSize: "145px",
                  fontWeight: 900,
                  letterSpacing: "-2px",
                }}
              >
                Технологи өөд тэмүүл
              </text>
            </svg>
            <span className="mx-6 h-3 w-3 shrink-0 rounded-full border border-neutral-300 sm:mx-10 sm:h-4 sm:w-4" />
          </div>
        ))}
      </div>

      <style jsx global>{`
        .technology-scroll-track {
          will-change: transform;
        }

        .technology-outline-text {
          font-weight: 900 !important;

          letter-spacing: -0.015em;

          color: transparent;

          -webkit-text-stroke: 2.4px rgba(23, 23, 23, 0.13);

          paint-order: stroke fill;

          text-rendering: geometricPrecision;
          -webkit-font-smoothing: antialiased;
          -moz-osx-font-smoothing: grayscale;
        }

        @media (max-width: 640px) {
          .technology-outline-text {
            font-weight: 900 !important;

            letter-spacing: -0.01em;

            -webkit-text-stroke: 1.8px rgba(23, 23, 23, 0.14);
          }
        }
        @media (prefers-reduced-motion: reduce) {
          .technology-scroll-track {
            transform: translate3d(0, 0, 0) !important;
          }
        }
      `}</style>
    </section>
  );
}
