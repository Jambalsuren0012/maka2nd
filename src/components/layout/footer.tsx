"use client";

import Link from "next/link";
import { useState, type FormEvent, type ReactNode } from "react";
import Image from "next/image";

const collectionLinks = [
  {
    label: "Дэвтэр, төлөвлөгч",
    href: "/category/notebooks",
  },
  {
    label: "Үзэг, бичгийн хэрэгсэл",
    href: "/category/writing",
  },
  {
    label: "Зураг, урлал",
    href: "/category/art-supplies",
  },
  {
    label: "Ширээний хэрэгсэл",
    href: "/category/desk-essentials",
  },
];

const informationLinks = [
  {
    label: "Бидний тухай",
    href: "/about",
  },
  {
    label: "Нийтлэл",
    href: "/blog",
  },
  {
    label: "Түгээмэл асуулт",
    href: "/faq",
  },
  {
    label: "Холбоо барих",
    href: "/contact",
  },
];

type SocialLinkProps = {
  href: string;
  label: string;
  children: React.ReactNode;
};

function SocialLink({ href, label, children }: SocialLinkProps) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noreferrer"
      aria-label={label}
      className="group flex h-10 w-10 items-center justify-center overflow-hidden text-white"
    >
      <span className="relative block h-5 w-5 overflow-hidden">
        <span className="absolute inset-0 flex items-center justify-center transition-transform duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:-translate-y-full">
          {children}
        </span>

        <span className="absolute inset-0 flex translate-y-full items-center justify-center transition-transform duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:translate-y-0">
          {children}
        </span>
      </span>
    </a>
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

function FacebookIcon() {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="currentColor"
      aria-hidden="true"
      className="h-5 w-5"
    >
      <path d="M13.7 21v-8h2.7l.4-3.1h-3.1V8c0-.9.3-1.5 1.6-1.5H17V3.7c-.3 0-1.3-.1-2.5-.1-2.5 0-4.2 1.5-4.2 4.3v2H7.5V13h2.8v8h3.4Z" />
    </svg>
  );
}

function XIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" aria-hidden="true" className="h-5 w-5">
      <path
        d="M5 4l14 16M19 4 5 20"
        stroke="currentColor"
        strokeWidth="1.7"
        strokeLinecap="round"
      />
    </svg>
  );
}

function InstagramIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" aria-hidden="true" className="h-5 w-5">
      <rect
        x="3.5"
        y="3.5"
        width="17"
        height="17"
        rx="5"
        stroke="currentColor"
        strokeWidth="1.7"
      />

      <circle cx="12" cy="12" r="4" stroke="currentColor" strokeWidth="1.7" />

      <circle cx="17.5" cy="6.7" r="1" fill="currentColor" />
    </svg>
  );
}

function YoutubeIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" aria-hidden="true" className="h-5 w-5">
      <rect x="3" y="6" width="18" height="12" rx="4" fill="currentColor" />

      <path d="m10 9 5 3-5 3V9Z" fill="#1d1d1d" />
    </svg>
  );
}

