"use client";
import Image from "next/image";
import store1 from "@/public/images/locations/store3.jpg";
import store2 from "@/public/images/locations/radnja4.jpg";
import store3 from "@/public/images/locations/radnje6.jpg";
import store4 from "@/public/images/locations/radnje5.png";
import { useQuery } from "@tanstack/react-query";
import { list } from "@/api/api";

const Locations = () => {
  const { data } = useQuery({
    queryKey: ["warehouse"],
    queryFn: async () => {
      const res = await list(`/stores/warehouse`, { limit: -1 });
      return res;
    },
  });

  const getStoreImage = (storeName) => {
    const imageMap = {
      "Karat Užice, Glavna": store1,
      "Karat Užice, Centar": store2,
      "Karat Zlatibor": store3,
      "Karat Kragujevac": store4,
    };
    return imageMap[storeName] || store1;
  };

  const getStoreMapLink = (storeName) => {
    const mapLinkMap = {
      "Karat Užice, Glavna":
        "https://www.google.com/maps/place/Zlatara+Karat+U%C5%BEice+Glavna/@43.854859,19.8440535,17z/data=!4m15!1m8!3m7!1s0x4759d34fa9ae6ebb:0xebfe755721b27f93!2sDimitrija+Tucovi%C4%87a+59,+U%C5%BEice+31000!3b1!8m2!3d43.854859!4d19.8440535!16s%2Fg%2F11pysc190f!3m5!1s0x4759d3488aca834d:0xd7eff1db2cf2aa43!8m2!3d43.8547502!4d19.8446956!16s%2Fg%2F11ngtlfjqk?entry=ttu",
      "Karat Užice, Centar":
        "https://www.google.com/maps/place/Zlatara+Karat+U%C5%BEice+Centar/@43.8544736,19.845208,15z/data=!4m6!3m5!1s0x4759d3bc63c2736f:0xd2c39b60b6a30571!8m2!3d43.8544736!4d19.845208!16s%2Fg%2F11rzwqpr63?entry=ttu",
      "Karat Zlatibor":
        "https://www.google.com/maps/place/Zlatara+Karat+Zlatibor/@43.725088,19.6973501,15z/data=!4m2!3m1!1s0x0:0x8040fd8386ce051c?sa=X&ved=2ahUKEwjV0KrB__WCAxWiwAIHHVjKBIMQ_BJ6BAg-EAA",
      "Karat Kragujevac":
        "https://www.google.com/maps/place/Zlatara+Karat+Kragujevac/@44.01068,20.9148164,15z/data=!4m2!3m1!1s0x0:0x1b1e6ab9c78cc8fe?sa=X&ved=2ahUKEwj-u7TT__WCAxVgwAIHHQ8rBHcQ_BJ6BAg-EAA",
    };
    return mapLinkMap[storeName] || "#";
  };

  const parseWorkHours = (workHoursString) => {
    if (!workHoursString) return [];
    return workHoursString.split("</br>").map((hour) => hour.trim());
  };

  const storeData =
    data?.payload?.items?.map((store) => ({
      name: store.name,
      src: getStoreImage(store.name),
      mapLink: getStoreMapLink(store.name),
      tel: store.phone,
      email: store.email,
      address: store.address,
      workHours: parseWorkHours(store.work_hours),
    })) || [];

  return (
    <div className="sectionPaddingX" data-aos="fade-up">
      <h1 className="titleH2 text-center">Naša prodajna mesta</h1>
      <div className="mt-10 grid grid-cols-1 gap-8 lg:grid-cols-2">
        {storeData.map((store, idx) => (
          <div
            key={idx}
            className="flex h-auto overflow-hidden rounded-[24px] bg-lightGray max-md:flex-col lg:h-[420px] lg:rounded-[30px] xl:h-[380px] 2xl:rounded-[50px]"
          >
            {/* Image */}
            <div className="relative h-full w-1/2 min-w-[220px] max-md:h-[300px] max-md:w-full">
              <Image
                src={store.src}
                alt={store.name}
                fill
                className="object-cover"
                style={{ objectPosition: "center" }}
              />
            </div>
            {/* Info */}
            <div className="flex w-1/2 flex-col justify-center px-8 py-6 font-light max-md:w-full">
              <h2 className="mb-6 text-[32px] leading-[normal]">
                {store.name}
              </h2>
              <div className="mb-4 text-[17px] leading-[normal]">
                <div>{store.tel}</div>
                <div>{store.email}</div>
                <div>{store.address}</div>
              </div>
              <div className="mb-4 text-[17px] leading-[normal]">
                {store.workHours.map((line, i) => (
                  <div key={i}>{line}</div>
                ))}
              </div>
              <a
                href={store.mapLink}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-auto w-[230px] rounded-full bg-white py-2 text-center text-[19px] transition hover:bg-primary hover:text-white max-md:w-full lg:w-[140px] xl:w-[230px]"
              >
                Putanja
              </a>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Locations;
