import type { Metadata } from "next";
import { Manrope } from "next/font/google";

import CartDrawer from "@/components/cart/cart-drawer";
import Footer from "@/components/layout/footer";
import Header from "@/components/layout/header";
import { CartProvider } from "@/context/cart-context";

import "./globals.css";

const manrope = Manrope({
  subsets: ["latin", "cyrillic"],
  variable: "--font-manrope",
  display: "swap",
});

export const metadata: Metadata = {
  title: {
    default: "Sodtech",
    template: "%s | Sodtech",
  },
  description: "Sodtech",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={manrope.variable}>
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
