import Image from "next/image";
import React, { useEffect } from "react";
import {
  useAddToWishlist,
  useIsInWishlist,
  useRemoveFromWishlist,
} from "@/hooks/ecommerce.hooks";

const Wishlist = ({ product, refreshWishlist, wishlistPage = false }) => {
  const { mutate: addToWishlist, isSuccess: isAdded } = useAddToWishlist();

  const { mutate: removeFromWishlist, isSuccess: isRemoved } =
    useRemoveFromWishlist();

  const { data, refetch: reCheck } = useIsInWishlist({
    id: product?.basic_data?.id_product,
  });

  const isInWishlist = data?.exist;
  const wishlist_id = data?.wishlist_item_id;

  useEffect(() => {
    reCheck();
    if (isRemoved && refreshWishlist) {
      refreshWishlist();
    }
  }, [isAdded, isRemoved, refreshWishlist]);

  return (
    <button
      className={`invertedButton group relative ${wishlistPage ? "!w-full" : ""} !py-4 !pl-20 max-2xl:!w-full`}
      onClick={() => {
        if (isInWishlist) {
          removeFromWishlist({ id: wishlist_id });
        } else {
          addToWishlist({
            id: product?.basic_data?.id_product,
            name: product?.basic_data?.name,
          });
        }
      }}
    >
      <div
        className={`absolute left-1 top-1 flex h-[52px] w-[52px] min-w-[52px] items-center justify-center rounded-full bg-[#af0202] ${isInWishlist ? "!bg-[#af0202]" : "!bg-white"}`}
      >
        {isInWishlist ? (
          <Image
            src={`/icons/heart.png`}
            alt="wishlist"
            width={39}
            height={39}
            className={`h-auto w-7 min-w-7 invert`}
          />
        ) : (
          <Image
            src={"/icons/heart.png"}
            alt="wishlist"
            width={39}
            height={39}
            className={`h-auto w-7 min-w-7`}
          />
        )}
      </div>
      <span>Lista želja</span>
    </button>
  );
};

export default Wishlist;
