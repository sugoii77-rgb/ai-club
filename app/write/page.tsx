import { auth, signIn } from "@/auth";
import { getMemberStatus } from "@/lib/notionMembers";
import Nav from "@/components/Nav";
import Footer from "@/components/Footer";
import WriteForm from "./WriteForm";

export default async function WritePage() {
  const session = await auth();
  const email = session?.user?.email ?? null;
  const memberStatus = email ? await getMemberStatus(email) : null;

  return (
    <main>
      <Nav />
      <section className="mx-auto max-w-2xl px-6 pb-24 pt-32">
        <h1 className="section-title">
          글 <span className="gradient-text">작성하기</span>
        </h1>
        <div className="glass mt-8 rounded-2xl p-8">
          {!email ? (
            <div className="flex flex-col items-center gap-6 py-4 text-center">
              <p className="text-slate-300">
                글을 작성하려면 Google 계정으로 로그인해주세요.
              </p>
              <form
                action={async () => {
                  "use server";
                  await signIn("google", { redirectTo: "/write" });
                }}
              >
                <button type="submit" className="btn-primary">
                  Google로 로그인
                </button>
              </form>
            </div>
          ) : memberStatus === "not_found" ? (
            <div className="py-4 text-center">
              <p className="text-slate-300">
                먼저{" "}
                <a href="/#join" className="text-violet-400 underline">
                  가입 신청
                </a>
                을 해주세요.
              </p>
              <p className="mt-2 text-sm text-slate-500">
                가입 신청 후 관리자 승인을 받으면 글을 작성할 수 있습니다.
              </p>
            </div>
          ) : memberStatus === "pending" ? (
            <div className="py-4 text-center">
              <span className="text-2xl">⏳</span>
              <p className="mt-3 text-slate-300">가입 승인 대기 중입니다.</p>
              <p className="mt-1 text-sm text-slate-500">
                관리자가 승인하면 글을 작성할 수 있습니다.
              </p>
            </div>
          ) : memberStatus === "rejected" ? (
            <div className="py-4 text-center">
              <span className="text-2xl">❌</span>
              <p className="mt-3 text-slate-300">
                가입이 승인되지 않았습니다.
              </p>
              <p className="mt-1 text-sm text-slate-500">
                문의 사항이 있으면 운영진에게 연락해주세요.
              </p>
            </div>
          ) : (
            <WriteForm authorName={session?.user?.name ?? ""} />
          )}
        </div>
      </section>
      <Footer />
    </main>
  );
}
