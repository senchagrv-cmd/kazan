import DashboardActivity from "@/components/DashboardActivity";

export default function Hero() {
  return (
    <section
      aria-labelledby="hero-title"
      className="animate-hero-fade motion-reduce:animate-none"
    >
      <div className="mx-auto max-w-[1280px] px-6 pt-32 pb-24 md:px-12 md:pt-48 md:pb-32">
        <div className="grid grid-cols-1 items-start gap-8 lg:grid-cols-12">
          {/* Левая колонка: текст и CTA */}
          <div className="flex flex-col lg:col-span-6">
            <p className="mb-8 text-xs uppercase tracking-widest text-[#6F727A]">
              Ремонт квартир в&nbsp;Казани · под ключ
            </p>

            <h1
              id="hero-title"
              className="mb-8 text-balance text-5xl font-medium tracking-tight text-[#101114] md:mb-12 md:text-7xl"
            >
              Ремонт без&nbsp;доплат и&nbsp;переносов сроков
            </h1>

            <p className="mb-8 text-lg leading-relaxed text-[#6F727A] md:text-xl">
              От&nbsp;12&nbsp;900&nbsp;₽/м² · срок от&nbsp;45&nbsp;дней ·
              гарантия 3&nbsp;года
            </p>

            <p className="mb-12 text-lg leading-relaxed text-[#6F727A] md:text-xl">
              Цена зафиксирована в&nbsp;договоре. Вы получаете фотоотчёт каждые
              3&nbsp;дня и&nbsp;знаете, что происходит на&nbsp;объекте. Без
              звонков прорабу и&nbsp;поездок на&nbsp;стройку.
            </p>

            <div className="mb-8 flex flex-row gap-3">
              <a
                href="#calculator"
                className="inline-flex items-center justify-center whitespace-nowrap rounded-xl bg-[#C96F4A] px-6 py-3 text-base font-semibold text-white transition-all hover:bg-[#AE5938]"
              >
                Рассчитать бюджет
              </a>
              <a
                href="#projects"
                className="inline-flex items-center justify-center whitespace-nowrap rounded-xl border border-[rgba(16,17,20,0.10)] px-6 py-3 text-base font-semibold text-[#101114] transition-all hover:bg-white/50"
              >
                Наши проекты →
              </a>
            </div>

            <p className="text-sm text-[#6F727A]">
              Бесплатный замер · подробная смета · без обязательств
            </p>
          </div>

          {/* Правая колонка: live-dashboard */}
          <div className="mt-0 flex items-start lg:col-span-6">
            <DashboardActivity />
          </div>
        </div>
      </div>
    </section>
  );
}
