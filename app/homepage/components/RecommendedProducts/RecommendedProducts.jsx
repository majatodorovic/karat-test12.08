"use client";
import { Suspense, useEffect, useState } from "react";
import { Thumb } from "@/components/Thumb/Thumb";
import { usePathname } from "next/navigation";
import { Swiper, SwiperSlide } from "swiper/react";
import Image from "next/image";

const RecommendedProducts = ({
  newProducts,
  actionProducts,
  bestSellingProducts,
}) => {
  const productTypes = [
    {
      id: "bestSelling",
      name: "Najprodavanije",
      products: bestSellingProducts,
    },
    { id: "new", name: "Najnovije", products: newProducts },
    { id: "action", name: "Specijalne cene", products: actionProducts },
  ];

  const [selectedType, setSelectedType] = useState("bestSelling");
  const [products, setProducts] = useState(newProducts || []);
  const [swiper, setSwiper] = useState(null);
  const [isBeginning, setIsBeginning] = useState(true);
  const [isEnd, setIsEnd] = useState(false);
  const [showNavigation, setShowNavigation] = useState(true);
  const [loading, setLoading] = useState(true);
  const pathname = usePathname();

  const handleSlideChange = (swiper) => {
    setIsBeginning(swiper.isBeginning);
    setIsEnd(swiper.isEnd);
  };

  const checkNavigation = (swiper) => {
    if (!swiper) return;

    const slidesPerView = swiper.params.slidesPerView;
    const totalSlides = products?.length || 0;
    const shouldShowNavigation = totalSlides > slidesPerView;

    setShowNavigation(shouldShowNavigation);

    // Update beginning/end states when navigation visibility changes
    if (shouldShowNavigation) {
      setIsBeginning(swiper.isBeginning);
      setIsEnd(swiper.isEnd);
    } else {
      setIsBeginning(true);
      setIsEnd(true);
    }
  };

  const handleTypeChange = (typeId) => {
    const selectedTypeData = productTypes.find((type) => type.id === typeId);
    if (selectedTypeData) {
      setSelectedType(typeId);
      setProducts(selectedTypeData.products || []);
      // Reset states when changing tabs
      setIsBeginning(true);
      setIsEnd(false);
      // Update navigation visibility after products change
      if (swiper) {
        setTimeout(() => {
          checkNavigation(swiper);
        }, 100);
      }
    }
  };

  useEffect(() => {
    // Set initial products based on selected type
    const selectedTypeData = productTypes.find(
      (type) => type.id === selectedType,
    );
    if (selectedTypeData) {
      setProducts(selectedTypeData.products || []);
    }
    setLoading(false);
  }, [newProducts, actionProducts, bestSellingProducts]);

  useEffect(() => {
    // Update navigation visibility when products change
    if (swiper && !loading) {
      // Reset states when products change
      setIsBeginning(true);
      setIsEnd(false);
      setTimeout(() => {
        checkNavigation(swiper);
      }, 100);
    }
  }, [products, swiper, loading]);

  return (
    <div className="sectionPaddingX marginBottomSection" data-aos="fade-up">
      <div className="relative mt-14 flex flex-col justify-between pb-1 max-lg:gap-3 md:mt-[100px] lg:flex-row lg:items-center">
        {!pathname.includes("korpa") && (
          <>
            <div className="mx-auto flex flex-row items-center justify-center max-lg:hidden">
              {productTypes.map((type, idx) => (
                <div className={idx !== 0 ? "-ml-4" : ""} key={type.id}>
                  <button
                    className={`!rounded-[26px] !px-[120px] !py-4 px-14 lg:!px-20 ${
                      selectedType === type.id ? `mainButton` : `invertedButton`
                    }`}
                    onClick={(e) => {
                      e.preventDefault();
                      handleTypeChange(type.id);
                    }}
                  >
                    {type.name}
                  </button>
                </div>
              ))}
            </div>
            <div className="lg:hidden">
              <select
                onChange={(e) => {
                  handleTypeChange(e.target.value);
                }}
                value={selectedType}
                className="w-full rounded-lg border border-gray-400 text-black focus:border-gray-400 focus:outline-0 focus:ring-0 max-md:text-[0.9rem]"
              >
                {productTypes.map((type) => (
                  <option
                    key={type.id}
                    value={type.id}
                    className={`max-md:text-[0.9rem]`}
                  >
                    {type.name}
                  </option>
                ))}
              </select>
            </div>
          </>
        )}
      </div>
      {!loading && (
        <div className="relative mt-10 md:mt-[70px]">
          <div className="relative w-full">
            <Swiper
              className={`w-[calc(100%-70px)] lg:w-[calc(100%-180px)]`}
              onSwiper={(swiper) => {
                setSwiper(swiper);
                setIsBeginning(swiper.isBeginning);
                setIsEnd(swiper.isEnd);
                checkNavigation(swiper);
              }}
              onBreakpoint={(swiper) => {
                checkNavigation(swiper);
              }}
              onSlideChange={handleSlideChange}
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
              {products?.map(({ id }) => {
                return (
                  <SwiperSlide key={id} className="hoveredColor">
                    <Suspense
                      fallback={
                        <div
                          key={id}
                          className="aspect-2/3 h-full w-full animate-pulse bg-slate-300"
                        />
                      }
                    >
                      <Thumb id={id} slug={id} light />
                    </Suspense>
                  </SwiperSlide>
                );
              })}
            </Swiper>
            {showNavigation && !isBeginning && (
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
            {showNavigation && !isEnd && (
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
    </div>
  );
};

export default RecommendedProducts;
