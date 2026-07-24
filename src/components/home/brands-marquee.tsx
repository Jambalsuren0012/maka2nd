"use client";

import { useEffect, useMemo, useRef } from "react";

export type BrandItem = {
  id: string | number;
  name: string;
  logoUrl?: string;
  className?: string;
};

type BrandsMarqueeProps = {
  brands?: BrandItem[];
};

const demoBrands: BrandItem[] = [
  {
    id: 1,
    name: "BOSE",
    className:
      "text-[32px] font-black italic tracking-[-0.12em] sm:text-[36px]",
  },
  {
    id: 2,
    name: "Marshall",
    className:
      "font-serif text-[29px] font-bold italic tracking-[-0.06em] sm:text-[34px]",
  },
  {
    id: 3,
    name: "logitech",
    className: "text-[29px] font-bold tracking-[-0.08em] sm:text-[34px]",
  },
  {
    id: 4,
    name: "Apple",
  },
  {
    id: 5,
    name: "Bowers & Wilkins",
    className: "text-[18px] font-medium tracking-[-0.04em] sm:text-[21px]",
  },
  {
    id: 6,
    name: "urbanista",
    className: "text-[29px] font-black tracking-[-0.1em] sm:text-[34px]",
  },
  {
    id: 7,
    name: "B&O",
    className: "font-serif text-[29px] tracking-[-0.08em] sm:text-[34px]",
  },
  {
    id: 8,
    name: "SONY",
    className:
      "font-serif text-[27px] font-bold tracking-[0.02em] sm:text-[32px]",
  },
];

const groupCopies = [0, 1, 2, 3];

function AppleLogo() {
  return (
    <svg
      viewBox="0 0 24 28"
      aria-hidden="true"
      className="h-11 w-10 fill-current sm:h-13 sm:w-12"
    >
      <path d="M18.4 14.7c0-3.5 2.9-5.2 3-5.3-1.6-2.4-4.2-2.7-5.1-2.7-2.2-.2-4.2 1.3-5.3 1.3-1.1 0-2.8-1.3-4.6-1.2-2.4 0-4.6 1.4-5.8 3.5-2.5 4.3-.6 10.7 1.8 14.2 1.2 1.7 2.6 3.6 4.5 3.5 1.8-.1 2.5-1.2 4.7-1.2s2.8 1.2 4.7 1.1c1.9 0 3.2-1.7 4.4-3.4 1.4-2 1.9-4 2-4.1-.1 0-4.3-1.6-4.3-5.7ZM14.9 4.4C15.9 3.2 16.6 1.6 16.4 0c-1.5.1-3.2 1-4.3 2.2-1 1.1-1.8 2.7-1.6 4.2 1.6.1 3.3-.8 4.4-2Z" />
    </svg>
  );
}

function BrandLogo({
  brand,
  muted = false,
}: {
  brand: BrandItem;
  muted?: boolean;
}) {
  const isApple = brand.name.toLowerCase() === "apple";

  return (
    <div
      title={brand.name}
      className={`flex h-full min-w-[220px] shrink-0 items-center justify-center px-8 sm:min-w-[260px] sm:px-10 lg:min-w-[290px] ${
        muted ? "text-neutral-400" : "text-neutral-950"
      }`}
    >
      {brand.logoUrl ? (
        // API-аас logoUrl ирэхэд шууд ашиглана.
        // eslint-disable-next-line @next/next/no-img-element
        <img
          src={brand.logoUrl}
          alt={brand.name}
          draggable={false}
          className={`max-h-[54px] max-w-[190px] select-none object-contain sm:max-h-[62px] sm:max-w-[220px] ${
            muted ? "grayscale opacity-50" : ""
          }`}
        />
      ) : isApple ? (
        <AppleLogo />
      ) : (
        <span
          className={brand.className ?? "text-[30px] font-bold sm:text-[34px]"}
        >
          {brand.name}
        </span>
      )}
    </div>
  );
}

function normalizeOffset(value: number, width: number) {
  if (width <= 0) {
    return value;
  }

  return (((value % width) + width) % width) - width;
}

