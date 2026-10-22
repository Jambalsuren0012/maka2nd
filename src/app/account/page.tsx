import type { Metadata } from "next";

import AccountPage from "@/components/account/account-page";

export const metadata: Metadata = {
  title: "Миний бүртгэл",
  description: "Maka дэлгүүрийн хэрэглэгчийн бүртгэлд нэвтрэх эсвэл бүртгүүлэх.",
};

export default function AccountRoute() {
  return <AccountPage />;
}
