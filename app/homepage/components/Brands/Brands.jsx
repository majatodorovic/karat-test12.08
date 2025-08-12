"use client";

import Image from "next/image";
import Brand1 from "../../../../public/images/brands/brand1.png";
import Brand2 from "../../../../public/images/brands/brand2.png";
import Brand3 from "../../../../public/images/brands/brand3.png";
import Brand4 from "../../../../public/images/brands/brand4.png";
import Brand5 from "../../../../public/images/brands/brand5.png";
import Brand6 from "../../../../public/images/brands/brand6.png";
import Link from "next/link";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper/modules";
import { useEffect, useRef, useState } from "react";

const Brands = () => {
  const data = [
    { id: 1, slug: "/kategorije/brendovi/tissot", image: Brand1 },
    { id: 2, slug: "/kategorije/brendovi/swatch", image: Brand2 },
    { id: 3, slug: "/kategorije/brendovi/michael-kors", image: Brand3 },
    { id: 4, slug: "/kategorije/brendovi/fossil", image: Brand4 },
    { id: 5, slug: "/kategorije/brendovi/guess", image: Brand5 },
    { id: 6, slug: "/kategorije/brendovi/armani-exchange", image: Brand6 },
  ];

  const [showArrows, setShowArrows] = useState(false);
  const [isBeginning, setIsBeginning] = useState(true);
  const [isEnd, setIsEnd] = useState(false);
  const swiperRef = useRef(null);

  useEffect(() => {
    const updateShowArrows = () => {
      const screenWidth = window.innerWidth;
      let slidesPerView = 2.5;

      if (screenWidth >= 1280) slidesPerView = 5;
      else if (screenWidth >= 1024) slidesPerView = 4;
      else if (screenWidth >= 768) slidesPerView = 3;

      setShowArrows(data.length > slidesPerView);
    };

    updateShowArrows();
    window.addEventListener("resize", updateShowArrows);
    return () => window.removeEventListener("resize", updateShowArrows);
  }, [data.length]);

  return (
    <div
      className="sectionPaddingX marginBottomSection relative"
      data-aos="fade-up"
    >
      <div className="flex">
        <div className="relative w-full">
          <Swiper
            className={`w-[calc(100%-70px)] lg:w-[calc(100%-180px)]`}
            modules={[Navigation]}
            slidesPerView={1}
            spaceBetween={20}
            breakpoints={{
              480: {
                slidesPerView: 1.5,
              },
              768: {
                slidesPerView: 2,
              },
              1024: {
                slidesPerView: 2.5,
                spaceBetween: 20,
              },
              1280: {
                slidesPerView: 3,
                spaceBetween: 20,
              },
              1440: {
                slidesPerView: 4,
              },
              1600: {
                slidesPerView: 5,
              },
            }}
            onSwiper={(swiper) => {
              swiperRef.current = swiper;
              setIsBeginning(swiper.isBeginning);
              setIsEnd(swiper.isEnd);
            }}
            onSlideChange={(swiper) => {
              setIsBeginning(swiper.isBeginning);
              setIsEnd(swiper.isEnd);
            }}
          >
            {data?.map(({ slug, id, image }) => {
              return (
                <SwiperSlide key={id}>
                  <div className="max-h-[140px] rounded-[32px] bg-lightGray">
                    <Link href={slug}>
                      <Image
                        src={image}
                        alt="brand"
                        width={300}
                        height={140}
                        className="mx-auto max-h-[140px] object-contain"
                      />
                    </Link>
                  </div>
                </SwiperSlide>
              );
            })}
          </Swiper>
          {showArrows && !isBeginning && (
            <button
              className="absolute left-0 top-0 z-50 flex h-[140px] w-[30px] transform items-center justify-center rounded-[28px] bg-primary lg:w-[70px]"
              onClick={() => swiperRef.current?.slidePrev()}
            >
              <Image
                src="/icons/chevron-left.png"
                alt="Arrow"
                width={32}
                height={32}
              />
            </button>
          )}
          {showArrows && !isEnd && (
            <button
              className="absolute right-0 top-0 z-10 flex h-[140px] w-[30px] items-center justify-center rounded-[28px] bg-primary lg:w-[70px]"
              onClick={() => swiperRef.current?.slideNext()}
            >
              <Image
                src="/icons/chevron-right.png"
                alt="Arrow"
                width={32}
                height={32}
              />
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default Brands;
