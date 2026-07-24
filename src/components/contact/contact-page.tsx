"use client";

import Link from "next/link";
import { useState, type FormEvent } from "react";

type ContactFormState = {
  name: string;
  email: string;
  phone: string;
  subject: string;
  message: string;
};

const initialFormState: ContactFormState = {
  name: "",
  email: "",
  phone: "",
  subject: "general",
  message: "",
};

const contactItems = [
  {
    title: "И-мэйл",
    value: "info@sodtech.mn",
    href: "mailto:hello@sodtech.mn",
    description: "И-мэйлээр хүсэлтээ илгээнэ үү.",
  },
  {
    title: "Утас",
    value: "+976 70112266",
    href: "tel:+97670112266",
    description: "Даваа–Баасан, 09:00–18:00",
  },
  {
    title: "Хаяг",
    value: "Улаанбаатар, Монгол",
    href: "#location",
    description:
      "208 тоот, 48-р байр, Бага тойруу, 6-р хороо, Сүхбаатар дүүрэг 14200, Улаанбаатар хот, Монгол Улс",
  },
];

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

function MailIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" aria-hidden="true" className="h-6 w-6">
      <rect
        x="3"
        y="5"
        width="18"
        height="14"
        rx="2.5"
        stroke="currentColor"
        strokeWidth="1.6"
      />

      <path
        d="m5 7 7 5 7-5"
        stroke="currentColor"
        strokeWidth="1.6"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function PhoneIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" aria-hidden="true" className="h-6 w-6">
      <path
        d="M7.2 3.5 9.8 8 7.9 10c1.2 2.8 3.3 4.9 6.1 6.1l2-1.9 4.5 2.6v2.7c0 .8-.7 1.5-1.5 1.5C10.2 21 3 13.8 3 5c0-.8.7-1.5 1.5-1.5h2.7Z"
        stroke="currentColor"
        strokeWidth="1.6"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function LocationIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" aria-hidden="true" className="h-6 w-6">
      <path
        d="M12 21s7-5.2 7-12a7 7 0 1 0-14 0c0 6.8 7 12 7 12Z"
        stroke="currentColor"
        strokeWidth="1.6"
      />

      <circle cx="12" cy="9" r="2.5" stroke="currentColor" strokeWidth="1.6" />
    </svg>
  );
}

function ClockIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" aria-hidden="true" className="h-6 w-6">
      <circle cx="12" cy="12" r="9" stroke="currentColor" strokeWidth="1.6" />

      <path
        d="M12 7v5l3.5 2"
        stroke="currentColor"
        strokeWidth="1.6"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function CheckIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" aria-hidden="true" className="h-6 w-6">
      <path
        d="m5 12 4.2 4.2L19 6.5"
        stroke="currentColor"
        strokeWidth="1.9"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function ContactIcon({ index }: { index: number }) {
  if (index === 0) {
    return <MailIcon />;
  }

  if (index === 1) {
    return <PhoneIcon />;
  }

  return <LocationIcon />;
}

