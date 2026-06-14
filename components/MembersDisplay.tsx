"use client";

import { useEffect, useState } from "react";

interface Member {
  name: string;
  interest: string;
  status: "pending" | "approved" | string;
  createdAt: string;
}

interface MembersResponse {
  count: number;
  members: Member[];
}

function formatDate(value: string) {
  if (!value) return "";
  const date = new Date(value);
  if (Number.isNaN(date.getTime())) return "";
  return new Intl.DateTimeFormat("ko-KR", {
    month: "short",
    day: "numeric",
  }).format(date);
}

function StatusBadge({ status }: { status: string }) {
  if (status === "approved") {
    return <span className="badge-approved shrink-0">승인됨</span>;
  }
  if (status === "pending") {
    return <span className="badge-pending shrink-0">대기 중</span>;
  }
  return <span className="tag shrink-0">{status}</span>;
}

function MemberAvatar({ name }: { name: string }) {
  const initial = name.charAt(0).toUpperCase();
  return (
    <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-violet-500/20 text-sm font-bold text-violet-300 ring-1 ring-violet-500/30">
      {initial}
    </div>
  );
}

export default function MembersDisplay() {
  const [members, setMembers] = useState<Member[]>([]);
  const [count, setCount] = useState(0);
  const [status, setStatus] = useState<"loading" | "ready" | "error">("loading");

  useEffect(() => {
    let ignore = false;

    async function loadMembers() {
      try {
        const response = await fetch("/api/members", { cache: "no-store" });
        if (!response.ok) throw new Error("failed");
        const data = (await response.json()) as MembersResponse;
        if (!ignore) {
          setMembers(data.members);
          setCount(data.count);
          setStatus("ready");
        }
      } catch {
        if (!ignore) setStatus("error");
      }
    }

    loadMembers();
    return () => {
      ignore = true;
    };
  }, []);

  return (
    <section id="members" className="mx-auto max-w-6xl px-6 pb-24">
      <div className="flex flex-wrap items-end justify-between gap-4">
        <div>
          <p className="mb-3 text-xs font-semibold uppercase tracking-widest text-violet-400">
            Members
          </p>
          <h2 className="section-title">
            Members <span className="gradient-text">in progress</span>
          </h2>
        </div>
        <p className="text-sm text-slate-400">
          공개 멤버 현황:{" "}
          <span className="font-semibold text-sky-300">
            {status === "loading" ? "불러오는 중" : `${count}명`}
          </span>
        </p>
      </div>

      {status === "error" ? (
        <div className="mt-8 glass rounded-2xl border border-rose-400/20 bg-rose-400/5 p-6 text-sm text-rose-200">
          멤버 목록을 불러오지 못했어요. 잠시 후 다시 확인해 주세요.
        </div>
      ) : status === "loading" ? (
        <div className="mt-8 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {[0, 1, 2].map((i) => (
            <div key={i} className="skeleton h-36" />
          ))}
        </div>
      ) : members.length === 0 ? (
        <div className="mt-8 glass rounded-2xl p-10 text-center">
          <p className="text-3xl">👥</p>
          <p className="mt-3 text-sm text-slate-400">
            아직 공개할 멤버가 없어요. 첫 신청자가 되어 주세요.
          </p>
        </div>
      ) : (
        <div className="mt-8 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {members.map((member, index) => (
            <article
              key={`${member.name}-${member.createdAt}-${index}`}
              className="glass glass-hover rounded-2xl p-6"
            >
              <div className="flex items-center gap-3">
                <MemberAvatar name={member.name} />
                <div className="min-w-0 flex-1">
                  <h3 className="truncate text-base font-semibold text-white">
                    {member.name}
                  </h3>
                  {member.createdAt && (
                    <p className="mt-0.5 text-xs text-slate-500">
                      joined {formatDate(member.createdAt)}
                    </p>
                  )}
                </div>
                <StatusBadge status={member.status} />
              </div>
              <p className="mt-4 text-sm leading-relaxed text-slate-300">
                {member.interest}
              </p>
            </article>
          ))}
        </div>
      )}
    </section>
  );
}
