"use client";

import { useProductSpecification } from "@/hooks/ecommerce.hooks";
import Image from "next/image";
import React, { useState } from "react";

const Specifications = ({ id }) => {
  const { data: specification } = useProductSpecification({ slug: id });
  const [activeTab, setActiveTab] = useState(
    specification?.[0]?.set?.id || null,
  );

  if (specification?.length === 0) return null;

  return (
    <div className={`mt-20 flex w-full max-w-[1120px] flex-col 2xl:mt-[110px]`}>
      <div className="mb-10 text-[28px] font-light 2xl:mb-14 2xl:mb-[70px] 2xl:text-[37px]">
        Specifikacija i Informacije
      </div>
      {specification?.map((item) => {
        return (
          <div key={item?.set?.id} className="mb-4">
            <div
              onClick={() =>
                setActiveTab(activeTab === item?.set?.id ? null : item?.set?.id)
              }
              className={`rounded-full bg-lightGray pl-8 ${
                activeTab === item?.set?.id && "bg-primary !text-white"
              } relative flex cursor-pointer items-center justify-between py-3 !text-black`}
            >
              <span className={`text-[24px] font-light 2xl:text-[32px]`}>
                {item?.groups[0]?.group?.name}
              </span>
              <div className="absolute right-0 top-0 flex h-[60px] w-[60px] items-center justify-center rounded-full bg-lightGray 2xl:h-[72px] 2xl:w-[72px]">
                {activeTab === item?.set?.id ? (
                  <Image
                    src={`/icons/minus.png`}
                    alt="minus"
                    width={50}
                    height={50}
                  />
                ) : (
                  <Image
                    src={`/icons/plus.png`}
                    alt="plus"
                    width={50}
                    height={50}
                  />
                )}
              </div>
            </div>
            {activeTab === item?.set?.id && (
              <div className={`py-4 pl-6 pr-3`}>
                <div className={`text-sm`}>
                  {item?.groups[0]?.attributes.map((attribute, index) => {
                    return (
                      <div key={index}>
                        <div className="mb-3 flex items-center gap-2">
                          <div
                            className={`w-full max-w-[450px] text-lg font-light 2xl:text-[24px]`}
                          >
                            {attribute?.attribute?.name}
                          </div>
                          <div
                            className={`w-full max-w-[450px] text-lg font-medium 2xl:text-[24px]`}
                          >
                            {attribute?.values
                              ?.map((val) => val?.name)
                              .join(", ")}
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
};

export default Specifications;
