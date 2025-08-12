"use client";

import Image from "next/image";
import Link from "next/link";

const BannersCategory = ({ banners }) => {
  const sortedBanners = [...banners].sort((a, b) => b.id - a.id).slice(0, 3);
  return (
    <div className="sectionPaddingX marginBottomSection" data-aos="fade-up">
      <h2 className="titleH2 text-center">
        Izdavajmo vaše omiljene kategorije
      </h2>
      <div className="mt-12 grid gap-5 md:grid-cols-3">
        {sortedBanners.map((banner) => (
          <Link
            href={banner?.url ?? "/"}
            key={banner.id}
            className="group relative h-[340px] overflow-hidden rounded-[40px] md:h-[300px] xl:h-[340px]"
          >
            <div className="absolute left-0 top-0 z-10 h-full w-full bg-gradient-to-t from-black/30 via-black/10 to-transparent"></div>
            <Image
              src={banner.image}
              alt={banner.title}
              width={500}
              height={500}
              className="absolute left-0 top-0 h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
            />
            <div className="absolute bottom-6 left-8 z-50 flex h-auto flex-col space-y-2">
              <h3 className="text-[28px] font-light text-white xl:text-[39px]">
                {banner.title}
              </h3>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default BannersCategory;
