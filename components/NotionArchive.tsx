"use client";

import { useEffect, useState } from "react";

interface NotionPost {
  id: string;
  title: string;
  summary: string;
  date: string;
  tags: string[];
  url: string;
}

export default function NotionArchive() {
  const [archivePosts, setArchivePosts] = useState<NotionPost[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchPosts() {
      try {
        const response = await fetch("/api/notion-archive");
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data: NotionPost[] = await response.json();
        setArchivePosts(data);
      } catch (err) {
        console.error("Failed to fetch Notion archive posts:", err);
        setError("Failed to load Notion archive posts. Please try again later.");
      } finally {
        setLoading(false);
      }
    }

    fetchPosts();
  }, []);

  return (
    <section id="archive" className="mx-auto max-w-6xl px-6 py-24">
      <div className="flex flex-wrap items-end justify-between gap-4">
        <div>
          <p className="mb-3 text-xs font-semibold uppercase tracking-widest text-violet-400">
            Archive
          </p>
          <h2 className="section-title">
            Notion <span className="gradient-text">Archive</span>
          </h2>
        </div>
        <p className="text-sm text-slate-400">
          동호회의 모든 실험 기록 — Notion에 계속 쌓이는 중
        </p>
      </div>

      {loading ? (
        <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {[0, 1, 2].map((i) => (
            <div key={i} className="skeleton h-44" />
          ))}
        </div>
      ) : error ? (
        <div className="mt-10 glass rounded-2xl border border-rose-400/20 bg-rose-400/5 p-8 text-center">
          <p className="text-2xl">⚠️</p>
          <p className="mt-2 text-sm text-rose-300">
            아카이브를 불러오지 못했어요. 잠시 후 다시 확인해 주세요.
          </p>
        </div>
      ) : archivePosts.length === 0 ? (
        <div className="mt-10 glass rounded-2xl p-10 text-center">
          <p className="text-3xl">📭</p>
          <p className="mt-3 text-sm text-slate-400">
            아직 아카이브가 없습니다. 첫 기록이 쌓이길 기다리는 중!
          </p>
        </div>
      ) : (
        <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {archivePosts.map((post) => (
            <article
              key={post.id}
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
                <span className="text-xs text-slate-500">
                  {new Date(post.date).toLocaleDateString("ko-KR")}
                </span>
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
      )}
    </section>
  );
}
