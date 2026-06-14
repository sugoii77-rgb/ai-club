const projects = [
  {
    title: "AI 자동화 게시물 생성",
    desc: "주제만 넣으면 초안 작성부터 이미지, 발행까지 이어지는 콘텐츠 파이프라인.",
    stack: ["ChatGPT", "Automation"],
    gradient: "from-violet-500/30 to-fuchsia-500/10",
    url: "",
  },
  {
    title: "Notion 기반 지식 아카이브",
    desc: "동호회의 모든 실험과 프롬프트가 검색 가능한 Notion DB로 쌓입니다.",
    stack: ["Notion", "Database"],
    gradient: "from-sky-500/30 to-violet-500/10",
    url: "",
  },
  {
    title: "Vercel 웹앱 배포",
    desc: "Vibe Coding 입문 가이드처럼 만든 앱을 GitHub→Vercel로 바로 세상에 공개합니다.",
    stack: ["Next.js", "Vercel"],
    gradient: "from-fuchsia-500/30 to-sky-500/10",
    url: "",
  },
  {
    title: "Copilot 업무 활용 스터디",
    desc: "엑셀, 문서, 메일 — 매일 하는 일을 Copilot으로 절반으로 줄이는 연구.",
    stack: ["Copilot", "Office"],
    gradient: "from-blue-500/30 to-emerald-500/10",
    url: "",
  },
  {
    title: "🇯🇵 일본어 레스토랑 생존 회화",
    desc: "일본 레스토랑에서 당황하지 않기 위한 30개 핵심 표현. 입장부터 계산까지 단계별 시나리오.",
    stack: ["TTS", "Vanilla JS", "Vercel"],
    gradient: "from-red-500/30 to-orange-500/10",
    url: "https://japanese-restaurant-survival.vercel.app",
  },
  {
    title: "🇺🇸 영어 레스토랑 생존 회화",
    desc: "해외 영어권 레스토랑에서 자연스럽게 대화하기 위한 30개 핵심 표현.",
    stack: ["TTS", "Vanilla JS", "Vercel"],
    gradient: "from-blue-500/30 to-sky-500/10",
    url: "https://english-restaurant-survival.vercel.app",
  },
  {
    title: "🇪🇸 스페인어 레스토랑 생존 회화",
    desc: "스페인·중남미 레스토랑에서 바로 쓸 수 있는 30개 핵심 스페인어 표현.",
    stack: ["TTS", "Vanilla JS", "Vercel"],
    gradient: "from-yellow-500/30 to-red-500/10",
    url: "https://spanish-restaurant-survival.vercel.app",
  },
  {
    title: "💑 영어 레스토랑 부부 대화 (중급)",
    desc: "부부가 함께 영어 레스토랑에서 나누는 자연스러운 대화. 섀도잉 연습에 최적화.",
    stack: ["TTS", "Vanilla JS", "Vercel"],
    gradient: "from-pink-500/30 to-rose-500/10",
    url: "https://english-restaurant-dialogue.vercel.app",
  },
  {
    title: "🍶 사케 마스터 스터디",
    desc: "일본 47개 도도부현의 대표 사케를 인터랙티브 지도로 탐방. 250종+ 사케 데이터 기반.",
    stack: ["Claude", "ChatGPT", "Vercel"],
    gradient: "from-amber-500/30 to-yellow-500/10",
    url: "https://sake-regions-study.vercel.app",
  },
  {
    title: "🍷 와인 마스터 스터디",
    desc: "프랑스·이탈리아·신세계 와인을 지역별·품종별로 완전정복하는 인터랙티브 스터디 앱.",
    stack: ["Claude", "ChatGPT", "Vercel"],
    gradient: "from-purple-500/30 to-violet-500/10",
    url: "https://wine-study-app.vercel.app",
  },
];

export default function Projects() {
  return (
    <section id="projects" className="mx-auto max-w-6xl px-6 py-24">
      <h2 className="section-title">
        Projects — <span className="gradient-text">만든 것들</span>
      </h2>
      <div className="mt-10 grid gap-5 sm:grid-cols-2">
        {projects.map((p) =>
          p.url ? (
            <a
              key={p.title}
              href={p.url}
              target="_blank"
              rel="noopener noreferrer"
              className="glass glass-hover relative overflow-hidden rounded-2xl p-7 block"
            >
              <div
                className={`pointer-events-none absolute inset-0 bg-gradient-to-br ${p.gradient} opacity-40`}
                aria-hidden
              />
              <div className="relative">
                <h3 className="text-xl font-semibold text-white">{p.title}</h3>
                <p className="mt-3 text-sm leading-relaxed text-slate-300">{p.desc}</p>
                <div className="mt-5 flex flex-wrap gap-2">
                  {p.stack.map((s) => (
                    <span key={s} className="tag">{s}</span>
                  ))}
                </div>
              </div>
            </a>
          ) : (
            <div
              key={p.title}
              className="glass glass-hover relative overflow-hidden rounded-2xl p-7"
            >
              <div
                className={`pointer-events-none absolute inset-0 bg-gradient-to-br ${p.gradient} opacity-40`}
                aria-hidden
              />
              <div className="relative">
                <h3 className="text-xl font-semibold text-white">{p.title}</h3>
                <p className="mt-3 text-sm leading-relaxed text-slate-300">{p.desc}</p>
                <div className="mt-5 flex flex-wrap gap-2">
                  {p.stack.map((s) => (
                    <span key={s} className="tag">{s}</span>
                  ))}
                </div>
              </div>
            </div>
          )
        )}
      </div>
    </section>
  );
}
