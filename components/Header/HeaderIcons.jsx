"use client";

import Link from "next/link";
import Image from "next/image";
import { useCartBadge, useWishlistBadge } from "@/hooks/ecommerce.hooks";

const HeaderIcons = () => {
  const { data: cartCount } = useCartBadge();
  const { data: wishListCount } = useWishlistBadge();

  return (
    <div className="flex items-center gap-[18px]">
      <Link href="/login" className="group">
        <Image
          src="/icons/user.png"
          width={21}
          height={21}
          className="mainColorFilter h-auto w-7 min-w-7 object-cover"
          alt="user"
        />
      </Link>
      <Link href="/lista-zelja" className="group relative">
        <Image
          src="/icons/heart.png"
          width={21}
          height={21}
          className="mainColorFilter h-auto w-[22px] min-w-[22px] object-cover"
          alt="heart"
        />
        <span className="absolute -right-2.5 -top-2 flex h-4 w-4 min-w-4 items-center justify-center rounded-full bg-primary text-xs text-white group-hover:bg-black">
          {wishListCount}
        </span>
      </Link>

      <Link href="/korpa" className="group relative">
        <Image
          src="/icons/shopping-bag.png"
          width={21}
          height={21}
          className="mainColorFilter h-auto w-8 min-w-8 object-cover"
          alt="shopping-bag"
        />
        <span className="absolute -right-0.5 -top-0.5 flex h-4 w-4 min-w-4 items-center justify-center rounded-full bg-primary text-xs text-white group-hover:bg-black">
          {cartCount}
        </span>
      </Link>
    </div>
  );
};

export default HeaderIcons;
