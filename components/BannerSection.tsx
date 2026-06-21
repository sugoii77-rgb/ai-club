import Image from "next/image";
import fs from "fs/promises";
import path from "path";

interface BannerData {
  image_url: string;
  description: string;
}

async function getBannerData(): Promise<BannerData | null> {
  try {
    const filePath = path.join(process.cwd(), "public", "data", "banner.json");
    const fileContents = await fs.readFile(filePath, "utf8");
    const data: BannerData = JSON.parse(fileContents);
    return data;
  } catch (error) {
    console.error("Failed to read banner data:", error);
    return null;
  }
}

export default async function BannerSection() {
  const bannerData = await getBannerData();


  if (!bannerData) {
    return null;
  }


  return (
    <section className="mx-auto max-w-6xl px-6 pb-12 space-y-6">
      {/* Row 1: 포스터 + 스페인어 공부 앱 */}
      <div className="flex flex-col md:flex-row gap-6">
        <div className="glass relative overflow-hidden rounded-3xl flex-1">
            <Image
              src={bannerData.image_url}
              alt="AI Club 포스터"
              fill
              className="object-contain"
            />
            <div
              className="pointer-events-none absolute inset-0"
              style={{
                background:
                  "linear-gradient(to bottom, transparent 55%, rgba(7,10,20,0.9) 100%)",
              }}
              aria-hidden
            />
          </div>
          {bannerData.description && (
            <div className="px-6 py-4 border-t border-white/5">
              <p className="text-sm text-slate-400">{bannerData.description}</p>
            </div>
          )}
        </div>


        <div className="glass relative overflow-hidden rounded-3xl flex-1 flex flex-col">
          <div className="px-6 pt-5 pb-3 border-b border-white/5">
            <p className="text-xs font-semibold tracking-widest uppercase text-indigo-400">AI 제작 스페인어 학습</p>
            <h3 className="mt-1 text-base font-bold text-white">레게톤 뮤비 보며 스페인어 공부 하기 🇪🇸</h3>
          </div>
          <div className="flex-1 p-0 min-h-[380px] md:min-h-[420px]">
            <iframe
              src="https://spanish-mv-study.vercel.app/"
              title="스페인 레게톤 뮤비와 함께 스페인어 학습"
              className="w-full h-full min-h-[380px] md:min-h-[420px]"
              style={{border: "none"}}
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            />
          </div>
        </div>
      </div>


      {/* Row 2: 조선 힙합 AI 뮤직비디오 */}
      <div className="glass relative overflow-hidden rounded-3xl">
        <div className="px-6 pt-5 pb-3 border-b border-white/5">
          <p className="text-xs font-semibold tracking-widest uppercase text-purple-400">AI 제작 뮤직비디오</p>
          <h3 className="mt-1 text-lg font-bold text-white">Moonlight Vows (달빛 가약 EDM 버전) 🌙</h3>
          <p className="mt-2 text-sm text-slate-400">조선 힙합 — 전통 국악의 애절한 감성과 트렌디한 EDM/프로그레시브 하우스 비트가 만난 본격 조선 일렉트로니카! 한밤중 폼쳐지는 신비롭고 청량한 야행의 분위기를 사운드와 비주얼로 함께 즐겨보세요.</p>
        </div>
        <div className="p-4">
          <div className="w-full rounded-2xl overflow-hidden" style={{position: "relative", paddingBottom: "56.25%", height: 0}}>
            <iframe
              src="https://www.youtube.com/embed/ZOCZi9gUkas"
              title="Moonlight Vows - 조선 힙합 AI 뮤직비디오"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
              style={{position: "absolute", top: 0, left: 0, width: "100%", height: "100%", border: "none"}}
            />
          </div>
        </div>
      </div>
    </section>
  );
}
