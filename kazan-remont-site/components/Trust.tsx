import FadeIn from "@/components/FadeIn";
import Link from "next/link";

function IconDocument() {
  return (
    <svg
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.75"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <path d="M14 3H7a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V8z" />
      <path d="M14 3v5h5" />
      <path d="M9 13h6M9 17h4" />
    </svg>
  );
}

function IconLayers() {
  return (
    <svg
      width="20"
      height="20"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.75"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <path d="M12 3l9 5-9 5L3 8l9-5z" />
      <path d="M3 12l9 5 9-5" />
      <path d="M3 16l9 5 9-5" />
    </svg>
  );
}

function IconCamera() {
  return (
    <svg
      width="20"
      height="20"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.75"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <path d="M7 8l2-3h6l2 3" />
      <rect x="3" y="8" width="18" height="13" rx="2" />
      <circle cx="12" cy="14.5" r="3.5" />
    </svg>
  );
}

function IconBadge() {
  return (
    <svg
      width="20"
      height="20"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.75"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <path d="M12 3l2.2 4.5 5 .7-3.6 3.5.9 4.9L12 14.8 7.5 18.6l.9-4.9L4.8 8.2l5-.7L12 3z" />
    </svg>
  );
}

function IconShield() {
  return (
    <svg
      width="20"
      height="20"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.75"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <path d="M12 3l8 3v6c0 5-3.4 8.4-8 9.5C7.4 20.4 4 17 4 12V6l8-3z" />
      <path d="M9 12l2 2 4-4" />
    </svg>
  );
}

const METRICS = [
  { value: "12+", label: "лет опыта" },
  { value: "200+", label: "проектов" },
  { value: "4.9", label: "оценка клиентов" },
  { value: "3 года", label: "гарантии" },
];

export default function Trust() {
  return (
    <section
      id="trust"
      aria-labelledby="trust-title"
      className="scroll-mt-16 bg-[#F7F7F5] py-32"
    >
      <div className="mx-auto max-w-[1280px] px-6">
        <FadeIn>
          <div className="mb-16">
            <p className="mb-4 text-xs uppercase tracking-widest text-[#6F727A]">
              03 / Почему мы
            </p>
            <h2
              id="trust-title"
              className="mb-6 max-w-3xl text-balance text-4xl font-medium tracking-tight text-[#101114] md:text-6xl"
            >
              Ремонт без скрытых рисков
            </h2>
            <p className="max-w-3xl text-lg text-[#6F727A]">
              Берём на&nbsp;себя весь цикл работ — от проекта и&nbsp;комплектации
              до ремонта, контроля качества и&nbsp;сдачи готового объекта.
            </p>
          </div>
        </FadeIn>

        <FadeIn>
        <dl className="mb-16 grid grid-cols-2 gap-8 border-t border-b border-[rgba(16,17,20,0.10)] py-12 md:grid-cols-4">
          {METRICS.map((item) => (
            <div key={item.label}>
              <dd className="animate-count-up mb-2 text-4xl font-semibold tracking-tight text-[#101114] md:text-5xl">
                {item.value}
              </dd>
              <dt className="text-sm text-[#6F727A]">{item.label}</dt>
            </div>
          ))}
        </dl>
        </FadeIn>

        <div className="grid auto-rows-[minmax(180px,auto)] grid-cols-1 gap-6 md:grid-cols-4">
          <FadeIn delay={0} className="md:col-span-2 md:row-span-2">
          <article className="hover-lift hover-lift-dark flex h-full flex-col rounded-3xl bg-[#17181C] p-10 text-white">
            <div className="mb-8 flex h-14 w-14 items-center justify-center rounded-2xl bg-[#244C3A]">
              <IconDocument />
            </div>
            <h3 className="mb-4 text-3xl font-semibold">Фиксированная смета</h3>
            <p className="mb-8 flex-1 text-lg leading-relaxed text-gray-300">
              Цена не меняется в&nbsp;процессе работ. Всё прописано в&nbsp;договоре
              до начала ремонта.
            </p>
            <Link
              href="/#calculator"
              className="font-medium text-[#C96F4A] hover:underline"
            >
              Получить смету →
            </Link>
          </article>
          </FadeIn>

          <FadeIn delay={80}>
          <article className="hover-lift rounded-3xl border border-[rgba(16,17,20,0.08)] bg-white p-8">
            <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-xl bg-[#E5EDE5] text-[#244C3A]">
              <IconLayers />
            </div>
            <h3 className="mb-2 text-lg font-semibold text-[#101114]">
              Жилые объекты, не шоурум
            </h3>
            <p className="text-sm text-[#6F727A]">
              Каждый кейс — реальная квартира со сроком, сметой и&nbsp;фото после
              сдачи.
            </p>
          </article>
          </FadeIn>

          <FadeIn delay={160}>
          <article className="hover-lift rounded-3xl border border-[rgba(16,17,20,0.08)] bg-white p-8">
            <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-xl bg-[#E5EDE5] text-[#244C3A]">
              <IconCamera />
            </div>
            <h3 className="mb-2 text-lg font-semibold text-[#101114]">
              Фотоотчёты каждые 3&nbsp;дня
            </h3>
            <p className="text-sm text-[#6F727A]">
              Вы видите прогресс в&nbsp;мессенджере.
            </p>
          </article>
          </FadeIn>

          <FadeIn delay={240}>
          <article className="hover-lift rounded-3xl border border-[rgba(16,17,20,0.08)] bg-white p-8">
            <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-xl bg-[#E5EDE5] text-[#244C3A]">
              <IconBadge />
            </div>
            <h3 className="mb-2 text-lg font-semibold text-[#101114]">
              Гарантия в&nbsp;договоре
            </h3>
            <p className="text-sm text-[#6F727A]">
              Сроки устранения замечаний прописаны, а не обещаны устно.
            </p>
          </article>
          </FadeIn>

          <FadeIn delay={320}>
          <article className="hover-lift rounded-3xl border border-[rgba(16,17,20,0.08)] bg-white p-8">
            <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-xl bg-[#E5EDE5] text-[#244C3A]">
              <IconShield />
            </div>
            <h3 className="mb-2 text-lg font-semibold text-[#101114]">
              Оплата поэтапно
            </h3>
            <p className="text-sm text-[#6F727A]">Никаких 100% предоплат.</p>
          </article>
          </FadeIn>
        </div>
      </div>
    </section>
  );
}
