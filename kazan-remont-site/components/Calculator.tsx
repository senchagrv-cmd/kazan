"use client";

import FadeIn from "@/components/FadeIn";
import {
  type ChangeEvent,
  type CSSProperties,
  FormEvent,
  type ReactNode,
  useMemo,
  useState,
} from "react";

const TOTAL_STEPS = 10;
const AREA_MIN = 15;
const AREA_MAX = 250;
const AREA_PRESETS = [35, 50, 70, 90, 120];

function areaProgress(value: number) {
  return ((value - AREA_MIN) / (AREA_MAX - AREA_MIN)) * 100;
}

const PILL =
  "rounded-full border px-6 py-3 text-base font-medium transition-colors";
const PILL_ON = "border-[#244C3A] bg-[#E5EDE5] text-[#244C3A]";
const PILL_OFF =
  "border-[rgba(16,17,20,0.10)] bg-white text-[#101114] hover:border-[#244C3A]";

const CARD =
  "rounded-xl border p-5 text-left transition-colors";
const CARD_ON = "border-[#244C3A] bg-[#E5EDE5]";
const CARD_OFF =
  "border-[rgba(16,17,20,0.10)] bg-white hover:border-[#244C3A]";

type Answers = {
  area: number;
  location: string;
  condition: string;
  type: string;
  rooms: string;
  bathrooms: string;
  design: string;
  materials: string;
  complex: string[];
  timing: string;
  channel: string;
  name: string;
  phone: string;
};

const INITIAL: Answers = {
  area: 60,
  location: "",
  condition: "",
  type: "",
  rooms: "",
  bathrooms: "",
  design: "",
  materials: "",
  complex: [],
  timing: "",
  channel: "phone",
  name: "",
  phone: "",
};

function calculatePriceRange(answers: Answers) {
  let basePrice = 15000;
  if (answers.type === "capital") basePrice = 25000;
  if (answers.type === "design") basePrice = 40000;
  if (answers.type === "turnkey") basePrice = 50000;

  let multiplier = 1;
  if (answers.location === "suburb") multiplier = 0.9;
  if (answers.condition === "secondary") multiplier += 0.1;
  if (answers.materials === "premium") multiplier += 0.3;
  if (answers.complex?.length > 0) multiplier += 0.15;

  const area = answers.area || 60;
  const min = Math.round((basePrice * area * multiplier * 0.8) / 100000) / 10;
  const max = Math.round((basePrice * area * multiplier * 1.2) / 100000) / 10;
  return { min, max };
}

function formatMillion(value: number) {
  return value.toLocaleString("ru-RU", {
    minimumFractionDigits: value % 1 === 0 ? 0 : 1,
    maximumFractionDigits: 1,
  });
}

function Pill({
  selected,
  onClick,
  children,
}: {
  selected: boolean;
  onClick: () => void;
  children: ReactNode;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={`${PILL} ${selected ? PILL_ON : PILL_OFF}`}
    >
      {children}
    </button>
  );
}

function ChoiceCard({
  selected,
  title,
  hint,
  onClick,
}: {
  selected: boolean;
  title: string;
  hint?: string;
  onClick: () => void;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={`${CARD} ${selected ? CARD_ON : CARD_OFF}`}
    >
      <span className="block text-base font-semibold text-[#101114]">{title}</span>
      {hint && (
        <span className="mt-1 block text-sm text-[#6F727A]">{hint}</span>
      )}
    </button>
  );
}

