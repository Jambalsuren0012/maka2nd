"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  useCallback,
  useEffect,
  useRef,
  useState,
  type FormEvent,
  type ReactNode,
} from "react";

import { useCart } from "@/context/cart-context";

const navigation = [
  {
    label: "Танилцах",
    href: "/explore",
  },
  {
    label: "Харьцуулах",
    href: "/compare",
  },
  {
    label: "Холбоо барих",
    href: "/contact",
  },
];

const collections = [
  {
    title: "Дэвтэр, төлөвлөгч",
    description: "Тэмдэглэл, төлөвлөгөөгөө цэгцтэй хөтлөөрэй.",
    href: "/category/notebooks",
    image:
      "https://images.unsplash.com/photo-1517842645767-c639042777db?auto=format&fit=crop&w=900&q=90",
  },
  {
    title: "Үзэг, бичгийн хэрэгсэл",
    description: "Өдөр бүр бичихэд таатай сонголтууд.",
    href: "/category/writing",
    image:
      "https://images.unsplash.com/photo-1453738773917-9c3eff1db985?auto=format&fit=crop&w=900&q=90",
  },
  {
    title: "Зураг, урлал",
    description: "Бүтээлч санаагаа өнгө, дүрсээр илэрхийлээрэй.",
    href: "/category/art-supplies",
    image:
      "https://images.unsplash.com/photo-1513364776144-60967b0f800f?auto=format&fit=crop&w=900&q=90",
  },
  {
    title: "Ширээний хэрэгсэл",
    description: "Ажлын ширээгээ цэгцтэй, тухтай байлгаарай.",
    href: "/category/desk-essentials",
    image:
      "https://images.unsplash.com/photo-1497366754035-f200968a6e72?auto=format&fit=crop&w=900&q=90",
  },
];

function SearchIcon({ className = "h-6 w-6" }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      aria-hidden="true"
      className={className}
    >
      <circle cx="11" cy="11" r="7" stroke="currentColor" strokeWidth="1.7" />

      <path
        d="m16.5 16.5 4 4"
        stroke="currentColor"
        strokeWidth="1.7"
        strokeLinecap="round"
      />
    </svg>
  );
}

function UserIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" aria-hidden="true" className="h-6 w-6">
      <circle cx="12" cy="7" r="4" stroke="currentColor" strokeWidth="1.7" />

      <path
        d="M4 21c.5-5 3.1-7.5 8-7.5S19.5 16 20 21"
        stroke="currentColor"
        strokeWidth="1.7"
        strokeLinecap="round"
      />
    </svg>
  );
}

function CartIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" aria-hidden="true" className="h-6 w-6">
      <path
        d="M3 4h2.2l1.9 9.1a2 2 0 0 0 2 1.6h7.8a2 2 0 0 0 2-1.6L20.5 7H6"
        stroke="currentColor"
        strokeWidth="1.7"
        strokeLinecap="round"
        strokeLinejoin="round"
      />

      <circle cx="9.5" cy="19" r="1.2" fill="currentColor" />

      <circle cx="17.5" cy="19" r="1.2" fill="currentColor" />
    </svg>
  );
}

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

function MenuIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" aria-hidden="true" className="h-7 w-7">
      <path
        d="M4 7h16M4 12h16M4 17h16"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinecap="round"
      />
    </svg>
  );
}

function ArrowRightIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" aria-hidden="true" className="h-4 w-4">
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

