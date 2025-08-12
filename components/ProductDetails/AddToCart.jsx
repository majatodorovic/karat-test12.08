import { useRouter } from "next/navigation";
import { useAddToCart } from "@/hooks/ecommerce.hooks";
import {
  checkIsAddableToCart,
  cartTextBySelectedVariant,
} from "./helpers/addToCart";
import { Suspense } from "react";
import Wishlist from "./Wishlist";
import Image from "next/image";

const AddToCart = ({
  displayComponent,
  selectedOptions,
  productQuantity,
  productVariant,
  product,
  tempError,
  setTempError,
}) => {
  if (!displayComponent) return <></>;
  const router = useRouter();
  const { mutate: addToCart, isPending } = useAddToCart();

  const productItem = product?.data?.item;

  const isAddableToCart = checkIsAddableToCart({
    price: productVariant?.id ? productVariant?.price : productItem?.price,
    inventory: productVariant?.id
      ? productVariant?.inventory
      : productItem?.inventory,
  });

  const handleAddToCart = () => {
    switch (product?.product_type) {
      case "single": {
        let is_addable = checkIsAddableToCart({
          price: productItem?.price,
          inventory: productItem?.inventory,
        });
        if (is_addable?.addable) {
          addToCart({
            id: productItem?.basic_data?.id_product,
            quantity: productQuantity,
          });
          return true;
          // pushToDataLayer("add_to_cart", productItem, productQuantity);
        } else {
          router.push(
            `/kontakt?proizvodIme=${productItem?.basic_data.name}&proizvodId=${productItem?.id}`,
          );
        }
        break;
      }
      case "variant": {
        if (productVariant?.id) {
          let is_addable = checkIsAddableToCart({
            price: productVariant?.price,
            inventory: productVariant?.inventory,
          });

          if (is_addable?.addable) {
            addToCart({
              id: productVariant?.id,
              quantity: productQuantity,
            });
            return true;
            // pushToDataLayer("add_to_cart", productVariant, productQuantity);
          } else {
            router.push(
              `/kontakt?proizvodIme=${productItem?.basic_data.name}&proizvodId=${productVariant?.id}&atribut=${productVariant?.basic_data.attributes_text}`,
            );
          }
        } else {
          let text = cartTextBySelectedVariant({ selectedOptions, product });
          setTempError(text);
        }
        break;
      }
      default:
        break;
    }
    return false;
  };

  return (
    <div className="mt-14 flex max-w-[570px] flex-col items-center gap-3 max-lg:max-w-full 2xl:mt-20">
      <div className="flex w-full items-center gap-3 max-md:flex-col lg:flex-col 2xl:flex-row">
        <Suspense
          fallback={<div className={`h-10 w-10 animate-pulse bg-slate-300`} />}
        >
          {product && <Wishlist product={product?.data?.item} />}
        </Suspense>
        <button
          disabled={isPending}
          className={`mainButton relative w-full max-w-[340px] !py-4 !pl-20 !text-left max-2xl:max-w-full`}
          onClick={() => {
            handleAddToCart();
          }}
        >
          {isAddableToCart?.addable && (
            <div className="absolute left-0 top-0 flex h-[60px] w-[60px] min-w-[60px] items-center justify-center rounded-full bg-lightGray">
              <Image
                src="/icons/shopping-bag.png"
                width={21}
                height={21}
                className="h-auto w-8 min-w-8 object-cover"
                alt="shopping-bag"
              />
            </div>
          )}
          {isPending
            ? "Dodajem..."
            : tempError
              ? tempError
              : isAddableToCart?.text}
        </button>
      </div>
      <button
        className={`mainButton w-full !bg-black !px-3 !py-4 !font-semibold !text-white hover:!bg-primary hover:!text-white`}
        onClick={() => {
          if (handleAddToCart()) {
            router.push("/korpa");
          }
        }}
      >
        Kupite odmah
      </button>
      {product?.data?.item?.inventory?.status === "Dostupno" && (
        <div className="mt- mt-2 flex w-full items-center justify-center gap-2 text-left text-[15px] font-light">
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
};

export default AddToCart;