export default function BrandsMarquee({ brands }: BrandsMarqueeProps) {
  const sectionRef = useRef<HTMLElement | null>(null);

  const topTrackRef = useRef<HTMLDivElement | null>(null);

  const bottomTrackRef = useRef<HTMLDivElement | null>(null);

  const topFirstGroupRef = useRef<HTMLDivElement | null>(null);

  const bottomFirstGroupRef = useRef<HTMLDivElement | null>(null);

  const topGroupWidthRef = useRef(0);
  const bottomGroupWidthRef = useRef(0);

  const topOffsetRef = useRef(0);
  const bottomOffsetRef = useRef(0);

  // Line тус бүр өөрийн pause төлөвтэй.
  const topPausedRef = useRef(false);
  const bottomPausedRef = useRef(false);

  const visibleRef = useRef(true);

  const scrollVelocityRef = useRef(0);
  const lastScrollYRef = useRef(0);

  const previousTimeRef = useRef<number | null>(null);

  const animationFrameRef = useRef<number | null>(null);

  const renderedBrands = useMemo(() => {
    if (brands && brands.length > 0) {
      return brands;
    }

    return demoBrands;
  }, [brands]);

  function pauseTopLine() {
    topPausedRef.current = true;
  }

  function resumeTopLine() {
    topPausedRef.current = false;
  }

  function pauseBottomLine() {
    bottomPausedRef.current = true;
  }

  function resumeBottomLine() {
    bottomPausedRef.current = false;
  }

  useEffect(() => {
    const sectionElement = sectionRef.current;

    const topTrackElement = topTrackRef.current;

    const bottomTrackElement = bottomTrackRef.current;

    const topGroupElement = topFirstGroupRef.current;

    const bottomGroupElement = bottomFirstGroupRef.current;

    if (
      !sectionElement ||
      !topTrackElement ||
      !bottomTrackElement ||
      !topGroupElement ||
      !bottomGroupElement
    ) {
      return;
    }

    const section = sectionElement;
    const topTrack = topTrackElement;
    const bottomTrack = bottomTrackElement;
    const topGroup = topGroupElement;
    const bottomGroup = bottomGroupElement;

    lastScrollYRef.current = window.scrollY;

    function updateTopTransform() {
      topTrack.style.transform = `translate3d(${topOffsetRef.current}px, 0, 0)`;
    }

    function updateBottomTransform() {
      bottomTrack.style.transform = `translate3d(${bottomOffsetRef.current}px, 0, 0)`;
    }

    function measureGroups() {
      const topWidth = topGroup.offsetWidth;
      const bottomWidth = bottomGroup.offsetWidth;

      topGroupWidthRef.current = topWidth;
      bottomGroupWidthRef.current = bottomWidth;

      topOffsetRef.current = normalizeOffset(topOffsetRef.current, topWidth);

      if (bottomOffsetRef.current === 0) {
        bottomOffsetRef.current = -bottomWidth;
      }

      bottomOffsetRef.current = normalizeOffset(
        bottomOffsetRef.current,
        bottomWidth,
      );

      updateTopTransform();
      updateBottomTransform();
    }

    function handleScroll() {
      const currentScrollY = window.scrollY;

      const scrollDifference = currentScrollY - lastScrollYRef.current;

      lastScrollYRef.current = currentScrollY;

      if (topPausedRef.current && bottomPausedRef.current) {
        return;
      }

      scrollVelocityRef.current += scrollDifference * 0.085;

      scrollVelocityRef.current = Math.max(
        -14,
        Math.min(14, scrollVelocityRef.current),
      );
    }

    function animate(time: number) {
      if (previousTimeRef.current === null) {
        previousTimeRef.current = time;
      }

      const elapsed = Math.min(time - previousTimeRef.current, 34);

      previousTimeRef.current = time;

      if (visibleRef.current) {
        const frameRatio = elapsed / 16.6667;

        const automaticSpeed = 0.72;

        const movement =
          (automaticSpeed + scrollVelocityRef.current) * frameRatio;

        // Дээд мөр зөвхөн өөрийн hover үед зогсоно.
        if (!topPausedRef.current) {
          topOffsetRef.current -= movement;

          topOffsetRef.current = normalizeOffset(
            topOffsetRef.current,
            topGroupWidthRef.current,
          );

          updateTopTransform();
        }

        // Доод мөр зөвхөн өөрийн hover үед зогсоно.
        if (!bottomPausedRef.current) {
          bottomOffsetRef.current += movement;

          bottomOffsetRef.current = normalizeOffset(
            bottomOffsetRef.current,
            bottomGroupWidthRef.current,
          );

          updateBottomTransform();
        }

        scrollVelocityRef.current *= Math.pow(0.88, frameRatio);

        if (Math.abs(scrollVelocityRef.current) < 0.01) {
          scrollVelocityRef.current = 0;
        }
      }

      animationFrameRef.current = requestAnimationFrame(animate);
    }

    const resizeObserver = new ResizeObserver(measureGroups);

    resizeObserver.observe(topGroup);
    resizeObserver.observe(bottomGroup);

    const intersectionObserver = new IntersectionObserver(
      ([entry]) => {
        visibleRef.current = entry?.isIntersecting ?? false;

        previousTimeRef.current = null;
      },
      {
        rootMargin: "200px 0px",
      },
    );

    intersectionObserver.observe(section);

    window.addEventListener("scroll", handleScroll, {
      passive: true,
    });

    measureGroups();

    animationFrameRef.current = requestAnimationFrame(animate);

    return () => {
      resizeObserver.disconnect();
      intersectionObserver.disconnect();

      window.removeEventListener("scroll", handleScroll);

      if (animationFrameRef.current !== null) {
        cancelAnimationFrame(animationFrameRef.current);

        animationFrameRef.current = null;
      }
    };
  }, [renderedBrands]);

  return (
    <section
      ref={sectionRef}
      aria-label="Featured brands"
      className="relative overflow-hidden bg-white py-16 sm:py-20 lg:py-24"
    >
      <div className="relative h-[300px] sm:h-[340px]">
        {/* Дээд шар line */}
        <div
          onPointerEnter={pauseTopLine}
          onPointerLeave={resumeTopLine}
          className="absolute left-1/2 top-[38px] z-20 w-[116vw] -translate-x-1/2 -rotate-[3.2deg] overflow-hidden bg-[#87CEEB] shadow-[0_12px_35px_rgba(0,0,0,0.10)]"
        >
          <div
            ref={topTrackRef}
            className="flex h-[104px] w-max will-change-transform sm:h-[120px]"
          >
            {groupCopies.map((copyIndex) => (
              <div
                key={`top-group-${copyIndex}`}
                ref={copyIndex === 0 ? topFirstGroupRef : undefined}
                aria-hidden="true"
                className="flex h-full shrink-0 items-center"
              >
                {renderedBrands.map((brand) => (
                  <BrandLogo
                    key={`top-${copyIndex}-${brand.id}`}
                    brand={brand}
                  />
                ))}
              </div>
            ))}
          </div>
        </div>

        {/* Доод саарал line */}
        <div
          onPointerEnter={pauseBottomLine}
          onPointerLeave={resumeBottomLine}
          className="absolute left-1/2 top-[145px] z-10 w-[116vw] -translate-x-1/2 rotate-[3.2deg] overflow-hidden bg-[#f0f0ee] shadow-[0_12px_35px_rgba(0,0,0,0.06)]"
        >
          <div
            ref={bottomTrackRef}
            className="flex h-[92px] w-max will-change-transform sm:h-[108px]"
          >
            {groupCopies.map((copyIndex) => (
              <div
                key={`bottom-group-${copyIndex}`}
                ref={copyIndex === 0 ? bottomFirstGroupRef : undefined}
                aria-hidden="true"
                className="flex h-full shrink-0 items-center"
              >
                {renderedBrands.map((brand) => (
                  <BrandLogo
                    key={`bottom-${copyIndex}-${brand.id}`}
                    brand={brand}
                    muted
                  />
                ))}
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
