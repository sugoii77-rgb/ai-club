import { archivePosts } from "@/lib/archive-data";

export default function NotionArchive() {
  return (
    <section id="archive" className="mx-auto max-w-6xl px-6 py-24">
      <div className="flex flex-wrap items-end justify-between gap-4">
        <h2 className="section-title">
          Notion <span className="gradient-text">Archive</span>
        </h2>
        <p className="text-sm text-slate-400">
          동호회의 모든 실험 기록 — Notion에 계속 쌓이는 중
        </p>
      </div>
      <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {archivePosts.map((post) => (
          <article
            key={post.title}
            className="glass glass-hover flex flex-col rounded-2xl p-6"
          >
            <div className="flex flex-wrap gap-2">
              {post.tags.map((tag) => (
                <span key={tag} className="tag">
                  {tag}
                </span>
              ))}
            </div>
            <h3 className="mt-4 text-lg font-semibold leading-snug text-white">
              {post.title}
            </h3>
            <p className="mt-2 flex-1 text-sm leading-relaxed text-slate-400">
              {post.summary}
            </p>
            <div className="mt-5 flex items-center justify-between">
              <span className="text-xs text-slate-500">{post.date}</span>
              <a
                href={post.url}
                target="_blank"
                rel="noreferrer"
                className="text-sm font-semibold text-sky-300 transition-colors hover:text-sky-200"
              >
                읽어보기 →
              </a>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}
