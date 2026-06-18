import { NextResponse } from "next/server";

export const dynamic = "force-dynamic";

interface NotionPost {
  id: string;
  title: string;
  summary: string;
  date: string;
  tags: string[];
  url: string;
}

const getPlainText = (richTextArr: {plain_text: string}[]) =>
  (richTextArr ?? []).map((t) => t.plain_text).join("");

export async function GET() {
  const notionApiKey = process.env.NOTION_API_KEY;
  const postsDbId = process.env.NOTION_POSTS_DATABASE_ID;

  if (!notionApiKey || !postsDbId) {
    return NextResponse.json(
      { message: "Server configuration error" },
      { status: 500 }
    );
  }

  try {
    const response = await fetch(
      `https://api.notion.com/v1/databases/${postsDbId}/query`,
      {
        method: "POST",
        headers: {
          Authorization: `Bearer ${notionApiKey}`,
          "Notion-Version": "2022-06-28",
          "Content-Type": "application/json",
        },
        cache: "no-store",
        body: JSON.stringify({
          filter: {
            property: "PostStatus",
            select: { equals: "approved" },
          },
          sorts: [{ property: "CreatedAt", direction: "descending" }],
        }),
      }
    );

    if (!response.ok) {
      throw new Error(`Notion API error: ${response.status}`);
    }

    const data = await response.json();

    const posts: NotionPost[] = (data.results ?? []).map((page: Record<string, unknown>) => {
      const props = page.properties as Record<string, unknown>;
      const title = getPlainText((props.Title as {title: {plain_text: string}[]})?.title ?? []) || "No Title";
      const summary = getPlainText((props.Content as {rich_text: {plain_text: string}[]})?.rich_text ?? []);
      const date = (props.CreatedAt as {date?: {start: string}})?.date?.start ?? "";
      const author = getPlainText((props.AuthorName as {rich_text: {plain_text: string}[]})?.rich_text ?? []);
      const source = getPlainText((props.Source as {rich_text: {plain_text: string}[]})?.rich_text ?? []);
      const url = source && source !== "website"
        ? (source.startsWith("http") ? source : `https://${source}`)
        : (page.url as string);

      return { id: page.id as string, title, summary, date, tags: author ? [author] : [], url };
    });

    return NextResponse.json(posts);
  } catch (error) {
    return NextResponse.json(
      { message: "Failed to fetch posts", error: (error as Error).message },
      { status: 500 }
    );
  }
           }
