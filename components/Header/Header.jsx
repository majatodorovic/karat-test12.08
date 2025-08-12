"use client";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import HeaderTop from "./HeaderTop";
import Image from "next/image";
import HeaderIcons from "./HeaderIcons";
import SearchProducts from "./SearchProducts";
import { usePathname } from "next/navigation";
import {
  useCategoryTree,
  useLandingPages,
  useNewProducts,
  useCategoryProducts,
} from "@/hooks/ecommerce.hooks";

const Header = () => {
  const { data: categories } = useCategoryTree();
  const { data: landingPagesList } = useLandingPages();
  const { data: newProducts } = useNewProducts(true);
  const [hoveredCategory, setHoveredCategory] = useState(null);
  const { data: categoryProducts } = useCategoryProducts({
    slug: hoveredCategory?.slug,
    limit: 6,
    sort: "new_desc",
    filterKey: null,
    render: hoveredCategory !== null,
  });

  const categoriesMain = [
    { name: "Početna", slug: "/", isCategory: false, id: 0 },
    ...(newProducts?.items?.length > 0
      ? [{ name: "Novo", slug: "/novo", isCategory: false }]
      : []),
    ...(categories ? categories.slice(0, 6) : []),
  ];

  const [activeCategory, setActiveCategory] = useState({
    open: false,
    id: null,
    name: null,
    slug: null,
    data: [],
    image: null,
  });

  const [activeSubCategory, setActiveSubCategory] = useState({
    open: false,
    id: null,
    name: null,
    slug_path: null,
    data: [],
    image: null,
  });

  const resetActiveCategory = () => {
    setActiveCategory({
      open: false,
      id: null,
      name: null,
      slug: null,
      data: [],
      image: null,
    });
    setActiveSubCategory({
      open: false,
      id: null,
      name: null,
      slug: null,
      data: [],
      image: null,
    });
    setHoveredCategory(null);
  };

  const [visible, setVisible] = useState("");
  useEffect(() => {
    let lastScroll = window.scrollY;
    const handleScroll = () => {
      if (window.scrollY < 40)
        return setVisible(
          "sticky top-0 translate-y-0 transition-all duration-500",
        );
      const currentScroll = window.scrollY;
      if (currentScroll > lastScroll) {
        setVisible(
          "sticky top-0 -translate-y-full transition-all duration-500",
        );
        resetActiveCategory();
      } else {
        setVisible("sticky top-0 translate-y-0 transition-all duration-500");
      }
      lastScroll = currentScroll;
    };
    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);
  const pathname = usePathname();

  return (
    <>
      <header
        className={`max-xl:hidden ${visible} relative z-[100] mx-auto mb-[34px] w-full bg-white shadow-[0_2px_5px_rgba(0,0,0,0.07)]`}
        id="header"
      >
        <HeaderTop />
        <div className="sectionPaddingX flex h-20 items-center justify-between gap-5">
          <Link href="/">
            <Image
              src="/images/logo/logo.png"
              width={150}
              height={64}
              className="min-w-[100px] object-cover"
              alt="logo"
            />
          </Link>
          <div className={`flex items-center gap-4 2xl:gap-8`}>
            {categoriesMain?.map((category, index) => {
              const isCategory = category?.isCategory ?? true;
              return isCategory ? (
                category?.children ? (
                  <Link
                    href={`/${category?.link?.link_path}`}
                    key={index}
                    className={`${
                      category?.id === activeCategory?.id ||
                      pathname.includes(category?.slug)
                        ? "activeCategory after:-bottom-[30px]"
                        : "font-normal"
                    } activeCategoryHover relative block w-fit text-nowrap text-[15px] text-[#171717] hover:after:-bottom-[30px] 2xl:text-[17px]`}
                    onMouseEnter={() => {
                      setActiveCategory({
                        id:
                          category?.id === activeCategory?.id
                            ? null
                            : category?.id,
                        name:
                          category?.name === activeCategory?.name
                            ? null
                            : category?.name,
                        slug:
                          category?.slug === activeCategory?.slug
                            ? null
                            : category?.slug,
                        data: category?.children ?? [],
                        image: category?.image ?? null,
                        open: true,
                      });
                      setHoveredCategory(category);
                    }}
                    onClick={resetActiveCategory}
                  >
                    {category?.name}
                  </Link>
                ) : (
                  <Link
                    href={`/${category?.link?.link_path}`}
                    key={index}
                    onClick={() => resetActiveCategory()}
                    onMouseEnter={() => setHoveredCategory(category)}
                    onMouseLeave={() => setHoveredCategory(null)}
                  >
                    {category?.name === "Conte Diamonds" ? (
                      <Image
                        src="/images/conte-diamonds.png"
                        alt="Conte Diamonds"
                        width={100}
                        height={100}
                        className="min-w-[80px]"
                      />
                    ) : (
                      <span
                        className={`activeCategoryHover relative block w-fit text-[15px] font-semibold text-primary hover:after:-bottom-[30px] 2xl:text-[17px] ${
                          pathname?.includes(category?.slug) &&
                          category?.id !== 0
                            ? "activeCategory after:-bottom-[30px]"
                            : ""
                        }`}
                      >
                        {category?.name}
                      </span>
                    )}
                  </Link>
                )
              ) : (
                <Link
                  href={`${category?.slug}`}
                  key={index}
                  onClick={resetActiveCategory}
                >
                  <span
                    className={`activeCategoryHover relative block w-fit text-[15px] text-[#171717] hover:after:-bottom-[30px] 2xl:text-[17px] ${
                      pathname?.includes(category?.slug) && category?.id !== 0
                        ? "activeCategory after:-bottom-[30px]"
                        : pathname === category?.slug && category?.id === 0
                          ? "activeCategory after:-bottom-[30px]"
                          : ""
                    }`}
                  >
                    {category?.name}
                  </span>
                </Link>
              );
            })}
          </div>
          <div className="flex items-center gap-10 3xl:gap-20">
            <SearchProducts />
            <HeaderIcons />
          </div>
        </div>
        {activeCategory?.open && (
          <div
            onMouseLeave={resetActiveCategory}
            className={`absolute right-0 top-[114px] z-[100] w-full bg-white max-lg:hidden`}
          >
            <div className="relative max-h-[420px] overflow-y-auto px-20 pb-14 pt-8">
              <div className="flex h-full">
                <div
                  className={`flex w-[205px] flex-col items-start gap-1 pr-4`}
                >
                  {landingPagesList?.items?.map((item, index) => {
                    return (
                      <Link
                        key={index}
                        onClick={resetActiveCategory}
                        href={`/promo/${item?.slug}`}
                        className="block text-lg font-medium text-primary transition-all duration-300 hover:translate-x-5 hover:text-slate-500"
                      >
                        {item?.name}
                      </Link>
                    );
                  })}
                  {activeCategory?.data?.map((category, index) => (
                    <button
                      key={index}
                      className={`${
                        category?.id === activeSubCategory?.id ||
                        pathname.includes(category?.slug)
                          ? "text-primary"
                          : ""
                      } block text-left text-lg font-medium text-black hover:text-primary`}
                      onClick={() => {
                        setActiveSubCategory({
                          id: category?.id,
                          name: category?.name,
                          slug_path: category?.slug_path,
                          data: category?.children ?? [],
                          image: category?.image ?? null,
                          open: true,
                        });
                        setHoveredCategory(category);
                      }}
                    >
                      {category?.name}
                    </button>
                  ))}
                </div>
                {categoryProducts?.items?.length > 0 && (
                  <div className="flex flex-col gap-8">
                    <div className="flex items-center gap-1 text-sm">
                      <Link
                        href={`${hoveredCategory?.slug_path ?? activeCategory?.slug}`}
                        className="font-light hover:text-primary"
                        onClick={resetActiveCategory}
                      >
                        Pogledajte sve
                      </Link>
                      <Image
                        src={"/icons/right-chevron.png"}
                        alt="Chevron"
                        width={16}
                        height={16}
                        className="mt-0.5 h-3 w-3 group-hover:invert"
                      />
                    </div>
                    <div className="grid grid-cols-2 gap-5 2xl:grid-cols-3">
                      {categoryProducts.items.map((product) => (
                        <Link
                          key={product.id}
                          href={`${product.slug_path}`}
                          className="group flex h-[128px] w-[300px] items-center gap-5 rounded-lg border border-gray-200 bg-white pl-2 transition-all duration-300 ease-in-out hover:bg-primary 3xl:w-[350px]"
                          onClick={resetActiveCategory}
                        >
                          <Image
                            src={product.image[0] ?? "/images/placeholder.jpg"}
                            alt={product.basic_data.name}
                            width={100}
                            height={100}
                            className="ransition-all h-[90px] w-[90px] min-w-[90px] bg-white object-contain transition-all duration-300 ease-in-out group-hover:scale-105 group-hover:bg-primary"
                          />
                          <h3 className="ransition-all mt-2 line-clamp-2 pr-4 text-lg font-light duration-300 ease-in-out group-hover:text-white">
                            {product.basic_data.name}
                          </h3>
                        </Link>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        )}
      </header>
      <div
        onClick={() => {
          setActiveCategory({
            open: false,
            id: null,
            name: null,
            slug: null,
            data: [],
            image: null,
          });
        }}
        className={
          activeCategory?.open
            ? "visible fixed left-0 top-0 z-[99] h-screen w-screen bg-black/50 opacity-100 backdrop-blur-md transition-all duration-500"
            : "invisible fixed left-0 top-0 z-[99] h-screen w-screen bg-black/50 opacity-0 backdrop-blur-md transition-all duration-500"
        }
      />
    </>
  );
};

export default Header;
