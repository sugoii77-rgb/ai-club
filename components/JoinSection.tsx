"use client";

import { useState } from "react";

const interests = [
  "프롬프트 엔지니어링",
  "업무 자동화",
  "웹앱 만들기",
  "AI 아바타/크리에이티브",
  "데이터 분석",
];

export default function JoinSection() {
  const [status, setStatus] = useState<"idle" | "sending" | "done" | "error">(
    "idle"
  );

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setStatus("sending");
    const form = e.currentTarget;
    const data = Object.fromEntries(new FormData(form).entries());
    try {
      const res = await fetch("/api/join", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      if (!res.ok) throw new Error("failed");
      setStatus("done");
      form.reset();
    } catch {
      setStatus("error");
    }
  }

  return (
    <section id="join" className="mx-auto max-w-6xl px-6 py-24">
      <div className="glass relative overflow-hidden rounded-3xl p-8 sm:p-12">
        <div
          className="pointer-events-none absolute inset-0 opacity-50"
          style={{
            background:
              "radial-gradient(50% 80% at 80% 20%, rgba(139,92,246,0.18), transparent 70%)",
          }}
          aria-hidden
        />
        <div className="relative grid gap-10 lg:grid-cols-2">
          <div>
            <h2 className="section-title">
              Join — <span className="gradient-text">같이 실험해요</span>
            </h2>
            <p className="mt-4 leading-relaxed text-slate-300">
              가입하면 매주 워크플로 실습 안내와 Notion 아카이브 접근 권한을
              보내드립니다. 회비도, 강매도 없습니다.
            </p>
          </div>

          {status === "done" ? (
            <div className="flex flex-col items-center justify-center rounded-2xl bg-emerald-400/10 p-8 text-center ring-1 ring-emerald-400/30">
              <span className="text-3xl">🎉</span>
              <p className="mt-3 text-lg font-semibold text-emerald-300">
                환영합니다!
              </p>
              <p className="mt-1 text-sm text-slate-300">
                가입 신청이 접수되었어요. 곧 이메일로 안내를 보내드릴게요.
              </p>
            </div>
          ) : (
            <form onSubmit={onSubmit} className="space-y-4">
              <input
                name="name"
                required
                placeholder="이름"
                className="w-full rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-sm text-white placeholder-slate-500 outline-none transition-colors focus:border-violet-400/60"
              />
              <input
                name="email"
                type="email"
                required
                placeholder="이메일"
                className="w-full rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-sm text-white placeholder-slate-500 outline-none transition-colors focus:border-violet-400/60"
              />
              <select
                name="interest"
                required
                defaultValue=""
                className="w-full rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-sm text-slate-300 outline-none transition-colors focus:border-violet-400/60 [&>option]:bg-navy"
              >
                <option value="" disabled>
                  관심 분야를 선택하세요
                </option>
                {interests.map((i) => (
                  <option key={i} value={i}>
                    {i}
                  </option>
                ))}
              </select>
              <button
                type="submit"
                disabled={status === "sending"}
                className="btn-primary w-full disabled:opacity-60"
              >
                {status === "sending" ? "보내는 중…" : "가입 신청하기"}
              </button>
              {status === "error" && (
                <p className="text-sm text-rose-400">
                  전송에 실패했어요. 잠시 후 다시 시도해 주세요.
                </p>
              )}
            </form>
          )}
        </div>
      </div>
    </section>
  );
}
