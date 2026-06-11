import InteractiveAvatar from "./InteractiveAvatar";

export default function HeroSection() {
  return (
    <section className="relative overflow-hidden bg-hero-glow">
      <div className="mx-auto flex max-w-6xl flex-col items-center gap-12 px-6 pb-20 pt-28 lg:flex-row lg:items-center lg:gap-16 lg:pt-36">
        {/* left: copy */}
        <div className="flex-1 text-center lg:text-left">
          <span className="tag mb-6 inline-block">
            FCM 영천 AI 탐험대 — 오늘도, 함께 탐험!
          </span>
          <h1 className="text-4xl font-extrabold leading-tight tracking-tight sm:text-5xl lg:text-6xl">
            AI가 바라보는
            <br />
            <span className="gradient-text">새로운 배움의 공간</span>
          </h1>
          <p className="mx-auto mt-6 max-w-xl text-lg text-slate-300 lg:mx-0">
            AI를 배우는 사람들의 실험실 — 하루 하나의 AI Workflow,
            함께 실험하고, 만들고, 공유합니다.
          </p>
          <div className="mt-9 flex flex-wrap justify-center gap-4 lg:justify-start">
            <a href="#join" className="btn-primary">
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

        {/* right: interactive avatar */}
        <div className="flex flex-1 justify-center lg:justify-end">
          <InteractiveAvatar />
        </div>
      </div>
    </section>
  );
}