function ChevronDownIcon({ open }: { open: boolean }) {
  return (
    <svg
      viewBox="0 0 20 20"
      fill="none"
      aria-hidden="true"
      className={`h-4 w-4 transition-transform duration-300 ${
        open ? "rotate-180" : ""
      }`}
    >
      <path
        d="m5 7.5 5 5 5-5"
        stroke="currentColor"
        strokeWidth="1.7"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

type RollingPillProps = {
  active: boolean;
  transparent?: boolean;
  children: ReactNode;
};

function RollingPill({
  active,
  transparent = false,
  children,
}: RollingPillProps) {
  return (
    <>
      {/* Hover / active background */}
      <span
        aria-hidden="true"
        className={`absolute inset-0 rounded-full transition-transform duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] ${
          transparent ? "bg-white/15" : "bg-neutral-950"
        } ${
          active
            ? "translate-y-0"
            : "translate-y-[105%] group-hover/navitem:translate-y-0"
        }`}
      />

      {/* Rolling text */}
      <span className="relative block h-6 overflow-hidden">
        <span
          className={`flex flex-col transition-transform duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] ${
            active
              ? "-translate-y-1/2"
              : "translate-y-0 group-hover/navitem:-translate-y-1/2"
          }`}
        >
          <span
            className={`flex h-6 shrink-0 items-center justify-center gap-2 whitespace-nowrap ${
              transparent ? "text-white" : "text-neutral-950"
            }`}
          >
            {children}
          </span>

          <span
            aria-hidden="true"
            className="flex h-6 shrink-0 items-center justify-center gap-2 whitespace-nowrap text-white"
          >
            {children}
          </span>
        </span>
      </span>
    </>
  );
}

function GoogleIcon() {
  return (
    <svg viewBox="0 0 24 24" className="h-5 w-5" aria-hidden="true">
      <path
        fill="#4285F4"
        d="M21.6 12.23c0-.71-.06-1.4-.18-2.07H12v3.92h5.38a4.6 4.6 0 0 1-2 3.02v2.54h3.24c1.9-1.75 2.98-4.33 2.98-7.41Z"
      />

      <path
        fill="#34A853"
        d="M12 22c2.7 0 4.97-.9 6.62-2.36l-3.24-2.54c-.9.6-2.05.96-3.38.96-2.6 0-4.8-1.76-5.6-4.12H3.06v2.62A10 10 0 0 0 12 22Z"
      />

      <path
        fill="#FBBC05"
        d="M6.4 13.94A6 6 0 0 1 6.08 12c0-.67.12-1.32.32-1.94V7.44H3.06A10 10 0 0 0 2 12c0 1.61.38 3.14 1.06 4.56l3.34-2.62Z"
      />

      <path
        fill="#EA4335"
        d="M12 5.94c1.47 0 2.78.5 3.82 1.5l2.87-2.87A9.65 9.65 0 0 0 12 2a10 10 0 0 0-8.94 5.44l3.34 2.62c.8-2.36 3-4.12 5.6-4.12Z"
      />
    </svg>
  );
}

function FacebookIcon() {
  return (
    <svg viewBox="0 0 24 24" className="h-5 w-5" aria-hidden="true">
      <circle cx="12" cy="12" r="10" fill="#1877F2" />

      <path
        fill="#fff"
        d="M13.6 22v-7.74h2.6l.39-3.02H13.6V9.31c0-.87.24-1.47 1.5-1.47h1.6v-2.7A21 21 0 0 0 14.37 5c-2.3 0-3.88 1.4-3.88 3.98v2.26H7.9v3.02h2.59V22h3.11Z"
      />
    </svg>
  );
}

export default function Header() {
  const pathname = usePathname();

  const isExplorePage =
    pathname === "/explore" || pathname.startsWith("/explore/");

  const [isScrolled, setIsScrolled] = useState(false);

  const { itemCount, isCartOpen, openCart, closeCart } = useCart();

  const closeTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  const [collectionsOpen, setCollectionsOpen] = useState(false);

  const [hoveredNavKey, setHoveredNavKey] = useState<string | null>(null);

  const [searchOpen, setSearchOpen] = useState(false);

  const [accountOpen, setAccountOpen] = useState(false);

  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const [mobileCollectionsOpen, setMobileCollectionsOpen] = useState(false);

  const [search, setSearch] = useState("");

  const overlayOpen = searchOpen || mobileMenuOpen;

  const collectionsActive = pathname.startsWith("/category");

  /*
   * EXPLORE:
   * top    -> transparent
   * scroll -> white
   *
   * Бусад route:
   * үргэлж white
   */
  const transparentHeader =
    isExplorePage &&
    !isScrolled &&
    !collectionsOpen &&
    !searchOpen &&
    !accountOpen &&
    !mobileMenuOpen;

  const clearCloseTimer = useCallback(() => {
    if (closeTimer.current) {
      clearTimeout(closeTimer.current);
      closeTimer.current = null;
    }
  }, []);

  const openCollections = useCallback(() => {
    clearCloseTimer();
    setCollectionsOpen(true);
  }, [clearCloseTimer]);

  const closeCollections = useCallback(() => {
    clearCloseTimer();
    setCollectionsOpen(false);
  }, [clearCloseTimer]);

  const scheduleCloseCollections = useCallback(() => {
    clearCloseTimer();

    closeTimer.current = setTimeout(() => {
      setCollectionsOpen(false);
    }, 160);
  }, [clearCloseTimer]);

  const closeAll = useCallback(() => {
    closeCollections();

    setHoveredNavKey(null);
    setSearchOpen(false);
    setAccountOpen(false);
    setMobileMenuOpen(false);
    setMobileCollectionsOpen(false);

    closeCart();
  }, [closeCart, closeCollections]);

  function openSearchPanel() {
    closeCollections();
    closeCart();

    setAccountOpen(false);
    setMobileMenuOpen(false);
    setMobileCollectionsOpen(false);

    setSearchOpen(true);
  }

  function toggleAccount() {
    closeCollections();
    closeCart();

    setSearchOpen(false);
    setMobileMenuOpen(false);
    setMobileCollectionsOpen(false);

    setAccountOpen((current) => !current);
  }

  function handleOpenCart() {
    closeCollections();

    setSearchOpen(false);
    setAccountOpen(false);
    setMobileMenuOpen(false);
    setMobileCollectionsOpen(false);

    openCart();
  }

  function toggleMobileMenu() {
    closeCollections();
    closeCart();

    setSearchOpen(false);
    setAccountOpen(false);
    setMobileCollectionsOpen(false);

    setMobileMenuOpen((current) => !current);
  }

  function handleSearch(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    const query = search.trim();

    if (!query) {
      return;
    }

    setSearchOpen(false);

    window.location.href = `/search?q=${encodeURIComponent(query)}`;
  }

  /*
   * Explore scroll detection
   */
  useEffect(() => {
    function handleScroll() {
      setIsScrolled(window.scrollY > 45);
    }

    handleScroll();

    window.addEventListener("scroll", handleScroll, {
      passive: true,
    });

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [pathname]);

  useEffect(() => {
    function handleKeyDown(event: KeyboardEvent) {
      if (event.key === "Escape") {
        closeAll();
      }
    }

    window.addEventListener("keydown", handleKeyDown);

    return () => {
      window.removeEventListener("keydown", handleKeyDown);

      clearCloseTimer();
    };
  }, [clearCloseTimer, closeAll]);

  useEffect(() => {
    if (!mobileMenuOpen) {
      return;
    }

    const previousOverflow = document.body.style.overflow;

    document.body.style.overflow = "hidden";

    return () => {
      document.body.style.overflow = previousOverflow;
    };
  }, [mobileMenuOpen]);

  return (
    <>
      <header
        className={`z-[100] w-full ${
          isExplorePage ? "fixed inset-x-0 top-0" : "sticky top-0"
        }`}
      >
        <div
          className={`relative isolate transition-colors duration-700 ${
            transparentHeader ? "text-white" : "text-neutral-950"
          }`}
          onMouseEnter={clearCloseTimer}
          onMouseLeave={scheduleCloseCollections}
        >
          <div
            aria-hidden="true"
            className={`pointer-events-none absolute inset-0 z-0 bg-white transition-all duration-700 ease-[cubic-bezier(0.22,1,0.36,1)] ${
              transparentHeader
                ? "-translate-y-full opacity-0 shadow-none"
                : "translate-y-0 opacity-100 shadow-[0_8px_30px_rgba(0,0,0,0.06)]"
            }`}
          />
          <div className="relative z-10 flex h-[88px] w-full items-center justify-between px-6 lg:px-12">
            {/* LOGO */}
            <Link
              href="/"
              aria-label="Нүүр хуудас"
              onClick={closeAll}
              className={`group flex shrink-0 items-center gap-3 transition-opacity duration-300 hover:opacity-80 ${
                transparentHeader ? "text-white" : "text-neutral-950"
              }`}
            >
              <Image
                src="/assets/logo2.png"
                alt="Maka бичиг хэргийн дэлгүүр"
                width={240}
                height={120}
                priority
                className="h-14 w-14 object-contain transition-all duration-500 group-hover:scale-105 sm:h-16 sm:w-16"
              />
            </Link>

            {/* DESKTOP NAV */}
            <nav
              onMouseLeave={() => setHoveredNavKey(null)}
              className="hidden items-center gap-1 xl:flex"
            >
              {/* SHOP */}
              <Link
                href="/"
                onMouseEnter={() => {
                  closeCollections();
                  setHoveredNavKey("shop");
                }}
                onClick={closeAll}
                className="group/navitem relative overflow-hidden rounded-full px-5 py-3 text-[16px] font-medium"
              >
                <RollingPill
                  transparent={transparentHeader}
                  active={
                    transparentHeader
                      ? false
                      : hoveredNavKey !== null
                        ? hoveredNavKey === "shop"
                        : pathname === "/"
                  }
                >
                  Дэлгүүр
                </RollingPill>
              </Link>

              {/* CATEGORY */}
              <button
                type="button"
                onMouseEnter={() => {
                  setHoveredNavKey("category");

                  openCollections();
                }}
                onFocus={() => {
                  setHoveredNavKey("category");

                  openCollections();
                }}
                onClick={() => {
                  if (collectionsOpen) {
                    closeCollections();
                  } else {
                    openCollections();
                  }
                }}
                aria-expanded={collectionsOpen}
                className="group/navitem relative overflow-hidden rounded-full px-5 py-3 text-[16px] font-medium"
              >
                <RollingPill
                  transparent={transparentHeader}
                  active={
                    transparentHeader
                      ? false
                      : hoveredNavKey !== null
                        ? hoveredNavKey === "category"
                        : collectionsOpen || collectionsActive
                  }
                >
                  Ангилал
                  <ChevronDownIcon open={collectionsOpen} />
                </RollingPill>
              </button>

              {/* OTHER LINKS */}
              {navigation.map((item) => {
                const routeActive =
                  pathname === item.href ||
                  pathname.startsWith(`${item.href}/`);

                const visualActive =
                  hoveredNavKey !== null
                    ? hoveredNavKey === item.href
                    : routeActive;

                return (
                  <Link
                    key={item.href}
                    href={item.href}
                    onMouseEnter={() => {
                      closeCollections();

                      setHoveredNavKey(item.href);
                    }}
                    onClick={closeAll}
                    className="group/navitem relative overflow-hidden rounded-full px-5 py-3 text-[16px] font-medium"
                  >
                    <RollingPill
                      transparent={transparentHeader}
                      active={transparentHeader ? false : visualActive}
                    >
                      {item.label}
                    </RollingPill>
                  </Link>
                );
              })}
            </nav>

            {/* RIGHT ICONS */}
            <div className="relative flex items-center gap-1 sm:gap-2">
              {/* SEARCH */}
              <button
                type="button"
                aria-label="Search"
                aria-expanded={searchOpen}
                onClick={openSearchPanel}
                className={`flex h-11 w-11 items-center justify-center rounded-full transition-all duration-300 ${
                  transparentHeader
                    ? "text-white hover:bg-white/15"
                    : searchOpen
                      ? "bg-neutral-950 text-white"
                      : "text-neutral-950 hover:bg-neutral-100"
                }`}
              >
                <SearchIcon />
              </button>

              {/* ACCOUNT */}
              <button
                type="button"
                aria-label="Account"
                aria-expanded={accountOpen}
                onClick={toggleAccount}
                className={`hidden h-11 w-11 items-center justify-center rounded-full transition-all duration-300 sm:flex ${
                  transparentHeader
                    ? "text-white hover:bg-white/15"
                    : accountOpen
                      ? "bg-neutral-950 text-white"
                      : "text-neutral-950 hover:bg-neutral-100"
                }`}
              >
                <UserIcon />
              </button>

              {/* CART */}
              <button
                type="button"
                aria-label={`Cart, ${itemCount} items`}
                aria-expanded={isCartOpen}
                onClick={handleOpenCart}
                className={`relative flex h-11 w-11 items-center justify-center rounded-full transition-all duration-300 ${
                  transparentHeader
                    ? "text-white hover:bg-white/15"
                    : isCartOpen
                      ? "bg-neutral-950 text-white"
                      : "text-neutral-950 hover:bg-neutral-100"
                }`}
              >
                <CartIcon />

                {itemCount > 0 && (
                  <span
                    className={`absolute right-0 top-0 flex h-5 min-w-5 items-center justify-center rounded-full px-1 text-[10px] font-bold ${
                      transparentHeader
                        ? "bg-white text-neutral-950"
                        : isCartOpen
                          ? "bg-white text-neutral-950"
                          : "bg-neutral-950 text-white"
                    }`}
                  >
                    {itemCount > 99 ? "99+" : itemCount}
                  </span>
                )}
              </button>

              {/* MOBILE MENU */}
              <button
                type="button"
                aria-label="Mobile menu"
                aria-expanded={mobileMenuOpen}
                onClick={toggleMobileMenu}
                className={`flex h-11 w-11 items-center justify-center rounded-full transition-all duration-300 xl:hidden ${
                  transparentHeader
                    ? "text-white hover:bg-white/15"
                    : mobileMenuOpen
                      ? "bg-neutral-950 text-white"
                      : "text-neutral-950 hover:bg-neutral-100"
                }`}
              >
                {mobileMenuOpen ? <CloseIcon /> : <MenuIcon />}
              </button>

              {/* ACCOUNT POPUP */}
              <div
                className={`absolute right-11 top-[58px] z-[130] w-[340px] origin-top-right rounded-[22px] border border-neutral-200 bg-white p-4 text-neutral-950 shadow-[0_24px_70px_rgba(0,0,0,0.16)] transition-all duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] sm:right-12 ${
                  accountOpen
                    ? "pointer-events-auto translate-y-0 scale-100 opacity-100"
                    : "pointer-events-none -translate-y-3 scale-[0.96] opacity-0"
                }`}
              >
                <div className="flex items-start justify-between gap-4">
                  <div>
                    <h2 className="text-[16px] font-bold tracking-[-0.02em]">
                      Sign in or create account
                    </h2>

                    <p className="mt-1 text-xs text-neutral-500">
                      Access your orders and profile.
                    </p>
                  </div>

                  <button
                    type="button"
                    onClick={() => setAccountOpen(false)}
                    aria-label="Close account menu"
                    className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full hover:bg-neutral-100"
                  >
                    <CloseIcon />
                  </button>
                </div>

                <div className="mt-4 grid grid-cols-2 gap-2">
                  <button
                    type="button"
                    className="flex h-11 items-center justify-center gap-2 rounded-full border border-neutral-200 bg-white text-sm font-medium transition hover:bg-neutral-50"
                  >
                    <GoogleIcon />
                    Google
                  </button>

                  <button
                    type="button"
                    className="flex h-11 items-center justify-center gap-2 rounded-full border border-neutral-200 bg-white text-sm font-medium transition hover:bg-neutral-50"
                  >
                    <FacebookIcon />
                    Facebook
                  </button>
                </div>

                <div className="my-4 flex items-center gap-3">
                  <span className="h-px flex-1 bg-neutral-200" />

                  <span className="text-[11px] uppercase text-neutral-400">
                    or
                  </span>

                  <span className="h-px flex-1 bg-neutral-200" />
                </div>

                <form className="space-y-3">
                  <div className="relative">
                    <input
                      type="email"
                      required
                      placeholder="Email"
                      className="h-12 w-full rounded-xl border border-neutral-200 bg-white px-4 pr-12 text-sm outline-none transition placeholder:text-neutral-400 focus:border-neutral-950"
                    />

                    <button
                      type="submit"
                      aria-label="Continue with email"
                      className="absolute right-1.5 top-1.5 flex h-9 w-9 items-center justify-center rounded-lg bg-neutral-950 text-white transition hover:bg-neutral-700"
                    >
                      <ArrowRightIcon />
                    </button>
                  </div>

                  <label className="flex cursor-pointer items-center gap-2 text-xs text-neutral-600">
                    <input
                      type="checkbox"
                      className="h-4 w-4 rounded accent-neutral-950"
                    />
                    Email me with news and offers
                  </label>
                </form>

                <div className="mt-4 grid grid-cols-2 gap-2 border-t border-neutral-100 pt-4">
                  <Link
                    href="/account/orders"
                    onClick={() => setAccountOpen(false)}
                    className="flex h-10 items-center justify-center rounded-full bg-neutral-100 text-sm font-medium transition hover:bg-neutral-200"
                  >
                    Orders
                  </Link>

                  <Link
                    href="/account"
                    onClick={() => setAccountOpen(false)}
                    className="flex h-10 items-center justify-center rounded-full bg-neutral-100 text-sm font-medium transition hover:bg-neutral-200"
                  >
                    Profile
                  </Link>
                </div>
              </div>
            </div>
          </div>

          {/* COLLECTION MEGA MENU */}
          <div
            onMouseEnter={() => {
              setHoveredNavKey("category");

              openCollections();
            }}
            onMouseLeave={() => {
              setHoveredNavKey(null);

              scheduleCloseCollections();
            }}
            className={`absolute left-0 right-0 top-full hidden overflow-hidden xl:block ${
              collectionsOpen ? "pointer-events-auto" : "pointer-events-none"
            }`}
          >
            <div
              className={`origin-top overflow-hidden rounded-b-[28px] bg-white text-neutral-950 shadow-[0_28px_60px_rgba(0,0,0,0.10)] transition-all duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] ${
                collectionsOpen
                  ? "translate-y-0 opacity-100"
                  : "-translate-y-4 opacity-0"
              }`}
              style={{
                clipPath: collectionsOpen
                  ? "inset(0 0 0 0 round 0 0 28px 28px)"
                  : "inset(0 0 100% 0 round 0 0 28px 28px)",
              }}
            >
              <div className="px-9 pb-14 pt-8">
                <div className="mx-auto grid max-w-[1600px] grid-cols-5 gap-4">
                  {collections.map((collection, index) => (
                    <Link
                      key={collection.title}
                      href={collection.href}
                      onClick={closeAll}
                      className={`group overflow-hidden rounded-[18px] bg-[#f7f7f7] transition-all duration-700 ease-[cubic-bezier(0.22,1,0.36,1)] ${
                        collectionsOpen
                          ? "translate-x-0 opacity-100"
                          : "-translate-x-10 opacity-0"
                      }`}
                      style={{
                        transitionDelay: collectionsOpen
                          ? `${100 + index * 80}ms`
                          : "0ms",
                      }}
                    >
                      <div className="overflow-hidden">
                        <div
                          className="aspect-[1.08/1] bg-cover bg-center transition-transform duration-700 group-hover:scale-105"
                          style={{
                            backgroundImage: `url("${collection.image}")`,
                          }}
                        />
                      </div>

                      <div className="px-6 pb-7 pt-5">
                        <h3 className="text-[23px] font-bold tracking-[-0.04em]">
                          {collection.title}
                        </h3>

                        <p className="mt-1 text-sm leading-5 text-neutral-700">
                          {collection.description}
                        </p>
                      </div>
                    </Link>
                  ))}

                  <Link
                    href="/category"
                    onClick={closeAll}
                    className={`group relative min-h-[305px] overflow-hidden rounded-[18px] bg-neutral-900 transition-all duration-700 ${
                      collectionsOpen
                        ? "translate-x-0 opacity-100"
                        : "-translate-x-10 opacity-0"
                    }`}
                    style={{
                      transitionDelay: collectionsOpen ? "420ms" : "0ms",
                    }}
                  >
                    <div
                      className="absolute inset-0 bg-cover bg-center transition-transform duration-700 group-hover:scale-105"
                      style={{
                        backgroundImage:
                          'url("https://images.unsplash.com/photo-1590658268037-6bf12165a8df?auto=format&fit=crop&w=900&q=90")',
                      }}
                    />

                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/15 to-transparent" />

                    <div className="absolute inset-x-0 bottom-0 p-6 text-white">
                      <h3 className="text-[23px] font-bold tracking-[-0.04em]">
                        Бүх ангилал
                      </h3>

                      <p className="mt-1 text-sm text-white/85">
                        Манай бүтээгдэхүүний ангиллуудтай танилцаарай.
                      </p>
                    </div>
                  </Link>
                </div>
              </div>
            </div>
          </div>

          {/* SEARCH PANEL */}
          <div
            className={`absolute left-0 right-0 top-full z-[120] overflow-hidden rounded-b-[28px] bg-white text-neutral-950 shadow-[0_28px_70px_rgba(0,0,0,0.12)] transition-all duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] ${
              searchOpen
                ? "pointer-events-auto max-h-[420px] translate-y-0 opacity-100"
                : "pointer-events-none max-h-0 -translate-y-4 opacity-0"
            }`}
          >
            <div className="mx-auto max-w-[1200px] px-6 pb-10 pt-7">
              <div className="flex items-center justify-between gap-5">
                <h2 className="text-2xl font-bold tracking-[-0.04em]">
                  Search our store
                </h2>

                <button
                  type="button"
                  onClick={() => setSearchOpen(false)}
                  aria-label="Close search"
                  className="flex h-11 w-11 items-center justify-center rounded-full border border-neutral-200 transition hover:bg-neutral-100"
                >
                  <CloseIcon />
                </button>
              </div>

              <form onSubmit={handleSearch} className="relative mt-6">
                <SearchIcon className="absolute left-5 top-1/2 h-6 w-6 -translate-y-1/2 text-neutral-500" />

                <input
                  value={search}
                  onChange={(event) => setSearch(event.target.value)}
                  placeholder="Бүтээгдэхүүн хайх..."
                  className="h-[72px] w-full rounded-full border border-neutral-300 bg-neutral-50 pl-14 pr-36 text-lg outline-none transition focus:border-neutral-950 focus:bg-white"
                />

                <button
                  type="submit"
                  className="absolute right-2 top-2 h-14 rounded-full bg-neutral-950 px-8 font-semibold text-white transition hover:bg-neutral-700"
                >
                  Хайх
                </button>
              </form>

              <div className="mt-5 flex flex-wrap items-center gap-2 text-sm">
                <span className="mr-2 text-neutral-500">Түгээмэл:</span>

                {["Дэвтэр", "Үзэг", "Усан будаг", "Ширээний хэрэгсэл"].map(
                  (item) => (
                    <button
                      key={item}
                      type="button"
                      onClick={() => setSearch(item)}
                      className="rounded-full bg-neutral-100 px-4 py-2 transition hover:bg-neutral-200"
                    >
                      {item}
                    </button>
                  ),
                )}
              </div>
            </div>
          </div>

          {/* MOBILE MENU */}
          <div
            className={`absolute left-0 right-0 top-full z-[120] overflow-y-auto bg-white text-neutral-950 shadow-xl transition-all duration-500 xl:hidden ${
              mobileMenuOpen
                ? "pointer-events-auto max-h-[calc(100vh-90px)] opacity-100"
                : "pointer-events-none max-h-0 opacity-0"
            }`}
          >
            <nav className="px-6 py-5">
              <Link
                href="/"
                onClick={closeAll}
                className="block border-b border-neutral-100 py-4 text-lg font-medium"
              >
                Дэлгүүр
              </Link>

              <button
                type="button"
                onClick={() => setMobileCollectionsOpen((current) => !current)}
                className="flex w-full items-center justify-between border-b border-neutral-100 py-4 text-lg font-medium"
              >
                Ангилал
                <ChevronDownIcon open={mobileCollectionsOpen} />
              </button>

              <div
                className={`overflow-hidden transition-all duration-500 ${
                  mobileCollectionsOpen
                    ? "max-h-[1000px] opacity-100"
                    : "max-h-0 opacity-0"
                }`}
              >
                <div className="grid grid-cols-2 gap-3 border-b border-neutral-100 py-4">
                  {collections.map((collection) => (
                    <Link
                      key={collection.title}
                      href={collection.href}
                      onClick={closeAll}
                      className="overflow-hidden rounded-xl bg-neutral-100"
                    >
                      <div
                        className="aspect-square bg-cover bg-center"
                        style={{
                          backgroundImage: `url("${collection.image}")`,
                        }}
                      />

                      <p className="p-3 text-sm font-semibold">
                        {collection.title}
                      </p>
                    </Link>
                  ))}
                </div>
              </div>

              {navigation.map((item) => {
                const active =
                  pathname === item.href ||
                  pathname.startsWith(`${item.href}/`);

                return (
                  <Link
                    key={item.href}
                    href={item.href}
                    onClick={closeAll}
                    className={`block border-b border-neutral-100 py-4 text-lg font-medium ${
                      active ? "text-neutral-950" : "text-neutral-600"
                    }`}
                  >
                    {item.label}
                  </Link>
                );
              })}

              <button
                type="button"
                onClick={() => {
                  setMobileMenuOpen(false);

                  setAccountOpen(true);
                }}
                className="flex w-full items-center gap-3 py-5 text-lg font-medium sm:hidden"
              >
                <UserIcon />
                Account
              </button>
            </nav>
          </div>
        </div>
      </header>

      {/* OVERLAY */}
      <button
        type="button"
        aria-label="Close overlay"
        onClick={closeAll}
        className={`fixed inset-0 z-[90] bg-black/35 backdrop-blur-[1px] transition-opacity duration-500 ${
          overlayOpen
            ? "pointer-events-auto opacity-100"
            : "pointer-events-none opacity-0"
        }`}
      />
    </>
  );
}
