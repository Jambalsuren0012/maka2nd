"use client";

const values = [
  {
    title: "Хэрэглэгчээ ойлгох",
    description:
      "Хичээл, ажил, бүтээлч санаа бүр өөрийн хэрэгцээтэй. Танд өдөр тутам үнэхээр хэрэг болох сонголтыг олоход тусална.",
    image:
      "https://images.unsplash.com/photo-1517842645767-c639042777db?auto=format&fit=crop&w=1200&q=90",
  },
  {
    title: "Хэрэгтэй, чанартай сонголт",
    description:
      "Дэвтэр, үзэгнээс эхлээд сургалтын болон урлалын хэрэгсэл хүртэл сонголт бүрийг хэрэгцээ, хэрэглээнд нь нийцүүлнэ.",
    image:
      "https://images.unsplash.com/photo-1455390582262-044cdead277a?auto=format&fit=crop&w=1200&q=90",
  },
  {
    title: "Суралцах, бүтээхийг дэмжих",
    description:
      "Математикийн үзүүлэн, тараах материалаас эхэлсэн түүхээ үргэлжлүүлж, сурах, төлөвлөх, шинэ санаагаа бүтээхэд хэрэгтэй зүйлсийг хүргэнэ.",
    image:
      "https://images.unsplash.com/photo-1513364776144-60967b0f800f?auto=format&fit=crop&w=1200&q=90",
  },
];

function PlusIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" aria-hidden="true" className="h-5 w-5">
      <path
        d="M12 5v14M5 12h14"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinecap="round"
      />
    </svg>
  );
}

export default function CoreValues() {
  return (
    <section className="overflow-hidden bg-white">
      <div className="mx-auto max-w-[1600px] px-5 py-16 sm:px-8 sm:py-20 lg:px-12 lg:py-28">
        <div className="grid gap-10 lg:grid-cols-[0.55fr_1.45fr] lg:items-end lg:gap-14">
          {/* LEFT */}
          <div className="lg:pb-5">
            <p className="text-[11px] font-bold uppercase tracking-[0.22em] text-neutral-400">
              Бидний үнэт зүйл
            </p>

            <h2 className="mt-4 max-w-[420px] text-5xl font-black leading-[0.95] tracking-[-0.07em] text-neutral-950 sm:text-6xl lg:text-[68px]">
              Бидний
              <br />
              үнэт зүйлс
            </h2>

            <p className="mt-7 max-w-[420px] text-[15px] leading-7 text-neutral-600">
              Maka-г сонгож буй хүн бүрийн хичээл, ажил, бүтээлч өдөрт хэрэгтэй
              зүйлсийг бодож сонгох бидний зарчмууд.
            </p>
          </div>

          {/* CARDS */}
          <div className="grid gap-4 sm:grid-cols-3">
            {values.map((item, index) => (
              <article
                key={item.title}
                className="core-value-card group relative min-h-[460px] overflow-hidden rounded-[22px] bg-neutral-900 sm:min-h-[500px]"
              >
                <div
                  className="absolute inset-0 bg-cover bg-center transition-transform duration-[1200ms] ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:scale-[1.06]"
                  style={{
                    backgroundImage: `url("${item.image}")`,
                  }}
                />

                <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/15 to-black/5" />

                <div className="absolute inset-x-0 bottom-0 flex items-end justify-between gap-4 p-6 text-white lg:p-7">
                  <div className="min-w-0">
                    <p className="mb-3 text-[10px] font-semibold uppercase tracking-[0.18em] text-white/50">
                      0{index + 1}
                    </p>

                    <h3 className="whitespace-pre-line text-[23px] font-black leading-[1.05] tracking-[-0.045em] sm:text-[26px]">
                      {item.title}
                    </h3>

                    <div className="core-value-description overflow-hidden">
                      <p className="mt-4 text-sm leading-6 text-white/65">
                        {item.description}
                      </p>
                    </div>
                  </div>

                  <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-white text-neutral-950 transition-all duration-500 group-hover:rotate-45 group-hover:scale-110">
                    <PlusIcon />
                  </span>
                </div>
              </article>
            ))}
          </div>
        </div>
      </div>

      <style jsx global>{`
        .core-value-description {
          max-height: 0;
          opacity: 0;
          transform: translateY(14px);

          transition:
            max-height 700ms cubic-bezier(0.22, 1, 0.36, 1),
            opacity 500ms ease,
            transform 700ms cubic-bezier(0.22, 1, 0.36, 1);
        }

        .core-value-card:hover .core-value-description {
          max-height: 180px;
          opacity: 1;
          transform: translateY(0);
        }

        .core-values-marquee {
          animation: core-values-scroll 26s linear infinite;
          will-change: transform;
        }

        @keyframes core-values-scroll {
          from {
            transform: translateX(0);
          }

          to {
            transform: translateX(-50%);
          }
        }

        @media (max-width: 639px) {
          .core-value-description {
            max-height: 180px;
            opacity: 1;
            transform: none;
          }

          .core-value-card {
            min-height: 420px;
          }
        }

        @media (prefers-reduced-motion: reduce) {
          .core-values-marquee {
            animation-play-state: paused;
          }

          .core-value-card *,
          .core-value-description {
            transition-duration: 1ms !important;
          }
        }
      `}</style>
    </section>
  );
}
