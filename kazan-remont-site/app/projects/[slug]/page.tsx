import ProjectCtaForm from "@/components/ProjectCtaForm";
import { getProject, projects } from "@/lib/projects";
import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";

export function generateStaticParams() {
  return projects.map((project) => ({ slug: project.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const project = getProject(slug);
  if (!project) return { title: "Проект" };

  return {
    title: `${project.title} — ремонт под ключ в Казани`,
    description: project.summary,
  };
}

export default async function ProjectPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const project = getProject(slug);
  if (!project) notFound();

  const metrics = [
    { value: project.area, label: "площадь" },
    { value: project.duration, label: "срок" },
    { value: project.budget, label: "бюджет" },
  ];

  return (
    <>
      <main>
        {/* 1. Hero */}
        <section className="bg-[#F7F7F5] py-24 md:py-32">
          <div className="mx-auto max-w-[1280px] px-6">
            <nav
              aria-label="Хлебные крошки"
              className="mb-8 text-sm text-[#6F727A]"
            >
              <ol className="flex flex-wrap items-center gap-2">
                <li>
                  <Link href="/" className="transition-colors hover:text-[#101114]">
                    Главная
                  </Link>
                </li>
                <li aria-hidden="true">/</li>
                <li>
                  <Link
                    href="/#projects"
                    className="transition-colors hover:text-[#101114]"
                  >
                    Проекты
                  </Link>
                </li>
                <li aria-hidden="true">/</li>
                <li className="text-[#101114]">{project.title}</li>
              </ol>
            </nav>

            <div className="grid grid-cols-1 items-start gap-12 lg:grid-cols-2">
              <div>
                <p className="mb-4 text-xs font-medium uppercase tracking-widest text-[#244C3A]">
                  Проект
                </p>
                <h1 className="mb-6 text-balance text-4xl font-medium tracking-tight text-[#101114] md:text-5xl">
                  Ремонт квартиры в&nbsp;{project.title}
                </h1>
                <p className="mb-8 text-lg leading-relaxed text-[#6F727A]">
                  {project.summary}
                </p>

                <div className="mb-12 flex flex-row flex-wrap gap-3">
                  <Link
                    href="/#calculator"
                    className="inline-flex items-center justify-center rounded-xl bg-[#C96F4A] px-6 py-3 text-base font-semibold whitespace-nowrap text-white transition-all hover:bg-[#AE5938]"
                  >
                    Рассчитать бюджет
                  </Link>
                  <a
                    href="#gallery"
                    className="inline-flex items-center justify-center rounded-xl border border-[rgba(16,17,20,0.10)] px-6 py-3 text-base font-semibold whitespace-nowrap text-[#101114] transition-all hover:bg-white/50"
                  >
                    Смотреть фото
                  </a>
                </div>

                <dl className="grid grid-cols-3 gap-6">
                  {metrics.map((item) => (
                    <div key={item.label}>
                      <dd className="text-xl font-semibold text-[#101114] md:text-2xl">
                        {item.value}
                      </dd>
                      <dt className="mt-1 text-xs text-[#6F727A]">{item.label}</dt>
                    </div>
                  ))}
                </dl>
              </div>

              <div className="relative">
                <div className="overflow-hidden rounded-2xl">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={project.images[0]}
                    alt={project.title}
                    className="aspect-[4/3] w-full object-cover"
                  />
                </div>
                <div className="absolute right-5 bottom-5 left-5 rounded-xl bg-[#17181C] p-5 text-white md:right-auto md:left-5 md:w-[280px]">
                  <p className="mb-1 text-xs uppercase tracking-wider text-gray-400">
                    Объект
                  </p>
                  <p className="mb-3 font-semibold">{project.type}</p>
                  <p className="text-sm text-gray-400">{project.overlayNote}</p>
                  <p className="mt-3 text-sm text-gray-400">
                    {project.location}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* 2. Галерея */}
        <section id="gallery" className="scroll-mt-24 py-24 md:py-32">
          <div className="mx-auto max-w-[1280px] px-6">
            <p className="mb-4 text-xs uppercase tracking-widest text-[#6F727A]">
              Галерея
            </p>
            <h2 className="mb-4 text-balance text-4xl font-medium tracking-tight text-[#101114] md:text-5xl">
              Квартира после ремонта
            </h2>
            <p className="mb-12 max-w-2xl text-lg text-[#6F727A]">
              Фото с объекта после приёмки. Без постановочных ракурсов ради
              каталога — так квартира выглядит в жизни.
            </p>

            <div className="grid auto-rows-[160px] grid-cols-2 gap-4 md:auto-rows-[200px] md:grid-cols-3">
              {project.images.map((src, index) => (
                <div
                  key={src + index}
                  className={`overflow-hidden rounded-xl ${
                    index === 0 ? "col-span-2 row-span-2" : ""
                  }`}
                >
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={src}
                    alt={`${project.title}, фото ${index + 1}`}
                    className="h-full w-full object-cover transition duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] hover:scale-105"
                  />
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* 3. Что продумали */}
        <section className="bg-white py-24 md:py-32">
          <div className="mx-auto max-w-[1280px] px-6">
            <p className="mb-4 text-xs uppercase tracking-widest text-[#6F727A]">
              Решения
            </p>
            <h2 className="mb-4 text-balance text-4xl font-medium tracking-tight text-[#101114] md:text-5xl">
              Что продумали в интерьере
            </h2>
            <p className="mb-12 max-w-2xl text-lg text-[#6F727A]">
              Не набор «красивых картинок», а решения, из-за которых квартирой
              удобно пользоваться каждый день.
            </p>

            <ul className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
              {project.features.map((feature, index) => {
                const isFirst = index === 0;
                const isLast = index === project.features.length - 1;
                const tone = isFirst
                  ? "bg-[#244C3A] text-white"
                  : isLast
                    ? "bg-[#17181C] text-white"
                    : "bg-[#F7F7F5] text-[#101114]";
                const muted = isFirst || isLast ? "text-white/70" : "text-[#6F727A]";

                return (
                  <li key={feature.number} className={`rounded-2xl p-6 ${tone}`}>
                    <p className={`mb-6 text-sm font-medium ${muted}`}>
                      {feature.number}
                    </p>
                    <h3 className="mb-3 text-xl font-semibold">{feature.title}</h3>
                    <p className={`text-sm leading-relaxed ${muted}`}>
                      {feature.description}
                    </p>
                  </li>
                );
              })}
            </ul>
          </div>
        </section>

        {/* 4. Описание + sidebar */}
        <section className="bg-[#F7F7F5] py-24 md:py-32">
          <div className="mx-auto max-w-[1280px] px-6">
            <div className="grid grid-cols-1 gap-12 lg:grid-cols-3">
              <div className="lg:col-span-2">
                <p className="mb-4 text-xs uppercase tracking-widest text-[#6F727A]">
                  О проекте
                </p>
                <h2 className="mb-8 text-balance text-4xl font-medium tracking-tight text-[#101114] md:text-5xl">
                  Ремонт квартиры в&nbsp;{project.title}
                </h2>
                <div className="space-y-6 text-lg leading-relaxed text-[#6F727A]">
                  {project.description.map((paragraph) => (
                    <p key={paragraph}>{paragraph}</p>
                  ))}
                </div>
                <ul className="mt-10 flex flex-wrap gap-2">
                  {project.tags.map((tag) => (
                    <li
                      key={tag}
                      className="rounded-full border border-[rgba(16,17,20,0.10)] px-4 py-2 text-sm text-[#101114]"
                    >
                      {tag}
                    </li>
                  ))}
                </ul>
              </div>

              <aside className="lg:col-span-1">
                <div className="sticky top-24 rounded-2xl bg-[#17181C] p-6 text-white">
                  <p className="mb-6 text-xs uppercase tracking-wider text-gray-400">
                    Краткая информация
                  </p>
                  <dl className="space-y-4 text-sm">
                    {[
                      ["Тип", project.type],
                      ["Площадь", project.area],
                      ["Срок", project.duration],
                      ["Бюджет", project.budget],
                      ["Год", project.year],
                      ["Район", project.location],
                    ].map(([label, value]) => (
                      <div
                        key={label}
                        className="flex items-start justify-between gap-4 border-b border-white/10 pb-4 last:border-b-0"
                      >
                        <dt className="text-gray-400">{label}</dt>
                        <dd className="text-right font-medium">{value}</dd>
                      </div>
                    ))}
                  </dl>
                  <Link
                    href="/#calculator"
                    className="mt-6 flex w-full items-center justify-center rounded-xl bg-[#C96F4A] px-6 py-3 text-sm font-semibold text-white transition-all hover:bg-[#AE5938]"
                  >
                    Рассчитать похожий проект
                  </Link>
                </div>
              </aside>
            </div>
          </div>
        </section>

        {/* 5. CTA */}
        <section className="bg-[#17181C] py-24 text-white md:py-32">
          <div className="mx-auto max-w-[1280px] px-6">
            <div className="grid grid-cols-1 items-start gap-12 lg:grid-cols-2">
              <div>
                <p className="mb-4 text-xs uppercase tracking-widest text-gray-400">
                  Контакты
                </p>
                <h2 className="mb-8 text-balance text-4xl font-medium tracking-tight md:text-5xl">
                  Обсудим ваш ремонт?
                </h2>
                <a
                  href="tel:+78435184020"
                  className="mb-4 block text-3xl font-medium tracking-tight md:text-4xl"
                >
                  +7 (843) 518-40-20
                </a>
                <p className="mb-10 text-[#9A9CA3]">
                  Казань, ул.&nbsp;Петербургская, 52
                  <br />
                  Ежедневно с&nbsp;10:00 до 20:00
                </p>
                <ul className="space-y-3 text-sm text-gray-300">
                  {[
                    "Фиксируем стоимость в договоре",
                    "Фотоотчёт каждые 3 дня",
                    "Гарантия 3 года",
                    "Бесплатный замер и смета",
                  ].map((item) => (
                    <li key={item} className="flex items-start gap-3">
                      <span aria-hidden="true" className="text-[#244C3A]">
                        ✓
                      </span>
                      {item}
                    </li>
                  ))}
                </ul>
              </div>

              <div className="rounded-2xl bg-white p-8 text-[#101114]">
                <div className="mb-6 flex items-center gap-3">
                  <span className="flex h-12 w-12 items-center justify-center rounded-full bg-[#244C3A] text-sm font-semibold text-white">
                    АР
                  </span>
                  <div>
                    <p className="font-semibold">Алина, руководитель проектов</p>
                    <p className="text-sm text-[#6F727A]">
                      Перезвоним и&nbsp;пришлём ориентир по&nbsp;бюджету
                    </p>
                  </div>
                </div>
                <ProjectCtaForm />
              </div>
            </div>
          </div>
        </section>
      </main>
    </>
  );
}
