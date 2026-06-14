const NOTION_VERSION = "2022-06-28";

export type MemberStatus = "approved" | "pending" | "rejected" | "not_found";

interface NotionMemberProperty {
  type: "select";
  select?: { name?: string } | null;
}

interface NotionMemberPage {
  properties?: {
    Status?: NotionMemberProperty;
  };
}

interface NotionQueryResponse {
  results?: NotionMemberPage[];
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

export async function getMemberStatus(email: string): Promise<MemberStatus> {
  const dbId = process.env.NOTION_MEMBERS_DATABASE_ID;
  const headers = getNotionHeaders();
  if (!dbId || !headers) return "not_found";

  try {
    const response = await fetch(
      `https://api.notion.com/v1/databases/${dbId}/query`,
      {
        method: "POST",
        headers,
        cache: "no-store",
        body: JSON.stringify({
          filter: {
            property: "Email",
            email: { equals: email.toLowerCase() },
          },
          page_size: 1,
        }),
      }
    );

    if (!response.ok) return "not_found";

    const data = (await response.json()) as NotionQueryResponse;
    const page = data.results?.[0];
    if (!page) return "not_found";

    const statusName = page.properties?.Status?.select?.name?.toLowerCase();
    if (statusName === "approved") return "approved";
    if (statusName === "pending") return "pending";
    if (statusName === "rejected") return "rejected";
    return "not_found";
  } catch {
    return "not_found";
  }
}
