"use client";
import { Suspense, useEffect, useState, Fragment } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import Image from "next/image";
import { useCrossSellProducts } from "@/hooks/ecommerce.hooks";
import ThumbByViewport from "../Thumb/ThumbByViewport";

const CrossSellProducts = ({ text = "Možda će Vam biti potrebno", id }) => {
  const { data: productDetails } = useCrossSellProducts({ id });
  const [swiper, setSwiper] = useState(null);
  const [showNavigation, setShowNavigation] = useState(true);

  const checkNavigation = (swiper) => {
    if (!swiper) return;
    const slidesPerView = swiper.params.slidesPerView;
    const totalSlides = productDetails?.items?.length || 0;
    const shouldShowNavigation = totalSlides > slidesPerView;
    setShowNavigation(shouldShowNavigation);
  };

  useEffect(() => {
    if (swiper) {
      setTimeout(() => {
        checkNavigation(swiper);
      }, 100);
    }
  }, [productDetails?.items, swiper]);

  return (
    <>
      {productDetails?.items?.length > 0 && (
        <div className="sectionPaddingX mt-[6rem] max-sm:mt-[3rem]">
          <div className="flex w-full items-center justify-between">
            <h5 className="text-[28px] font-light 2xl:text-[37px]">{text}</h5>
          </div>
          <div className="relative mt-[2.5rem] max-sm:mt-[1rem]">
            <Swiper
              className={`w-[calc(100%-70px)] lg:w-[calc(100%-180px)]`}
              onSwiper={(swiper) => {
                setSwiper(swiper);
                checkNavigation(swiper);
              }}
              onBreakpoint={(swiper) => {
                checkNavigation(swiper);
              }}
              slidesPerView={1}
              spaceBetween={10}
              breakpoints={{
                640: {
                  slidesPerView: 1.5,
                  spaceBetween: 20,
                },
                768: {
                  slidesPerView: 2,
                  spaceBetween: 20,
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
                  spaceBetween: 20,
                },
              }}
            >
              {productDetails?.items?.map(({ id }) => (
                <SwiperSlide key={id} className="hoveredColor">
                  <Suspense
                    fallback={
                      <div
                        key={id}
                        className="aspect-2/3 h-full w-full animate-pulse bg-slate-300"
                      />
                    }
                  >
                    <ThumbByViewport
                      id={id}
                      apiLink={`/product-details/thumb/${id}?categoryId=*`}
                    />
                  </Suspense>
                </SwiperSlide>
              ))}
            </Swiper>
            {showNavigation && (
              <button
                className="absolute left-0 top-1/2 z-50 flex h-[140px] w-[30px] -translate-y-1/2 transform items-center justify-center rounded-[28px] bg-primary lg:w-[70px]"
                onClick={() => swiper?.slidePrev()}
              >
                <Image
                  src="/icons/chevron-left.png"
                  alt="Arrow"
                  width={32}
                  height={32}
                />
              </button>
            )}
            {showNavigation && (
              <button
                className="absolute right-0 top-1/2 z-10 flex h-[140px] w-[30px] -translate-y-1/2 items-center justify-center rounded-[28px] bg-primary lg:w-[70px]"
                onClick={() => swiper?.slideNext()}
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
      )}
    </>
  );
};

export default CrossSellProducts;
