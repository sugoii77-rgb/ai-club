"use client";

import { useEffect, useState } from "react";
import Nav from "@/components/Nav";
import Footer from "@/components/Footer";

// 게시판 (v1)
// - 글 작성: 제목 / 작성자 / 내용 / 사진 첨부 (사진은 글 아래에 표시)
// - 사진은 브라우저에서 1280px로 리사이즈 후 저장 (localStorage)
// - 현재는 이 브라우저에만 저장됩니다. 모두가 함께 보는 게시판으로
//   만들려면 app/api/posts/route.ts 의 TODO에 Supabase/Notion을
//   연결하면 됩니다 (README 참고).

interface BoardPost {
  id: string;
  title: string;
  author: string;
  content: string;
  photo?: string; // dataURL or /board/... static path
  date: string;
}

const SEED_POST: BoardPost = {
  id: "seed-1",
  title: "FCM 영천 AI 탐험대, 출범!",
  author: "운영진",
  content:
    "언제든지, 이야기해요. 당신의 생각, 나의 설렘 — 기술을 나누고, 생각을 연결하고, 함께 미래를 탐험하는 사람들. 오늘도, 함께 탐험!",
  photo: "/board/seed-poster.jpg",
  date: "2026-06-11",
};

const STORAGE_KEY = "fcm-board-posts";

function loadPosts(): BoardPost[] {
  try {
    return JSON.parse(localStorage.getItem(STORAGE_KEY) || "[]");
  } catch {
    return [];
  }
}

// 사진을 최대 1280px JPEG로 압축해서 dataURL로 변환
function resizePhoto(file: File): Promise<string> {
  return new Promise((resolve, reject) => {
    const url = URL.createObjectURL(file);
    const img = new Image();
    img.onload = () => {
      const scale = Math.min(1, 1280 / Math.max(img.width, img.height));
      const canvas = document.createElement("canvas");
      canvas.width = Math.round(img.width * scale);
      canvas.height = Math.round(img.height * scale);
      canvas.getContext("2d")!.drawImage(img, 0, 0, canvas.width, canvas.height);
      URL.revokeObjectURL(url);
      resolve(canvas.toDataURL("image/jpeg", 0.84));
    };
    img.onerror = reject;
    img.src = url;
  });
}

export default function BoardPage() {
  const [posts, setPosts] = useState<BoardPost[]>([]);
  const [photo, setPhoto] = useState<string | undefined>();
  const [busy, setBusy] = useState(false);

  useEffect(() => {
    setPosts(loadPosts());
  }, []);

  async function onPhotoChange(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (!file) return setPhoto(undefined);
    setBusy(true);
    try {
      setPhoto(await resizePhoto(file));
    } catch {
      setPhoto(undefined);
    }
    setBusy(false);
  }

  function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = e.currentTarget;
    const data = new FormData(form);
    const post: BoardPost = {
      id: String(Date.now()),
      title: String(data.get("title") || "").trim(),
      author: String(data.get("author") || "익명").trim() || "익명",
      content: String(data.get("content") || "").trim(),
      photo,
      date: new Date().toISOString().slice(0, 10),
    };
    if (!post.title || !post.content) return;
    const next = [post, ...posts];
    setPosts(next);
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(next));
    } catch {
      alert("저장 공간이 가득 찼어요. 오래된 글이나 사진을 지워주세요.");
    }
    form.reset();
    setPhoto(undefined);
  }

  function removePost(id: string) {
    const next = posts.filter((p) => p.id !== id);
    setPosts(next);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(next));
  }

  const allPosts = [...posts, SEED_POST];

  return (
    <main>
      <Nav />
      <section className="mx-auto max-w-3xl px-6 pb-24 pt-32">
        <h1 className="section-title">
          탐험 <span className="gradient-text">게시판</span>
        </h1>
        <p className="mt-3 text-sm text-slate-400">
          실험 기록, 아이디어, 모임 후기 — 사진과 함께 자유롭게 남겨주세요.
        </p>

        {/* 글쓰기 */}
        <form onSubmit={onSubmit} className="glass mt-8 space-y-4 rounded-2xl p-6">
          <div className="flex flex-col gap-4 sm:flex-row">
            <input
              name="title"
              required
              placeholder="제목"
              className="w-full flex-1 rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-sm text-white placeholder-slate-500 outline-none transition-colors focus:border-violet-400/60"
            />
            <input
              name="author"
              placeholder="작성자 (선택)"
              className="w-full rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-sm text-white placeholder-slate-500 outline-none transition-colors focus:border-violet-400/60 sm:w-44"
            />
          </div>
          <textarea
            name="content"
            required
            rows={4}
            placeholder="내용을 적어주세요"
            className="w-full rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-sm text-white placeholder-slate-500 outline-none transition-colors focus:border-violet-400/60"
          />
          <div className="flex flex-wrap items-center justify-between gap-4">
            <label className="cursor-pointer text-sm text-slate-300 transition-colors hover:text-white">
              📷 사진 첨부
              <input
                type="file"
                accept="image/*"
                onChange={onPhotoChange}
                className="hidden"
              />
            </label>
            <button
              type="submit"
              disabled={busy}
              className="btn-primary !py-2.5 text-xs disabled:opacity-60"
            >
              {busy ? "사진 처리 중…" : "글 올리기"}
            </button>
          </div>
          {photo && (
            <div className="relative">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={photo}
                alt="첨부 미리보기"
                className="max-h-64 rounded-xl border border-white/10"
              />
              <button
                type="button"
                onClick={() => setPhoto(undefined)}
                className="absolute right-2 top-2 rounded-full bg-black/60 px-2.5 py-1 text-xs text-white"
              >
                ✕ 제거
              </button>
            </div>
          )}
          <p className="text-[11px] text-slate-500">
            지금은 이 브라우저에만 저장돼요. 공유 게시판 연동(Supabase)은
            준비되어 있습니다.
          </p>
        </form>

        {/* 글 목록: 내용 아래에 사진 표시 */}
        <div className="mt-10 space-y-6">
          {allPosts.map((post) => (
            <article key={post.id} className="glass rounded-2xl p-6">
              <div className="flex items-start justify-between gap-4">
                <div>
                  <h2 className="text-lg font-semibold text-white">
                    {post.title}
                  </h2>
                  <p className="mt-1 text-xs text-slate-500">
                    {post.author} · {post.date}
                  </p>
                </div>
                {post.id !== "seed-1" && (
                  <button
                    onClick={() => removePost(post.id)}
                    className="text-xs text-slate-500 transition-colors hover:text-rose-400"
                  >
                    삭제
                  </button>
                )}
              </div>
              <p className="mt-4 whitespace-pre-wrap text-sm leading-relaxed text-slate-300">
                {post.content}
              </p>
              {post.photo && (
                // eslint-disable-next-line @next/next/no-img-element
                <img
                  src={post.photo}
                  alt={post.title}
                  className="mt-5 w-full rounded-xl border border-white/10"
                  onError={(e) => {
                    // 시드 포스터 이미지가 아직 없으면 사진만 숨김
                    (e.target as HTMLImageElement).style.display = "none";
                  }}
                />
              )}
            </article>
          ))}
        </div>
      </section>
      <Footer />
    </main>
  );
}
