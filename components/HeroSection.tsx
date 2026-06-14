import InteractiveAvatar from "./InteractiveAvatar";

export default function HeroSection() {
  return (
    <section className="relative overflow-hidden bg-hero-glow">
      {/* Decorative mesh grid */}
      <div
        className="pointer-events-none absolute inset-0 opacity-[0.03]"
        style={{
          backgroundImage:
            "linear-gradient(rgba(255,255,255,0.6) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.6) 1px, transparent 1px)",
          backgroundSize: "48px 48px",
        }}
        aria-hidden
      />
      {/* Purple glow blob */}
      <div
        className="pointer-events-none absolute -right-32 -top-32 h-96 w-96 rounded-full opacity-20 blur-3xl"
        style={{ background: "radial-gradient(circle, #7c3aed, transparent 70%)" }}
        aria-hidden
      />
      {/* Sky glow blob */}
      <div
        className="pointer-events-none absolute -bottom-24 -left-16 h-64 w-64 rounded-full opacity-10 blur-3xl"
        style={{ background: "radial-gradient(circle, #38bdf8, transparent 70%)" }}
        aria-hidden
      />

      <div className="relative mx-auto flex max-w-6xl flex-col items-center gap-12 px-6 pb-28 pt-32 lg:flex-row lg:items-center lg:gap-16 lg:pt-40">
        {/* Left: copy */}
        <div className="flex-1 text-center lg:text-left">
          {/* Membership badge */}
          <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-violet-500/30 bg-violet-500/10 px-4 py-1.5 text-xs font-medium text-violet-300">
            <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-violet-400" />
            FCM 영천 AI 탐험대 — 승인제 회원 커뮤니티
          </div>

          <h1 className="text-4xl font-extrabold leading-tight tracking-tight sm:text-5xl lg:text-6xl">
            AI가 바라보는
            <br />
            <span className="gradient-text">새로운 배움의 공간</span>
          </h1>
          <p className="mx-auto mt-6 max-w-xl text-base leading-relaxed text-slate-400 lg:mx-0 lg:text-lg">
            AI를 배우는 사람들의 실험실 — 하루 하나의 AI Workflow,
            함께 실험하고, 만들고, 공유합니다.
          </p>

          {/* CTA buttons — stacks on mobile */}
          <div className="mt-10 flex flex-col gap-3 sm:flex-row sm:flex-wrap sm:justify-center sm:gap-4 lg:justify-start">
            <a href="#join" className="btn-primary px-8 py-3.5">
              회원 가입하기
            </a>
            <a href="#archive" className="btn-ghost">
              Notion 자료 보기
            </a>
            <a href="#about" className="btn-ghost">
              동호회 소개 보기
            </a>
          </div>
        </div>

        {/* Right: interactive avatar */}
        <div className="flex flex-1 justify-center lg:justify-end">
          <InteractiveAvatar />
        </div>
      </div>

      {/* Scroll hint */}
      <div className="absolute bottom-6 left-1/2 -translate-x-1/2 hidden sm:flex">
        <div className="flex flex-col items-center gap-1.5 text-slate-600">
          <div className="h-8 w-px bg-gradient-to-b from-transparent to-slate-600" />
          <span className="text-[9px] tracking-widest">SCROLL</span>
        </div>
      </div>
    </section>
  );
}
