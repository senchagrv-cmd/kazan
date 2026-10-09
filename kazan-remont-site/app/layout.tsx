import Header from "@/components/Header";
import ScrollToTop from "@/components/ScrollToTop";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin", "cyrillic"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "Ремонт квартир в Казани под ключ — фиксированная цена и сроки",
  description:
    "Ремонт квартир в Казани от 12 900 ₽/м² и от 45 дней. Фиксируем стоимость до начала работ, показываем прогресс по этапам, гарантия 3 года.",
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="ru" className={`${inter.variable} h-full antialiased`}>
      <body className="flex min-h-full flex-col">
        <ScrollToTop />
        <Header />
        {children}
      </body>
    </html>
  );
}
