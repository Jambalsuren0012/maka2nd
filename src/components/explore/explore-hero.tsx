export default function ExploreHero() {
  return (
    <section className="relative min-h-[62svh] overflow-hidden rounded-b-[28px] bg-neutral-950 sm:min-h-[64svh] lg:min-h-[65svh]">
      {/* BACKGROUND */}
      <div
        className="absolute inset-0 bg-cover bg-center"
        style={{
          backgroundImage: 'url("/assets/explore/explore-hero.jpg")',
        }}
      />

      {/* DARK OVERLAY */}
      <div className="absolute inset-0 bg-black/45" />

      {/* GRADIENT */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/10 to-black/20" />

      {/* CONTENT */}
      <div className="relative z-10 mx-auto flex min-h-[62svh] max-w-[1920px] items-end px-5 pb-12 pt-28 sm:min-h-[64svh] sm:px-8 sm:pb-14 lg:min-h-[65svh] lg:px-12 lg:pb-16">
        <div className="max-w-[1100px]">
          <p className="mb-5 text-[14px] font-semibold text-[#f0b488] sm:text-[16px]">
            Бидний түүх
          </p>

          <h1 className="max-w-[1050px] text-[54px] font-black leading-[0.9] tracking-[-0.06em] text-white sm:text-[70px] lg:text-[92px] xl:text-[108px]">
            Технологиор
            <br />
            боломжийг бүтээнэ
          </h1>
        </div>
      </div>
    </section>
  );
}
