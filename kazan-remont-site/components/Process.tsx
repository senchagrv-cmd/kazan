"use client";

import FadeIn from "@/components/FadeIn";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";

const steps = [
  {
    num: "01",
    title: "Консультация и замер",
    desc: "Приезжаем бесплатно, обсуждаем задачи, делаем точные замеры лазерным оборудованием. Оцениваем объём работ и предлагаем формат ремонта под ваш бюджет.",
    details: [
      "Бесплатный выезд в день обращения",
      "Точные замеры лазерным оборудованием",
      "Ориентировочная смета на месте",
      "Ответы на все вопросы без навязывания",
    ],
  },
  {
    num: "02",
    title: "Смета и договор",
    desc: "Готовим подробную смету с разбивкой по работам и материалам. Фиксируем стоимость, сроки и этапы в официальном договоре. Никаких скрытых доплат.",
    details: [
      "Детальная смета по 37 пунктам",
      "Официальный договор с печатью",
      "Фиксация цены и сроков",
      "График поэтапной оплаты",
    ],
  },
  {
    num: "03",
    title: "Дизайн-проект",
    desc: "Создаём 3D-визуализацию будущего интерьера. Готовим полный комплект рабочих чертежей. Подбираем материалы с учётом бюджета и стиля.",
    details: [
      "Фотореалистичная 3D-визуализация",
      "Рабочие чертежи для бригады",
      "Подбор материалов и мебели",
      "Согласование каждого решения с вами",
    ],
  },
  {
    num: "04",
    title: "Черновые работы",
    desc: "Выполняем демонтаж, прокладываем электрику и сантехнику по СНиП, делаем штукатурку. Каждый этап принимает технадзор, фотоотчёт каждые 3 дня.",
    details: [
      "Демонтаж и вывоз мусора",
      "Электрика и сантехника по СНиП",
      "Штукатурка и стяжка пола",
      "Фотоотчёт каждые 3 дня",
    ],
  },
  {
    num: "05",
    title: "Чистовая отделка",
    desc: "Укладываем плитку, монтируем полы, красим стены, устанавливаем двери и сантехнику. Контроль качества на каждом этапе.",
    details: [
      "Укладка плитки и керамогранита",
      "Монтаж полов и плинтусов",
      "Покраска и поклейка обоев",
      "Установка дверей и сантехники",
    ],
  },
  {
    num: "06",
    title: "Сдача и гарантия",
    desc: "Принимаете работу по чек-листу из 37 пунктов. Устраняем недочёты за наш счёт. Выдаём гарантийный сертификат на 3 года.",
    details: [
      "Приёмка по чек-листу из 37 пунктов",
      "Устранение недочётов за наш счёт",
      "Акт приёмки и ключи",
      "Гарантийный сертификат на 3 года",
    ],
  },
];

function CheckIcon() {
  return (
    <svg
      width="16"
      height="16"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      className="mt-0.5 h-4 w-4 shrink-0 text-[#244C3A]"
    >
      <path d="M5 12.5l4.5 4.5L19 7.5" />
    </svg>
  );
}

