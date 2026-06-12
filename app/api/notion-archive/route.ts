import { getNotionArchivePosts } from "@/lib/notion";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    const posts = await getNotionArchivePosts();
    return NextResponse.json(posts);
  } catch (error) {
    console.error("Error in /api/notion-archive:", error);
    return NextResponse.json(
      { message: "Failed to fetch Notion posts", error: (error as Error).message },
      { status: 500 }
    );
  }
}
