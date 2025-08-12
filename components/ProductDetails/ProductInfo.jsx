"use client";
import { Suspense, useState } from "react";
import AddToCart from "@/components/ProductDetails/AddToCart";
import ProductPrice from "@/components/ProductPrice/ProductPrice";
import { getDataFromCurrentProduct } from "@/components/ProductDetails/helpers/productInfo";
import { ProductGallery } from "@/components/ProductDetails/ProductGallery";
import { currencyFormat } from "@/helpers/functions";
import { formatDate } from "@/helpers/convertDate";
import Specifications from "./Specifications";
import DeliveryInfo from "./DeliveryInfo";

export const ProductInfo = ({ id, product, productGallery }) => {
  const itemBasicData = product?.data?.item?.basic_data;
  const [productVariant, setProductVariant] = useState(null);
  const [tempError, setTempError] = useState(null);
  const [productQuantity, setProductQuantity] = useState(1);
  const [selectedOptions, setSelectedOptions] = useState(null);
  const { behaviours, inventory, selectedProduct, sku, price } =
    getDataFromCurrentProduct({
      productVariant,
      product,
    });

  const discount_number = Math.abs(
    price?.price?.original - price?.price?.discount,
  );

  return (
    <div className="sectionPaddingX flex flex-col" data-aos="fade-up">
      <div className="grid grid-cols-4 gap-10 2xl:grid-cols-6 2xl:gap-10 3xl:grid-cols-7 3xl:gap-x-[100px]">
        <ProductGallery
          productGallery={productGallery}
          variantKeyArray={productVariant?.variant_key_array}
          id={id}
        />
        <div className="col-span-4 lg:col-span-2 2xl:col-span-3">
          <div className="flex flex-col max-lg:mt-10">
            <Suspense fallback={<Loader />}>
              <h1 className="text-2xl font-light lg:text-3xl 2xl:text-5xl">
                {itemBasicData?.name}
              </h1>
              <h2 className="mb-4 mt-3 text-base font-normal lg:mb-10">
                {selectedProduct && sku ? `Šifra: ${sku}` : <>&nbsp;</>}
              </h2>
              <ProductPrice
                selectedProduct={selectedProduct}
                displayComponent={
                  behaviours?.customer_settings?.product_price?.display_to_guest
                }
                is_details
                price={price}
                inventory={inventory}
                className={
                  price?.discount?.active
                    ? `py-0.5 text-[21px] font-bold`
                    : `py-0.5 text-[1.172rem] font-bold`
                }
              />

              {price.discount.active && (
                <>
                  <div className="mt-1 flex w-full flex-col">
                    <p className="mb-10 text-sm text-[#b1191f]">
                      Ušteda: &nbsp;{currencyFormat(discount_number)}
                    </p>
                    <div className="my-1 h-[2px] w-full bg-[#d9d9d9]"></div>
                    <p className="text-right text-sm font-medium text-[#5b5b5c]">
                      Akcijska cena važi od:{" "}
                      {formatDate(
                        price?.discount?.campaigns[0]?.duration?.from,
                      )}{" "}
                      do{" "}
                      {formatDate(
                        price?.discount?.campaigns[0]?.duration?.to,
                      )}{" "}
                    </p>
                  </div>
                </>
              )}
              {itemBasicData?.short_description && (
                <div className={`mt-8 max-w-full text-base`}>
                  <div className="font-light">
                    {itemBasicData?.short_description}
                  </div>
                </div>
              )}
            </Suspense>
          </div>
          <AddToCart
            displayComponent={
              behaviours?.customer_settings?.purchase?.allow_purchase_to_guest
            }
            selectedOptions={selectedOptions}
            productVariant={productVariant}
            productQuantity={productQuantity}
            product={product}
            tempError={tempError}
            setTempError={setTempError}
          />
        </div>
      </div>
      <DeliveryInfo />
      <Specifications id={id} />
    </div>
  );
};

const Loader = () => {
  return (
    <div className={`mt-5`}>
      <div className={`h-5 w-full animate-pulse bg-slate-300`}></div>
      <div className={`mt-10 h-2 w-full animate-pulse bg-slate-300`}></div>
      <div className={`mt-10 h-5 w-full animate-pulse bg-slate-300`}></div>
      <div className={`mt-5 h-5 w-full animate-pulse bg-slate-300`}></div>
      <div className={`mt-5 h-5 w-full animate-pulse bg-slate-300`}></div>
      <div className={`mt-5 h-5 w-full animate-pulse bg-slate-300`}></div>
      <div className={`mt-5 h-5 w-full animate-pulse bg-slate-300`}></div>
    </div>
  );
};
