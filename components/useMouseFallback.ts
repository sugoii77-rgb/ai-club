"use client";

import { useEffect } from "react";

// 마우스/터치 위치를 아바타 엔진(iframe)에 전달합니다.
// 엔진은 자체 viewport 기준 좌표를 기대하므로 iframe 사각형 기준으로
// 정규화한 뒤 엔진 좌표로 변환합니다. clamp로 과한 회전을 방지합니다.
export function useMouseFallback(frameRef: React.RefObject<HTMLIFrameElement>) {
  useEffect(() => {
    const clamp = (v: number, min: number, max: number) =>
      Math.min(max, Math.max(min, v));

    const send = (clientX: number, clientY: number) => {
      const frame = frameRef.current;
      const win = frame?.contentWindow;
      if (!frame || !win) return;
      const rect = frame.getBoundingClientRect();
      if (rect.width === 0 || rect.height === 0) return;
      const nx = clamp((clientX - rect.left) / rect.width, -0.15, 1.15);
      const ny = clamp((clientY - rect.top) / rect.height, -0.15, 1.15);
      win.postMessage(
        { type: "pointer", x: nx * win.innerWidth, y: ny * win.innerHeight },
        "*"
      );
    };

    const onMouse = (e: MouseEvent) => send(e.clientX, e.clientY);
    const onTouch = (e: TouchEvent) => {
      const t = e.touches[0];
      if (t) send(t.clientX, t.clientY);
    };

    window.addEventListener("mousemove", onMouse, { passive: true });
    window.addEventListener("touchmove", onTouch, { passive: true });
    return () => {
      window.removeEventListener("mousemove", onMouse);
      window.removeEventListener("touchmove", onTouch);
    };
  }, [frameRef]);
}
