"use client";

import type { AvatarState } from "./useFaceTracking";

const messages: Record<AvatarState, string> = {
  idle: "카메라 권한을 허용하면 아바타가 당신의 움직임을 따라갑니다.",
  "camera-request": "브라우저의 카메라 권한 요청을 확인해 주세요…",
  tracking: "아바타가 당신을 보고 있어요. 고개를 움직여 보세요!",
  denied: "카메라 없이도 괜찮아요 — 마우스 움직임을 따라갑니다.",
  unsupported: "이 브라우저는 카메라를 지원하지 않아 기본 모드로 동작합니다.",
};

export default function CameraPermissionNotice({
  state,
}: {
  state: AvatarState;
}) {
  return (
    <div className="mt-3 space-y-1 text-center">
      <p className="text-xs text-slate-400">{messages[state]}</p>
      <p className="text-[11px] text-slate-500">
        카메라 영상은 브라우저 내부에서만 사용되며 저장되거나 전송되지
        않습니다.
      </p>
    </div>
  );
}
