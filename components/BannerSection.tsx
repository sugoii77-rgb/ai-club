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

        {/* 스페인어 공부 앱 */}
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
    </section>
  );
}
