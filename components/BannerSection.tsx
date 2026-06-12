import Image from "next/image";
import { useEffect, useState } from "react";

interface BannerData {
  image_url: string;
  description: string;
}

export default function BannerSection() {
  const [bannerData, setBannerData] = useState<BannerData | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetch("/data/banner.json")
      .then((response) => {
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        return response.json();
      })
      .then((data: BannerData) => setBannerData(data))
      .catch((error) => {
        console.error("Failed to fetch banner data:", error);
        setError("Failed to load banner. Please try again later.");
      });
  }, []);

  if (error) {
    return (
      <section className="py-16 bg-red-100 text-red-700 text-center">
        <div className="container mx-auto px-4">
          <p>{error}</p>
        </div>
      </section>
    );
  }

  if (!bannerData) {
    return (
      <section className="py-16 bg-gray-100 text-gray-700 text-center">
        <div className="container mx-auto px-4">
          <p>Loading banner...</p>
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
            objectFit="cover"
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
