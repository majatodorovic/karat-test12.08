"use client";
import { forwardRef } from "react";
import Image from "next/image";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css/navigation";
import "swiper/css/pagination";
import { Navigation, Pagination } from "swiper/modules";
import { convertHttpToHttps } from "@/helpers/convertHttpToHttps";
import { useProductThumb } from "@/hooks/ecommerce.hooks";
import { truncateText } from "@/helpers/truncateText";
import noImage from "../../public/images/placeholder.jpg";
import Link from "next/link";
import Wishlist from "../ProductDetails/Wishlist";
import { currencyFormat } from "@/helpers/functions";

export const Thumb = forwardRef(
  (
    {
      slug,
      categoryId,
      light,
      withWishlist,
      refreshWishlist,
      categoryPage = false,
    },
    ref,
  ) => {
    const { data: product } = useProductThumb({
      slug: slug,
      id: slug,
      categoryId: categoryId ?? "*",
    });

    const variantOptionColor = product?.variant_options?.find((variant) => {
      return (
        variant?.attribute?.name === "boja" ||
        variant?.attribute?.name === "Boja" ||
        variant?.attribute?.name === "color" ||
        variant?.attribute?.name === "Color"
      );
    });

    const selected = variantOptionColor
      ? [
          {
            attribute_key: variantOptionColor.attribute.key,
            value_key: variantOptionColor.values[0].key,
          },
        ]
      : [];

    const imageList =
      product?.image.slice(0, 3).length > 0
        ? product.image.slice(0, 3)
        : variantOptionColor?.values
          ? variantOptionColor?.values
          : [{ product_image: noImage }];

    let link = `${product?.slug_path}`;

    selected.length > 0 &&
      product?.variant_options?.forEach((option) => {
        if (option.attribute.key === selected[0].attribute_key) {
          const currentColor = option.values.find(
            (value) => value.key === selected[0].value_key,
          );
          if (currentColor) link += `-${currentColor.slug}`;
        } else {
          link += `-${option.values[0].slug}`;
        }
      });

    const discount_number = Math.abs(
      product?.price?.min?.price?.original -
        product?.price?.min?.price?.discount,
    );
    const discount_percent = Math.ceil(
      (discount_number / product?.price?.min?.price?.original) * 100,
    );

    return (
      <div
        key={slug}
        className="group relative col-span-1 flex h-full flex-col items-stretch"
      >
        <div
          className={`relative !aspect-square w-full overflow-hidden rounded-[32px] border`}
        >
          <Swiper
            modules={[Navigation, Pagination]}
            rewind
            initialSlide={product?.image?.findIndex(
              (item) => item === product?.image[0],
            )}
            className={`categoryImageSwiper relative h-full w-full`}
          >
            {imageList?.map((item, index) => {
              let url;
              if (item) {
                if (
                  item.product_image &&
                  typeof item.product_image === "string"
                ) {
                  url = item.product_image;
                } else if (typeof item === "string") {
                  url = item;
                }
              }

              return (
                <SwiperSlide key={`${slug}-${index}`} className="!w-full">
                  <Link href={link} className="cursor-pointer">
                    <Image
                      ref={ref}
                      src={url ? convertHttpToHttps(url) : noImage}
                      alt={product?.basic_data?.name}
                      sizes="(max-width: 639px) 100vw, (max-width: 767px) 100vw, (max-width: 1023px) 100vw, (max-width: 1279px) 100vw, (min-width: 1600px) 50vw"
                      width={0}
                      height={0}
                      fill
                      className={`h-full w-full object-contain transition-all duration-700 ease-in-out hover:scale-105 ${
                        light ? "!bg-secondary" : "!bg-white"
                      }`}
                    />
                  </Link>
                </SwiperSlide>
              );
            })}
          </Swiper>
          {product?.price?.discount?.active ? (
            <div
              className={`absolute left-5 top-5 z-[1] flex flex-col gap-2 text-center text-white`}
            >
              <div className="rounded-xl bg-[#ce0000] px-4 py-0.5 text-base 2xl:text-lg">
                -
                {(
                  ((product?.price?.price?.original -
                    product?.price?.price?.discount) /
                    product?.price?.price?.original) *
                  100
                ).toFixed(0)}
                %
              </div>
            </div>
          ) : product?.price?.min?.price?.original &&
            product.price?.min?.price?.discount ? (
            <div className="absolute right-5 top-5 z-[1] font-light text-white">
              <div className="bg-primary px-4 py-0.5 text-base 2xl:text-lg">
                -{discount_percent}%
              </div>
            </div>
          ) : null}
          {product?.stickers?.length > 0 && (
            <div className="absolute right-5 top-5 z-[1] font-light text-white">
              {product?.stickers?.map((sticker, index) => (
                <div
                  className={`rounded-xl bg-primary px-2 py-0.5 text-base font-light 2xl:px-4 2xl:text-lg`}
                  key={index}
                >
                  {sticker?.name}
                </div>
              ))}
            </div>
          )}
        </div>
        <div className={`z-[50] flex flex-col pt-6`}>
          <div className="relative flex items-center justify-start">
            <Link href={link} className="relative line-clamp-1 cursor-pointer">
              <h3
                className={`text-left text-[24px] font-normal ${categoryPage && "text-xl"}`}
                title={
                  product?.basic_data?.name.length > 63
                    ? product?.basic_data?.name
                    : ""
                }
              >
                {truncateText(product?.basic_data?.name)}
              </h3>
            </Link>
          </div>
          <div
            className={`mb-2 text-left text-[15px] font-light ${categoryPage && "text-sm"}`}
          >
            Šifra: {product?.basic_data?.sku}
          </div>
          <div className="mb-1 h-5 pr-10 text-right text-sm font-normal text-[#7d7d7d] line-through">
            {product?.price?.price?.discount &&
              currencyFormat(
                product?.price?.price?.original,
                product?.price?.currency,
              )}
          </div>
          <div
            className={`flex w-full items-center gap-2 ${withWishlist ? "flex-col" : "flex-row"}`}
          >
            <Link
              href={link}
              className={`mainButton relative flex w-full items-center justify-between !py-1.5 !pl-14 text-center`}
            >
              <div
                className={`absolute left-0 top-0 flex h-10 w-10 min-w-10 items-center justify-center rounded-full bg-lightGray`}
              >
                <Image
                  src="/icons/shopping-bag.png"
                  width={21}
                  height={21}
                  className="h-auto w-8 min-w-8 object-cover"
                  alt="shopping-bag"
                />
              </div>
              <div
                className={`text-lg font-light ${categoryPage && "text-base"}`}
              >
                Korpa
              </div>
              <div
                className={`text-lg font-semibold ${
                  categoryPage && "!text-base"
                }`}
              >
                {product?.price?.price?.discount
                  ? currencyFormat(
                      product?.price?.price?.discount,
                      product?.price?.currency,
                    )
                  : product?.price?.price?.original
                    ? currencyFormat(
                        product?.price?.price?.original,
                        product?.price?.currency,
                      )
                    : "Cena na upit"}
              </div>
            </Link>
            {withWishlist && (
              <Wishlist
                product={product}
                refreshWishlist={refreshWishlist}
                wishlistPage={true}
              />
            )}
          </div>
        </div>
        {product?.inventory?.status === "Dostupno" && (
          <div className="mt-2 flex w-full items-center justify-center gap-2 text-left text-[15px] font-light">
            <Image
              src="/icons/check.png"
              width={21}
              height={21}
              className="h-auto w-5"
              alt="check"
            />
            Dostupno
          </div>
        )}
      </div>
    );
  },
);

Thumb.displayName = "Thumb";
