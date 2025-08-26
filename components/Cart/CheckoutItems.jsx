"use client";
import Image from "next/image";
import { useUpdateCartQuantity } from "@/hooks/ecommerce.hooks";
import { useEffect, useState } from "react";
import { currencyFormat } from "@/helpers/functions";
import PlusMinusInput from "@/components/PlusMinusInput";
import Link from "next/link";
import { CloseIcon } from "../svg/CloseIcon";

const CheckoutItems = ({
  product,
  cart,
  refreshCart,
  refreshSummary,
  isClosed,
  onRemove,
}) => {
  const { mutate: updateCart, isSuccess: isUpdated } = useUpdateCartQuantity();

  const {
    basic_data: { name, sku },
    price,
    inventory,
    image,
    link: { link_path: slug_path },
    behaviours: { checkout },
  } = product;

  const { quantity, cart_item_id } = cart;

  const [productQuantity, setProductQuantity] = useState(Number(quantity));

  useEffect(() => {
    if (Number(quantity) !== productQuantity) {
      updateCart({
        id: cart_item_id,
        quantity: productQuantity,
      });
    }
  }, [productQuantity]);

  useEffect(() => {
    setProductQuantity(Number(quantity));
  }, [quantity]);

  useEffect(() => {
    if (isUpdated) {
      refreshCart();
      refreshSummary();
    }
  }, [isUpdated]);

  return (
    <div
      className={`relative grid grid-cols-[110px_1fr] items-start justify-start gap-5 rounded-[30px] border p-5 sm:grid-cols-[200px_1fr] 2xl:gap-10`}
    >
      <button
        className={`absolute right-8 top-4 z-10 cursor-pointer rounded-full bg-black p-[3px]`}
        onClick={() => {
          if (typeof onRemove === "function") {
            onRemove();
          }
        }}
      >
        <CloseIcon className="h-5 w-5 text-white" />
      </button>
      <Link href={`/${slug_path}`} className="w-full">
        <Image
          src={image?.[0] ?? "/images/no-image-karat.jpg"}
          alt={`Comr`}
          width={0}
          height={0}
          sizes={`90vw`}
          className={`aspect-square w-full border border-white bg-white object-cover hover:object-contain`}
        />
      </Link>
      <div className={`mb-auto ml-2 flex flex-col items-start pr-12 pt-2`}>
        <h4
          className={`mb-2 line-clamp-2 pr-8 text-lg font-semibold 2xl:text-[19px]`}
        >
          {name}
        </h4>
        <p className={`text-lg`}>Šifra:&nbsp;{sku}</p>
        <PlusMinusInput
          label="Količina:"
          displayComponent={checkout.display.quantity_field}
          behaviours={checkout}
          maxAmount={+inventory?.amount}
          quantity={productQuantity}
          setQuantity={setProductQuantity}
          quantityError={() => {
            return false;
          }}
        />
        {!!price?.per_item?.discount?.campaigns[0]?.calc?.calc_name && (
          <p className={`text-lg`}>
            Popust:&nbsp;
            {parseFloat(
              price?.per_item?.discount?.campaigns[0]?.calc?.calc_name
                ?.replace("-", "")
                .replace(",", ".")
                .replace("%", ""),
            )}
            %
          </p>
        )}
        <p className={`text-lg`}>
          Cena:&nbsp;{currencyFormat(price?.per_item?.total)}
        </p>
        {!!price?.cost?.discount_amount && (
          <p className={`text-lg font-semibold text-primary`}>
            Uštedeli ste:&nbsp;
            {currencyFormat(price?.cost?.discount_amount)}
          </p>
        )}
      </div>
      {isClosed && !inventory?.inventory_defined && (
        <div
          className={`absolute bottom-0 left-0 right-0 top-0 h-full w-full bg-black/40`}
        ></div>
      )}
    </div>
  );
};

export default CheckoutItems;
