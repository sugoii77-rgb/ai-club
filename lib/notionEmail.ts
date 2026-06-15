const NOTION_VERSION = "2022-06-28";

export interface ApprovedMember {
  pageId: string;
  name: string;
  email: string;
}

interface NotionPage {
  id: string;
  properties?: {
    Name?: { title?: Array<{ plain_text?: string }> };
    Email?: { email?: string | null };
  };
}

interface NotionQueryResponse {
  results?: NotionPage[];
}

function getNotionHeaders(): Record<string, string> | null {
  const apiKey = process.env.NOTION_API_KEY;
  if (!apiKey) return null;
  return {
    Authorization: `Bearer ${apiKey}`,
    "Content-Type": "application/json",
    "Notion-Version": NOTION_VERSION,
  };
}

export async function getApprovedPendingEmail(): Promise<ApprovedMember[]> {
  const dbId = process.env.NOTION_MEMBERS_DATABASE_ID;
  const headers = getNotionHeaders();
  if (!dbId || !headers) return [];

  try {
    const response = await fetch(
      `https://api.notion.com/v1/databases/${dbId}/query`,
      {
        method: "POST",
        headers,
        cache: "no-store",
        body: JSON.stringify({
          filter: {
            and: [
              { property: "Status", select: { equals: "approved" } },
              { property: "EmailSent", checkbox: { equals: false } },
            ],
          },
        }),
      }
    );

    if (!response.ok) return [];

    const data = (await response.json()) as NotionQueryResponse;
    return (data.results ?? [])
      .map((page) => ({
        pageId: page.id,
        name: page.properties?.Name?.title?.[0]?.plain_text ?? "",
        email: page.properties?.Email?.email ?? "",
      }))
      .filter((m) => m.email !== "");
  } catch {
    return [];
  }
}

export async function markEmailSent(pageId: string): Promise<boolean> {
  const headers = getNotionHeaders();
  if (!headers) return false;

  try {
    const response = await fetch(
      `https://api.notion.com/v1/pages/${pageId}`,
      {
        method: "PATCH",
        headers,
        cache: "no-store",
        body: JSON.stringify({
          properties: {
            EmailSent: { checkbox: true },
          },
        }),
      }
    );
    return response.ok;
  } catch {
    return false;
  }
}
