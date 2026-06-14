export default function About() {
  const tools = [
    "ChatGPT",
    "Copilot",
    "Claude",
    "Gemini",
    "Notion",
    "Vercel",
    "Canva",
    "자동화 도구",
  ];

  return (
    <section id="about" className="mx-auto max-w-6xl px-6 py-24">
      <p className="mb-3 text-xs font-semibold uppercase tracking-widest text-violet-400">
        About
      </p>
      <h2 className="section-title">
        <span className="gradient-text">FCM 영천 AI 탐험대</span>
      </h2>

      <div className="mt-10 grid gap-8 lg:grid-cols-[1.4fr_1fr]">
        <p className="text-lg leading-relaxed text-slate-300">
          우리는 ChatGPT, Copilot, Claude, Gemini, Notion, Vercel, Canva,
          자동화 도구를 실험하고 실무형 AI 활용법을 공유하는 커뮤니티입니다.
          영업 자료도, 강의 판매도 없습니다 — 직접 만들어 보고, 실패하고,
          되는 방법을 기록해서 나누는{" "}
          <strong className="text-white">실험실</strong>에 가깝습니다.
        </p>

        <div className="glass rounded-2xl p-6">
          <p className="mb-4 text-xs font-semibold uppercase tracking-widest text-slate-500">
            우리가 만지는 도구들
          </p>
          <div className="flex flex-wrap gap-2">
            {tools.map((tool) => (
              <span key={tool} className="tag">
                {tool}
              </span>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
