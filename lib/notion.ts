import { Client } from "@notionhq/client";
import { PageObjectResponse, PartialPageObjectResponse } from "@notionhq/client/build/src/api-endpoints";

const notion = new Client({
  auth: process.env.NOTION_API_KEY,
});

const NOTION_PARENT_PAGE_ID = process.env.NOTION_PARENT_PAGE_ID || "";

interface NotionPost {
  id: string;
  title: string;
  summary: string;
  date: string;
  tags: string[];
  url: string;
}

export async function getNotionArchivePosts(): Promise<NotionPost[]> {
  if (!NOTION_PARENT_PAGE_ID) {
    console.error("NOTION_PARENT_PAGE_ID is not set.");
    return [];
  }

  try {
    // 1. Get child blocks of the parent page
    const { results: childBlocks } = await notion.blocks.children.list({
      block_id: NOTION_PARENT_PAGE_ID,
      page_size: 100, // Adjust as needed
    });

    const posts: NotionPost[] = [];

    for (const block of childBlocks) {
      if (block.type === "child_page") {
        const pageId = block.id;
        const page = await notion.pages.retrieve({
          page_id: pageId,
        }) as PageObjectResponse;

        // Extract properties from the page
        const titleProperty = page.properties.title; // Assuming 'title' is the property name
        const summaryProperty = page.properties.Summary; // Assuming 'Summary' is the property name
        const dateProperty = page.properties.Date; // Assuming 'Date' is the property name
        const tagsProperty = page.properties.Tags; // Assuming 'Tags' is the property name

        // Helper to get plain text from Notion rich text property
        const getPlainText = (richTextArr: any[]) => {
          return richTextArr.map((t) => t.plain_text).join("");
        };

        // Helper to get multi-select tag names
        const getTagNames = (multiSelectArr: any[]) => {
          return multiSelectArr.map((tag: { name: string }) => tag.name);
        };

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
    return posts;
  } catch (error) {
    console.error("Error fetching Notion archive posts:", error);
    return [];
  }
}
