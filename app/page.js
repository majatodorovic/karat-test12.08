import { get, list } from "@/api/api";
import { headers } from "next/headers";
import { generateOrganizationSchema } from "@/_functions";
import RecommendedProducts from "./homepage/components/RecommendedProducts/RecommendedProducts";
import Slider from "./homepage/components/Slider/Slider";
import RecommendedCategories from "./homepage/components/RecommendedCategories/RecommendedCategories";
import BannersCategory from "./homepage/components/BannersCategory/BannersCategory";
import Brands from "./homepage/components/Brands/Brands";
import Locations from "./homepage/components/Locations/Locations";
import BannerWithProducts from "./homepage/components/BannerWithProducts/BannerWithProducts";

const getSliders = () => {
  return get("/banners/index_slider").then((res) => res?.payload);
};
const getMobileSliders = () => {
  return get("/banners/index_slider_mobile").then((res) => res?.payload);
};
const getNewProducts = () => {
  return list("/products/section/list/new_arrival").then(
    (res) => res?.payload?.items,
  );
};
const getRecommendedProducts = () => {
  return list("/products/section/list/recommendation").then(
    (res) => res?.payload?.items,
  );
};
const getPositionProducts = () => {
  return list("/products/section/list/position").then(
    (res) => res?.payload?.items,
  );
};
const getActionProducts = () => {
  return list("/products/section/list/action").then(
    (res) => res?.payload?.items,
  );
};
const getBestSellingProducts = () => {
  return list("/products/section/list/best_sell").then(
    (res) => res?.payload?.items,
  );
};
const getRecomendedCategories = () => {
  return list("/categories/section/recommended").then((res) => res?.payload);
};
const getBannerBeforeCategories = () => {
  return get("/banners/banner_about_us").then((res) => res?.payload);
};
const getBannerConteDiamonds = () => {
  return get("/banners/banner_conte_diamonds").then((res) => res?.payload);
};
const getBannerSwatch = () => {
  return get("/banners/banner_swatch").then((res) => res?.payload);
};
const getBannerCategory = () => {
  return get("/banners/banner_category").then((res) => res?.payload);
};


const Home = async () => {
  const [sliders,  mobileSliders] =
    await Promise.all([
      getSliders(),
      getMobileSliders(),
    ]);
  const recommendedCategories = await getRecomendedCategories();
  const bannerBeforeCategories = await getBannerBeforeCategories();
  const bannerConteDiamonds = await getBannerConteDiamonds();
  const bannerCategory = await getBannerCategory();
  const newProducts = await getNewProducts();
  const actionProducts = await getActionProducts();
  const bestSellingProducts = await getBestSellingProducts();
  const recommendedProducts = await getRecommendedProducts();
  const positionProducts = await getPositionProducts();
  const bannerSwatch = await getBannerSwatch();

  let all_headers = headers();
  let base_url = all_headers.get("x-base_url");

  let schema = generateOrganizationSchema(base_url);

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
      />
      <div className="relative block overflow-hidden">
          <Slider banners={sliders} mobileBanners={mobileSliders} />
        {recommendedCategories && (
               <RecommendedCategories
               banners={bannerBeforeCategories}
               categories={recommendedCategories}
             />
        )}
        <Brands />
          <RecommendedProducts
            newProducts={newProducts}
            actionProducts={actionProducts}
            bestSellingProducts={bestSellingProducts}
          />
        {bannerConteDiamonds && <BannerWithProducts banners={bannerConteDiamonds} recommendedProducts={recommendedProducts} />}
        {bannerCategory && <BannersCategory banners={bannerCategory} />}
        {bannerSwatch && <BannerWithProducts banners={bannerSwatch} recommendedProducts={positionProducts} />}
        <Locations />
      </div>
    </>
  );
};

export default Home;

export const revalidate = 30;

const getSEO = () => {
  return get("/homepage/seo").then((response) => response?.payload);
};

export const generateMetadata = async () => {
  const data = await getSEO();
  const header_list = headers();
  let canonical = header_list.get("x-pathname");
  return {
    title: data?.meta_title ?? "Početna | Zlatara Karat",
    description:
      data?.meta_description ?? "Dobrodošli na Zlatara Karat Online Shop",
    alternates: {
      canonical: data?.meta_canonical_link ?? canonical,
    },
    robots: {
      index: data?.meta_robots?.index ?? true,
      follow: data?.meta_robots?.follow ?? true,
    },
    openGraph: {
      title: data?.social?.share_title ?? "Početna | Zlatara Karat",
      description:
        data?.social?.share_description ??
        "Dobrodošli na Zlatara Karat Online Shop",
      type: "website",
      images: [
        {
          url: data?.social?.share_image ?? "https://www.zlatara-karat.com/images/logo/logo.png",
          width: 800,
          height: 600,
          alt: "Zlatara Karat",
        },
      ],
      locale: "sr_RS",
    },
  };
};
