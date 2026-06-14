import { NextRequest, NextResponse } from "next/server";
import { auth } from "@/auth";
import { getMemberStatus } from "@/lib/notionMembers";

const NOTION_VERSION = "2022-06-28";

export const dynamic = "force-dynamic";

function getNotionHeaders(): Record<string, string> | null {
  const apiKey = process.env.NOTION_API_KEY;
  if (!apiKey) return null;
  return {
    Authorization: `Bearer ${apiKey}`,
    "Content-Type": "application/json",
    "Notion-Version": NOTION_VERSION,
  };
}

export async function POST(req: NextRequest) {
  const session = await auth();
  if (!session?.user?.email) {
    return NextResponse.json({ ok: false, error: "Unauthorized" }, { status: 401 });
  }

  const email = session.user.email;
  const memberStatus = await getMemberStatus(email);
  if (memberStatus !== "approved") {
    return NextResponse.json(
      { ok: false, error: "Not authorized to post" },
      { status: 403 }
    );
  }

  let body: { title?: string; content?: string };
  try {
    body = (await req.json()) as { title?: string; content?: string };
  } catch {
    return NextResponse.json({ ok: false, error: "Invalid JSON" }, { status: 400 });
  }

  const title = body.title?.trim() ?? "";
  const content = body.content?.trim() ?? "";
  if (!title || !content) {
    return NextResponse.json(
      { ok: false, error: "title and content required" },
      { status: 400 }
    );
  }

  const dbId = process.env.NOTION_POSTS_DATABASE_ID;
  if (!dbId) {
    return NextResponse.json(
      { ok: false, error: "Posts database not configured" },
      { status: 500 }
    );
  }

  const headers = getNotionHeaders();
  if (!headers) {
    return NextResponse.json(
      { ok: false, error: "API not configured" },
      { status: 500 }
    );
  }

  try {
    const response = await fetch("https://api.notion.com/v1/pages", {
      method: "POST",
      headers,
      cache: "no-store",
      body: JSON.stringify({
        parent: { database_id: dbId },
        properties: {
          Title: {
            title: [{ text: { content: title } }],
          },
          Content: {
            rich_text: [{ text: { content: content } }],
          },
          AuthorName: {
            rich_text: [{ text: { content: session.user.name ?? "" } }],
          },
          AuthorEmail: {
            email: email,
          },
          MemberStatus: {
            select: { name: "approved" },
          },
          PostStatus: {
            select: { name: "pending" },
          },
          CreatedAt: {
            date: { start: new Date().toISOString() },
          },
          Source: {
            rich_text: [{ text: { content: "website" } }],
          },
        },
      }),
    });

    if (!response.ok) {
      return NextResponse.json(
        { ok: false, error: "Failed to save post" },
        { status: 500 }
      );
    }

    return NextResponse.json({ ok: true });
  } catch {
    return NextResponse.json(
      { ok: false, error: "Failed to save post" },
      { status: 500 }
    );
  }
}
