

// env: RESEND_API_KEY, ADMIN_EMAIL required
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
