"use client";

import { useEffect, useState } from "react";

/* ------------------------------------------------------------------ */
/* Данные                                                              */
/* ------------------------------------------------------------------ */

type Status = "completed" | "current" | "planned";

type Snapshot = { status: Status; meta: string };

type Stage = {
  id: string;
  title: string;
  /** Состояние этапа на каждом шаге сценария (индекс = шаг). */
  timeline: [Snapshot, Snapshot, Snapshot, Snapshot];
};

/**
 * Сценарий из 4 значимых событий.
 * Шаг 0 → 1 → 2 → 3, затем плавный возврат к шагу 0.
 * Происходит редко (раз в STEP_MS), как в реальном ремонте.
 */
const STAGES: Stage[] = [
  {
    id: "plaster",
    title: "Штукатурка стен",
    timeline: [
      { status: "completed", meta: "Принято технадзором · вчера" },
      { status: "completed", meta: "Принято технадзором · вчера" },
      { status: "completed", meta: "Принято технадзором · вчера" },
      { status: "completed", meta: "Принято технадзором · вчера" },
    ],
  },
  {
    id: "tile",
    title: "Плитка в ванной",
    timeline: [
      { status: "current", meta: "Укладка · 2 из 3 стен" },
      { status: "completed", meta: "Принято · сегодня, 14:32" },
      { status: "completed", meta: "Принято · сегодня, 14:32" },
      { status: "completed", meta: "Принято · сегодня, 14:32" },
    ],
  },
  {
    id: "doors",
    title: "Межкомнатные двери",
    timeline: [
      { status: "planned", meta: "Следующий этап" },
      { status: "current", meta: "Монтаж коробов" },
      { status: "completed", meta: "Установлены · сегодня, 17:10" },
      { status: "completed", meta: "Установлены · сегодня, 17:10" },
    ],
  },
  {
    id: "report",
    title: "Фотоотчёт по этапу",
    timeline: [
      { status: "planned", meta: "После приёмки" },
      { status: "planned", meta: "После приёмки" },
      { status: "current", meta: "Готовим фото" },
      { status: "completed", meta: "Отправлен вам · сегодня, 18:42" },
    ],
  },
];

const STEPS = 4;

/** Пауза между событиями, мс. */
const STEP_MS = 12000;

/** Процент выполнения (совпадает с подписью под баром). */
const PROGRESS = 74;

/** Задержка стартового stagger-появления строк, мс. */
const STAGGER_START_MS = 300;
const STAGGER_STEP_MS = 140;

/* ------------------------------------------------------------------ */
/* Мелкие компоненты                                                   */
/* ------------------------------------------------------------------ */

/**
 * Иконка статуса: ✓ / ● / ○.
 * `pop` — только что завершённый этап: ✓ появляется с лёгким «щелчком».
 */
function StatusIcon({ status, pop }: { status: Status; pop: boolean }) {
  if (status === "current") {
    return (
      <span
        aria-hidden="true"
        className="h-2 w-2 animate-dot-pulse rounded-full bg-green-400 motion-reduce:animate-none"
      />
    );
  }
  if (status === "completed") {
    return (
      <span
        aria-hidden="true"
        className={`text-green-400 ${
          pop ? "animate-check-pop motion-reduce:animate-none" : ""
        }`}
      >
        ✓
      </span>
    );
  }
  return (
    <span aria-hidden="true" className="text-gray-600">
      ○
    </span>
  );
}

const STATUS_LABEL: Record<Status, string> = {
  completed: "завершено",
  current: "в работе",
  planned: "запланировано",
};

/* ------------------------------------------------------------------ */
/* Основной компонент                                                  */
/* ------------------------------------------------------------------ */

