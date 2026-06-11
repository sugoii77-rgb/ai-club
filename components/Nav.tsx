export default function Nav() {
  return (
    <header className="fixed inset-x-0 top-0 z-50">
      <nav className="glass mx-auto mt-4 flex max-w-6xl items-center justify-between rounded-full px-6 py-3">
        <a href="#" className="text-sm font-bold text-white">
          AI <span className="gradient-text">Club</span>
        </a>
        <div className="hidden items-center gap-6 text-sm text-slate-300 sm:flex">
          <a href="#about" className="transition-colors hover:text-white">
            About
          </a>
          <a href="#activities" className="transition-colors hover:text-white">
            Activities
          </a>
          <a href="#projects" className="transition-colors hover:text-white">
            Projects
          </a>
          <a href="#archive" className="transition-colors hover:text-white">
            Archive
          </a>
        </div>
        <a
          href="#join"
          className="btn-primary !px-4 !py-2 text-xs"
        >
          가입하기
        </a>
      </nav>
    </header>
  );
}
