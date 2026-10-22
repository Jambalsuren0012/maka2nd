"use client";

import { useEffect, useRef } from "react";

const TEXT = "СУРАЛЦАХ БҮТЭЭХ ӨДӨР БҮР";
const ITEMS_PER_GROUP = 3;

type OutlineTextProps = {
  text: string;
};

function OutlineText({ text }: OutlineTextProps) {
  const parts = text.split(/([Өө])/g);

  return (
    <>
      {parts.map((part, index) => {
        if (!part) {
          return null;
        }

        if (part === "Ө" || part === "ө") {
          const baseLetter = part === "Ө" ? "О" : "о";

          return (
            <span
              key={`${part}-${index}`}
              className="technology-special-letter"
            >
              <span className="technology-letter-outline">{baseLetter}</span>

              <span aria-hidden="true" className="technology-letter-line" />
            </span>
          );
        }

        return (
          <span key={`${part}-${index}`} className="technology-letter-outline">
            {part}
          </span>
        );
      })}
    </>
  );
}

export default function TechnologyMarquee() {
  const trackRef = useRef<HTMLDivElement>(null);

  const firstGroupRef = useRef<HTMLDivElement>(null);

  const hoveredRef = useRef(false);

  useEffect(() => {
    let animationFrame = 0;
    let groupWidth = 0;
    let position = 0;
    let lastTime = performance.now();
    let lastScrollY = window.scrollY;
    let isDisposed = false;

    const AUTO_SPEED = 74;
    const SCROLL_STRENGTH = 0.85;

    function updateGroupWidth() {
      const firstGroup = firstGroupRef.current;

      if (!firstGroup) {
        return;
      }

      groupWidth = firstGroup.getBoundingClientRect().width;
    }

    function normalizePosition() {
      if (groupWidth <= 0) {
        return;
      }

      while (position <= -groupWidth) {
        position += groupWidth;
      }

      while (position > 0) {
        position -= groupWidth;
      }
    }

    function animate(currentTime: number) {
      if (isDisposed) {
        return;
      }

      const trackElement = trackRef.current;

      const deltaTime = Math.min((currentTime - lastTime) / 1000, 0.05);

      lastTime = currentTime;

      if (!hoveredRef.current) {
        position -= AUTO_SPEED * deltaTime;
      }

      normalizePosition();

      if (trackElement) {
        trackElement.style.transform = `translate3d(${position}px, 0, 0)`;
      }

      animationFrame = window.requestAnimationFrame(animate);
    }

    function handleScroll() {
      const currentScrollY = window.scrollY;

      const scrollDelta = currentScrollY - lastScrollY;

      lastScrollY = currentScrollY;

      position -= scrollDelta * SCROLL_STRENGTH;

      normalizePosition();
    }

    function handleResize() {
      updateGroupWidth();
      normalizePosition();
    }

    updateGroupWidth();

    const resizeObserver = new ResizeObserver(() => {
      handleResize();
    });

    const firstGroup = firstGroupRef.current;

    if (firstGroup) {
      resizeObserver.observe(firstGroup);
    }

    void document.fonts.ready.then(() => {
      if (!isDisposed) {
        handleResize();
      }
    });

    window.addEventListener("scroll", handleScroll, {
      passive: true,
    });

    window.addEventListener("resize", handleResize);

    animationFrame = window.requestAnimationFrame(animate);

    return () => {
      isDisposed = true;

      window.removeEventListener("scroll", handleScroll);

      window.removeEventListener("resize", handleResize);

      resizeObserver.disconnect();

      window.cancelAnimationFrame(animationFrame);
    };
  }, []);

  return (
    <section
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
        className="technology-marquee-track flex w-max items-center"
      >
        {[0, 1].map((groupIndex) => (
          <div
            key={groupIndex}
            ref={groupIndex === 0 ? firstGroupRef : undefined}
            aria-hidden={groupIndex === 1}
            className="flex shrink-0 items-center"
          >
            {Array.from({
              length: ITEMS_PER_GROUP,
            }).map((_, itemIndex) => (
              <div key={itemIndex} className="flex shrink-0 items-center">
                <p
                  aria-hidden={groupIndex > 0 || itemIndex > 0}
                  className="technology-outline-text whitespace-nowrap px-6 text-[62px] leading-none sm:px-9 sm:text-[90px] lg:text-[126px] xl:text-[148px]"
                >
                  <OutlineText text={TEXT} />
                </p>

                <span className="mx-5 h-3 w-3 shrink-0 rounded-full border border-neutral-300 sm:mx-8 sm:h-4 sm:w-4" />
              </div>
            ))}
          </div>
        ))}
      </div>

      <style jsx global>{`
        .technology-marquee-track {
          transform: translate3d(0, 0, 0);

          will-change: transform;
        }

        .technology-outline-text {
          display: inline-flex;
          align-items: baseline;

          font-family: var(--font-manrope), sans-serif;

          font-weight: 800;
          font-synthesis: none;

          letter-spacing: -0.018em;
          text-transform: uppercase;

          text-rendering: geometricPrecision;

          -webkit-font-smoothing: antialiased;

          -moz-osx-font-smoothing: grayscale;
        }

        .technology-letter-outline {
          display: inline-block;

          color: transparent;

          -webkit-text-fill-color: transparent;

          -webkit-text-stroke: 1.6px rgba(23, 23, 23, 0.14);

          paint-order: stroke fill;
        }

        .technology-special-letter {
          position: relative;

          display: inline-block;
        }

        .technology-letter-line {
          position: absolute;

          left: 22%;
          top: 50%;

          width: 56%;
          height: 1.6px;

          background: rgba(23, 23, 23, 0.14);

          transform: translateY(-50%);

          pointer-events: none;
        }

        @media (max-width: 640px) {
          .technology-outline-text {
            letter-spacing: -0.012em;
          }

          .technology-letter-outline {
            -webkit-text-stroke: 1.2px rgba(23, 23, 23, 0.15);
          }

          .technology-letter-line {
            height: 1.2px;

            background: rgba(23, 23, 23, 0.15);
          }
        }

        @media (prefers-reduced-motion: reduce) {
          .technology-marquee-track {
            transform: translate3d(0, 0, 0) !important;
          }
        }
      `}</style>
    </section>
  );
}
