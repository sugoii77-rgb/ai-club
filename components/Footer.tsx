export default function Footer() {
  return (
    <footer className="border-t border-white/5">
      <div className="mx-auto flex max-w-6xl flex-col gap-6 px-6 py-12 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <p className="text-lg font-bold text-white">
            FCM <span className="gradient-text">영천 AI 탐험대</span>
          </p>
          <p className="mt-1 max-w-sm text-sm text-slate-400">
            기술을 나누고, 생각을 연결하고, 함께 미래를 탐험하는 사람들.
            오늘도, 함께 탐험!
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
