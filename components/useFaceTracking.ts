"use client";

import { useCallback, useRef, useState } from "react";

// 아바타 상태 머신:
// idle -> (체험하기 클릭) camera-request -> tracking | denied
// 카메라 미지원 브라우저는 unsupported (idle 애니메이션만)
export type AvatarState =
  | "idle"
  | "camera-request"
  | "tracking"
  | "denied"
  | "unsupported";

// 웹캠 stream은 iframe 내부의 MediaPipe로만 전달되어 브라우저 안에서만
// 처리됩니다. 서버로 전송되지 않습니다.
export function useFaceTracking(
  frameRef: React.RefObject<HTMLIFrameElement>
) {
  const [state, setState] = useState<AvatarState>("idle");
  const streamRef = useRef<MediaStream | null>(null);

  const enableTracking = useCallback(async () => {
    if (state === "tracking") return;
    if (!navigator.mediaDevices?.getUserMedia) {
      setState("unsupported");
      return;
    }
    setState("camera-request");
    try {
      const stream = await navigator.mediaDevices.getUserMedia({
        video: { width: 320, height: 240, facingMode: "user" },
        audio: false,
      });
      const engine = frameRef.current?.contentWindow as
        | (Window & { __attachCameraStream?: (s: MediaStream) => Promise<void> })
        | null;
      if (engine?.__attachCameraStream) {
        await engine.__attachCameraStream(stream);
        streamRef.current = stream;
        setState("tracking");
        stream.getVideoTracks()[0]?.addEventListener("ended", () => {
          streamRef.current = null;
          setState("idle");
        });
      } else {
        stream.getTracks().forEach((t) => t.stop());
        setState("idle");
      }
    } catch {
      setState("denied"); // 거부 시 마우스 추적 폴백으로 계속 동작
    }
  }, [frameRef, state]);

  const stopTracking = useCallback(() => {
    streamRef.current?.getTracks().forEach((t) => t.stop());
    streamRef.current = null;
    setState("idle");
  }, []);

  return { state, enableTracking, stopTracking };
}
