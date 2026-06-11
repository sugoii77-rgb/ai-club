// Notion archive mock data.
// 나중에 Notion API(/v1/databases/{id}/query) 결과를 이 형태로 매핑하거나,
// url 필드에 공개된 Notion 페이지 링크를 직접 넣으면 됩니다.

export interface ArchivePost {
  title: string;
  summary: string;
  tags: string[];
  url: string; // Notion 공개 페이지 링크
  date: string;
}

export const archivePosts: ArchivePost[] = [
  {
    title: "ChatGPT 프롬프트 패턴 12선",
    summary:
      "실무에서 바로 쓰는 프롬프트 구조 — 역할 지정, 출력 포맷 고정, 자기 검증 루프까지 정리했습니다.",
    tags: ["Prompt", "ChatGPT"],
    url: "https://www.notion.so/",
    date: "2026-06",
  },
  {
    title: "Notion + 자동화로 회의록 파이프라인 만들기",
    summary:
      "녹음 → 요약 → Notion DB 저장까지 자동으로 흐르는 회의록 워크플로 구축기.",
    tags: ["Notion", "Automation"],
    url: "https://www.notion.so/",
    date: "2026-05",
  },
  {
    title: "Vercel로 5분 만에 웹앱 배포하기",
    summary:
      "GitHub 연동부터 자동 재배포까지, 동호회 프로젝트를 세상에 공개하는 가장 빠른 방법.",
    tags: ["Vercel", "Web"],
    url: "https://www.notion.so/",
    date: "2026-05",
  },
  {
    title: "Copilot으로 엑셀 업무 절반 줄이기",
    summary:
      "반복 데이터 정리와 보고서 초안 작성을 Copilot에게 맡기는 실전 사례 모음.",
    tags: ["Copilot", "Office"],
    url: "https://www.notion.so/",
    date: "2026-04",
  },
  {
    title: "얼굴 추적 AI 아바타 제작기",
    summary:
      "Three.js + MediaPipe로 웹캠을 따라 시선이 움직이는 아바타를 만든 과정 — 이 홈페이지 Hero에 살아 있습니다.",
    tags: ["Three.js", "MediaPipe", "Project"],
    url: "https://www.notion.so/",
    date: "2026-06",
  },
  {
    title: "Claude로 긴 문서 요약 체계 만들기",
    summary:
      "긴 PDF·연구자료를 단계적으로 요약하고 질문 가능한 노트로 바꾸는 워크플로.",
    tags: ["Claude", "Workflow"],
    url: "https://www.notion.so/",
    date: "2026-04",
  },
];
