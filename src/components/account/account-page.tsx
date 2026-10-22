"use client";

import Link from "next/link";
import { useState, type FormEvent } from "react";

type AccountMode = "signin" | "register";

export default function AccountPage() {
  const [mode, setMode] = useState<AccountMode>("signin");
  const [notice, setNotice] = useState("");

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setNotice(
      "Бүртгэлийн систем одоогоор холбогдоогүй тул мэдээлэл илгээгдсэнгүй.",
    );
  }

  function changeMode(nextMode: AccountMode) {
    setMode(nextMode);
    setNotice("");
  }

  return (
    <main className="min-h-[70vh] bg-[#fafaf9] px-4 py-12 sm:px-6 sm:py-16">
      <div className="mx-auto grid max-w-5xl overflow-hidden rounded-[28px] border border-neutral-200 bg-white shadow-[0_24px_80px_rgba(0,0,0,0.05)] md:grid-cols-[0.9fr_1.1fr]">
        <section className="flex flex-col justify-between bg-neutral-950 p-7 text-white sm:p-10">
          <Link
            href="/"
            className="text-xl font-bold tracking-[-0.06em] text-white"
          >
            Maka
          </Link>

          <div className="py-12 md:py-20">
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-white/50">
              Maka · Таны орон зай
            </p>
            <h1 className="mt-4 text-3xl font-bold leading-tight tracking-[-0.06em] sm:text-4xl">
              Дуртай зүйлсээ нэг дороос.
            </h1>
            <p className="mt-4 max-w-sm text-sm leading-6 text-white/65">
              Бүртгэлээрээ нэвтэрч захиалгын мэдээллээ харах, дараагийн
              худалдан авалтаа илүү хялбар хийх боломжтой.
            </p>
          </div>

          <Link
            href="/"
            className="text-sm text-white/65 underline underline-offset-4 transition hover:text-white"
          >
            Дэлгүүр рүү буцах
          </Link>
        </section>

        <section className="p-6 sm:p-10 md:p-12">
          <p className="text-xs font-semibold uppercase tracking-[0.16em] text-neutral-400">
            Тавтай морил
          </p>
          <h2 className="mt-2 text-2xl font-bold tracking-[-0.05em] sm:text-3xl">
            {mode === "signin" ? "Бүртгэлдээ нэвтрэх" : "Шинэ бүртгэл үүсгэх"}
          </h2>
          <p className="mt-2 text-sm leading-6 text-neutral-500">
            {mode === "signin"
              ? "И-мэйл болон нууц үгээ оруулна уу."
              : "Мэдээллээ оруулж Maka бүртгэл үүсгэнэ үү."}
          </p>

          <div className="mt-7 grid grid-cols-2 rounded-full bg-neutral-100 p-1">
            <button
              type="button"
              aria-pressed={mode === "signin"}
              onClick={() => changeMode("signin")}
              className={`h-10 rounded-full text-sm font-semibold transition ${
                mode === "signin"
                  ? "bg-white text-neutral-950 shadow-sm"
                  : "text-neutral-500 hover:text-neutral-950"
              }`}
            >
              Нэвтрэх
            </button>
            <button
              type="button"
              aria-pressed={mode === "register"}
              onClick={() => changeMode("register")}
              className={`h-10 rounded-full text-sm font-semibold transition ${
                mode === "register"
                  ? "bg-white text-neutral-950 shadow-sm"
                  : "text-neutral-500 hover:text-neutral-950"
              }`}
            >
              Бүртгүүлэх
            </button>
          </div>

          <form onSubmit={handleSubmit} className="mt-6 space-y-4">
            {mode === "register" && (
              <label className="block text-sm font-medium">
                Овог, нэр
                <input
                  autoComplete="name"
                  name="name"
                  required
                  placeholder="Таны овог, нэр"
                  className="mt-2 h-12 w-full rounded-xl border border-neutral-200 bg-white px-4 text-sm outline-none transition placeholder:text-neutral-400 focus:border-neutral-950"
                />
              </label>
            )}

            <label className="block text-sm font-medium">
              И-мэйл
              <input
                autoComplete="email"
                name="email"
                type="email"
                required
                placeholder="name@example.com"
                className="mt-2 h-12 w-full rounded-xl border border-neutral-200 bg-white px-4 text-sm outline-none transition placeholder:text-neutral-400 focus:border-neutral-950"
              />
            </label>

            <label className="block text-sm font-medium">
              Нууц үг
              <input
                autoComplete={
                  mode === "signin" ? "current-password" : "new-password"
                }
                name="password"
                type="password"
                minLength={8}
                required
                placeholder="Хамгийн багадаа 8 тэмдэгт"
                className="mt-2 h-12 w-full rounded-xl border border-neutral-200 bg-white px-4 text-sm outline-none transition placeholder:text-neutral-400 focus:border-neutral-950"
              />
            </label>

            {mode === "register" && (
              <label className="flex cursor-pointer items-start gap-3 text-xs leading-5 text-neutral-600">
                <input
                  name="newsletter"
                  type="checkbox"
                  className="mt-0.5 h-4 w-4 accent-neutral-950"
                />
                Maka-ийн шинэ бүтээгдэхүүн, урамшууллын мэдээлэл хүлээн авах.
              </label>
            )}

            {notice && (
              <p
                role="status"
                className="rounded-xl bg-amber-50 px-4 py-3 text-xs leading-5 text-amber-900"
              >
                {notice}
              </p>
            )}

            <button
              type="submit"
              className="flex h-12 w-full items-center justify-center rounded-full bg-neutral-950 px-6 text-sm font-semibold !text-white transition hover:bg-neutral-700"
            >
              {mode === "signin" ? "Нэвтрэх" : "Бүртгэл үүсгэх"}
            </button>
          </form>
        </section>
      </div>
    </main>
  );
}
