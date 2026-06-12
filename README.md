# AI Club — AI를 배우는 사람들의 실험실

Dark futuristic 스타일의 AI 동호회 공식 홈페이지.
Hero 섹션에는 웹캠으로 사용자의 얼굴을 따라보는 **인터랙티브 AI 아바타**가 살아 있습니다.

## 기술 스택

- Next.js 14 (App Router) + React 18 + TypeScript
- Tailwind CSS (glassmorphism / neon gradient 커스텀 유틸)
- 아바타 엔진: Three.js + MediaPipe Face Detection (`public/avatar/`, 정적 임베드)

## 실행 방법

```bash
npm install
npm run dev
# http://localhost:3000
```

프로덕션 빌드:

```bash
npm run build && npm start
```

## 배포 방법 (Vercel)

1. 이 폴더를 GitHub 저장소로 push
2. [vercel.com/new](https://vercel.com/new) → 저장소 Import → Framework: Next.js (자동 감지) → Deploy
3. 이후 `git push`만 하면 자동 재배포

카메라/아바타 기능은 HTTPS가 필요하므로 Vercel 배포 또는 `localhost`에서 동작합니다.

## 구조

```
app/
  page.tsx            # 섹션 조립
  layout.tsx          # 메타데이터, 다크 테마
  globals.css         # glass / gradient / button 유틸
  api/join/route.ts   # 회원가입 API (mock)
components/
  Nav.tsx  HeroSection.tsx  InteractiveAvatar.tsx
  CameraPermissionNotice.tsx  useFaceTracking.ts  useMouseFallback.ts
  About.tsx  Activities.tsx  Projects.tsx  NotionArchive.tsx
  JoinSection.tsx  Footer.tsx
lib/archive-data.ts   # Notion 아카이브 mock 데이터
public/avatar/        # 얼굴 추적 아바타 엔진 (Three.js + MediaPipe)
```

## 인터랙티브 아바타

- 초기 상태에서는 **카메라를 요청하지 않습니다.** 마우스/터치 움직임을 따라 시선이 움직이고, 깜빡임·미세 호흡 idle 모션이 돕니다.
- 사용자가 **"아바타 체험하기"** 버튼을 누른 순간에만 카메라 권한을 요청합니다.
- 권한 거부/미지원 → 마우스 추적 폴백으로 정상 동작.
- 영상은 브라우저 안에서만 처리되며 서버로 전송되지 않습니다 (MediaPipe가 iframe 내부에서 실행).
- 상태 머신: `idle → camera-request → tracking | denied | unsupported` (`useFaceTracking.ts`)
- 아바타 얼굴 교체: `public/avatar/assets/face-photo.jpg` 교체 후 `face-engine.html`의 `PHOTO.centerU/V`, `zoom` 조정. 입모양(visemes)은 `assets/visemes/`의 PNG를 같은 규격으로 교체하면 됩니다.

## 회원가입 저장소 연동 (현재 mock)

`app/api/join/route.ts`의 TODO 위치에 저장 로직만 끼우면 됩니다.

**Notion DB**

```ts

const notion = new Client({ auth: process.env.NOTION_TOKEN });
await notion.pages.create({
  parent: { database_id: process.env.NOTION_DB_ID! },
  properties: {
    Name: { title: [{ text: { content: name } }] },
    Email: { email },
    Interest: { select: { name: interest ?? "미정" } },
  },
});
```

**Supabase**

```ts
import { createClient } from "@supabase/supabase-js";
const supabase = createClient(process.env.SUPABASE_URL!, process.env.SUPABASE_KEY!);
await supabase.from("members").insert({ name, email, interest });
```

**Google Sheet** — Apps Script 웹훅(doPost)을 만들어 fetch로 POST하는 방식이 가장 간단합니다.

환경변수는 Vercel → Project → Settings → Environment Variables에 추가하세요.

## Notion Archive 연동 (현재 mock)

`lib/archive-data.ts`의 배열을 수정하면 카드가 바뀝니다.
실제 Notion 연동 시 Notion SDK로 데이터베이스를 query해서 같은 형태(`title/summary/tags/url/date`)로 매핑하면 됩니다. 당장은 각 항목의 `url`에 공개된 Notion 페이지 링크를 넣는 것만으로 충분합니다.
