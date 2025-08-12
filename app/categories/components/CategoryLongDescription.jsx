"use client";

import { useCategory } from "@/hooks/ecommerce.hooks";
import React from "react";

export const CategoryLongDescription = ({ category_id }) => {
  const { data } = useCategory({ slug: category_id });

  if (data) {
    const {
      basic_data: { long_description },
    } = data;

    return (
      <div className={`prose mt-14 !max-w-full 2xl:mt-20`}>
        <div
          className="sectionPaddingX font-light 2xl:text-xl"
          dangerouslySetInnerHTML={{ __html: long_description }}
        ></div>
      </div>
    );
  }
  return null;
};
