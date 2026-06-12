import { NextRequest, NextResponse } from "next/server";

const NOTION_VERSION = "2022-06-28";
const NOTION_MEMBERS_DATABASE_ID =
  process.env.NOTION_MEMBERS_DATABASE_ID ?? "dc9c8eace8df4c8293af96a89fe9a392";

export const dynamic = "force-dynamic";

interface JoinPayload {
  name?: unknown;
  email?: unknown;
  interest?: unknown;
}

interface NotionQueryResponse {
  results?: unknown[];
}

const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

function getNotionHeaders() {
  const notionApiKey = process.env.NOTION_API_KEY;

  if (!notionApiKey) {
    return null;
  }

  return {
    Authorization: `Bearer ${notionApiKey}`,
    "Content-Type": "application/json",
    "Notion-Version": NOTION_VERSION,
  };
}

async function hasDuplicateEmail(normalizedEmail: string) {
  const headers = getNotionHeaders();

  if (!headers) {
    throw new Error("Notion API key is not configured.");
  }

  const response = await fetch(
    `https://api.notion.com/v1/databases/${NOTION_MEMBERS_DATABASE_ID}/query`,
    {
      method: "POST",
      headers,
      cache: "no-store",
      body: JSON.stringify({
        filter: {
          property: "Email",
          email: {
            equals: normalizedEmail,
          },
        },
        page_size: 1,
      }),
    }
  );

  if (!response.ok) {
    throw new Error("Failed to query Notion members database.");
  }

  const data = (await response.json()) as NotionQueryResponse;
  return Boolean(data.results?.length);
}

async function createMemberPage({
  normalizedName,
  normalizedEmail,
  normalizedInterest,
}: {
  normalizedName: string;
  normalizedEmail: string;
  normalizedInterest: string;
}) {
  const headers = getNotionHeaders();

  if (!headers) {
    throw new Error("Notion API key is not configured.");
  }

  const response = await fetch("https://api.notion.com/v1/pages", {
    method: "POST",
    headers,
    cache: "no-store",
    body: JSON.stringify({
      parent: {
        database_id: NOTION_MEMBERS_DATABASE_ID,
      },
      properties: {
        Name: {
          title: [
            {
              text: {
                content: normalizedName,
              },
            },
          ],
        },
        Email: {
          email: normalizedEmail,
        },
        Interest: {
          rich_text: [
            {
              text: {
                content: normalizedInterest,
              },
            },
          ],
        },
        Status: {
          select: {
            name: "pending",
          },
        },
        CreatedAt: {
          date: {
            start: new Date().toISOString(),
          },
        },
        Source: {
          rich_text: [
            {
              text: {
                content: "website",
              },
            },
          ],
        },
        EmailSent: {
          checkbox: false,
        },
      },
    }),
  });

  if (!response.ok) {
    throw new Error("Failed to create Notion member page.");
  }
}

export async function POST(req: NextRequest) {
  let body: JoinPayload;

  try {
    body = (await req.json()) as JoinPayload;
  } catch {
    return NextResponse.json({ ok: false, error: "Invalid JSON." }, { status: 400 });
  }

  const normalizedName = typeof body.name === "string" ? body.name.trim() : "";
  const normalizedEmail =
    typeof body.email === "string" ? body.email.trim().toLowerCase() : "";
  const normalizedInterest =
    typeof body.interest === "string" ? body.interest.trim() : "";

  if (!normalizedName || !normalizedEmail || !normalizedInterest) {
    return NextResponse.json(
      { ok: false, error: "Name, email, and interest are required." },
      { status: 400 }
    );
  }

  if (!emailRegex.test(normalizedEmail)) {
    return NextResponse.json(
      { ok: false, error: "A valid email is required." },
      { status: 400 }
    );
  }

  try {
    const duplicate = await hasDuplicateEmail(normalizedEmail);

    if (duplicate) {
      return NextResponse.json(
        { ok: false, error: "This email has already been submitted." },
        { status: 409 }
      );
    }

    await createMemberPage({
      normalizedName,
      normalizedEmail,
      normalizedInterest,
    });

    return NextResponse.json({
      ok: true,
      message: "Your application has been submitted successfully.",
      emailSent: false,
    });
  } catch {
    return NextResponse.json(
      { ok: false, error: "Unable to submit application." },
      { status: 500 }
    );
  }
}
