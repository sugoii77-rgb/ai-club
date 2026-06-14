const projects = [
  {
    title: "AI 자동화 게시물 생성",
    desc: "주제만 넣으면 초안 작성부터 이미지, 발행까지 이어지는 콘텐츠 파이프라인.",
    stack: ["ChatGPT", "Automation"],
    gradient: "from-violet-500/30 to-fuchsia-500/10",
  },
  {
    title: "Notion 기반 지식 아카이브",
    desc: "동호회의 모든 실험과 프롬프트가 검색 가능한 Notion DB로 쌓입니다.",
    stack: ["Notion", "Database"],
    gradient: "from-sky-500/30 to-violet-500/10",
  },
  {
    title: "Vercel 웹앱 배포",
    desc: "Vibe Coding 입문 가이드처럼 만든 앱을 GitHub→Vercel로 바로 세상에 공개합니다.",
    stack: ["Next.js", "Vercel"],
    gradient: "from-fuchsia-500/30 to-sky-500/10",
  },
  {
    title: "Copilot 업무 활용 스터디",
    desc: "엑셀, 문서, 메일 — 매일 하는 일을 Copilot으로 절반으로 줄이는 연구.",
    stack: ["Copilot", "Office"],
    gradient: "from-blue-500/30 to-emerald-500/10",
  },
];


export default function Projects() {
  return (
    <section id="projects" className="mx-auto max-w-6xl px-6 py-24">
      <p className="mb-3 text-xs font-semibold uppercase tracking-widest text-violet-400">
        Projects
      </p>
      <h2 className="section-title">
        <span className="gradient-text">만든 것들</span>
      </h2>