export default function Calculator() {
  const [currentStep, setCurrentStep] = useState(0);
  const [answers, setAnswers] = useState<Answers>(INITIAL);
  const [submitted, setSubmitted] = useState(false);

  const range = useMemo(() => calculatePriceRange(answers), [answers]);

  const canProceed = [
    true,
    Boolean(answers.location),
    Boolean(answers.condition),
    Boolean(answers.type),
    Boolean(answers.rooms),
    Boolean(answers.bathrooms),
    Boolean(answers.design),
    Boolean(answers.materials),
    answers.complex.length > 0,
    Boolean(answers.timing) && answers.phone.replace(/\D/g, "").length >= 10,
  ][currentStep];

  const setField = <K extends keyof Answers>(key: K, value: Answers[K]) =>
    setAnswers((prev) => ({ ...prev, [key]: value }));

  const handleSliderChange = (e: ChangeEvent<HTMLInputElement>) => {
    const value = parseInt(e.target.value, 10);
    setField("area", value);
    e.target.style.setProperty("--progress", `${areaProgress(value)}%`);
  };

  const toggleComplex = (value: string) => {
    setAnswers((prev) => {
      const has = prev.complex.includes(value);
      if (value === "unknown") {
        return { ...prev, complex: has ? [] : ["unknown"] };
      }
      const withoutUnknown = prev.complex.filter((item) => item !== "unknown");
      return {
        ...prev,
        complex: has
          ? withoutUnknown.filter((item) => item !== value)
          : [...withoutUnknown, value],
      };
    });
  };

  const submitQuiz = () => {
    if (!canProceed) return;
    setSubmitted(true);
  };

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    submitQuiz();
  };

  const progress = ((currentStep + 1) / TOTAL_STEPS) * 100;

  return (
    <section
      id="calculator"
      aria-labelledby="calculator-title"
      className="scroll-mt-16 bg-[#F7F7F5] py-32"
    >
      <div className="mx-auto max-w-[900px] px-6">
        <FadeIn>
          <div className="mb-12">
            <p className="mb-4 text-xs uppercase tracking-widest text-[#6F727A]">
              08 / КАЛЬКУЛЯТОР
            </p>
            <h2
              id="calculator-title"
              className="mb-4 text-balance text-4xl font-medium tracking-tight text-[#101114] md:text-5xl"
            >
              Рассчитайте стоимость ремонта под вашу квартиру
            </h2>
            <p className="text-lg text-[#6F727A]">
              Ответьте на&nbsp;несколько вопросов, и&nbsp;мы подготовим персональный
              расчёт под вашу квартиру и&nbsp;пришлём его в&nbsp;удобный вам канал.
            </p>
          </div>
        </FadeIn>

        <FadeIn>
        <div className="min-h-[500px] rounded-3xl border border-[rgba(16,17,20,0.08)] bg-white p-5 md:p-10">
          {submitted ? (
            <div className="flex flex-col items-center py-8 text-center">
              <div className="mb-6 flex h-16 w-16 items-center justify-center rounded-full bg-green-100 text-2xl font-semibold text-green-600">
                ✓
              </div>
              <h3 className="mb-4 text-2xl font-semibold text-[#101114]">
                Заявка отправлена!
              </h3>
              <p className="mb-8 max-w-md text-base text-[#6F727A]">
                Мы перезвоним вам в&nbsp;течение 15&nbsp;минут и&nbsp;подготовим точный расчёт.
              </p>
              <div className="w-full rounded-xl bg-[#F7F7F5] p-6">
                <p className="mb-2 text-sm text-[#6F727A]">
                  Примерная стоимость:
                </p>
                <p className="text-3xl font-semibold text-[#244C3A]">
                  от {formatMillion(range.min)}&nbsp;млн&nbsp;₽
                </p>
                <p className="mt-2 text-xs text-[#6F727A]">
                  Точную сумму назовём после замера
                </p>
              </div>
            </div>
          ) : (
            <>
              <p className="mb-3 text-sm font-medium text-[#6F727A]">
                Вопрос {currentStep + 1} из {TOTAL_STEPS}
              </p>
              <div className="mb-8 h-1.5 overflow-hidden rounded-full bg-[rgba(16,17,20,0.08)]">
                <div
                  className="h-full rounded-full bg-[#244C3A] transition-all duration-500 ease-out"
                  style={{ width: `${progress}%` }}
                />
              </div>

              <div key={currentStep} className="animate-fade-in motion-reduce:animate-none">
                {currentStep === 0 && (
                  <Step
                    title="Какая площадь квартиры?"
                    subtitle="Укажите примерную площадь квартиры. Можно двигать ползунок или выбрать быстрый вариант."
                  >
                    <div className="mb-4 flex items-center justify-between gap-4">
                      <label htmlFor="quiz-area" className="sr-only">
                        Площадь, м²
                      </label>
                      <div id="quiz-slider" className="relative h-6 flex-1">
                        <div className="pointer-events-none absolute top-1/2 right-3 left-3 h-1.5 -translate-y-1/2 overflow-hidden rounded-full bg-[rgba(16,17,20,0.10)]">
                          <div
                            className="h-full rounded-full bg-[#244C3A] transition-[width] duration-150"
                            style={{ width: `${areaProgress(answers.area)}%` }}
                          />
                        </div>
                        <div
                          className="pointer-events-none absolute top-1/2 z-10 h-6 w-6 -translate-y-1/2 rounded-full border-[3px] border-white bg-[#244C3A] shadow-[0_2px_6px_rgba(0,0,0,0.2)]"
                          style={{
                            left: `calc(12px + (100% - 24px) * ${areaProgress(answers.area) / 100})`,
                          }}
                        />
                        <input
                          id="quiz-area"
                          type="range"
                          min={AREA_MIN}
                          max={AREA_MAX}
                          value={answers.area}
                          onChange={handleSliderChange}
                          className="quiz-slider absolute inset-0 z-20 w-full cursor-pointer"
                          style={
                            {
                              "--progress": `${areaProgress(answers.area)}%`,
                              height: 24,
                              opacity: 0,
                            } as CSSProperties
                          }
                        />
                      </div>
                      <p className="shrink-0 text-2xl font-semibold text-[#101114]">
                        {answers.area}&nbsp;м²
                      </p>
                    </div>
                    <div className="mt-6 flex flex-wrap gap-2">
                      {AREA_PRESETS.map((value) => (
                        <button
                          key={value}
                          type="button"
                          onClick={() => setField("area", value)}
                          className={`rounded-full border px-4 py-2 text-sm transition-colors ${
                            answers.area === value
                              ? "border-[#244C3A] bg-[#E5EDE5] text-[#244C3A]"
                              : "border-[rgba(16,17,20,0.10)] hover:border-[#244C3A]"
                          }`}
                        >
                          {value}&nbsp;м²
                        </button>
                      ))}
                    </div>
                  </Step>
                )}

                {currentStep === 1 && (
                  <Step
                    title="Где находится объект?"
                    subtitle="В Казани ставки стандартные, в пригороде — чуть ниже."
                  >
                    <div className="flex flex-wrap gap-3">
                      <Pill
                        selected={answers.location === "kazan"}
                        onClick={() => setField("location", "kazan")}
                      >
                        Казань
                      </Pill>
                      <Pill
                        selected={answers.location === "suburb"}
                        onClick={() => setField("location", "suburb")}
                      >
                        Пригород / район
                      </Pill>
                    </div>
                  </Step>
                )}

                {currentStep === 2 && (
                  <Step
                    title="В каком состоянии квартира?"
                    subtitle="Состояние объекта сильно влияет на объём работ и бюджет."
                  >
                    <div className="flex flex-col gap-3">
                      {[
                        ["new", "Новостройка без отделки", "Ремонт начинается практически с нуля"],
                        ["whitebox", "White Box", "Часть черновой подготовки уже выполнена"],
                        ["developer", "Отделка от застройщика", "Может потребоваться демонтаж и исправления"],
                        ["secondary", "Вторичное жильё", "Часто нужны демонтаж и замена инженерии"],
                        ["demo", "После демонтажа", "Объект уже частично подготовлен"],
                      ].map(([value, title, hint]) => (
                        <ChoiceCard
                          key={value}
                          selected={answers.condition === value}
                          title={title}
                          hint={hint}
                          onClick={() => setField("condition", value)}
                        />
                      ))}
                    </div>
                  </Step>
                )}

                {currentStep === 3 && (
                  <Step
                    title="Какой формат ремонта нужен?"
                    subtitle="Выберите ближайший вариант. Это предварительный расчёт, а не клятва на мешке штукатурки."
                  >
                    <div className="grid grid-cols-1 gap-3 md:grid-cols-2">
                      {[
                        ["cosmetic", "Косметический ремонт", "Обновление отделки без полной замены инженерии"],
                        ["capital", "Капитальный ремонт", "Черновые работы, инженерия и чистовая отделка"],
                        ["design", "Дизайнерский ремонт", "Ремонт по дизайн-проекту с контролем решений"],
                        ["turnkey", "Под ключ с комплектацией", "Ремонт, материалы, подбор и сопровождение"],
                      ].map(([value, title, hint]) => (
                        <ChoiceCard
                          key={value}
                          selected={answers.type === value}
                          title={title}
                          hint={hint}
                          onClick={() => setField("type", value)}
                        />
                      ))}
                    </div>
                  </Step>
                )}

                {currentStep === 4 && (
                  <Step
                    title="Сколько комнат?"
                    subtitle="Количество комнат влияет на двери, свет, хранение, отделку и объём работ."
                  >
                    <div className="flex flex-wrap gap-3">
                      {[
                        ["studio", "Студия"],
                        ["1", "1 комната"],
                        ["2", "2 комнаты"],
                        ["3", "3 комнаты"],
                        ["4", "4+ комнаты"],
                      ].map(([value, label]) => (
                        <Pill
                          key={value}
                          selected={answers.rooms === value}
                          onClick={() => setField("rooms", value)}
                        >
                          {label}
                        </Pill>
                      ))}
                    </div>
                  </Step>
                )}

                {currentStep === 5 && (
                  <Step
                    title="Сколько санузлов?"
                    subtitle="Санузлы заметно влияют на бюджет: плитка, сантехника, гидроизоляция, инженерия."
                  >
                    <div className="flex flex-wrap gap-3">
                      {[
                        ["1", "1 санузел"],
                        ["2", "2 санузла"],
                        ["3", "3 санузла"],
                      ].map(([value, label]) => (
                        <Pill
                          key={value}
                          selected={answers.bathrooms === value}
                          onClick={() => setField("bathrooms", value)}
                        >
                          {label}
                        </Pill>
                      ))}
                    </div>
                  </Step>
                )}

                {currentStep === 6 && (
                  <Step
                    title="Нужен ли дизайн-проект?"
                    subtitle="Дизайн-проект помогает заранее согласовать планировку, материалы, свет и будущую смету."
                  >
                    <div className="flex flex-col gap-3">
                      {[
                        ["full", "Да, нужен полный дизайн-проект", "Планировка, визуализации, чертежи, материалы"],
                        ["plan", "Нужна только планировка", "Расстановка мебели и логика пространства"],
                        ["ready", "Проект уже есть", "Можно считать ремонт по готовым решениям"],
                        ["unknown", "Пока не знаю", "Подскажем после консультации"],
                      ].map(([value, title, hint]) => (
                        <ChoiceCard
                          key={value}
                          selected={answers.design === value}
                          title={title}
                          hint={hint}
                          onClick={() => setField("design", value)}
                        />
                      ))}
                    </div>
                  </Step>
                )}

                {currentStep === 7 && (
                  <Step
                    title="Какой уровень материалов рассматриваете?"
                    subtitle="Это ориентир для предварительного бюджета. Финальный подбор делается после проекта и сметы."
                  >
                    <div className="grid grid-cols-1 gap-3 md:grid-cols-2">
                      {[
                        ["basic", "Базовый", "Практичные решения без усложнения"],
                        ["medium", "Средний", "Оптимальный баланс цены и качества"],
                        ["high", "Выше среднего", "Более выразительная отделка и комплектация"],
                        ["premium", "Премиальный", "Сложные материалы, мебель, свет и детали"],
                      ].map(([value, title, hint]) => (
                        <ChoiceCard
                          key={value}
                          selected={answers.materials === value}
                          title={title}
                          hint={hint}
                          onClick={() => setField("materials", value)}
                        />
                      ))}
                    </div>
                  </Step>
                )}

                {currentStep === 8 && (
                  <Step
                    title="Есть ли сложные работы?"
                    subtitle="Можно выбрать несколько вариантов."
                  >
                    <div className="grid grid-cols-1 gap-3 md:grid-cols-2">
                      {[
                        ["replan", "Перепланировка"],
                        ["furniture", "Много встроенной мебели"],
                        ["light", "Сложный свет"],
                        ["floor", "Тёплые полы"],
                        ["ac", "Кондиционирование"],
                        ["unknown", "Пока не знаю"],
                      ].map(([value, label]) => {
                        const selected = answers.complex.includes(value);
                        return (
                          <button
                            key={value}
                            type="button"
                            onClick={() => toggleComplex(value)}
                            className={`cursor-pointer rounded-xl border p-4 text-center font-medium transition-colors ${
                              selected
                                ? "border-[#244C3A] bg-[#E5EDE5] text-[#244C3A]"
                                : "border-[rgba(16,17,20,0.10)] hover:border-[#244C3A]"
                            }`}
                          >
                            {label}
                          </button>
                        );
                      })}
                    </div>
                  </Step>
                )}

                {currentStep === 9 && (
                  <form onSubmit={handleSubmit}>
                    <Step
                      title="Когда планируете начать?"
                      subtitle="Последний шаг: выберите, куда прислать расчёт, и оставьте контакты."
                    >
                      <div className="mb-6 flex flex-wrap gap-3">
                        {[
                          ["month", "В ближайший месяц"],
                          ["quarter", "Через 1–3 месяца"],
                          ["later", "Через 3+ месяца"],
                          ["choosing", "Пока выбираю подрядчика"],
                        ].map(([value, label]) => (
                          <Pill
                            key={value}
                            selected={answers.timing === value}
                            onClick={() => setField("timing", value)}
                          >
                            {label}
                          </Pill>
                        ))}
                      </div>

                      <div className="mb-6 rounded-xl bg-[#F7F7F5] p-5">
                        <p className="mb-2 text-xs uppercase tracking-wider text-[#6F727A]">
                          Предварительный расчёт по&nbsp;вашим ответам
                        </p>
                        <p className="text-2xl font-semibold text-[#101114]">
                          от {formatMillion(range.min)}&nbsp;млн&nbsp;₽ до{" "}
                          {formatMillion(range.max)}&nbsp;млн&nbsp;₽
                        </p>
                        <p className="mt-2 text-sm text-[#6F727A]">
                          Точную смету зафиксруем в&nbsp;договоре после замера. Оставьте
                          телефон, и&nbsp;мы уточним цифры.
                        </p>
                      </div>

                      <p className="mb-3 text-sm font-medium text-[#101114]">
                        Куда прислать расчёт?
                      </p>
                      <div className="mb-4 flex flex-wrap gap-3">
                        {[
                          ["phone", "📞 Телефон"],
                          ["max", "💬 MAX"],
                          ["telegram", "✈️ Telegram"],
                        ].map(([value, label]) => (
                          <button
                            key={value}
                            type="button"
                            onClick={() => setField("channel", value)}
                            className={`rounded-full border px-4 py-2 text-sm font-medium transition-colors ${
                              answers.channel === value
                                ? "border-[#244C3A] bg-[#E5EDE5] text-[#244C3A]"
                                : "border-[rgba(16,17,20,0.10)] hover:border-[#244C3A]"
                            }`}
                          >
                            {label}
                          </button>
                        ))}
                      </div>

                      <div className="grid grid-cols-1 gap-3 md:grid-cols-2">
                        <input
                          type="text"
                          name="name"
                          autoComplete="name"
                          placeholder="Ваше имя"
                          value={answers.name}
                          onChange={(e) => setField("name", e.target.value)}
                          className="w-full rounded-xl border border-[rgba(16,17,20,0.10)] px-4 py-3 text-[#101114] outline-none placeholder:text-[#6F727A] focus:border-[#244C3A] focus:ring-2 focus:ring-[#244C3A]/20"
                        />
                        <input
                          type="tel"
                          name="phone"
                          autoComplete="tel"
                          required
                          placeholder="+7 (999) 999-99-99"
                          value={answers.phone}
                          onChange={(e) => setField("phone", e.target.value)}
                          className="w-full rounded-xl border border-[rgba(16,17,20,0.10)] px-4 py-3 text-[#101114] outline-none placeholder:text-[#6F727A] focus:border-[#244C3A] focus:ring-2 focus:ring-[#244C3A]/20"
                        />
                      </div>
                      <p className="mt-4 text-xs text-[#6F727A]">
                        Нажимая кнопку, я даю согласие на&nbsp;обработку персональных
                        данных и&nbsp;получение информации об услугах, включая звонки
                        и&nbsp;сообщения, на&nbsp;условиях Политики конфиденциальности.
                      </p>
                    </Step>
                  </form>
                )}
              </div>

              <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                {currentStep > 0 ? (
                  <button
                    type="button"
                    onClick={() => setCurrentStep((step) => step - 1)}
                    className="rounded-xl border border-[rgba(16,17,20,0.10)] px-6 py-3 font-medium text-[#101114] transition hover:bg-[#F7F7F5]"
                  >
                    Назад
                  </button>
                ) : (
                  <span />
                )}
                {currentStep < TOTAL_STEPS - 1 ? (
                  <button
                    type="button"
                    disabled={!canProceed}
                    onClick={() => setCurrentStep((step) => step + 1)}
                    className="rounded-xl bg-[#101114] px-6 py-3 font-medium text-white transition hover:bg-[#17181C] disabled:cursor-not-allowed disabled:opacity-40"
                  >
                    Далее
                  </button>
                ) : (
                  <button
                    type="button"
                    disabled={!canProceed}
                    onClick={submitQuiz}
                    className="rounded-xl bg-[#C96F4A] px-6 py-3 font-medium text-white transition hover:bg-[#AE5938] disabled:cursor-not-allowed disabled:opacity-40"
                  >
                    Получить расчёт
                  </button>
                )}
              </div>
            </>
          )}
        </div>
        </FadeIn>
      </div>
    </section>
  );
}

function Step({
  title,
  subtitle,
  children,
}: {
  title: string;
  subtitle: string;
  children: ReactNode;
}) {
  return (
    <div>
      <h2 className="mb-3 text-2xl font-semibold text-[#101114] md:text-3xl">
        {title}
      </h2>
      <p className="mb-6 text-sm text-[#6F727A] md:text-base">{subtitle}</p>
      {children}
    </div>
  );
}
