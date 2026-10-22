import type { Metadata } from "next";

import ContactPage from "@/components/contact/contact-page";

export const metadata: Metadata = {
  title: "Холбоо барих",
  description:
    "Maka дэлгүүртэй холбогдох мэдээлэл болон санал хүсэлт илгээх хэсэг.",
};

export default function Contact() {
  return <ContactPage />;
}
