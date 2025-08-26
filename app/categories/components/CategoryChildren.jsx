"use client";
import Link from "next/link";
import { useSuspenseQuery } from "@tanstack/react-query";
import { get } from "@/api/api";
import Image from "next/image";
import { useState } from "react";

export const CategoryChildren = ({ slug }) => {
  const [showAll, setShowAll] = useState(false);

  const { data: categories } = useSuspenseQuery({
    queryKey: ["products", { slug }],
    queryFn: async () => {
      return await get(`/categories/product/tree/branch/parent/${slug}`).then(
        (response) => response?.payload,
      );
    },
    refetchOnWindowFocus: false,
    refetchOnMount: false,
  });
  const currentSlug = categories?.slug;

  const itemsPerRow = Math.floor((window.innerWidth - 80) / 200);
  const maxItemsToShow = itemsPerRow * 2;
  const totalItems = categories?.childrens?.length || 0;
  const itemsToShow = showAll
    ? totalItems
    : Math.min(maxItemsToShow, totalItems);
  const hasMoreItems = totalItems > maxItemsToShow;

  return (
    <div className="sectionPaddingX max-xl:hidden">
      <div className="flex w-full flex-wrap gap-4">
        {categories?.childrens &&
          (categories?.childrens ?? [])?.slice(0, itemsToShow).map((child) => (
            <div
              className="w-fit min-w-[180px] text-center max-sm:w-full"
              key={child?.id}
            >
              {currentSlug === child?.slug ? (
                <div
                  className={`mainButton flex items-center justify-between !rounded-[14px] !px-4 !py-1.5 !text-left !text-base`}
                >
                  <p className="">{child?.basic_data?.name}</p>
                  {currentSlug === child?.slug && (
                    <Image
                      src="/icons/chevron-right.png"
                      alt="arrow-right"
                      width={16}
                      height={16}
                    />
                  )}
                </div>
              ) : (
                <Link href={`/${child?.link?.link_path}`}>
                  <div
                    className={`invertedButton flex items-center justify-between gap-3 !rounded-[14px] !px-4 !py-1.5 !text-left !text-base`}
                  >
                    <p>{child?.basic_data?.name}</p>
                    {child?.counts?.products?.total}
                  </div>
                </Link>
              )}
            </div>
          ))}
      </div>

      {hasMoreItems && !showAll && (
        <div className="mt-4 flex justify-center">
          <button
            onClick={() => setShowAll(true)}
            className="mainButton !px-6 !py-2 !text-sm"
          >
            Pogledaj još ({totalItems - maxItemsToShow})
          </button>
        </div>
      )}
    </div>
  );
};