export default function DashboardActivity() {
  const [step, setStep] = useState(0);
  const [progress, setProgress] = useState(0);

  // Заполнение прогресс-бара при загрузке: 0 → 74%, delay 500ms, 1500ms.
  useEffect(() => {
    const reduceMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;
    if (reduceMotion) {
      setProgress(PROGRESS);
      return;
    }
    const timeout = setTimeout(() => setProgress(PROGRESS), 500);
    return () => clearTimeout(timeout);
  }, []);

  // Смена событий. Под prefers-reduced-motion лента остаётся статичной.
  useEffect(() => {
    const reduceMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;
    if (reduceMotion) return;

    const interval = setInterval(() => {
      if (document.hidden) return; // в фоновой вкладке не крутим
      setStep((prev) => (prev + 1) % STEPS);
    }, STEP_MS);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="w-full animate-hero-rise rounded-2xl border border-[rgba(255,255,255,0.12)] bg-[#17181C] p-6 shadow-[0_20px_60px_rgba(0,0,0,0.15)] motion-reduce:animate-none md:p-8">
      {/* Верхняя часть */}
      <p className="mb-2 text-xs uppercase tracking-wider text-gray-400">
        Текущий объект
      </p>
      <h2 className="mb-6 text-xl font-semibold text-white">
        ЖК «Символ» · 64&nbsp;м²
      </h2>

      {/* Лента: 4 события */}
      <div className="min-h-[200px] rounded-xl bg-[#101114]/50 p-4">
        <ul
          aria-live="polite"
          aria-atomic="false"
          aria-label="Статус этапов ремонта"
          className="flex flex-col gap-1"
        >
          {STAGES.map((stage, index) => {
            const { status, meta } = stage.timeline[step];
            const prevStatus = step > 0 ? stage.timeline[step - 1].status : null;
            // Этап только что перешёл в «completed» — подсвечиваем вспышкой.
            const justCompleted =
              status === "completed" && prevStatus !== null && prevStatus !== "completed";
            const isCurrent = status === "current";

            return (
              <li
                key={stage.id}
                aria-label={`${stage.title}: ${STATUS_LABEL[status]}. ${meta}`}
                // Поочерёдное появление при загрузке
                style={{
                  animationDelay: `${STAGGER_START_MS + index * STAGGER_STEP_MS}ms`,
                }}
                className="animate-row-in motion-reduce:animate-none"
              >
                {/* key по статусу — перезапускает вспышку при завершении */}
                <div
                  key={justCompleted ? `${stage.id}-done-${step}` : stage.id}
                  className={`group relative flex items-start gap-3 rounded-lg px-3 py-2.5 transition-colors duration-300 hover:bg-white/5 ${
                    isCurrent ? "bg-white/5" : ""
                  } ${justCompleted ? "animate-row-flash motion-reduce:animate-none" : ""}`}
                >
                  {/* Акцентная полоска у активного события */}
                  <span
                    aria-hidden="true"
                    className={`absolute left-0 top-2 bottom-2 w-0.5 rounded-full bg-[#244C3A] transition-opacity duration-300 ${
                      isCurrent ? "opacity-100" : "opacity-0"
                    }`}
                  />

                  <span className="flex h-5 w-4 shrink-0 items-center justify-center text-sm">
                    <StatusIcon status={status} pop={justCompleted} />
                  </span>

                  <div className="min-w-0">
                    <p
                      className={`text-sm font-medium transition-colors duration-300 group-hover:text-white ${
                        status === "planned"
                          ? "text-gray-500"
                          : isCurrent
                            ? "text-white"
                            : "text-gray-300"
                      }`}
                    >
                      {stage.title}
                    </p>
                    {/* key по тексту — мягкая смена подписи */}
                    <p
                      key={meta}
                      className="mt-0.5 animate-meta-in text-xs text-gray-500 motion-reduce:animate-none"
                    >
                      {meta}
                    </p>
                  </div>
                </div>
              </li>
            );
          })}
        </ul>
      </div>

      {/* Нижняя часть */}
      <hr className="my-4 border-t border-gray-700" />

      <div
        role="progressbar"
        aria-valuemin={0}
        aria-valuemax={100}
        aria-valuenow={PROGRESS}
        aria-label="Ход ремонта"
        className="h-2 overflow-hidden rounded-full bg-gray-700"
      >
        <div
          className="h-full rounded-full bg-[#244C3A] transition-[width] duration-[1500ms] ease-[cubic-bezier(0.22,1,0.36,1)] motion-reduce:transition-none"
          style={{ width: `${progress}%` }}
        />
      </div>
      <p className="mt-2 text-sm text-gray-400">{PROGRESS}% выполнено</p>

      <p className="mt-4 mb-1 text-lg font-semibold text-white">
        Бюджет: 1&nbsp;160&nbsp;000&nbsp;₽
      </p>
      <p className="mb-4 text-sm text-green-400">✓ зафиксирован</p>
      <p className="text-sm text-gray-500">Последний отчёт: сегодня</p>
    </div>
  );
}
