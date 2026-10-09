"use client";

import ConsultationModal from "@/components/ConsultationModal";
import { FormEvent, useState } from "react";

const INPUT_CLASS =
  "w-full rounded-xl border border-[rgba(16,17,20,0.10)] px-4 py-3 text-[#101114] outline-none placeholder:text-[#6F727A] focus:border-[#244C3A] focus:ring-2 focus:ring-[#244C3A]/20";

const BENEFITS = [
  "Ответим в течение 15 минут",
  "Предварительный расчёт бесплатно",
  "Работаем по договору",
  "Гарантия 3 года",
];

const LEGAL_LINKS = [
  { label: "Оплата", href: "/#calculator" },
  { label: "Контакты", href: "/#contacts" },
  { label: "Политика конфиденциальности", href: "/#contacts" },
  { label: "Согласие на обработку данных", href: "/#contacts" },
];

function CheckIcon() {
  return (
    <svg
      className="h-5 w-5 flex-shrink-0 text-[#244C3A]"
      viewBox="0 0 20 20"
      fill="none"
      aria-hidden="true"
    >
      <path
        d="M4.5 10.5 8 14l7.5-8"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function UserIcon() {
  return (
    <svg
      className="h-6 w-6 text-[#6F727A]"
      viewBox="0 0 24 24"
      fill="none"
      aria-hidden="true"
    >
      <circle cx="12" cy="8" r="3.25" stroke="currentColor" strokeWidth="1.5" />
      <path
        d="M5.5 18.25c1.4-2.6 3.7-4 6.5-4s5.1 1.4 6.5 4"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
      />
    </svg>
  );
}

export default function Footer() {
  const [sent, setSent] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setSent(true);
  };

  return (
    <>
    <footer id="contacts" className="scroll-mt-16 bg-[#17181C] py-20">
      <div className="mx-auto max-w-[1280px] px-6">
        <div className="mb-16 grid grid-cols-1 gap-12 lg:grid-cols-2">
          <div>
            <p className="mb-6 text-xs uppercase tracking-widest text-[#244C3A]">
              Контакты
            </p>
            <button
              type="button"
              onClick={() => setIsModalOpen(true)}
              className="mb-8 flex w-fit rounded-full border border-[rgba(255,255,255,0.20)] px-6 py-2 text-sm text-white transition hover:bg-white/10"
            >
              Бесплатная консультация
            </button>
            <h2 className="mb-6 text-4xl font-semibold text-white md:text-5xl">
              Обсудим ваш ремонт?
            </h2>
            <p className="mb-8 text-base text-gray-400">
              Оставьте контакты — свяжемся, уточним задачу и&nbsp;подскажем
              предварительный бюджет.
            </p>

            <p className="mb-4 text-3xl font-semibold text-white">
              <a href="tel:+70000000000" className="hover:text-white">
                +7 (XXX) XXX-XX-XX
              </a>
            </p>
            <p className="mb-2 text-base text-gray-400">
              <a href="mailto:email@example.com" className="hover:text-gray-300">
                email@example.com
              </a>
            </p>
            <p className="mb-2 text-base text-gray-400">
              Казань, ул.&nbsp;Примерная, д.&nbsp;1, офис&nbsp;100
            </p>
            <p className="mb-8 text-base text-gray-400">
              Пн–Пт: с&nbsp;09:00 до 18:00
            </p>

            <ul className="grid grid-cols-1 gap-4 sm:grid-cols-2">
              {BENEFITS.map((item) => (
                <li
                  key={item}
                  className="flex items-start gap-3 rounded-xl border border-[rgba(255,255,255,0.10)] p-4"
                >
                  <CheckIcon />
                  <span className="text-sm text-gray-300">{item}</span>
                </li>
              ))}
            </ul>
          </div>

          <div
            id="footer-consult"
            className="scroll-mt-24 rounded-3xl bg-white p-8"
          >
            <div className="mb-6 flex items-center gap-4">
              <div className="flex h-12 w-12 items-center justify-center rounded-full bg-[#F7F7F5]">
                <UserIcon />
              </div>
              <div>
                <p className="text-base font-semibold text-[#101114]">
                  Менеджер
                </p>
                <p className="text-xs text-[#6F727A]">
                  Обычно отвечает в&nbsp;течение 10&nbsp;минут
                </p>
              </div>
            </div>

            <h3 className="mb-6 text-2xl font-semibold text-[#101114]">
              Получить консультацию
            </h3>

            {sent ? (
              <p className="text-base leading-relaxed text-[#6F727A]">
                Заявка отправлена. Перезвоним в&nbsp;течение 15&nbsp;минут
                и&nbsp;уточним задачу по&nbsp;ремонту.
              </p>
            ) : (
              <form onSubmit={handleSubmit} className="flex flex-col gap-4">
                <label htmlFor="footer-name" className="sr-only">
                  Ваше имя
                </label>
                <input
                  id="footer-name"
                  name="name"
                  type="text"
                  autoComplete="name"
                  placeholder="Ваше имя"
                  className={INPUT_CLASS}
                />
                <label htmlFor="footer-phone" className="sr-only">
                  Телефон
                </label>
                <input
                  id="footer-phone"
                  name="phone"
                  type="tel"
                  autoComplete="tel"
                  required
                  placeholder="+7 (999) 999-99-99"
                  className={INPUT_CLASS}
                />
                <label htmlFor="footer-area" className="sr-only">
                  Площадь квартиры
                </label>
                <input
                  id="footer-area"
                  name="area"
                  type="text"
                  inputMode="numeric"
                  placeholder="Площадь квартиры, м²"
                  className={INPUT_CLASS}
                />
                <button
                  type="submit"
                  className="w-full rounded-xl bg-[#C96F4A] py-3.5 font-medium text-white transition hover:bg-[#AE5938]"
                >
                  Отправить заявку
                </button>
              </form>
            )}

            <p className="mt-4 text-xs text-[#6F727A]">
              Нажимая кнопку, я даю согласие на&nbsp;обработку персональных данных
              и&nbsp;получение информации об услугах, включая звонки и&nbsp;сообщения,
              на&nbsp;условиях Политики конфиденциальности.
            </p>
          </div>
        </div>

        <div className="border-t border-[rgba(255,255,255,0.10)] pt-8">
          <div className="flex flex-col items-start justify-between gap-4 md:flex-row md:items-center">
            <p className="text-sm text-gray-500">
              © 2024 Ремонт Казань. Все права защищены.
            </p>
            <nav aria-label="Юридическая информация">
              <ul className="flex flex-wrap gap-6">
                {LEGAL_LINKS.map((link) => (
                  <li key={link.label}>
                    <a
                      href={link.href}
                      className="text-sm text-gray-500 transition hover:text-white"
                    >
                      {link.label}
                    </a>
                  </li>
                ))}
              </ul>
            </nav>
          </div>
          <p className="mt-4 text-xs text-gray-600">
            ИП Иванов И.&nbsp;И. · ОГРНИП 1234567890123 · ИНН 1234567890 · Казань,
            ул.&nbsp;Примерная, д.&nbsp;1 · Пн–Пт 9:00–18:00
          </p>
        </div>
      </div>
    </footer>
    <ConsultationModal
      isOpen={isModalOpen}
      onClose={() => setIsModalOpen(false)}
    />
    </>
  );
}
