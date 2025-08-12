import SearchPage from "@/app/search/components/SearchPage";
import { Suspense } from "react";
import { headers } from "next/headers";

const Search = () => {
  return (
    <Suspense>
      <SearchPage />
    </Suspense>
  );
};

export default Search;

export const generateMetadata = async ({ searchParams: { search } }) => {
  const header_list = headers();
  let canonical = header_list.get("x-pathname");
  return {
    title: `Pretraga: ${search} | Zlatara Karat`,
    description: "Dobrodošli na Zlatara Karat",
    alternates: {
      canonical: canonical,
    },
    robots: {
      index: false,
      follow: false,
    },
    openGraph: {
      title: `Pretraga: ${search} | Zlatara Karat`,
      description: "Dobrodošli na Zlatara Karat",
      type: "website",
      locale: "sr_RS",
    },
  };
};
