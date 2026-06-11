export default function Footer() {
  return (
    <footer className="border-t border-white/5">
      <div className="mx-auto flex max-w-6xl flex-col gap-6 px-6 py-12 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <p className="text-lg font-bold text-white">
            AI <span className="gradient-text">Club</span>
          </p>
          <p className="mt-1 max-w-sm text-sm text-slate-400">
            AI를 배우는 사람들의 실험실. 하루 하나의 AI Workflow, 함께 만들고
            공유합니다.
          </p>
        </div>
        <div className="flex flex-col gap-2 text-sm text-slate-400 sm:text-right">
          <a
            href="https://www.notion.so/"
            target="_blank"
            rel="noreferrer"
            className="transition-colors hover:text-sky-300"
          >
            Notion Archive ↗
          </a>
          <a
            href="mailto:sugoii77@gmail.com"
            className="transition-colors hover:text-sky-300"
          >
            sugoii77@gmail.com
          </a>
          <p className="text-xs text-slate-600">
            © {new Date().getFullYear()} AI Club. Built by members, for
            members.
          </p>
        </div>
      </div>
    </footer>
  );
}
