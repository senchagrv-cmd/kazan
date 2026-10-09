import FadeIn from "@/components/FadeIn";

const team = [
  {
    role: "Руководитель проектов",
    name: "Анна Иванова",
    desc: "Контролирует сроки, коммуникацию с клиентом, смету и качество реализации проекта.",
    exp: "12 лет",
    objects: "80+",
    photo:
      "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=800&q=75&fm=webp",
  },
  {
    role: "Ведущий дизайнер",
    name: "Мария Соколова",
    desc: "Отвечает за планировочные решения, подбор материалов и визуальную целостность интерьера.",
    exp: "8 лет",
    objects: "60+",
    photo:
      "https://images.unsplash.com/photo-1580489944761-15a19d654956?w=800&q=75&fm=webp",
  },
  {
    role: "Строительный контроль",
    name: "Алексей Морозов",
    desc: "Следит за технологией работ, качеством исполнения и порядком на объекте.",
    exp: "15 лет",
    objects: "120+",
    photo:
      "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=800&q=75&fm=webp",
  },
];

export default function Team() {
  return (
    <section
      id="team"
      aria-labelledby="team-title"
      className="scroll-mt-16 bg-white py-32"
    >
      <div className="mx-auto max-w-[1280px] px-6">
        <FadeIn>
          <div className="mb-16">
            <p className="mb-4 text-xs uppercase tracking-widest text-[#6F727A]">
              06 / Команда
            </p>
            <h2
              id="team-title"
              className="mb-6 text-balance text-4xl font-medium tracking-tight text-[#101114] md:text-5xl"
            >
              Люди, которые ведут ваш ремонт
            </h2>
            <p className="max-w-3xl text-lg text-[#6F727A]">
              За каждым проектом стоит команда специалистов: руководитель проекта,
              дизайнер и&nbsp;технический специалист на&nbsp;объекте.
            </p>
          </div>
        </FadeIn>

        <ul className="mb-16 grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
          {team.map((member, index) => (
            <li key={member.name}>
              <FadeIn delay={index * 100}>
              <article className="hover-lift overflow-hidden rounded-2xl border border-[rgba(16,17,20,0.08)] bg-[#F7F7F5]">
                <div className="aspect-[4/5] overflow-hidden">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={member.photo}
                    alt={member.name}
                    className="h-full w-full object-cover"
                  />
                </div>
                <div className="p-6">
                  <p className="mb-2 text-xs uppercase tracking-widest text-[#244C3A]">
                    {member.role}
                  </p>
                  <h3 className="mb-3 text-xl font-semibold text-[#101114]">
                    {member.name}
                  </h3>
                  <p className="mb-4 text-sm leading-relaxed text-[#6F727A]">
                    {member.desc}
                  </p>
                  <ul className="flex flex-wrap gap-2">
                    <li className="rounded-full border border-[rgba(16,17,20,0.08)] bg-white px-3 py-1.5 text-xs text-[#101114]">
                      {member.exp} опыта
                    </li>
                    <li className="rounded-full border border-[rgba(16,17,20,0.08)] bg-white px-3 py-1.5 text-xs text-[#101114]">
                      {member.objects}&nbsp;объектов
                    </li>
                  </ul>
                </div>
              </article>
              </FadeIn>
            </li>
          ))}
        </ul>

        <div className="flex flex-col items-center justify-between gap-6 rounded-2xl border border-[rgba(16,17,20,0.08)] bg-[#F7F7F5] p-6 md:flex-row md:p-8">
          <p className="text-base text-[#101114]">
            Один ответственный руководитель проекта сопровождает вас на&nbsp;всех
            этапах ремонта.
          </p>
          <a
            href="#team"
            className="shrink-0 rounded-xl bg-[#101114] px-6 py-3 font-medium whitespace-nowrap text-white transition hover:bg-[#17181C]"
          >
            Познакомиться с&nbsp;командой →
          </a>
        </div>
      </div>
    </section>
  );
}