export default function Process() {
  const [activeStep, setActiveStep] = useState<number | null>(0);
  const sectionRef = useRef<HTMLElement>(null);
  const itemRefs = useRef<(HTMLLIElement | null)[]>([]);
  const userPaused = useRef(false);
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const step = steps[activeStep ?? 0];

  const stopAutoplay = () => {
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
      intervalRef.current = null;
    }
  };

  const startAutoplay = () => {
    if (userPaused.current || intervalRef.current) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    if (window.matchMedia("(max-width: 767px)").matches) return;

    intervalRef.current = setInterval(() => {
      setActiveStep((prev) => ((prev ?? 0) + 1) % steps.length);
    }, 2000);
  };

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          startAutoplay();
        } else {
          stopAutoplay();
        }
      },
      { threshold: 0.3 },
    );

    observer.observe(section);
    return () => {
      stopAutoplay();
      observer.disconnect();
    };
  }, []);

  useEffect(() => {
    if (userPaused.current) return;
    if (window.matchMedia("(max-width: 767px)").matches) return;
    if (window.matchMedia("(min-width: 1024px)").matches) return;
    const section = sectionRef.current;
    if (!section) return;
    const rect = section.getBoundingClientRect();
    const inView = rect.top < window.innerHeight && rect.bottom > 0;
    if (!inView) return;
    itemRefs.current[activeStep]?.scrollIntoView({
      behavior: "smooth",
      block: "nearest",
      inline: "center",
    });
  }, [activeStep]);

  const selectStep = (index: number) => {
    userPaused.current = true;
    stopAutoplay();
    setActiveStep(index);
  };

  const toggleAccordion = (index: number) => {
    userPaused.current = true;
    stopAutoplay();
    setActiveStep((prev) => (prev === index ? null : index));
  };

  return (
      <section
        ref={sectionRef}
        id="process"
        aria-labelledby="process-title"
        className="scroll-mt-16 bg-[#F7F7F5] py-32"
      >
        <div className="mx-auto max-w-[1280px] px-6">
          <FadeIn>
            <div className="mb-16">
              <p className="mb-4 text-xs uppercase tracking-widest text-[#6F727A]">
                04 / Процесс
              </p>
              <h2
                id="process-title"
                className="mb-6 max-w-3xl text-balance text-4xl font-medium tracking-tight text-[#101114] md:text-6xl"
              >
                Как мы работаем
              </h2>
              <p className="max-w-2xl text-lg text-[#6F727A]">
                Понятный маршрут от консультации до сдачи квартиры. Без тумана,
                в&nbsp;котором обычно исчезают сроки, смета и&nbsp;нервные клетки.
              </p>
            </div>
          </FadeIn>

          <div className="md:hidden">
            {steps.map((item, index) => {
              const isOpen = activeStep === index;
              return (
                <article
                  key={item.num}
                  className={`mb-3 overflow-hidden rounded-xl border border-[rgba(16,17,20,0.08)] ${
                    isOpen ? "bg-[#E5EDE5]" : "bg-white"
                  }`}
                >
                  <button
                    type="button"
                    aria-expanded={isOpen}
                    onClick={() => toggleAccordion(index)}
                    className="flex w-full cursor-pointer items-center justify-between p-4 text-left"
                  >
                    <span className="flex items-center gap-3">
                      <span className="text-sm font-bold text-[#244C3A]">
                        {item.num}
                      </span>
                      <span className="text-base font-medium text-[#101114]">
                        {item.title}
                      </span>
                    </span>
                    <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full border border-[rgba(16,17,20,0.10)] text-sm text-[#101114] transition-transform duration-300">
                      {isOpen ? "−" : "+"}
                    </span>
                  </button>
                  <div
                    className={`overflow-hidden transition-all duration-300 ease-in-out ${
                      isOpen ? "max-h-[500px] opacity-100" : "max-h-0 opacity-0"
                    }`}
                  >
                    <div className="p-4 pt-0">
                      <p className="text-sm leading-relaxed text-[#6F727A]">
                        {item.desc}
                      </p>
                      <ul className="mt-4 flex flex-col gap-2">
                        {item.details.map((detail) => (
                          <li
                            key={detail}
                            className="flex items-start gap-2 text-sm text-[#101114]"
                          >
                            <CheckIcon />
                            {detail}
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </article>
              );
            })}
            <Link
              href="/#calculator"
              className="mt-6 inline-flex w-full items-center justify-center rounded-xl bg-[#C96F4A] px-6 py-3 font-medium text-white transition hover:bg-[#AE5938]"
            >
              Рассчитать стоимость →
            </Link>
          </div>

          <div className="hidden grid-cols-1 items-start gap-12 md:grid lg:grid-cols-12">
            <nav
              aria-label="Этапы ремонта"
              className="lg:col-span-4 lg:self-start"
            >
              <ol className="-mx-6 flex gap-2 overflow-x-auto px-6 lg:mx-0 lg:flex-col lg:gap-0 lg:overflow-visible lg:px-0">
                {steps.map((item, index) => {
                  const isActive = index === activeStep;
                  return (
                    <li
                      key={item.num}
                      ref={(node) => {
                        itemRefs.current[index] = node;
                      }}
                      className="shrink-0 lg:w-full"
                    >
                      <button
                        type="button"
                        aria-current={isActive ? "step" : undefined}
                        onClick={() => selectStep(index)}
                        className={`w-full cursor-pointer py-5 text-left transition-colors duration-200 lg:border-b lg:border-[rgba(16,17,20,0.08)] ${
                          isActive
                            ? "-mx-3 rounded-lg border-l-2 border-[#244C3A] bg-[#E5EDE5] px-3"
                            : ""
                        }`}
                      >
                        <span
                          className={`mb-1 block font-mono text-xs ${
                            isActive ? "text-[#244C3A]" : "text-[#6F727A]"
                          }`}
                        >
                          {item.num}
                        </span>
                        <span
                          className={`block text-base ${
                            isActive
                              ? "font-semibold text-[#244C3A]"
                              : "font-medium text-[#101114]"
                          }`}
                        >
                          {item.title}
                        </span>
                      </button>
                    </li>
                  );
                })}
              </ol>
            </nav>

            <div className="lg:sticky lg:top-32 lg:col-span-8 lg:flex lg:h-[calc(100vh-128px)] lg:flex-col lg:justify-center">
              <div
                key={activeStep}
                className="animate-fade-slide-in motion-reduce:animate-none"
              >
                <h3 className="mt-0 mb-4 text-3xl font-semibold text-[#101114]">
                  {step.title}
                </h3>
                <p className="mb-8 text-base leading-relaxed text-[#6F727A]">
                  {step.desc}
                </p>
                <div className="border-t border-[rgba(16,17,20,0.08)] pt-8">
                  <ul className="grid grid-cols-1 gap-4 md:grid-cols-2">
                    {step.details.map((detail) => (
                      <li
                        key={detail}
                        className="flex items-start gap-2 text-sm text-[#101114]"
                      >
                        <CheckIcon />
                        {detail}
                      </li>
                    ))}
                  </ul>
                  <Link
                    href="/#calculator"
                    className="mt-8 inline-flex rounded-xl bg-[#C96F4A] px-6 py-3 font-medium text-white transition hover:bg-[#AE5938]"
                  >
                    Рассчитать стоимость →
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
  );
}
