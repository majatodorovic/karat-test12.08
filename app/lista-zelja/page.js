import WishlistPage from "@/components/Wishlist/Wishlist";
import { headers } from "next/headers";

const Wishlist = async () => {
  return ( <WishlistPage />
  );
};

export default Wishlist;

export const generateMetadata = async () => {
  const header_list = headers();
  let canonical = header_list.get("x-pathname");
  return {
    title: `Lista želja | Zlatara Karat`,
    description: "Dobrodošli na Zlatara Karat",
    alternates: {
      canonical: canonical,
    },
    robots: {
      index: false,
      follow: false,
    },
    openGraph: {
      title: `Lista želja | Zlatara Karat`,
      description: "Dobrodošli na Zlatara Karat",
      type: "website",
    }
  };
};
