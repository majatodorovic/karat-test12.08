"use client";

import Image from "next/image";

const items = [
  {
    title: "Povraćaj novca",
    icon: "/wallet.svg",
  },
  {
    title: "24/7 podrška",
    icon: "/chat.svg",
  },
  {
    title: "Besplatna dostava",
    icon: "/flag.svg",
  },
  {
    title: "Sigurna kupovina",
    icon: "/verified.svg",
  },
];

const Benefits = () => {
  return (
    <div className="sectionPaddingX marginBottomSection" data-aos="fade-up">
      <div className="mx-auto grid w-fit grid-cols-2 gap-4 sm:gap-8 md:gap-[60px] 2xl:grid-cols-4">
        {items.map((item) => (
          <div
            key={item.title}
            className="flex h-[160px] w-full min-w-[160px] max-w-[160px] flex-col items-center justify-center gap-5 rounded-[24px] bg-lightGray p-4 sm:h-[200px] sm:min-w-[200px] sm:max-w-[200px] md:h-[310px] md:min-w-[310px] md:max-w-[310px] md:gap-10 md:rounded-[40px]"
          >
            <div className="relative min-h-[50px] min-w-[50px] sm:min-h-[70px] sm:min-w-[70px] md:min-h-[90px] md:min-w-[90px]">
              <Image
                src={`/icons/benefits/${item.icon}`}
                alt={item.title}
                fill
              />
            </div>
            <div className="flex flex-col items-start justify-between">
              <h3 className="transform text-center text-base text-black sm:text-xl md:text-[25px]">
                {item.title}
              </h3>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Benefits;
