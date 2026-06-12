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
    return (
      <section className="py-16 bg-red-100 text-red-700 text-center">
        <div className="container mx-auto px-4">
          <p>Failed to load banner. Please check server logs.</p>
        </div>
      </section>
    );
  }

  return (
    <section className="py-8 bg-gray-50">
      <div className="container mx-auto px-4">
        <div className="relative w-full h-64 md:h-96 overflow-hidden rounded-lg shadow-lg">
          <Image
            src={bannerData.image_url}
            alt="AI Club Banner"
            layout="fill"
            objectFit="contain"
            className="w-full h-full"
          />
        </div>
        <p className="mt-4 text-center text-lg md:text-xl font-semibold text-gray-800">
          {bannerData.description}
        </p>
      </div>
    </section>
  );
}