// env: RESEND_API_KEY, ADMIN_EMAIL required
import { NextResponse } from "next/server";
import { auth } from "@/auth";
import { getApprovedPendingEmail, markEmailSent } from "@/lib/notionEmail";

export const dynamic = "force-dynamic";

async function sendApprovalEmail(
  name: string,
  email: string
): Promise<boolean> {
  const apiKey = process.env.RESEND_API_KEY;
  const from = process.env.EMAIL_FROM ?? "onboarding@resend.dev";
  if (!apiKey) return false;

  try {
    const body = [
      "안녕하세요, " + name + "님.",
      "",
      "FCM 영천 AI 탐험대 가입이 승인되었습니다.",
      "이제 아래 홈페이지에서 Google 계정으로 로그인하시면 글쓰기 기능을 사용할 수 있습니다.",
      "",
      "https://ai-club-weld.vercel.app/write",
      "",
      "AI 활용 사례, 업무 자동화 아이디어, 실험 결과 등을 자유롭게 공유해 주세요.",
      "",
      "감사합니다.",
      "FCM 영천 AI 탐험대",
    ].join("\n");

    const response = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        Authorization: "Bearer " + apiKey,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        from,
        to: [email],
        subject: "FCM 영천 AI 탐험대 가입이 승인되었습니다",
        text: body,
      }),
    });
    return response.ok;
  } catch {
    return false;
  }
}

export async function POST() {
  const session = await auth();
  const adminEmail = process.env.ADMIN_EMAIL;

  if (!session?.user?.email || session.user.email !== adminEmail) {
    return NextResponse.json({ ok: false, error: "Unauthorized" }, { status: 403 });
  }

  const members = await getApprovedPendingEmail();

  if (members.length === 0) {
    return NextResponse.json({ ok: true, sent: 0, failed: 0, message: "No pending emails." });
  }

  let sent = 0;
  let failed = 0;

  for (const member of members) {
    const emailOk = await sendApprovalEmail(member.name, member.email);
    if (emailOk) {
      await markEmailSent(member.pageId);
      sent++;
    } else {
      failed++;
    }
  }

  return NextResponse.json({ ok: true, sent, failed, total: members.length });
                              }
