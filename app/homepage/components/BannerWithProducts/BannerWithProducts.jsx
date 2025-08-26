"use client";

import { currencyFormat } from "@/helpers/functions";
import Image from "next/image";
import Link from "next/link";

const BannerWithProducts = ({ banners, recommendedProducts }) => {
  const banner = banners && banners.length > 0 ? banners[0] : null;
  const products = recommendedProducts ? recommendedProducts.slice(0, 4) : [];

  return (
    <div className="sectionPaddingX marginBottomSection" data-aos="fade-up">
      <div className="relative flex min-h-[750px] w-full flex-col items-center items-stretch gap-12 overflow-hidden rounded-[24px] lg:gap-8 lg:rounded-[30px] 2xl:flex-row 2xl:rounded-[50px]">
        {/* Banner content (left) */}
        <div className="flex w-full flex-col items-start justify-start gap-6 px-4 pt-10 text-white sm:px-8 lg:w-1/2 lg:gap-[60px] lg:pt-[90px] xl:pl-20 2xl:w-1/3">
          <h2 className="text-[48px] font-light leading-[normal] 2xl:text-[56px] 3xl:text-[67px]">
            {banner?.title}
          </h2>
          <p
            className="mb-2 text-lg font-light 2xl:text-xl"
            dangerouslySetInnerHTML={{ __html: banner?.text }}
          />
          {banner?.button && (
            <Link
              href={banner?.url ?? "/"}
              className="invertedButton w-[240px] text-center"
            >
              {banner?.button}
            </Link>
          )}
        </div>
        {/* Banner image (background, only on desktop) */}
        {banner?.image && (
          <div
            className={`absolute right-0 top-0 -z-10 h-full w-full overflow-hidden`}
          >
            <Image
              src={banner.image}
              alt={banner.title}
              fill
              className="object-cover object-right"
              priority
            />
          </div>
        )}
        {/* Product cards (right) */}
        <div className="relative z-10 grid w-fit grid-cols-2 items-center justify-center gap-4 pb-10 max-xl:mx-auto max-xl:px-8 max-sm:px-4 sm:gap-6 md:mt-0 md:grid-cols-2 lg:w-fit lg:grid-cols-4 lg:justify-end xl:ml-auto xl:items-end xl:pr-14 2xl:w-fit">
          {products.map((product) => (
            <Link
              href={`${product.slug_path}`}
              key={product.id}
              className="flex flex-col gap-5"
            >
              <div className="flex w-full items-center justify-center overflow-hidden rounded-[24px] bg-white sm:h-[260px] sm:w-[260px] sm:min-w-[260px] lg:h-[200px] lg:w-[200px] lg:min-w-[200px] 4xl:h-[260px] 4xl:w-[260px] 4xl:min-w-[260px]">
                <Image
                  src={product.image[0] || "/images/no-image-karat.jpg"}
                  alt={product?.basic_data?.name}
                  width={260}
                  height={260}
                  className="aspect-square object-contain transition-all duration-300 hover:scale-105 sm:h-[260px] sm:w-[260px] sm:min-w-[260px] lg:h-[200px] lg:w-[200px] 4xl:h-[260px] 4xl:w-[260px] 4xl:min-w-[260px]"
                />
              </div>
              <div className="flex flex-col gap-1">
                <div className="truncate text-base text-white sm:text-[19px]">
                  {product?.basic_data?.name}
                </div>

                <div className="line-clamp-1 h-6 text-[15px] font-semibold text-white">
                  {product?.price?.price?.discount ||
                    (product?.price?.price?.original &&
                      (product?.price?.price?.discount
                        ? currencyFormat(
                            product?.price?.price?.discount,
                            product?.price?.currency,
                          )
                        : currencyFormat(
                            product?.price?.price?.original,
                            product?.price?.currency,
                          )))}
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
};

export default BannerWithProducts;
