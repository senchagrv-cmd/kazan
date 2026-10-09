"use client";

import { FormEvent, useEffect, useId, useState } from "react";

interface ConsultationModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const INPUT_CLASS =
  "w-full rounded-xl border border-[rgba(16,17,20,0.10)] px-4 py-3 text-[#101114] outline-none transition placeholder:text-[#6F727A] focus:border-[#244C3A] focus:ring-2 focus:ring-[#244C3A]/20";

export default function ConsultationModal({
  isOpen,
  onClose,
}: ConsultationModalProps) {
  const titleId = useId();
  const [sent, setSent] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    area: "",
  });

  useEffect(() => {
    if (!isOpen) return;

    const handleEsc = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };

    window.addEventListener("keydown", handleEsc);
    document.body.style.overflow = "hidden";

    return () => {
      window.removeEventListener("keydown", handleEsc);
      document.body.style.overflow = "";
    };
  }, [isOpen, onClose]);

  useEffect(() => {
    if (isOpen) setSent(false);
  }, [isOpen]);

  if (!isOpen) return null;

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setSent(true);
    setFormData({ name: "", phone: "", area: "" });
  };

  return (
    <div className="fixed inset-0 z-[80] flex items-center justify-center p-4">
      <div
        className="absolute inset-0 bg-black/60 backdrop-blur-sm"
        onClick={onClose}
        aria-hidden="true"
      />

      <div
        role="dialog"
        aria-modal="true"
        aria-labelledby={titleId}
        className="relative w-full max-w-md overflow-hidden rounded-3xl bg-white shadow-2xl animate-modal-in motion-reduce:animate-none"
      >
        <button
          type="button"
          onClick={onClose}
          aria-label="Закрыть"
          className="absolute top-4 right-4 flex h-8 w-8 items-center justify-center rounded-full bg-[#F7F7F5] text-[#101114] transition-colors hover:bg-[#101114] hover:text-white"
        >
          <svg
            width="16"
            height="16"
            viewBox="0 0 16 16"
            fill="none"
            aria-hidden="true"
          >
            <path
              d="M14.5 1.5 1.5 14.5M1.5 1.5l13 13"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
            />
          </svg>
        </button>

        <div className="p-8">
          <div className="mb-6 flex items-center gap-3">
            <div className="flex h-12 w-12 items-center justify-center rounded-full bg-[#F7F7F5] text-[#6F727A]">
              <svg
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.5"
                aria-hidden="true"
              >
                <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
                <circle cx="12" cy="7" r="4" />
              </svg>
            </div>
            <div>
              <p className="text-base font-semibold text-[#101114]">Менеджер</p>
              <p className="text-xs text-[#6F727A]">
                Обычно отвечает в&nbsp;течение 10&nbsp;минут
              </p>
            </div>
          </div>

          <h3
            id={titleId}
            className="mb-6 text-2xl font-semibold text-[#101114]"
          >
            Получить консультацию
          </h3>

          {sent ? (
            <p className="text-base leading-relaxed text-[#6F727A]">
              Заявка отправлена! Мы перезвоним вам в&nbsp;течение 10&nbsp;минут.
            </p>
          ) : (
            <form onSubmit={handleSubmit} className="flex flex-col gap-4">
              <label htmlFor="consult-name" className="sr-only">
                Ваше имя
              </label>
              <input
                id="consult-name"
                type="text"
                name="name"
                autoComplete="name"
                placeholder="Ваше имя"
                value={formData.name}
                onChange={(e) =>
                  setFormData({ ...formData, name: e.target.value })
                }
                className={INPUT_CLASS}
                required
              />

              <label htmlFor="consult-phone" className="sr-only">
                Телефон
              </label>
              <input
                id="consult-phone"
                type="tel"
                name="phone"
                autoComplete="tel"
                placeholder="+7 (999) 999-99-99"
                value={formData.phone}
                onChange={(e) =>
                  setFormData({ ...formData, phone: e.target.value })
                }
                className={INPUT_CLASS}
                required
              />

              <label htmlFor="consult-area" className="sr-only">
                Площадь квартиры
              </label>
              <input
                id="consult-area"
                type="text"
                name="area"
                inputMode="numeric"
                placeholder="Площадь квартиры, м²"
                value={formData.area}
                onChange={(e) =>
                  setFormData({ ...formData, area: e.target.value })
                }
                className={INPUT_CLASS}
              />

              <button
                type="submit"
                className="mt-2 w-full rounded-xl bg-[#C96F4A] py-3.5 font-medium text-white transition hover:bg-[#AE5938]"
              >
                Отправить заявку
              </button>

              <p className="text-xs leading-relaxed text-[#6F727A]">
                Нажимая кнопку, я даю согласие на&nbsp;обработку персональных данных
                и&nbsp;получение информации об услугах, включая звонки и&nbsp;сообщения,
                на&nbsp;условиях Политики конфиденциальности.
              </p>
            </form>
          )}
        </div>
      </div>
    </div>
  );
}
