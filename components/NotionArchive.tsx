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
        const response = await fetch("/api/notion-archive"); // API Route를 통해 데이터 가져오기
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

  if (loading) {
    return (
      <section id="archive" className="mx-auto max-w-6xl px-6 py-24">
        <div className="text-center text-gray-400">
          <p>Loading Notion archive posts...</p>
        </div>
      </section>
    );
  }

  if (error) {
    return (
      <section id="archive" className="mx-auto max-w-6xl px-6 py-24">
        <div className="text-center text-red-500">
          <p>{error}</p>
          <p>Please ensure NOTION_API_KEY and NOTION_PARENT_PAGE_ID are correctly set in Vercel environment variables.</p>
          <p>Also, check if AI Club Homepage Integration has read access to the '글 라이브러리' Notion page.</p>
        </div>
      </section>
    );
  }

  if (archivePosts.length === 0) {
    return (
      <section id="archive" className="mx-auto max-w-6xl px-6 py-24">
        <div className="text-center text-gray-400">
          <p>No Notion archive posts found.</p>
          <p>Please ensure your Notion '글 라이브러리' page contains child pages.</p>
        </div>
      </section>
    );
  }

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
              <span className="text-xs text-slate-500">{new Date(post.date).toLocaleDateString("ko-KR")}</span>
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