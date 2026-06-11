import { NextRequest, NextResponse } from "next/server";

// 게시판 API (구조만 준비된 상태).
// 현재 게시판은 localStorage(브라우저별)로 동작합니다.
// 모두가 함께 보는 게시판으로 바꾸려면 아래 TODO에 Supabase를 연결하고,
// app/board/page.tsx 의 loadPosts/onSubmit 을 fetch("/api/posts")로
// 교체하면 됩니다. 사진은 Supabase Storage 업로드를 권장합니다.

export async function GET() {
  // TODO: const { data } = await supabase.from("posts").select() ...
  return NextResponse.json({ posts: [] });
}

export async function POST(req: NextRequest) {
  let body: { title?: string; author?: string; content?: string; photo?: string };
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ ok: false }, { status: 400 });
  }
  if (!body.title || !body.content) {
    return NextResponse.json(
      { ok: false, error: "title and content required" },
      { status: 400 }
    );
  }
  // TODO: await supabase.from("posts").insert({ ... })
  console.log("[board post]", body.title);
  return NextResponse.json({ ok: true });
}
