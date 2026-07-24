"use client";

import Image from "next/image";
import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { createPortal } from "react-dom";

type ProductGalleryProps = {
  title: string;
  images: string[];
  thumbnail?: string;
};

type GalleryRect = {
  left: number;
  top: number;
  width: number;
  height: number;
  borderRadius: number;
};

const VIEWER_DURATION = 780;
const IMAGE_SWITCH_DURATION = 560;

function CloseIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" aria-hidden="true" className="h-5 w-5">
      <path
        d="m6 6 12 12M18 6 6 18"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinecap="round"
      />
    </svg>
  );
}

function ArrowLeftIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" aria-hidden="true" className="h-5 w-5">
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
    <svg viewBox="0 0 24 24" fill="none" aria-hidden="true" className="h-5 w-5">
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

function ZoomIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" aria-hidden="true" className="h-5 w-5">
      <circle cx="11" cy="11" r="6.5" stroke="currentColor" strokeWidth="1.6" />

      <path
        d="m16 16 4 4M11 8v6M8 11h6"
        stroke="currentColor"
        strokeWidth="1.6"
        strokeLinecap="round"
      />
    </svg>
  );
}

export default function ProductGallery({
  title,
  images,
  thumbnail,
}: ProductGalleryProps) {
  const galleryImages = useMemo(() => {
    const values = [thumbnail, ...images].filter(
      (image): image is string =>
        typeof image === "string" && image.trim().length > 0,
    );

    return Array.from(new Set(values));
  }, [images, thumbnail]);

  const thumbnailRefs = useRef<Array<HTMLButtonElement | null>>([]);

  const imageAspectRatioRef = useRef<Record<number, number>>({});

  const activeIndexRef = useRef(0);

  const openedSourceRectRef = useRef<GalleryRect | null>(null);

  const viewerOpenRef = useRef(false);
  const imageAnimatingRef = useRef(false);

  const openFrameOneRef = useRef<number | null>(null);

  const openFrameTwoRef = useRef<number | null>(null);

  const closeTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const imageTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const [viewerOpen, setViewerOpen] = useState(false);

  const [viewerExpanded, setViewerExpanded] = useState(false);

  const [activeIndex, setActiveIndex] = useState(0);

  const [previousIndex, setPreviousIndex] = useState<number | null>(null);

  const [slideDirection, setSlideDirection] = useState<1 | -1>(1);

  const [mediaRect, setMediaRect] = useState<GalleryRect | null>(null);

  const visibleGalleryImages = galleryImages.slice(0, 3);

  const getSourceRect = useCallback((index: number): GalleryRect | null => {
    const element = thumbnailRefs.current[index] ?? thumbnailRefs.current[0];

    if (!element) {
      return null;
    }

    const rect = element.getBoundingClientRect();

    return {
      left: rect.left,
      top: rect.top,
      width: rect.width,
      height: rect.height,
      borderRadius: 24,
    };
  }, []);

  const getImageAspectRatio = useCallback((index: number) => {
    const savedRatio = imageAspectRatioRef.current[index];

    if (savedRatio && Number.isFinite(savedRatio) && savedRatio > 0) {
      return savedRatio;
    }

    const imageElement = thumbnailRefs.current[index]?.querySelector("img");

    if (imageElement?.naturalWidth && imageElement?.naturalHeight) {
      return imageElement.naturalWidth / imageElement.naturalHeight;
    }

    return 1;
  }, []);

  const getExpandedRect = useCallback(
    (index: number): GalleryRect => {
      const aspectRatio = getImageAspectRatio(index);

      const mobile = window.innerWidth < 768;

      const maximumWidth = Math.min(
        window.innerWidth * (mobile ? 0.9 : 0.72),
        920,
      );

      const maximumHeight = Math.min(
        window.innerHeight * (mobile ? 0.72 : 0.8),
        820,
      );

      let width = maximumWidth;
      let height = width / aspectRatio;

      if (height > maximumHeight) {
        height = maximumHeight;
        width = height * aspectRatio;
      }

      return {
        left: (window.innerWidth - width) / 2,
        top: (window.innerHeight - height) / 2,
        width,
        height,
        borderRadius: mobile ? 16 : 22,
      };
    },
    [getImageAspectRatio],
  );

  const closeViewer = useCallback(() => {
    if (!viewerOpenRef.current) {
      return;
    }

    if (closeTimerRef.current) {
      clearTimeout(closeTimerRef.current);
    }

    if (imageTimerRef.current) {
      clearTimeout(imageTimerRef.current);
    }

    imageAnimatingRef.current = false;

    setPreviousIndex(null);
    setViewerExpanded(false);

    const activeSourceRect =
      getSourceRect(activeIndexRef.current) ?? openedSourceRectRef.current;

    if (activeSourceRect) {
      setMediaRect(activeSourceRect);
    }

    closeTimerRef.current = setTimeout(() => {
      viewerOpenRef.current = false;

      setViewerOpen(false);
      setMediaRect(null);
      setPreviousIndex(null);
    }, VIEWER_DURATION);
  }, [getSourceRect]);

  const openViewer = useCallback(
    (index: number) => {
      const sourceRect = getSourceRect(index);

      if (!sourceRect) {
        return;
      }

      if (closeTimerRef.current) {
        clearTimeout(closeTimerRef.current);
      }

      if (imageTimerRef.current) {
        clearTimeout(imageTimerRef.current);
      }

      activeIndexRef.current = index;

      openedSourceRectRef.current = sourceRect;

      viewerOpenRef.current = true;

      imageAnimatingRef.current = false;

      setActiveIndex(index);
      setPreviousIndex(null);
      setMediaRect(sourceRect);
      setViewerExpanded(false);
      setViewerOpen(true);

      openFrameOneRef.current = requestAnimationFrame(() => {
        openFrameTwoRef.current = requestAnimationFrame(() => {
          setMediaRect(getExpandedRect(index));

          setViewerExpanded(true);
        });
      });
    },
    [getExpandedRect, getSourceRect],
  );

  const changeViewerImage = useCallback(
    (nextIndex: number, direction: 1 | -1) => {
      if (galleryImages.length <= 1 || imageAnimatingRef.current) {
        return;
      }

      const currentIndex = activeIndexRef.current;

      if (nextIndex === currentIndex) {
        return;
      }

      imageAnimatingRef.current = true;

      setPreviousIndex(currentIndex);
      setSlideDirection(direction);

      activeIndexRef.current = nextIndex;

      setActiveIndex(nextIndex);

      setMediaRect(getExpandedRect(nextIndex));

      if (imageTimerRef.current) {
        clearTimeout(imageTimerRef.current);
      }

      imageTimerRef.current = setTimeout(() => {
        setPreviousIndex(null);

        imageAnimatingRef.current = false;
      }, IMAGE_SWITCH_DURATION);
    },
    [galleryImages.length, getExpandedRect],
  );

  const showPreviousImage = useCallback(() => {
    const nextIndex =
      activeIndexRef.current === 0
        ? galleryImages.length - 1
        : activeIndexRef.current - 1;

    changeViewerImage(nextIndex, -1);
  }, [changeViewerImage, galleryImages.length]);

  const showNextImage = useCallback(() => {
    const nextIndex =
      activeIndexRef.current === galleryImages.length - 1
        ? 0
        : activeIndexRef.current + 1;

    changeViewerImage(nextIndex, 1);
  }, [changeViewerImage, galleryImages.length]);

  useEffect(() => {
    if (!viewerOpen) {
      return;
    }

    const previousOverflow = document.body.style.overflow;

    document.body.style.overflow = "hidden";

    function handleKeyDown(event: KeyboardEvent) {
      if (event.key === "Escape") {
        closeViewer();
      }

      if (event.key === "ArrowLeft") {
        showPreviousImage();
      }

      if (event.key === "ArrowRight") {
        showNextImage();
      }
    }

    function handleResize() {
      if (!viewerOpenRef.current) {
        return;
      }

      setMediaRect(getExpandedRect(activeIndexRef.current));
    }

    window.addEventListener("keydown", handleKeyDown);

    window.addEventListener("resize", handleResize);

    return () => {
      document.body.style.overflow = previousOverflow;

      window.removeEventListener("keydown", handleKeyDown);

      window.removeEventListener("resize", handleResize);
    };
  }, [
    closeViewer,
    getExpandedRect,
    showNextImage,
    showPreviousImage,
    viewerOpen,
  ]);

  useEffect(() => {
    return () => {
      if (openFrameOneRef.current) {
        cancelAnimationFrame(openFrameOneRef.current);
      }

      if (openFrameTwoRef.current) {
        cancelAnimationFrame(openFrameTwoRef.current);
      }

      if (closeTimerRef.current) {
        clearTimeout(closeTimerRef.current);
      }

      if (imageTimerRef.current) {
        clearTimeout(imageTimerRef.current);
      }
    };
  }, []);

  if (galleryImages.length === 0) {
    return (
      <div className="flex aspect-square items-center justify-center rounded-[24px] bg-neutral-100 text-sm text-neutral-400">
        Бүтээгдэхүүний зураг байхгүй
      </div>
    );
  }

  const fullscreenViewer =
    viewerOpen && mediaRect && typeof document !== "undefined"
      ? createPortal(
          <div
            role="dialog"
            aria-modal="true"
            aria-label={`${title} бүтээгдэхүүний зураг харах`}
            onClick={closeViewer}
            className="fixed inset-0 z-[300]"
            style={{
              backgroundColor: viewerExpanded
                ? "rgba(255,255,255,1)"
                : "rgba(255,255,255,0)",
              transition: `background-color ${VIEWER_DURATION}ms cubic-bezier(0.22, 1, 0.36, 1)`,
            }}
          >
            {/* Зургийн дугаар */}
            <div
              className={`absolute left-5 top-5 z-20 flex h-10 min-w-[62px] items-center justify-center rounded-full border border-neutral-200 bg-white px-4 text-xs font-semibold text-neutral-950 shadow-sm transition-all duration-500 sm:left-7 sm:top-7 ${
                viewerExpanded
                  ? "translate-y-0 opacity-100"
                  : "-translate-y-3 opacity-0"
              }`}
            >
              {activeIndex + 1} / {galleryImages.length}
            </div>

            {/* Хаах товч */}
            <button
              type="button"
              onClick={(event) => {
                event.stopPropagation();
                closeViewer();
              }}
              aria-label="Зураг харах цонхыг хаах"
              title="Хаах"
              className={`absolute right-5 top-5 z-20 flex h-11 w-11 items-center justify-center rounded-full border border-neutral-200 bg-white text-neutral-950 shadow-sm transition-all duration-500 hover:scale-105 hover:bg-neutral-950 hover:text-white sm:right-7 sm:top-7 ${
                viewerExpanded
                  ? "translate-y-0 opacity-100"
                  : "-translate-y-3 opacity-0"
              }`}
            >
              <CloseIcon />
            </button>

            {galleryImages.length > 1 && (
              <>
                <button
                  type="button"
                  onClick={(event) => {
                    event.stopPropagation();

                    showPreviousImage();
                  }}
                  aria-label="Өмнөх зураг"
                  title="Өмнөх зураг"
                  className={`absolute left-4 top-1/2 z-20 flex h-11 w-11 -translate-y-1/2 items-center justify-center rounded-full border border-neutral-200 bg-white text-neutral-950 shadow-sm transition-all duration-500 hover:scale-105 hover:bg-neutral-950 hover:text-white sm:left-7 sm:h-12 sm:w-12 ${
                    viewerExpanded
                      ? "opacity-100"
                      : "pointer-events-none opacity-0"
                  }`}
                >
                  <ArrowLeftIcon />
                </button>

                <button
                  type="button"
                  onClick={(event) => {
                    event.stopPropagation();

                    showNextImage();
                  }}
                  aria-label="Дараагийн зураг"
                  title="Дараагийн зураг"
                  className={`absolute right-4 top-1/2 z-20 flex h-11 w-11 -translate-y-1/2 items-center justify-center rounded-full border border-neutral-200 bg-white text-neutral-950 shadow-sm transition-all duration-500 hover:scale-105 hover:bg-neutral-950 hover:text-white sm:right-7 sm:h-12 sm:w-12 ${
                    viewerExpanded
                      ? "opacity-100"
                      : "pointer-events-none opacity-0"
                  }`}
                >
                  <ArrowRightIcon />
                </button>
              </>
            )}

            {/* Томруулсан зураг */}
            <div
              onClick={(event) => event.stopPropagation()}
              className="absolute overflow-hidden bg-[#f7f7f7] shadow-[0_20px_80px_rgba(0,0,0,0.06)]"
              style={{
                left: mediaRect.left,
                top: mediaRect.top,
                width: mediaRect.width,
                height: mediaRect.height,
                borderRadius: mediaRect.borderRadius,
                transition: [
                  `left ${VIEWER_DURATION}ms cubic-bezier(0.22, 1, 0.36, 1)`,
                  `top ${VIEWER_DURATION}ms cubic-bezier(0.22, 1, 0.36, 1)`,
                  `width ${VIEWER_DURATION}ms cubic-bezier(0.22, 1, 0.36, 1)`,
                  `height ${VIEWER_DURATION}ms cubic-bezier(0.22, 1, 0.36, 1)`,
                  `border-radius ${VIEWER_DURATION}ms cubic-bezier(0.22, 1, 0.36, 1)`,
                  `box-shadow ${VIEWER_DURATION}ms cubic-bezier(0.22, 1, 0.36, 1)`,
                ].join(", "),
              }}
            >
              {previousIndex !== null && (
                <div
                  className={`absolute inset-0 ${
                    slideDirection === 1
                      ? "details-image-leave-left"
                      : "details-image-leave-right"
                  }`}
                >
                  <Image
                    src={galleryImages[previousIndex]}
                    alt={`${title} ${previousIndex + 1}-р зураг`}
                    fill
                    sizes="90vw"
                    draggable={false}
                    className="pointer-events-none select-none object-contain"
                  />
                </div>
              )}

              <div
                key={`active-${activeIndex}`}
                className={`absolute inset-0 ${
                  previousIndex === null
                    ? ""
                    : slideDirection === 1
                      ? "details-image-enter-right"
                      : "details-image-enter-left"
                }`}
              >
                <Image
                  src={galleryImages[activeIndex]}
                  alt={`${title} ${activeIndex + 1}-р зураг`}
                  fill
                  priority
                  sizes="90vw"
                  draggable={false}
                  className="pointer-events-none select-none object-contain"
                />
              </div>
            </div>

            {/* Доод цэгүүд */}
            {galleryImages.length > 1 && (
              <div
                onClick={(event) => event.stopPropagation()}
                className={`absolute bottom-6 left-1/2 z-20 flex -translate-x-1/2 items-center gap-2 rounded-full border border-neutral-200 bg-white/90 px-4 py-3 shadow-sm backdrop-blur transition-all duration-500 ${
                  viewerExpanded
                    ? "translate-y-0 opacity-100"
                    : "translate-y-4 opacity-0"
                }`}
              >
                {galleryImages.map((_, index) => (
                  <button
                    key={index}
                    type="button"
                    onClick={() => {
                      const direction = index > activeIndexRef.current ? 1 : -1;

                      changeViewerImage(index, direction);
                    }}
                    aria-label={`${index + 1}-р зургийг харах`}
                    className="flex h-5 w-5 items-center justify-center rounded-full"
                  >
                    <span
                      className={`block rounded-full bg-neutral-950 transition-all duration-300 ${
                        activeIndex === index
                          ? "h-2.5 w-2.5"
                          : "h-1.5 w-1.5 opacity-30"
                      }`}
                    />
                  </button>
                ))}
              </div>
            )}
          </div>,
          document.body,
        )
      : null;

  return (
    <>
      <div
        className={`grid gap-3 ${
          visibleGalleryImages.length === 1
            ? "h-[480px] grid-cols-1 grid-rows-1 sm:h-[650px]"
            : visibleGalleryImages.length === 2
              ? "h-[480px] grid-cols-2 grid-rows-1 sm:h-[650px]"
              : "h-[480px] grid-cols-[1.15fr_0.85fr] grid-rows-2 sm:h-[650px] lg:h-[720px]"
        }`}
      >
        {visibleGalleryImages.map((image, index) => {
          const firstImage = visibleGalleryImages.length >= 3 && index === 0;

          const hiddenImageCount =
            galleryImages.length - visibleGalleryImages.length;

          return (
            <button
              key={`${image}-${index}`}
              ref={(element) => {
                thumbnailRefs.current[index] = element;
              }}
              type="button"
              onClick={() => openViewer(index)}
              aria-label={`${title} бүтээгдэхүүний ${index + 1}-р зургийг нээх`}
              className={`group relative overflow-hidden rounded-[24px] bg-[#f7f7f7] text-left focus:outline-none focus-visible:ring-2 focus-visible:ring-neutral-950 focus-visible:ring-offset-2 ${
                firstImage ? "row-span-2" : ""
              }`}
            >
              <Image
                src={image}
                alt={`${title} ${index + 1}-р зураг`}
                fill
                priority={index === 0}
                sizes={
                  index === 0
                    ? "(max-width: 1024px) 60vw, 42vw"
                    : "(max-width: 1024px) 40vw, 24vw"
                }
                draggable={false}
                onLoad={(event) => {
                  const element = event.currentTarget;

                  if (element.naturalWidth && element.naturalHeight) {
                    imageAspectRatioRef.current[index] =
                      element.naturalWidth / element.naturalHeight;
                  }
                }}
                className="pointer-events-none select-none object-contain p-6 transition-transform duration-700 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:scale-[1.035] sm:p-8"
              />

              <span className="absolute right-4 top-4 flex h-11 w-11 items-center justify-center rounded-full border border-black/5 bg-white text-neutral-950 opacity-0 shadow-sm transition-all duration-300 group-hover:scale-100 group-hover:opacity-100 sm:scale-90">
                <ZoomIcon />
              </span>

              {index === visibleGalleryImages.length - 1 &&
                hiddenImageCount > 0 && (
                  <span className="absolute bottom-4 right-4 rounded-full bg-neutral-950 px-4 py-2 text-xs font-semibold text-white">
                    +{hiddenImageCount} зураг
                  </span>
                )}
            </button>
          );
        })}
      </div>

      {fullscreenViewer}

      <style jsx global>{`
        .details-image-enter-right {
          animation: details-enter-right ${IMAGE_SWITCH_DURATION}ms
            cubic-bezier(0.22, 1, 0.36, 1) both;
        }

        .details-image-enter-left {
          animation: details-enter-left ${IMAGE_SWITCH_DURATION}ms
            cubic-bezier(0.22, 1, 0.36, 1) both;
        }

        .details-image-leave-left {
          animation: details-leave-left ${IMAGE_SWITCH_DURATION}ms
            cubic-bezier(0.22, 1, 0.36, 1) both;
        }

        .details-image-leave-right {
          animation: details-leave-right ${IMAGE_SWITCH_DURATION}ms
            cubic-bezier(0.22, 1, 0.36, 1) both;
        }

        @keyframes details-enter-right {
          from {
            opacity: 0;
            transform: translate3d(12%, 0, 0) scale(0.985);
          }

          to {
            opacity: 1;
            transform: translate3d(0, 0, 0) scale(1);
          }
        }

        @keyframes details-enter-left {
          from {
            opacity: 0;
            transform: translate3d(-12%, 0, 0) scale(0.985);
          }

          to {
            opacity: 1;
            transform: translate3d(0, 0, 0) scale(1);
          }
        }

        @keyframes details-leave-left {
          from {
            opacity: 1;
            transform: translate3d(0, 0, 0) scale(1);
          }

          to {
            opacity: 0;
            transform: translate3d(-12%, 0, 0) scale(0.985);
          }
        }

        @keyframes details-leave-right {
          from {
            opacity: 1;
            transform: translate3d(0, 0, 0) scale(1);
          }

          to {
            opacity: 0;
            transform: translate3d(12%, 0, 0) scale(0.985);
          }
        }

        @media (prefers-reduced-motion: reduce) {
          .details-image-enter-right,
          .details-image-enter-left,
          .details-image-leave-left,
          .details-image-leave-right {
            animation-duration: 1ms !important;
          }
        }
      `}</style>
    </>
  );
}
