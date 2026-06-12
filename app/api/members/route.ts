import { NextResponse } from "next/server";

const NOTION_VERSION = "2022-06-28";
const NOTION_MEMBERS_DATABASE_ID =
  process.env.NOTION_MEMBERS_DATABASE_ID ?? "dc9c8eace8df4c8293af96a89fe9a392";

export const dynamic = "force-dynamic";

type NotionProperty =
  | {
      type: "title";
      title?: Array<{ plain_text?: string }>;
    }
  | {
      type: "rich_text";
      rich_text?: Array<{ plain_text?: string }>;
    }
  | {
      type: "select";
      select?: { name?: string } | null;
    }
  | {
      type: "date";
      date?: { start?: string } | null;
    };

interface NotionPage {
  properties?: Record<string, NotionProperty>;
}

interface NotionQueryResponse {
  results?: NotionPage[];
}

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

function getTitle(property: NotionProperty | undefined) {
  if (!property || property.type !== "title") {
    return "";
  }

  return property.title?.map((item) => item.plain_text ?? "").join("") ?? "";
}

function getRichText(property: NotionProperty | undefined) {
  if (!property || property.type !== "rich_text") {
    return "";
  }

  return property.rich_text?.map((item) => item.plain_text ?? "").join("") ?? "";
}

function getSelect(property: NotionProperty | undefined) {
  if (!property || property.type !== "select") {
    return "";
  }

  return property.select?.name ?? "";
}

function getDate(property: NotionProperty | undefined) {
  if (!property || property.type !== "date") {
    return "";
  }

  return property.date?.start ?? "";
}

export async function GET() {
  const headers = getNotionHeaders();

  if (!headers) {
    return NextResponse.json(
      { ok: false, error: "Members database is not configured." },
      { status: 500 }
    );
  }

  try {
    const response = await fetch(
      `https://api.notion.com/v1/databases/${NOTION_MEMBERS_DATABASE_ID}/query`,
      {
        method: "POST",
        headers,
        cache: "no-store",
        body: JSON.stringify({
          filter: {
            or: [
              {
                property: "Status",
                select: {
                  equals: "pending",
                },
              },
              {
                property: "Status",
                select: {
                  equals: "approved",
                },
              },
            ],
          },
          sorts: [
            {
              property: "CreatedAt",
              direction: "descending",
            },
          ],
        }),
      }
    );

    if (!response.ok) {
      throw new Error("Failed to query Notion members database.");
    }

    const data = (await response.json()) as NotionQueryResponse;
    const members = (data.results ?? []).map((page) => {
      const properties = page.properties ?? {};

      return {
        name: getTitle(properties.Name),
        interest: getRichText(properties.Interest),
        status: getSelect(properties.Status),
        createdAt: getDate(properties.CreatedAt),
      };
    });

    return NextResponse.json({
      count: members.length,
      members,
    });
  } catch {
    return NextResponse.json(
      { ok: false, error: "Unable to load members." },
      { status: 500 }
    );
  }
}
