"use client";

import { FormEvent, useState } from "react";

export default function ProjectCtaForm() {
  const [sent, setSent] = useState(false);

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    // TODO: отправить заявку в CRM.
    setSent(true);
  };

  if (sent) {
    return (
      <p className="text-sm leading-relaxed text-[#6F727A]">
        Заявка отправлена. Перезвоним в течение рабочего дня и пришлём
        предварительный расчёт.
      </p>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-3">
      <label className="sr-only" htmlFor="case-name">
        Имя
      </label>
      <input
        id="case-name"
        name="name"
        type="text"
        required
        placeholder="Имя"
        className="h-12 rounded-xl border border-[rgba(16,17,20,0.10)] px-4 text-sm text-[#101114] outline-none placeholder:text-[#6F727A] focus:border-[#244C3A] focus:ring-2 focus:ring-[#244C3A]/20"
      />
      <label className="sr-only" htmlFor="case-phone">
        Телефон
      </label>
      <input
        id="case-phone"
        name="phone"
        type="tel"
        required
        placeholder="Телефон"
        className="h-12 rounded-xl border border-[rgba(16,17,20,0.10)] px-4 text-sm text-[#101114] outline-none placeholder:text-[#6F727A] focus:border-[#244C3A] focus:ring-2 focus:ring-[#244C3A]/20"
      />
      <label className="sr-only" htmlFor="case-area">
        Площадь
      </label>
      <input
        id="case-area"
        name="area"
        type="text"
        placeholder="Площадь, м²"
        className="h-12 rounded-xl border border-[rgba(16,17,20,0.10)] px-4 text-sm text-[#101114] outline-none placeholder:text-[#6F727A] focus:border-[#244C3A] focus:ring-2 focus:ring-[#244C3A]/20"
      />
      <button
        type="submit"
        className="mt-2 rounded-xl bg-[#C96F4A] px-6 py-3 text-sm font-semibold text-white transition-all hover:bg-[#AE5938]"
      >
        Отправить заявку
      </button>
    </form>
  );
}
