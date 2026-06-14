"use client";

import Link from "next/link";
import { useSession, signOut } from "next-auth/react";
import { signInWithGoogle } from "@/app/actions";

export default function Nav() {
  const { data: session, status } = useSession();

  return (
    <header className="fixed inset-x-0 top-0 z-50 px-4">
      <nav className="glass mx-auto mt-4 flex max-w-6xl items-center justify-between rounded-full px-6 py-3">
        <Link href="/" className="whitespace-nowrap text-sm font-bold text-white">
          FCM <span className="gradient-text">영천 AI 탐험대</span>
        </Link>
        <div className="hidden items-center gap-6 text-sm text-slate-300 md:flex">
          <Link href="/#about" className="transition-colors hover:text-white">
            About
          </Link>
          <Link href="/#activities" className="transition-colors hover:text-white">
            Activities
          </Link>
          <Link href="/#projects" className="transition-colors hover:text-white">
            Projects
          </Link>
          <Link href="/#archive" className="transition-colors hover:text-white">
            Archive
          </Link>
          <Link href="/board" className="transition-colors hover:text-white">
            게시판
          </Link>
          <Link href="/write" className="transition-colors hover:text-white">
            글쓰기
          </Link>
        </div>
        <div className="flex items-center gap-3">
          {status === "loading" ? null : session ? (
            <button
              onClick={() => signOut()}
              className="text-xs text-slate-400 transition-colors hover:text-white"
            >
              로그아웃
            </button>
          ) : (
            <form action={signInWithGoogle}>
              <button
                type="submit"
                className="text-xs text-slate-300 transition-colors hover:text-white"
              >
                로그인
              </button>
            </form>
          )}
          <Link href="/#join" className="btn-primary !px-4 !py-2 text-xs">
            가입하기
          </Link>
        </div>
      </nav>
    </header>
  );
}
