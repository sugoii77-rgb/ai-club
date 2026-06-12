import { Client } from "@notionhq/client";
import { getNotionArchivePosts } from "@/lib/notion";
import { NextResponse } from "next/server";

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

  const notion = new Client({
    auth: notionApiKey,
  });

  try {
    const posts = await getNotionArchivePosts(notion, notionParentPageId);
    console.log("API Route - Fetched posts:", JSON.stringify(posts, null, 2));
    return NextResponse.json(posts);
  } catch (error) {
    console.error("API Route - Error in /api/notion-archive:", error);
    return NextResponse.json(
      { message: "Failed to fetch Notion posts", error: (error as Error).message },
      { status: 500 }
    );
  }
}
