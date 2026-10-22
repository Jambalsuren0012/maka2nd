import type { Metadata } from "next";
import { Comfortaa } from "next/font/google";

import CartDrawer from "@/components/cart/cart-drawer";
import Footer from "@/components/layout/footer";
import Header from "@/components/layout/header";
import { CartProvider } from "@/context/cart-context";

import "./globals.css";

const comfortaa = Comfortaa({
  subsets: ["latin", "cyrillic"],
  variable: "--font-comfortaa",
  display: "swap",
});

export const metadata: Metadata = {
  title: {
    default: "Maka бичиг хэрэг",
    template: "%s | Maka",
  },
  description:
    "Өдөр тутмын бичиг хэрэг, тэмдэглэлийн дэвтэр, урлалын хэрэгсэл.",
  icons: {
    icon: "/maka-icon.svg",
    shortcut: "/maka-icon.svg",
    apple: "/maka-icon.svg",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="mn" className={comfortaa.variable}>
      <body className="bg-neutral-50 font-sans text-neutral-950 antialiased">
        <CartProvider>
          <div className="flex min-h-screen flex-col">
            <Header />

            <div className="flex-1">{children}</div>

            <Footer />
          </div>

          <CartDrawer />
        </CartProvider>
      </body>
    </html>
  );
}
