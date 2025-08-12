"use client";
import { useEffect } from "react";
import { ProductInfo } from "@/components/ProductDetails/ProductInfo";
import Breadcrumbs from "@/components/ProductDetails/Breadcrumbs";
import CrossSellProducts from "@/components/ProductSliders/CrosssellProducts";

const ProductContainer = ({
  digitalProduct,
  basic_data,
  product_gallery,
  path,
  category_id,
  id,
}) => {
  useEffect(() => {
    if (window.scrollY > 0) {
      window.scrollTo(0, 0);
    }
  }, []);

  return (
    <>
      <Breadcrumbs id={id} categoryId={category_id} />
      <ProductInfo
        productGallery={product_gallery}
        path={path?.[path?.length - 1]}
        id={id}
        product={basic_data}
        digitalProduct={digitalProduct}
      />
      <CrossSellProducts id={id} />
    </>
  );
};

export default ProductContainer;
