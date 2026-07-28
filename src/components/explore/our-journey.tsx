import Image from "next/image";

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

export default function OurJourney() {
  return (
    <section className="overflow-hidden bg-white">
      <div className="mx-auto grid max-w-[1600px] gap-14 px-5 py-16 sm:px-8 sm:py-20 lg:grid-cols-[1.05fr_0.95fr] lg:items-center lg:gap-20 lg:px-12 lg:py-28">
        {/* IMAGES */}
        <div className="relative mx-auto w-full max-w-[720px] pb-10 sm:pb-16">
          {/* Main image */}
          <div className="relative ml-auto aspect-[0.86/1] w-[78%] rotate-[2.5deg] overflow-hidden rounded-[24px] bg-neutral-100">
            <Image
              src="/assets/logo.png"
              alt="SODTECH компанийн хөгжлийн замнал"
              fill
              priority
              sizes="(max-width: 1024px) 80vw, 40vw"
              className="object-cover grayscale transition-all duration-1000 hover:scale-[1.03]"
            />
          </div>

          {/* Front image */}
          <div className="absolute bottom-[3%] left-0 aspect-[0.78/1] w-[52%] -rotate-[4deg] overflow-hidden rounded-[22px] bg-neutral-100 shadow-[0_30px_70px_rgba(0,0,0,0.14)] sm:bottom-[4%]">
            <Image
              src="/assets/logo.png"
              alt="SODTECH технологийн үйлчилгээ"
              fill
              sizes="(max-width: 1024px) 55vw, 26vw"
              className="object-cover transition-transform duration-1000 hover:scale-[1.04]"
            />

            <div className="pointer-events-none absolute inset-0 bg-gradient-to-tr from-orange-500/15 via-transparent to-transparent" />
          </div>
        </div>

        {/* CONTENT */}
        <div className="lg:pl-4">
          <p className="text-[11px] font-bold uppercase tracking-[0.24em] text-neutral-400">
            SODTECH
          </p>

          <div className="relative mt-3 inline-block">
            <h2 className="relative z-10 text-5xl font-black tracking-[-0.065em] text-neutral-950 sm:text-6xl lg:text-[72px]">
              Бидний замнал
            </h2>

            <svg
              aria-hidden="true"
              viewBox="0 0 240 24"
              preserveAspectRatio="none"
              className="absolute -bottom-2 right-0 h-5 w-[48%]"
            >
              <path
                d="M4 17C65 4 135 9 235 7"
                fill="none"
                stroke="#f3bd8d"
                strokeWidth="8"
                strokeLinecap="round"
              />
            </svg>
          </div>

          <div className="mt-10 max-w-[720px] space-y-6 text-[16px] leading-8 text-neutral-700 sm:text-[17px]">
            <p>
              Манай компани анх 2013 оноос мэдээлэл технологийн салбарт гадаад
              худалдаа, компьютерийн засвар, түүний дагалдах төхөөрөмж
              борлуулалтын чиглэлээр үйл ажиллагаагаа явуулж эхэлсэн 100 хувь
              дотоодын хөрөнгө оруулалттай компани юм. Бид бүхэн өндөр мэдлэг,
              ур чадвар, бүтээлч сэтгэлгээ, шинэ технологийг эх орондоо
              нэвтрүүлэхийн зэрэгцээ, захиалагч болон харилцагчийнхаа нэр хүнд,
              эрх ашгийг тэргүүн эгнээнд тавьж, урт хугацааны найрсаг найдвартай
              хамтын ажиллагааг эрхэмлэн, чанарын өндөр түвшинд хийж
              гүйцэтгэхийн ямагт эрмэлзэж ажилладаг. Манай компани нь дэлхийд
              нэр хүндтэй албан ёсны Canon, Dell, Kaspersky, Konica Minolta,
              APC, Solarwinds, Oracle-ийн албан ёсны гэрээт борлуулагч бөгөөд
              чанартай сервис үйлчилгээний хамтаар дэвшилтэд технологийг
              хэрэглэгчидэд цаг алдалгүй хүргэхийг зорилт болгон ажиллаж байна
            </p>
          </div>

          <a
            href="#our-history"
            className="group mt-10 inline-flex h-16 items-center gap-5 rounded-full bg-neutral-950 px-8 font-semibold text-white transition-all duration-500 hover:scale-[1.02] hover:bg-neutral-800"
          >
            <span className="text-white">Бидний түүх</span>

            <span className="transition-transform text-white duration-500 group-hover:translate-x-1">
              <ArrowRightIcon />
            </span>
          </a>
        </div>
      </div>
    </section>
  );
}
