"use client";

import { useState } from "react";

export default function WriteForm({ authorName }: { authorName: string }) {
  const [status, setStatus] = useState<"idle" | "sending" | "done" | "error">(
    "idle"
  );
  const [errorMsg, setErrorMsg] = useState("");

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setStatus("sending");
    setErrorMsg("");
    const form = e.currentTarget;
    const data = new FormData(form);
    const title = (data.get("title") as string | null)?.trim() ?? "";
    const content = (data.get("content") as string | null)?.trim() ?? "";
    if (!title || !content) {
      setStatus("error");
      setErrorMsg("제목과 내용을 모두 입력해주세요.");
      return;
    }
    try {
      const res = await fetch("/api/posts", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ title, content }),
      });
      if (!res.ok) {
        const body = (await res.json().catch(() => null)) as {
          error?: string;
        } | null;
        setStatus("error");
        setErrorMsg(body?.error ?? "글 제출에 실패했어요.");
        return;
      }
      setStatus("done");
      form.reset();
    } catch {
      setStatus("error");
      setErrorMsg("네트워크 오류가 발생했어요. 다시 시도해주세요.");
    }
  }

  if (status === "done") {
    return (
      <div className="flex flex-col items-center justify-center rounded-2xl bg-emerald-400/10 p-8 text-center ring-1 ring-emerald-400/30">
        <span className="text-3xl">✅</span>
        <p className="mt-3 text-lg font-semibold text-emerald-300">
          글이 제출되었습니다!
        </p>
        <p className="mt-1 text-sm text-slate-300">
          관리자 검토 후 게시됩니다.
        </p>
        <button
          onClick={() => setStatus("idle")}
          className="mt-4 btn-primary !px-4 !py-2 text-xs"
        >
          다른 글 작성하기
        </button>
      </div>
    );
  }

  return (
    <form onSubmit={onSubmit} className="space-y-4">
      <div>
        <label className="mb-1 block text-xs text-slate-400">작성자</label>
        <p className="text-sm text-white">{authorName || "—"}</p>
      </div>
      <input
        name="title"
        required
        placeholder="제목"
        maxLength={200}
        className="w-full rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-sm text-white placeholder-slate-500 outline-none transition-colors focus:border-violet-400/60"
      />
      <textarea
        name="content"
        required
        rows={6}
        placeholder="내용을 입력해주세요"
        maxLength={5000}
        className="w-full rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-sm text-white placeholder-slate-500 outline-none transition-colors focus:border-violet-400/60"
      />
      <button
        type="submit"
        disabled={status === "sending"}
        className="btn-primary w-full disabled:opacity-60"
      >
        {status === "sending" ? "제출 중…" : "글 제출하기"}
      </button>
      {status === "error" && (
        <p className="text-sm text-rose-400">{errorMsg}</p>
      )}
    </form>
  );
}
