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
  const [status, setStatus] = useState<
    "idle" | "sending" | "done" | "duplicate" | "error"
  >("idle");
  const [message, setMessage] = useState("");

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setStatus("sending");
    setMessage("");
    const form = e.currentTarget;
    const data = Object.fromEntries(new FormData(form).entries());
    try {
      const res = await fetch("/api/join", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });

      const responseBody = (await res.json().catch(() => null)) as {
        message?: string;
        error?: string;
      } | null;

      if (res.status === 409) {
        setStatus("duplicate");
        setMessage(
          responseBody?.error ?? "이미 접수된 이메일이에요. 다른 이메일을 사용해 주세요."
        );
        return;
      }

      if (!res.ok) {
        throw new Error(responseBody?.error ?? "failed");
      }

      setStatus("done");
      setMessage(
        responseBody?.message ?? "Your application has been submitted successfully."
      );
      form.reset();
    } catch {
      setStatus("error");
    }
  }

  return (
    <section id="join" className="mx-auto max-w-6xl px-6 py-24">
      <div className="glass relative overflow-hidden rounded-3xl p-8 sm:p-12">
        {/* Background glow */}
        <div
          className="pointer-events-none absolute inset-0 opacity-50"
          style={{
            background:
              "radial-gradient(50% 80% at 80% 20%, rgba(139,92,246,0.18), transparent 70%)",
          }}
          aria-hidden
        />

        <div className="relative grid gap-10 lg:grid-cols-2">
          {/* Left: description */}
          <div>
            {/* Membership type badge */}
            <div className="mb-5 inline-flex items-center gap-2 rounded-full border border-violet-500/30 bg-violet-500/10 px-3 py-1.5 text-xs font-medium text-violet-300">
              <span>🔒</span>
              <span>승인제 회원 커뮤니티</span>
            </div>

            <h2 className="section-title">
              Join — <span className="gradient-text">같이 실험해요</span>
            </h2>
            <p className="mt-4 leading-relaxed text-slate-300">
              가입하면 매주 워크플로 실습 안내와 Notion 아카이브 접근 권한을
              보내드립니다. 회비도, 강매도 없습니다.
            </p>

            {/* Approval flow steps */}
            <div className="mt-7 space-y-3">
              {[
                { step: "01", label: "신청서 제출" },
                { step: "02", label: "관리자 검토 및 승인" },
                { step: "03", label: "Google 로그인 후 글쓰기 활성화" },
              ].map(({ step, label }) => (
                <div key={step} className="flex items-center gap-3">
                  <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full border border-violet-500/30 bg-violet-500/10 text-[10px] font-bold text-violet-400">
                    {step}
                  </span>
                  <span className="text-sm text-slate-300">{label}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Right: form */}
          {status === "done" ? (
            <div className="flex flex-col items-center justify-center rounded-2xl bg-emerald-400/10 p-8 text-center ring-1 ring-emerald-400/30">
              <span className="text-3xl">🎉</span>
              <p className="mt-3 text-lg font-semibold text-emerald-300">
                환영합니다!
              </p>
              <p className="mt-1 text-sm text-slate-300">
                {message || "가입 신청이 접수되었어요. 곧 이메일로 안내를 보내드릴게요."}
              </p>
            </div>
          ) : (
            <form onSubmit={onSubmit} className="space-y-4">
              <input
                name="name"
                required
                placeholder="이름"
                className="w-full rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-sm text-white placeholder-slate-500 outline-none transition-colors focus:border-violet-400/60 focus:ring-1 focus:ring-violet-400/20"
              />
              <input
                name="email"
                type="email"
                required
                placeholder="이메일 (Google 계정 권장)"
                className="w-full rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-sm text-white placeholder-slate-500 outline-none transition-colors focus:border-violet-400/60 focus:ring-1 focus:ring-violet-400/20"
              />
              <select
                name="interest"
                required
                defaultValue=""
                className="w-full rounded-xl border border-white/10 bg-[#0d1120] px-4 py-3 text-sm text-slate-300 outline-none transition-colors focus:border-violet-400/60 focus:ring-1 focus:ring-violet-400/20"
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
                className="btn-primary w-full py-3.5 disabled:opacity-60"
              >
                {status === "sending" ? "보내는 중…" : "가입 신청하기"}
              </button>
              {status === "duplicate" && (
                <p className="text-sm text-amber-300">
                  {message || "이미 접수된 이메일이에요. 다른 이메일을 사용해 주세요."}
                </p>
              )}
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
