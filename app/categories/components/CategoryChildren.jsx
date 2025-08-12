"use client";
import Link from "next/link";
import { useSuspenseQuery } from "@tanstack/react-query";
import { get } from "@/api/api";
import Image from "next/image";

export const CategoryChildren = ({ slug }) => {
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

  return (
    <div className="sectionPaddingX">
      <div className="flex w-full flex-wrap gap-4">
        {categories?.childrens &&
          (categories?.childrens ?? [])?.map((child) => (
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
    </div>
  );
};
