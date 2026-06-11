import { NextRequest, NextResponse } from "next/server";

// 회원가입 API (현재 mock).
// 나중에 저장소만 바꿔 끼우면 됩니다:
//  - Google Sheet: https://developers.google.com/sheets/api (또는 Apps Script 웹훅)
//  - Notion DB:    @notionhq/client 의 pages.create({ parent: { database_id } })
//  - Supabase:     @supabase/supabase-js 의 from("members").insert(...)
// 환경변수(NOTION_TOKEN 등)는 Vercel 프로젝트 설정에 추가하세요.

interface JoinPayload {
  name?: string;
  email?: string;
  interest?: string;
}

export async function POST(req: NextRequest) {
  let body: JoinPayload;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ ok: false, error: "invalid json" }, { status: 400 });
  }

  const { name, email, interest } = body;
  if (!name || !email || !/.+@.+\..+/.test(email)) {
    return NextResponse.json(
      { ok: false, error: "name and valid email required" },
      { status: 400 }
    );
  }

  // TODO: 여기서 실제 저장소로 전달
  // await saveToNotion({ name, email, interest });
  console.log("[join]", { name, email, interest, at: new Date().toISOString() });

  return NextResponse.json({ ok: true });
}
