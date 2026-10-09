import FadeIn from "@/components/FadeIn";
import Link from "next/link";

const reviews = [
  {
    name: "Анна и Михаил",
    object: "ЖК «Символ» · 71 м²",
    quote:
      "Нам было важно не просто сделать красивый ремонт, а уложиться в понятный бюджет. Команда подготовила смету заранее, держала нас в курсе на каждом этапе и сдала квартиру без неприятных сюрпризов.",
    image:
      "https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?w=800&q=75&fm=webp",
    tags: ["Дизайнерский", "4 месяца", "1,9 млн ₽"],
  },
  {
    name: "Екатерина",
    object: "ЖК «Сердце столицы» · 92 м²",
    quote:
      "Понравилось, что все вопросы решались через одного ответственного человека. Не пришлось самой искать мастеров и контролировать процесс.",
    image:
      "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=800&q=75&fm=webp",
    tags: ["Капитальный", "5 месяцев", "2,0 млн ₽"],
  },
  {
    name: "Дмитрий",
    object: "ЖК «Резиденции архитекторов» · 64 м²",
    quote:
      "Боялся, что цена вырастет в процессе. Но ребята зафиксировали всё в договоре. Даже непредвиденные расходы взяли на себя.",
    image:
      "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=800&q=75&fm=webp",
    tags: ["Под ключ", "3,5 месяца", "1,4 млн ₽"],
  },
];

function Stars({ className }: { className?: string }) {
  return (
    <p className={className} aria-label="Оценка 5 из 5">
      ★★★★★
    </p>
  );
}

export default function Reviews() {
  return (
    <section
      id="reviews"
      aria-labelledby="reviews-title"
      className="scroll-mt-16 bg-[#F7F7F5] py-32"
    >
      <div className="mx-auto max-w-[1280px] px-6">
        <FadeIn>
          <div className="mb-12">
            <p className="mb-4 text-xs uppercase tracking-widest text-[#6F727A]">
              05 / Отзывы
            </p>
            <h2
              id="reviews-title"
              className="text-balance text-4xl font-medium tracking-tight text-[#101114] md:text-5xl"
            >
              Что говорят наши клиенты
            </h2>
          </div>
        </FadeIn>

        <ul className="grid grid-cols-1 gap-6 md:grid-cols-3">
          {reviews.map((review, index) => (
            <li key={review.name}>
              <FadeIn delay={index * 100}>
              <article className="hover-lift rounded-2xl border border-[rgba(16,17,20,0.08)] bg-white p-6">
                <div className="mb-5 overflow-hidden rounded-xl">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={review.image}
                    alt={review.object}
                    className="aspect-[16/10] w-full object-cover"
                  />
                </div>
                <h3 className="mb-1 text-lg font-semibold text-[#101114]">
                  {review.name}
                </h3>
                <p className="mb-3 text-sm text-[#6F727A]">{review.object}</p>
                <Stars className="mb-3 text-sm text-[#244C3A]" />
                <blockquote className="mb-5 line-clamp-4 text-base leading-relaxed text-[#101114]">
                  {review.quote}
                </blockquote>
                <ul className="flex flex-wrap gap-2">
                  {review.tags.map((tag) => (
                    <li
                      key={tag}
                      className="rounded-full bg-[#F7F7F5] px-3 py-1.5 text-xs text-[#101114]"
                    >
                      {tag}
                    </li>
                  ))}
                </ul>
              </article>
              </FadeIn>
            </li>
          ))}
        </ul>

        <div className="mt-16 flex flex-col items-center justify-between gap-6 rounded-2xl border border-[rgba(16,17,20,0.08)] bg-white p-6 md:flex-row md:p-8">
          <div className="flex items-center gap-6">
            <p className="text-5xl font-semibold text-[#101114]">4.9</p>
            <div className="flex flex-col">
              <p className="text-base font-medium text-[#101114]">
                Средняя оценка клиентов
              </p>
              <p className="text-sm text-[#6F727A]">
                На&nbsp;основе отзывов владельцев квартир
              </p>
              <Stars className="mt-1 text-base text-[#244C3A]" />
            </div>
          </div>
          <Link
            href="#reviews"
            className="rounded-xl border border-[rgba(16,17,20,0.10)] px-6 py-3 text-base font-medium text-[#101114] transition hover:bg-[#101114] hover:text-white"
          >
            Смотреть все отзывы →
          </Link>
        </div>
      </div>
    </section>
  );
}
