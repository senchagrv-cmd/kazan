import FadeIn from "@/components/FadeIn";
import { projects } from "@/lib/projects";
import Link from "next/link";

export default function Projects() {
  return (
    <section
      id="projects"
      aria-labelledby="projects-title"
      className="scroll-mt-16 bg-[#F7F7F5]"
    >
      <div className="mx-auto max-w-[1280px] px-6 py-24 md:py-32">
        <FadeIn>
          <div className="mb-16">
            <p className="mb-4 text-xs uppercase tracking-widest text-[#6F727A]">
              02 / Портфолио
            </p>
            <h2
              id="projects-title"
              className="mb-6 text-balance text-4xl font-medium tracking-tight text-[#101114] md:text-6xl"
            >
              Реальные объекты, реальные сроки
            </h2>
            <p className="max-w-2xl text-lg text-[#6F727A]">
              Каждый проект — это зафиксированный бюджет, понятные сроки
              и&nbsp;интерьер, в&nbsp;котором действительно удобно жить.
            </p>
          </div>
        </FadeIn>

        <ul className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
          {projects.map((project, index) => (
            <li key={project.slug}>
              <FadeIn delay={index * 100}>
              <Link
                href={`/projects/${project.slug}`}
                className="hover-lift group block overflow-hidden rounded-2xl border border-[rgba(16,17,20,0.08)] bg-white"
              >
                <article>
                  <div className="relative aspect-[4/3] overflow-hidden rounded-t-2xl">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                      src={project.images[0]}
                      alt={project.title}
                      className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                    />
                    <span className="absolute top-4 left-4 z-10 rounded-full border border-[rgba(16,17,20,0.08)] bg-white/95 px-4 py-2 text-sm font-medium text-[#101114] backdrop-blur-sm">
                      {project.type}
                    </span>
                    <div className="absolute inset-0 flex items-center justify-center bg-black/40 opacity-0 transition-opacity duration-300 group-hover:opacity-100">
                      <span className="text-lg font-medium text-white">
                        Смотреть проект →
                      </span>
                    </div>
                  </div>

                  <div className="p-6">
                    <h3 className="mb-3 text-xl font-semibold text-[#101114]">
                      {project.title}
                    </h3>
                    <p className="mb-6 line-clamp-2 text-sm leading-relaxed text-[#6F727A]">
                      {project.summary}
                    </p>

                    <div className="mb-4 border-t border-[rgba(16,17,20,0.08)]" />

                    <dl className="grid grid-cols-3 gap-4">
                      <div>
                        <dd className="text-lg font-semibold text-[#101114]">
                          {project.area}
                        </dd>
                        <dt className="mt-1 text-xs text-[#6F727A]">площадь</dt>
                      </div>
                      <div>
                        <dd className="text-lg font-semibold text-[#101114]">
                          {project.duration}
                        </dd>
                        <dt className="mt-1 text-xs text-[#6F727A]">срок</dt>
                      </div>
                      <div>
                        <dd className="text-lg font-semibold text-[#101114]">
                          {project.budget}
                        </dd>
                        <dt className="mt-1 text-xs text-[#6F727A]">бюджет</dt>
                      </div>
                    </dl>
                  </div>
                </article>
              </Link>
              </FadeIn>
            </li>
          ))}
        </ul>

        <div className="mt-16 flex justify-center">
          <Link
            href="/projects"
            className="rounded-xl border border-[rgba(16,17,20,0.10)] px-8 py-3 text-base font-medium text-[#101114] transition-all duration-300 hover:bg-[#101114] hover:text-white"
          >
            Смотреть все проекты →
          </Link>
        </div>
      </div>
    </section>
  );
}
