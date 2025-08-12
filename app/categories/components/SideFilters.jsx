"use client";
import { useState, useEffect } from "react";
import Filter from "./Filter";
import Image from "next/image";

const SideFilters = ({
  availableFilters,
  selectedFilters,
  setSelectedFilters,
  setChangeFilters,
  setPage,
  setTempSelectedFilters,
  setLastSelectedFilterKey,
}) => {
  const [openFilters, setOpenFilters] = useState({});

  useEffect(() => {
    if (availableFilters?.length > 0) {
      const initialOpenState = {};
      availableFilters.forEach((filter) => {
        initialOpenState[filter.key] = filter?.attribute?.name === "Cene";
      });
      setOpenFilters(initialOpenState);
    }
  }, [availableFilters]);

  const toggleFilter = (key) => {
    setOpenFilters((prev) => ({
      ...prev,
      [key]: !prev[key],
    }));
  };

  const handleClearFilters = () => {
    setChangeFilters(true);
    setSelectedFilters([]);
    setTempSelectedFilters([]);
    setPage(1);
  };

  return (
    <div className="w-[310px] min-w-[310px] overflow-y-auto rounded-[24px] bg-lightGray px-6 py-8 max-xl:hidden">
      <button
        className="mb-6 flex items-center gap-3 text-sm underline"
        onClick={handleClearFilters}
      >
        <Image
          src={"/icons/trash.svg"}
          alt="clear filters"
          width={16}
          height={18}
        />
        Izbrišite izabrane filtere
      </button>
      <div className="flex flex-col gap-4">
        {availableFilters?.map((filter, index) => {
          const isOpen = openFilters[filter?.key];
          if (filter.column === "id_category") {
            return null;
          }
          return (
            <div key={index}>
              <div
                className={`mx-auto mb-3 flex cursor-pointer items-center justify-between rounded-full bg-primary px-3 py-2.5 ${isOpen ? "bg-white text-black" : "bg-primary text-white"}`}
                onClick={() => toggleFilter(filter?.key)}
              >
                <h1 className="text-base">{filter?.attribute?.name}</h1>
                <Image
                  src={
                    isOpen
                      ? "/icons/right-chevron.png"
                      : "/icons/right-chevron.png"
                  }
                  alt="toggle"
                  width={20}
                  height={20}
                  className={`transition-transform ${
                    isOpen ? "rotate-90 transform" : "invert"
                  }`}
                />
              </div>
              {isOpen && (
                <div className="overflow-hidden">
                  <Filter
                    filter={filter}
                    selectedFilters={selectedFilters}
                    setTempSelectedFilters={setTempSelectedFilters}
                    setChangeFilters={setChangeFilters}
                    setSelectedFilters={setSelectedFilters}
                    setPage={setPage}
                    setLastSelectedFilterKey={setLastSelectedFilterKey}
                  />
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default SideFilters;
