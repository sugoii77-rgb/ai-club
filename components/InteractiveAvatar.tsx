"use client";

import { useRef } from "react";
import { useFaceTracking } from "./useFaceTracking";
import { useMouseFallback } from "./useMouseFallback";
import CameraPermissionNotice from "./CameraPermissionNotice";

// Hero의 인터랙티브 아바타.
// - 평소: 은은한 blink/breathing (엔진 내장 idle 모션)
// - 마우스/터치: 시선이 포인터를 따라옴 (기본 폴백, 권한 불필요)
// - "아바타 체험하기" 클릭 시에만 카메라 권한 요청 -> 얼굴 추적
// 렌더링은 /public/avatar/face-engine.html (Three.js + MediaPipe)이 담당.
export default function InteractiveAvatar() {
  const frameRef = useRef<HTMLIFrameElement>(null);
  const { state, enableTracking } = useFaceTracking(frameRef);
  useMouseFallback(frameRef);

  return (
    <div className="w-full max-w-md">
      <div className="group relative">
        {/* soft glow behind the avatar */}
        <div
          className="absolute -inset-4 rounded-[2rem] opacity-60 blur-2xl transition-opacity duration-500 group-hover:opacity-90"
          style={{
            background:
              "radial-gradient(60% 60% at 50% 40%, rgba(139,92,246,0.35), rgba(56,189,248,0.12) 60%, transparent 80%)",
          }}
          aria-hidden
        />
        <div className="glass relative overflow-hidden rounded-[2rem] shadow-glow">
          <iframe
            ref={frameRef}
            src="/avatar/face-engine.html?bg=0a0d1c"
            title="Interactive AI Avatar"
            allow="camera; autoplay"
            loading="lazy"
            className="block aspect-[4/5] w-full border-0"
          />
          {state !== "tracking" && (
            <button
              type="button"
              onClick={enableTracking}
              className="btn-primary absolute bottom-4 left-1/2 -translate-x-1/2 whitespace-nowrap text-xs"
            >
              {state === "camera-request" ? "권한 확인 중…" : "아바타 체험하기"}
            </button>
          )}
          {state === "tracking" && (
            <span className="absolute bottom-4 left-1/2 -translate-x-1/2 rounded-full bg-emerald-400/15 px-4 py-1.5 text-xs font-medium text-emerald-300 ring-1 ring-emerald-400/30">
              ● 얼굴 추적 중
            </span>
          )}
        </div>
      </div>
      <CameraPermissionNotice state={state} />
    </div>
  );
}
