"use client";

import Image from "next/image";
import Link from "next/link";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination } from "swiper/modules";

const BannersCategory = ({ banners }) => {
  const sortedBanners = [...banners].sort((a, b) => b.id - a.id).slice(0, 3);

  return (
    <div className="sectionPaddingX marginBottomSection" data-aos="fade-up">
      <h2 className="titleH2 text-center">
        Izdavajmo vaše omiljene kategorije
      </h2>

      {/* Mobile Swiper */}
      <div className="relative mt-12 md:hidden">
        <Swiper
          modules={[Navigation, Pagination]}
          spaceBetween={16}
          slidesPerView={1.5}
          loop={false}
        >
          {banners.slice(0, 3)?.map((banner) => (
            <SwiperSlide key={banner.id}>
              <Link
                href={banner?.url ?? "/"}
                key={banner.id}
                // className="group relative flex h-[340px] w-full items-center justify-center overflow-hidden rounded-[32px] bg-lightGray px-6 sm:h-[470px]"
                className="group relative flex h-[340px] w-full overflow-hidden rounded-[40px]"
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
            </SwiperSlide>
          ))}
        </Swiper>
      </div>

      {/* Desktop/Grid */}
      <div className="mt-12 hidden gap-5 md:grid md:grid-cols-3">
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