export default function Footer() {
  const [email, setEmail] = useState("");

  const [submitted, setSubmitted] = useState(false);

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    const normalizedEmail = email.trim();

    if (!normalizedEmail) {
      return;
    }

    // Дараа newsletter API-тай энд холбоно.
    console.log("Newsletter email:", normalizedEmail);

    setSubmitted(true);
    setEmail("");
  }

  return (
    <footer className="overflow-hidden bg-[#1d1d1d] text-white">
      <div className="mx-auto max-w-[1600px] px-5 sm:px-8 lg:px-12">
        <div className="grid gap-12 border-t border-white/20 py-14 sm:py-16 lg:grid-cols-[150px_1fr_1fr_1.65fr] lg:gap-14 lg:py-20">
          {/* Logo */}
          <div>
            <Link
              href="/"
              aria-label="Нүүр хуудас"
              className="inline-flex transition-opacity hover:opacity-65"
            >
              <Image
                src="/assets/logo2.png"
                alt="Maka бичиг хэргийн дэлгүүр"
                width={120}
                height={80}
                className="h-14 w-auto object-contain"
                priority
              />
            </Link>
          </div>

          {/* Бүтээгдэхүүний ангилал */}
          <div>
            <h2 className="text-xl font-bold tracking-[-0.04em]">Ангилал</h2>

            <nav className="mt-6 flex flex-col items-start gap-3">
              {collectionLinks.map((item) => (
                <Link
                  key={item.label}
                  href={item.href}
                  className="group relative text-[15px] text-white/75 transition-colors duration-300 hover:text-white"
                >
                  {item.label}

                  <span className="absolute -bottom-1 left-0 h-px w-0 bg-white transition-all duration-300 group-hover:w-full" />
                </Link>
              ))}
            </nav>

            <div className="mt-14 space-y-2">
              <a
                href="tel:+70112266"
                className="group relative block w-fit text-xl font-medium tracking-[-0.03em] sm:text-2xl"
              >
                +976 70112266
                <span className="absolute -bottom-1 left-0 h-px w-full bg-white/70 transition-colors group-hover:bg-white" />
              </a>

              <a
                href="mailto:info@sodtech.mn"
                className="group relative block w-fit text-xl font-medium tracking-[-0.03em] sm:text-2xl"
              >
                info@sodtech.mn
                <span className="absolute -bottom-1 left-0 h-px w-full bg-white/70 transition-colors group-hover:bg-white" />
              </a>
            </div>
          </div>

          {/* Мэдээлэл */}
          <div>
            <h2 className="text-xl font-bold tracking-[-0.04em]">Мэдээлэл</h2>

            <nav className="mt-6 flex flex-col items-start gap-3">
              {informationLinks.map((item) => (
                <Link
                  key={item.label}
                  href={item.href}
                  className="group relative text-[15px] text-white/75 transition-colors duration-300 hover:text-white"
                >
                  {item.label}

                  <span className="absolute -bottom-1 left-0 h-px w-0 bg-white transition-all duration-300 group-hover:w-full" />
                </Link>
              ))}
            </nav>
          </div>

          {/* Newsletter */}
          <div className="border-white/15 lg:border-l lg:pl-14">
            <h2 className="max-w-[560px] text-4xl font-black leading-[0.98] tracking-[-0.055em] sm:text-5xl lg:text-[54px]">
              Шинэ мэдээллийг
              <br />
              цаг алдалгүй аваарай
            </h2>

            <form onSubmit={handleSubmit} className="mt-8 max-w-[520px]">
              <div className="flex h-[66px] items-center rounded-md bg-white/[0.055] p-2 pl-5 transition-colors focus-within:bg-white/[0.09]">
                <input
                  type="email"
                  value={email}
                  onChange={(event) => {
                    setEmail(event.target.value);

                    if (submitted) {
                      setSubmitted(false);
                    }
                  }}
                  required
                  aria-label="И-мэйл хаяг"
                  placeholder="И-мэйл хаягаа оруулна уу"
                  className="min-w-0 flex-1 bg-transparent text-sm text-white outline-none placeholder:text-white/45"
                />

                <button
                  type="submit"
                  aria-label="Мэдээлэл авах"
                  className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-white text-neutral-950 transition-all duration-300 hover:scale-105 hover:bg-neutral-200"
                >
                  <ArrowRightIcon />
                </button>
              </div>

              <div
                aria-live="polite"
                className="min-h-7 pt-2 text-sm text-emerald-400"
              >
                {submitted ? "Амжилттай бүртгэгдлээ." : ""}
              </div>
            </form>

            {/* Social */}
            <div className="mt-14 flex items-center gap-4">
              <SocialLink href="https://facebook.com" label="Facebook">
                <FacebookIcon />
              </SocialLink>

              <SocialLink href="https://x.com" label="X">
                <XIcon />
              </SocialLink>

              <SocialLink href="https://instagram.com" label="Instagram">
                <InstagramIcon />
              </SocialLink>

              <SocialLink href="https://youtube.com" label="YouTube">
                <YoutubeIcon />
              </SocialLink>
            </div>
          </div>
        </div>

        {/* Доод хэсэг */}
        <div className="flex flex-col gap-4 border-t border-white/10 py-6 text-xs text-white/45 sm:flex-row sm:items-center sm:justify-between">
          <p>© My Store. Бүх эрх хуулиар хамгаалагдсан.</p>

          <div className="flex flex-wrap gap-x-6 gap-y-2">
            <Link href="/privacy" className="transition hover:text-white">
              Нууцлалын бодлого
            </Link>

            <Link href="/terms" className="transition hover:text-white">
              Үйлчилгээний нөхцөл
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
