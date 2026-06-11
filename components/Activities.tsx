const activities = [
  {
    icon: "⚡",
    title: "AI Workflow 실습",
    desc: "하루 하나, 실제 업무에 쓰는 AI 워크플로를 같이 만들어 봅니다.",
  },
  {
    icon: "💬",
    title: "프롬프트 공유",
    desc: "잘 되는 프롬프트, 실패한 프롬프트를 패턴으로 정리해 공유합니다.",
  },
  {
    icon: "🛠️",
    title: "웹앱/자동화 만들기",
    desc: "아이디어를 Vercel 웹앱과 자동화 파이프라인으로 직접 구현합니다.",
  },
  {
    icon: "📚",
    title: "Notion 자료 아카이브",
    desc: "모든 실험 기록이 Notion에 차곡차곡 쌓입니다. 언제든 다시 찾아보세요.",
  },
  {
    icon: "🎤",
    title: "월간 발표/스터디",
    desc: "한 달에 한 번, 각자의 실험을 발표하고 함께 깊게 파봅니다.",
  },
];

export default function Activities() {
  return (
    <section id="activities" className="mx-auto max-w-6xl px-6 py-24">
      <h2 className="section-title">
        Activities — <span className="gradient-text">매주 하는 것들</span>
      </h2>
      <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {activities.map((a) => (
          <div key={a.title} className="glass glass-hover rounded-2xl p-6">
            <div className="text-2xl">{a.icon}</div>
            <h3 className="mt-4 text-lg font-semibold text-white">{a.title}</h3>
            <p className="mt-2 text-sm leading-relaxed text-slate-400">
              {a.desc}
            </p>
          </div>
        ))}
      </div>
    </section>
  );
}