export default function ContactPage() {
  const [form, setForm] = useState<ContactFormState>(initialFormState);

  const [submitted, setSubmitted] = useState(false);

  const [submitting, setSubmitting] = useState(false);

  function updateField(field: keyof ContactFormState, value: string) {
    setForm((current) => ({
      ...current,
      [field]: value,
    }));

    if (submitted) {
      setSubmitted(false);
    }
  }

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    if (!form.name.trim() || !form.email.trim() || !form.message.trim()) {
      return;
    }

    setSubmitting(true);

    // Дараа contact API POST хүсэлтийг энд холбоно.
    await new Promise((resolve) => window.setTimeout(resolve, 700));

    console.log("Contact form:", form);

    setSubmitting(false);
    setSubmitted(true);
    setForm(initialFormState);
  }

  return (
    <main className="min-h-screen bg-white text-neutral-950">
      {/* Hero */}
      <section className="overflow-hidden bg-[#f5f5f1]">
        <div className="mx-auto max-w-[1600px] px-5 py-16 sm:px-8 sm:py-24 lg:px-12 lg:py-28">
          <nav className="flex items-center gap-2 text-sm text-neutral-500">
            <Link href="/" className="transition hover:text-neutral-950">
              Нүүр
            </Link>

            <span>/</span>

            <span className="text-neutral-950">Холбоо барих</span>
          </nav>

          <div className="mt-14 grid gap-10 lg:grid-cols-[1.25fr_0.75fr] lg:items-end">
            <div>
              <p className="text-xs font-bold uppercase tracking-[0.24em] text-neutral-400">
                Танд туслахад бэлэн
              </p>

              <h1 className="mt-5 max-w-[900px] text-5xl font-black leading-[0.95] tracking-[-0.075em] sm:text-7xl lg:text-[92px]">
                Бидэнтэй
                <br />
                холбогдоорой
              </h1>
            </div>

            <p className="max-w-[520px] text-base leading-7 text-neutral-600 sm:text-lg">
              Бүтээгдэхүүн, захиалга, хүргэлт болон бусад асуудлаар бидэнд
              хүсэлтээ илгээнэ үү. Манай баг танд аль болох хурдан хариу өгөх
              болно.
            </p>
          </div>
        </div>
      </section>

      {/* Contact info */}
      <section className="border-b border-neutral-200">
        <div className="mx-auto grid max-w-[1600px] grid-cols-1 px-5 sm:px-8 md:grid-cols-3 lg:px-12">
          {contactItems.map((item, index) => (
            <a
              key={item.title}
              href={item.href}
              className={`group flex min-h-[230px] flex-col justify-between py-9 transition hover:bg-neutral-50 md:px-8 ${
                index > 0
                  ? "border-t border-neutral-200 md:border-l md:border-t-0"
                  : ""
              }`}
            >
              <span className="flex h-12 w-12 items-center justify-center rounded-full bg-neutral-100 transition-all duration-300 group-hover:bg-neutral-950 group-hover:text-white">
                <ContactIcon index={index} />
              </span>

              <div className="mt-10">
                <p className="text-xs font-semibold uppercase tracking-[0.18em] text-neutral-400">
                  {item.title}
                </p>

                <p className="mt-2 text-xl font-bold tracking-[-0.035em] sm:text-2xl">
                  {item.value}
                </p>

                <p className="mt-2 text-sm text-neutral-500">
                  {item.description}
                </p>
              </div>
            </a>
          ))}
        </div>
      </section>

      {/* Form */}
      <section className="mx-auto max-w-[1600px] px-5 py-16 sm:px-8 sm:py-20 lg:px-12 lg:py-28">
        <div className="grid gap-12 lg:grid-cols-[0.75fr_1.25fr] lg:gap-20">
          {/* Left info */}
          <div>
            <p className="text-xs font-bold uppercase tracking-[0.2em] text-neutral-400">
              Санал хүсэлт
            </p>

            <h2 className="mt-4 text-4xl font-black tracking-[-0.06em] sm:text-5xl">
              Хүсэлтээ
              <br />
              бидэнд илгээнэ үү
            </h2>

            <p className="mt-6 max-w-[430px] text-base leading-7 text-neutral-600">
              Доорх маягтыг бөглөсний дараа манай үйлчилгээний ажилтан таны
              бүртгүүлсэн и-мэйл эсвэл утсаар эргэн холбогдоно.
            </p>

            <div className="mt-10 rounded-[24px] bg-[#f6f6f3] p-6 sm:p-8">
              <div className="flex items-start gap-4">
                <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-white">
                  <ClockIcon />
                </span>

                <div>
                  <h3 className="font-bold">Ажиллах цаг</h3>

                  <div className="mt-4 space-y-3 text-sm text-neutral-600">
                    <div className="flex justify-between gap-6">
                      <span>Даваа–Баасан</span>

                      <span className="font-medium text-neutral-950">
                        09:00–18:00
                      </span>
                    </div>

                    <div className="flex justify-between gap-6">
                      <span>Бямба</span>

                      <span className="font-medium text-neutral-950">
                        10:00–16:00
                      </span>
                    </div>

                    <div className="flex justify-between gap-6">
                      <span>Ням</span>

                      <span className="font-medium text-neutral-950">
                        Амарна
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Contact form */}
          <div className="rounded-[28px] border border-neutral-200 bg-white p-5 sm:p-8 lg:p-10">
            {submitted && (
              <div className="mb-7 flex items-start gap-4 rounded-2xl bg-emerald-50 p-5 text-emerald-800">
                <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-emerald-100">
                  <CheckIcon />
                </span>

                <div>
                  <h3 className="font-bold">Хүсэлт амжилттай илгээгдлээ</h3>

                  <p className="mt-1 text-sm leading-6 text-emerald-700">
                    Манай баг тантай удахгүй эргэн холбогдоно.
                  </p>
                </div>
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid gap-5 sm:grid-cols-2">
                <label className="block">
                  <span className="text-sm font-semibold">Нэр</span>

                  <input
                    type="text"
                    value={form.name}
                    onChange={(event) =>
                      updateField("name", event.target.value)
                    }
                    required
                    placeholder="Таны нэр"
                    className="mt-2 h-14 w-full rounded-2xl border border-neutral-200 bg-neutral-50 px-4 text-sm outline-none transition placeholder:text-neutral-400 focus:border-neutral-950 focus:bg-white"
                  />
                </label>

                <label className="block">
                  <span className="text-sm font-semibold">И-мэйл</span>

                  <input
                    type="email"
                    value={form.email}
                    onChange={(event) =>
                      updateField("email", event.target.value)
                    }
                    required
                    placeholder="name@example.com"
                    className="mt-2 h-14 w-full rounded-2xl border border-neutral-200 bg-neutral-50 px-4 text-sm outline-none transition placeholder:text-neutral-400 focus:border-neutral-950 focus:bg-white"
                  />
                </label>
              </div>

              <div className="grid gap-5 sm:grid-cols-2">
                <label className="block">
                  <span className="text-sm font-semibold">Утас</span>

                  <input
                    type="tel"
                    value={form.phone}
                    onChange={(event) =>
                      updateField("phone", event.target.value)
                    }
                    placeholder="+976 9911 2233"
                    className="mt-2 h-14 w-full rounded-2xl border border-neutral-200 bg-neutral-50 px-4 text-sm outline-none transition placeholder:text-neutral-400 focus:border-neutral-950 focus:bg-white"
                  />
                </label>

                <label className="block">
                  <span className="text-sm font-semibold">Хүсэлтийн төрөл</span>

                  <select
                    value={form.subject}
                    onChange={(event) =>
                      updateField("subject", event.target.value)
                    }
                    className="mt-2 h-14 w-full rounded-2xl border border-neutral-200 bg-neutral-50 px-4 text-sm outline-none transition focus:border-neutral-950 focus:bg-white"
                  >
                    <option value="general">Ерөнхий мэдээлэл</option>

                    <option value="product">Бүтээгдэхүүний мэдээлэл</option>

                    <option value="order">Захиалгын мэдээлэл</option>

                    <option value="delivery">Хүргэлтийн мэдээлэл</option>

                    <option value="warranty">Баталгаа, засвар</option>

                    <option value="other">Бусад</option>
                  </select>
                </label>
              </div>

              <label className="block">
                <span className="text-sm font-semibold">Мессеж</span>

                <textarea
                  value={form.message}
                  onChange={(event) =>
                    updateField("message", event.target.value)
                  }
                  required
                  placeholder="Хүсэлтээ дэлгэрэнгүй бичнэ үү..."
                  className="mt-2 min-h-[180px] w-full resize-none rounded-[20px] border border-neutral-200 bg-neutral-50 p-4 text-sm leading-6 outline-none transition placeholder:text-neutral-400 focus:border-neutral-950 focus:bg-white"
                />
              </label>

              <div className="flex flex-col gap-4 border-t border-neutral-100 pt-6 sm:flex-row sm:items-center sm:justify-between">
                <p className="max-w-[430px] text-xs leading-5 text-neutral-500">
                  Илгээх товч дарснаар та манай нууцлалын бодлогыг зөвшөөрсөнд
                  тооцогдоно.
                </p>

                <button
                  type="submit"
                  disabled={submitting}
                  className="flex h-14 shrink-0 items-center justify-center gap-3 rounded-full bg-neutral-950 px-8 font-semibold text-white transition-all duration-300 hover:scale-[1.01] hover:bg-neutral-700 disabled:cursor-wait disabled:bg-neutral-400"
                >
                  {submitting ? "Илгээж байна..." : "Хүсэлт илгээх"}

                  {!submitting && <ArrowRightIcon />}
                </button>
              </div>
            </form>
          </div>
        </div>
      </section>

      {/* Location placeholder */}
      <section id="location" className="bg-[#f5f5f1]">
        <div className="mx-auto max-w-[1600px] px-5 py-16 sm:px-8 sm:py-20 lg:px-12">
          <div className="grid overflow-hidden rounded-[28px] bg-neutral-950 text-white lg:grid-cols-2">
            <div className="flex min-h-[420px] flex-col justify-between p-7 sm:p-10 lg:p-14">
              <div>
                <p className="text-xs font-bold uppercase tracking-[0.2em] text-white/45">
                  Манай байршил
                </p>

                <h2 className="mt-4 text-4xl font-black tracking-[-0.06em] sm:text-5xl">
                  Sodtech салбар
                  <br />
                  дэлгүүр
                </h2>

                <p className="mt-6 max-w-[430px] leading-7 text-white/65">
                  Улаанбаатар хотод байрлах манай салбар дэлгүүрээр зочилж,
                  бүтээгдэхүүнүүдтэй танилцаарай.
                </p>
              </div>

              <a
                href="https://maps.google.com"
                target="_blank"
                rel="noreferrer"
                className="mt-10 inline-flex w-fit items-center gap-3 rounded-full border border-white/25 px-6 py-4 font-semibold transition hover:bg-white hover:text-neutral-950"
              >
                Газрын зураг нээх
                <ArrowRightIcon />
              </a>
            </div>

            <div className="relative min-h-[380px] bg-[#deded8]">
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="text-center text-neutral-500">
                  <span className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-white text-neutral-950 shadow-lg">
                    <LocationIcon />
                  </span>

                  <p className="mt-4 text-sm font-semibold">Google Map хэсэг</p>

                  <p className="mt-1 text-xs">
                    Дараа iframe эсвэл map API холбоно
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
