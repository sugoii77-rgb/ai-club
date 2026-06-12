import { NextResponse } from "next/server";

export const dynamic = "force-dynamic";
export const runtime = "nodejs";

interface NotionPost {
  id: string;
  title: string;
  summary: string;
  date: string;
  tags: string[];
  url: string;
}

// Helper to get plain text from Notion rich text property
const getPlainText = (richTextArr: any[]) => {
  return richTextArr.map((t) => t.plain_text).join("");
};

// Helper to get multi-select tag names
const getTagNames = (multiSelectArr: any[]) => {
  return multiSelectArr.map((tag: { name: string }) => tag.name);
};

export async function GET() {
  const notionApiKey = process.env.NOTION_API_KEY;
  const notionParentPageId = process.env.NOTION_PARENT_PAGE_ID;

  console.log("API Route - Notion API Key: ", notionApiKey ? "Set" : "Not Set");
  console.log("API Route - Notion Parent Page ID: ", notionParentPageId);

  if (!notionApiKey || !notionParentPageId) {
    console.error("API Route - Missing Notion API Key or Parent Page ID");
    return NextResponse.json(
      { message: "Server configuration error: Missing Notion API Key or Parent Page ID" },
      { status: 500 }
    );
  }

  try {
    const response = await fetch(
      `https://api.notion.com/v1/blocks/${notionParentPageId}/children?page_size=100`,
      {
        method: "GET",
        headers: {
          Authorization: `Bearer ${notionApiKey}`,
          "Notion-Version": "2022-06-28", // Notion API 버전
          "Content-Type": "application/json",
        },
        // Next.js API Route에서 fetch 캐싱을 비활성화 (개발 중에는 유용)
        cache: "no-store",
      }
    );

    if (!response.ok) {
      throw new Error(`Notion API error! status: ${response.status} - ${await response.text()}`);
    }

    const data = await response.json();
    console.log("API Route - Child blocks raw data:", JSON.stringify(data, null, 2));

    const posts: NotionPost[] = [];

    for (const block of data.results) {
      if (block.type === "child_page") {
        const pageId = block.id;
        const pageResponse = await fetch(`https://api.notion.com/v1/pages/${pageId}`,
          {
            method: "GET",
            headers: {
              Authorization: `Bearer ${notionApiKey}`,
              "Notion-Version": "2022-06-28",
              "Content-Type": "application/json",
            },
            cache: "no-store",
          }
        );

        if (!pageResponse.ok) {
          console.warn(`Failed to retrieve page (ID: ${pageId}): ${pageResponse.status} - ${await pageResponse.text()}`);
          continue; // 다음 페이지로 넘어감
        }

        const page = await pageResponse.json();
        console.log(`API Route - Page (ID: ${pageId}) properties:`, JSON.stringify(page.properties, null, 2));

        const titleProperty = page.properties.title; // Assuming 'title' is the property name
        const summaryProperty = page.properties.Summary; // Assuming 'Summary' is the property name
        const dateProperty = page.properties.Date; // Assuming 'Date' is the property name
        const tagsProperty = page.properties.Tags; // Assuming 'Tags' is the property name

        const title = titleProperty && titleProperty.type === "title" ? getPlainText(titleProperty.title) : "No Title";
        const summary = summaryProperty && summaryProperty.type === "rich_text" ? getPlainText(summaryProperty.rich_text) : "No Summary";
        const date = dateProperty && dateProperty.type === "date" ? dateProperty.date?.start || "No Date" : "No Date";
        const tags = tagsProperty && tagsProperty.type === "multi_select" ? getTagNames(tagsProperty.multi_select) : [];
        const url = page.url;

        posts.push({
          id: pageId,
          title,
          summary,
          date,
          tags,
          url,
        });
      }
    }
    console.log("API Route - Final fetched posts:", JSON.stringify(posts, null, 2));
    return NextResponse.json(posts);
  } catch (error) {
    console.error("API Route - Error in /api/notion-archive:", error);
    return NextResponse.json(
      { message: "Failed to fetch Notion posts", error: (error as Error).message },
      { status: 500 }
    );
  }
}
