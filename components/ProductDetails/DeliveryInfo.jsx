import Image from "next/image";

const DeliveryInfo = () => {
  return (
    <div className="mt-5 flex w-full flex-row items-center justify-between gap-[10px] py-5 shadow lg:fixed lg:right-10 lg:right-8 lg:top-[189px] lg:z-[100] lg:mt-0 lg:max-w-[100px] lg:flex-col lg:items-center lg:justify-center lg:gap-[30px] lg:rounded-[24px] lg:bg-lightGray lg:px-5 lg:py-[37px] lg:text-center xl:top-[252px] 3xl:right-[80px]">
      <div className="flex flex-col items-center justify-center text-center">
        <Image
          src="/icons/benefits/wallet.svg"
          alt="Povraćaj novca"
          width={40}
          height={40}
          className="h-auto w-[30px] lg:w-[40px]"
        />
        <p className="regular text-[11px]">Povraćaj novca</p>
      </div>
      <div className="flex flex-col items-center justify-center text-center">
        <Image
          src="/icons/benefits/chat.svg"
          alt="24/7 podrška"
          width={45}
          height={40}
          className="h-auto w-[30px] lg:w-[45px]"
        />
        <p className="regular text-[11px]">24/7 podrška</p>
      </div>
      <div className="flex flex-col items-center justify-center text-center">
        <Image
          src="/icons/benefits/flag.svg"
          alt="Besplatna dostava"
          width={46}
          height={46}
          className="h-auto w-[30px] lg:w-[46px]"
        />
        <p className="regular text-[11px]">Besplatna dostava</p>
      </div>
      <div className="flex flex-col items-center justify-center text-center">
        <Image
          src="/icons/benefits/verified.svg"
          alt="Sigurna kupovina"
          width={46}
          height={46}
          className="h-auto w-[30px] lg:w-[46px]"
        />
        <p className="regular text-[11px]">Sigurna kupovina</p>
      </div>
    </div>
  );
};

export default DeliveryInfo;
