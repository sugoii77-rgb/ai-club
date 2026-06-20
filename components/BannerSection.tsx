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
    <section className="mx-auto max-w-6xl px-6 pb-12">
      <div className="flex flex-col md:flex-row gap-6">
        {/* 포스터 */}
        <div className="glass relative overflow-hidden rounded-3xl flex-1">
          <div className="relative h-64 w-full overflow-hidden md:h-[420px]">
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

        {/* AI 뮤직비디오 */}
        <div className="glass relative overflow-hidden rounded-3xl flex-1 flex flex-col">
          <div className="px-6 pt-5 pb-3 border-b border-white/5">
            <p className="text-xs font-semibold tracking-widest uppercase text-indigo-400">AI 제작 뮤직비디오</p>
            <h3 className="mt-1 text-base font-bold text-white">스페인 레게톤 — AI로 만든 신나는 뮤비 🎵</h3>
          </div>
          <div className="flex-1 flex items-center justify-center p-4">
            <div className="w-full rounded-2xl overflow-hidden" style={{position: "relative", paddingBottom: "56.25%", height: 0}}>
              <iframe
                src="https://www.youtube.com/embed/HKb68QsXVTk"
                title="AI 제작 스페인 레게톤 뮤직비디오"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
                style={{position: "absolute", top: 0, left: 0, width: "100%", height: "100%", border: "none"}}
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
