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
      <div className="glass relative overflow-hidden rounded-3xl">
        {/* Poster image */}
        <div className="relative h-64 w-full overflow-hidden md:h-[420px]">
          <Image
            src={bannerData.image_url}
            alt="AI Club 포스터"
            fill
            className="object-contain"
          />
          {/* Bottom gradient for caption blending */}
          <div
            className="pointer-events-none absolute inset-0"
            style={{
              background:
                "linear-gradient(to bottom, transparent 55%, rgba(7,10,20,0.9) 100%)",
            }}
            aria-hidden
          />
        </div>

        {/* Caption */}
        {bannerData.description && (
          <div className="px-6 py-4 border-t border-white/5">
            <p className="text-sm text-slate-400">{bannerData.description}</p>
          </div>
        )}
      </div>
    </section>
  );
}
