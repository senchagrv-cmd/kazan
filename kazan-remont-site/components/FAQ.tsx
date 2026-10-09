"use client";

import ConsultationModal from "@/components/ConsultationModal";
import FadeIn from "@/components/FadeIn";
import { useState } from "react";

const faqs = [
  {
    q: "Можно ли зафиксировать стоимость ремонта до начала работ?",
    a: "Да. После замера и согласования объёма работ мы готовим подробную смету и фиксируем стоимость в договоре. Любые непредвиденные расходы мы берём на себя.",
  },
  {
    q: "Как происходит оплата?",
    a: "Мы работаем поэтапно. Оплата разбита на 4–5 этапов (черновые работы, чистовые работы и т. д.). Вы платите только за фактически выполненный и принятый вами объём работ. Никаких 100% предоплат.",
  },
  {
    q: "Вы работаете с дизайн-проектом?",
    a: "Да, мы работаем как с готовым дизайн-проектом, так и создаём свой. В него входит 3D-визуализация, рабочие чертежи и подбор материалов. Вы видите результат до начала работ.",
  },
  {
    q: "Кто контролирует качество работ?",
    a: "На каждом объекте работает прораб + независимый технадзор. Вы получаете фотоотчёт в мессенджере каждые 3 дня. Не нужно ездить на объект и контролировать рабочих.",
  },
  {
    q: "Можно ли поручить вам закупку материалов?",
    a: "Да, мы закупаем все материалы со своей скидкой (до 20%) у проверенных поставщиков. Если вы хотите использовать свои позиции — мы просто заложим их монтаж в смету.",
  },
  {
    q: "Сколько длится ремонт квартиры?",
    a: "Средний срок капитального ремонта — 3–5 месяцев в зависимости от площади и сложности. Точные сроки фиксируем в договоре с графиком этапов.",
  },
  {
    q: "Есть ли гарантия?",
    a: "Мы даём официальную гарантию 3 года на все виды работ по договору. Если в этот период что-то пойдёт не так по нашей вине — исправим бесплатно и в кратчайшие сроки.",
  },
];

function IconMinus() {
  return (
    <svg
      width="16"
      height="16"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      aria-hidden="true"
      className="h-4 w-4"
    >
      <path d="M5 12h14" />
    </svg>
  );
}

function IconPlus() {
  return (
    <svg
      width="16"
      height="16"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      aria-hidden="true"
      className="h-4 w-4"
    >
      <path d="M12 5v14M5 12h14" />
    </svg>
  );
}

export default function FAQ() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <>
    <section
      id="faq"
      aria-labelledby="faq-title"
      className="scroll-mt-16 bg-white py-32"
    >
      <div className="mx-auto max-w-[900px] px-6">
        <FadeIn>
          <div className="mb-12">
            <p className="mb-4 text-xs uppercase tracking-widest text-[#6F727A]">
              FAQ
            </p>
            <h2
              id="faq-title"
              className="mb-4 text-balance text-4xl font-medium tracking-tight text-[#101114] md:text-5xl"
            >
              Частые вопросы перед началом ремонта
            </h2>
            <p className="text-lg text-[#6F727A]">
              Собрали ответы на&nbsp;вопросы, которые обычно возникают до первой
              консультации.
            </p>
          </div>
        </FadeIn>

        <ul className="mb-12 flex flex-col gap-3">
          {faqs.map((item, index) => {
            const isOpen = openIndex === index;
            return (
              <li key={item.q}>
                <FadeIn delay={index * 60}>
                <div className="hover-lift rounded-2xl border border-[rgba(16,17,20,0.08)] bg-[#F7F7F5] p-5 md:p-6">
                <button
                  type="button"
                  aria-expanded={isOpen}
                  onClick={() => setOpenIndex(isOpen ? null : index)}
                  className="flex w-full cursor-pointer items-center justify-between gap-4 text-left"
                >
                  <span className="text-base font-medium text-[#101114] md:text-lg">
                    {item.q}
                  </span>
                  <span
                    className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-full ${
                      isOpen
                        ? "bg-[#101114] text-white"
                        : "border border-[rgba(16,17,20,0.10)] bg-white text-[#6F727A]"
                    }`}
                  >
                    {isOpen ? <IconMinus /> : <IconPlus />}
                  </span>
                </button>
                {isOpen && (
                  <div className="mt-4 animate-fade-in border-t border-[rgba(16,17,20,0.08)] pt-4 motion-reduce:animate-none">
                    <p className="text-base leading-relaxed text-[#6F727A]">
                      {item.a}
                    </p>
                  </div>
                )}
                </div>
                </FadeIn>
              </li>
            );
          })}
        </ul>

        <div className="flex flex-col items-start justify-between gap-6 rounded-2xl bg-[#17181C] p-8 md:flex-row md:items-center md:p-10">
          <div>
            <h3 className="mb-2 text-2xl font-semibold text-white">
              Не нашли ответ на&nbsp;свой вопрос?
            </h3>
            <p className="text-base text-gray-400">
              Оставьте заявку — подскажем по&nbsp;срокам, бюджету и&nbsp;формату ремонта.
            </p>
          </div>
          <button
            type="button"
            onClick={() => setIsModalOpen(true)}
            className="inline-flex w-full shrink-0 items-center justify-center rounded-xl bg-[#C96F4A] px-6 py-3 font-medium whitespace-nowrap text-white transition hover:bg-[#AE5938] md:w-auto"
          >
            Получить консультацию →
          </button>
        </div>
      </div>
    </section>
    <ConsultationModal
      isOpen={isModalOpen}
      onClose={() => setIsModalOpen(false)}
    />
    </>
  );
}
