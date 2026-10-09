"use client";

import { FormEvent, useEffect, useRef, useState } from "react";

type Sender = "bot" | "user";

type ChatMessage = {
  id: number;
  text: string;
  sender: Sender;
  time: string;
};

const WELCOME_TEXT =
  "Привет! Я помогу рассчитать стоимость ремонта или отвечу на вопросы.";

const BOT_REPLY =
  "Спасибо! Наш менеджер свяжется с вами в течение 15 минут.";

function currentTime() {
  return new Intl.DateTimeFormat("ru-RU", {
    hour: "2-digit",
    minute: "2-digit",
  }).format(new Date());
}

function ChatIcon({ size = 16 }: { size?: number }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <path d="M21 15a2 2 0 0 1-2 2H8l-4 4V5a2 2 0 0 1 2-2h13a2 2 0 0 1 2 2z" />
    </svg>
  );
}

function SendIcon() {
  return (
    <svg
      width="16"
      height="16"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2.2"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <path d="M12 19V5" />
      <path d="M5 12l7-7 7 7" />
    </svg>
  );
}

export default function AIChat() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<ChatMessage[]>([
    { id: 0, text: WELCOME_TEXT, sender: "bot", time: "Сейчас" },
  ]);
  const [inputValue, setInputValue] = useState("");

  const bottomRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const nextId = useRef(1);
  const replyTimeout = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ block: "end" });
  }, [messages, isOpen]);

  useEffect(() => {
    if (isOpen) inputRef.current?.focus();
  }, [isOpen]);

  useEffect(
    () => () => {
      if (replyTimeout.current) clearTimeout(replyTimeout.current);
    },
    [],
  );

  const sendMessage = (e: FormEvent) => {
    e.preventDefault();
    const text = inputValue.trim();
    if (!text) return;

    const userMessage: ChatMessage = {
      id: nextId.current++,
      text,
      sender: "user",
      time: currentTime(),
    };

    setMessages((prev) => [...prev, userMessage]);
    setInputValue("");

    if (replyTimeout.current) clearTimeout(replyTimeout.current);
    replyTimeout.current = setTimeout(() => {
      setMessages((prev) => [
        ...prev,
        {
          id: nextId.current++,
          text: BOT_REPLY,
          sender: "bot",
          time: currentTime(),
        },
      ]);
    }, 1500);
  };

  return (
    <>
      {isOpen && (
        <div
          role="dialog"
          aria-modal="true"
          aria-labelledby="ai-chat-title"
          className="fixed right-6 bottom-24 z-50 flex h-[520px] w-[calc(100%-48px)] max-w-[380px] animate-chat-in flex-col overflow-hidden rounded-[28px] border border-[rgba(16,17,20,0.08)] bg-white shadow-2xl motion-reduce:animate-none sm:w-[380px]"
        >
          {/* Header */}
          <div className="flex items-center gap-3 bg-[#17181C] p-5">
            <div className="relative shrink-0">
              <span className="flex h-10 w-10 items-center justify-center rounded-full bg-[#244C3A] text-white">
                <ChatIcon />
              </span>
              <span
                aria-hidden="true"
                className="absolute right-0 bottom-0 h-3 w-3 rounded-full border-2 border-[#17181C] bg-green-400"
              />
            </div>
            <div className="min-w-0 flex-1">
              <p id="ai-chat-title" className="text-base font-semibold text-white">
                AI-помощник
              </p>
              <p className="text-xs text-gray-400">Отвечаю 24/7</p>
            </div>
            <button
              type="button"
              aria-label="Закрыть чат"
              onClick={() => setIsOpen(false)}
              className="text-xl leading-none text-white/60 transition-colors hover:text-white"
            >
              ×
            </button>
          </div>

          {/* Сообщения */}
          <div className="flex-1 overflow-y-auto bg-[#F7F7F5] p-5">
            <div className="mb-4 flex justify-center">
              <span className="rounded-full bg-[#101114]/10 px-3 py-1 text-xs text-[#6F727A]">
                Сейчас
              </span>
            </div>

            {messages.map((message) => (
              <div
                key={message.id}
                className={`mb-3 ${message.sender === "user" ? "ml-auto max-w-[80%]" : "max-w-[80%]"}`}
              >
                <p
                  className={`p-3.5 text-sm leading-relaxed ${
                    message.sender === "user"
                      ? "rounded-2xl rounded-tr-sm bg-[#244C3A] text-white"
                      : "rounded-2xl rounded-tl-sm bg-white text-[#101114] shadow-sm"
                  }`}
                >
                  {message.text}
                </p>
                {message.sender === "user" && (
                  <p className="mt-1 text-right text-xs text-[#6F727A]">
                    Отправлено
                  </p>
                )}
              </div>
            ))}
            <div ref={bottomRef} />
          </div>

          {/* Поле ввода */}
          <form
            onSubmit={sendMessage}
            className="flex items-center gap-2 border-t border-[rgba(16,17,20,0.08)] bg-white p-4"
          >
            <label htmlFor="ai-chat-input" className="sr-only">
              Сообщение
            </label>
            <input
              id="ai-chat-input"
              ref={inputRef}
              type="text"
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              placeholder="Напишите вопрос…"
              className="flex-1 border-none bg-transparent text-sm text-[#101114] outline-none placeholder:text-[#6F727A]"
            />
            <button
              type="submit"
              aria-label="Отправить"
              className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-[#C96F4A] text-white transition-colors hover:bg-[#AE5938]"
            >
              <SendIcon />
            </button>
          </form>
        </div>
      )}

      <button
        type="button"
        aria-label={isOpen ? "Закрыть чат" : "Открыть чат с AI-помощником"}
        aria-expanded={isOpen}
        onClick={() => setIsOpen((open) => !open)}
        className="fixed right-6 bottom-6 z-50 flex h-14 w-auto items-center gap-3 rounded-full border border-[rgba(16,17,20,0.08)] bg-white px-6 shadow-lg transition-all hover:scale-[1.02] motion-reduce:hover:scale-100"
      >
        <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-[#17181C] text-white">
          <ChatIcon size={15} />
        </span>
        <span className="text-base font-medium text-[#101114]">
          Задайте вопрос...
        </span>
      </button>
    </>
  );
}
