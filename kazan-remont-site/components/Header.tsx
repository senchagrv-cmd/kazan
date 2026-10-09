"use client";

import Link from "next/link";
import { useEffect, useRef, useState } from "react";

const NAV_ITEMS = [
  { label: "Проекты", href: "/#projects" },
  { label: "Как работаем", href: "/#process" },
  { label: "Стоимость", href: "/#calculator" },
  { label: "FAQ", href: "/#faq" },
];

export default function Header() {
  const [isVisible, setIsVisible] = useState(true);
  const [scrollProgress, setScrollProgress] = useState(0);
  const [isCompact, setIsCompact] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const lastScrollY = useRef(0);
  const menuOpenRef = useRef(false);
  menuOpenRef.current = isMenuOpen;

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      const documentHeight = Math.max(
        document.documentElement.scrollHeight - window.innerHeight,
        1,
      );
      const progress = Math.min((currentScrollY / documentHeight) * 100, 100);

      setScrollProgress(progress);
      setIsScrolled(currentScrollY > 100);
      setIsCompact(currentScrollY > 200);

      if (!menuOpenRef.current) {
        if (currentScrollY > lastScrollY.current && currentScrollY > 100) {
          setIsVisible(false);
        } else {
          setIsVisible(true);
        }
      }

      lastScrollY.current = currentScrollY;
    };

    handleScroll();
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = isMenuOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [isMenuOpen]);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setIsMenuOpen(false);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  const closeMenu = () => setIsMenuOpen(false);

  return (
    <>
      <div className="pointer-events-none fixed top-0 left-0 z-[70] h-1 w-full bg-transparent">
        <div
          className="h-full bg-[#244C3A] transition-[width] duration-300 ease-in-out"
          style={{ width: `${scrollProgress}%` }}
        />
      </div>

      <header
        className={`fixed top-0 right-0 left-0 z-[60] transition-all duration-300 ease-in-out ${
          isVisible || isMenuOpen ? "translate-y-0" : "-translate-y-full"
        } ${isCompact ? "py-2" : "py-4"} ${
          isScrolled
            ? "bg-white/95 shadow-lg backdrop-blur-md"
            : "bg-white/80 backdrop-blur-sm"
        }`}
      >
        <div className="mx-auto max-w-[1280px] px-6">
          <div className="flex items-center justify-between">
            <Link
              href="/"
              aria-label="КАЗАНЬ.РЕМОНТ — на главную"
              className={`font-bold tracking-tight transition-all duration-300 text-lg ${
                isCompact ? "md:text-xl" : "md:text-2xl"
              }`}
            >
              <span className="text-[#101114]">КАЗАНЬ</span>
              <span className="text-[#244C3A]">.РЕМОНТ</span>
            </Link>

            <nav aria-label="Основное меню" className="hidden md:block">
              <ul className="flex items-center gap-8">
                {NAV_ITEMS.map((item) => (
                  <li key={item.href}>
                    <Link
                      href={item.href}
                      className="text-sm text-[#101114] transition hover:text-[#244C3A]"
                    >
                      {item.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </nav>

            <div className="flex items-center gap-3 sm:gap-6">
              <a
                href="tel:+79999999999"
                className="hidden text-sm font-medium text-[#101114] transition hover:text-[#244C3A] lg:block"
              >
                +7 (999) 999-99-99
              </a>
              <Link
                href="/#calculator"
                className="hidden rounded-full bg-[#101114] px-4 py-2.5 text-sm font-medium whitespace-nowrap text-white shadow-md transition hover:bg-[#17181C] hover:shadow-lg md:inline-flex sm:px-5"
              >
                Рассчитать стоимость
              </Link>
              <button
                type="button"
                aria-label="Открыть меню"
                aria-expanded={isMenuOpen}
                aria-controls="mobile-menu"
                onClick={() => setIsMenuOpen(true)}
                className="flex h-8 w-8 items-center justify-center rounded-lg border border-[rgba(16,17,20,0.10)] p-1.5 text-[#101114] md:hidden"
              >
                <svg
                  width="20"
                  height="20"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  aria-hidden="true"
                >
                  <path d="M4 7h16M4 12h16M4 17h16" />
                </svg>
              </button>
            </div>
          </div>
        </div>
      </header>

      <div
        id="mobile-menu"
        className={`fixed inset-0 z-[80] bg-white/95 backdrop-blur-md transition-transform duration-300 ease-in-out md:hidden ${
          isMenuOpen ? "translate-x-0" : "translate-x-full"
        } ${isMenuOpen ? "pointer-events-auto" : "pointer-events-none"}`}
        aria-hidden={!isMenuOpen}
      >
        <button
          type="button"
          aria-label="Закрыть меню"
          onClick={closeMenu}
          className="absolute top-4 right-6 flex h-8 w-8 items-center justify-center rounded-lg border border-[rgba(16,17,20,0.10)] p-1.5 text-[#101114]"
        >
          <svg
            width="20"
            height="20"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.5"
            strokeLinecap="round"
            aria-hidden="true"
          >
            <path d="M6 6l12 12M18 6L6 18" />
          </svg>
        </button>

        <nav
          className="flex h-full flex-col px-6 pt-20"
          aria-label="Мобильное меню"
        >
          {NAV_ITEMS.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              onClick={closeMenu}
              className="border-b border-[rgba(16,17,20,0.08)] py-4 text-2xl font-medium text-[#101114]"
            >
              {item.label}
            </Link>
          ))}
          <a
            href="tel:+79999999999"
            className="py-4 text-lg font-medium text-[#101114]"
          >
            +7 (999) 999-99-99
          </a>
          <Link
            href="/#calculator"
            onClick={closeMenu}
            className="mt-6 rounded-xl bg-[#C96F4A] py-4 text-center text-lg font-medium text-white"
          >
            Рассчитать стоимость
          </Link>
        </nav>
      </div>

      <div className={isCompact ? "h-16" : "h-20"} aria-hidden="true" />
    </>
  );
}
