"use client";
import React from "react";
import Image from "next/image";
import Link from "next/link";

const RecommendedCategories = ({ banners, categories }) => {
  const sortedBanners = [...banners]?.sort((a, b) => b.id - a.id).slice(0, 1);

  return (
    <div className="sectionPaddingX marginBottomSection" data-aos="fade-up">
      <div
        className="flex w-full gap-10 max-xl:flex-col max-xl:gap-6 md:px-10 lg:px-20 2xl:px-[100px] 3xl:px-[164px]"
        data-aos="fade-up"
      >
        {sortedBanners.length > 0 && (
          <div className="relative flex max-xl:justify-center">
            {sortedBanners.map((banner, index) => {
              return (
                <Link
                  href={banner.url ?? "/"}
                  key={index}
                  className="relative h-auto w-auto overflow-hidden rounded-[32px] bg-primary xl:aspect-2/3 xl:h-[460px]"
                >
                  <div className="flex flex-col gap-10 px-9 py-12 text-white">
                    {banner?.title && (
                      <div className="text-[25px] font-medium leading-[normal]">
                        {banner?.title}
                      </div>
                    )}
                    {banner?.text && (
                      <div
                        className="text-[17px] font-light leading-[normal]"
                        dangerouslySetInnerHTML={{ __html: banner.text }}
                      />
                    )}
                  </div>
                </Link>
              );
            })}
          </div>
        )}
        <div className="flex w-full gap-10 max-xl:gap-6 max-md:flex-col">
          {categories?.slice(0, 3)?.map((category) => (
            <Link
              key={category.id}
              className="group relative flex h-[470px] w-full items-center justify-center overflow-hidden rounded-[32px] bg-lightGray px-6 max-md:flex-col"
              href={`/${category?.link?.link_path}`}
            >
              {category?.images?.image && (
                <Image
                  src={category?.images?.image}
                  alt="category"
                  className="mb-20 object-cover transition-all duration-700 ease-in-out group-hover:scale-110"
                  height={260}
                  width={260}
                />
              )}
              <div className="absolute bottom-10 left-10 z-10">
                <h3 className="text-whiteSmoke text-left text-2xl font-normal">
                  {category?.basic_data?.name}
                </h3>
                <div className="mt-2 flex items-center gap-2">
                  <div className="font-light">Pogledajte</div>
                  <Image
                    src={"/icons/right-chevron.png"}
                    alt="back button"
                    className="h-3 w-3"
                    width={12}
                    height={14}
                  />
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
};

export default RecommendedCategories;
