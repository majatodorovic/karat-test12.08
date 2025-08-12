"use client";
import { useState, useEffect } from "react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";

const SortByPriceButton = () => {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const [priceSortState, setPriceSortState] = useState(null);
  const [newSortState, setNewSortState] = useState(null);

  // Kad učitamo komponentu, očitaj stanje iz URL-a
  useEffect(() => {
    const sortParam = searchParams.get("sort") ?? "";

    if (typeof sortParam === "string" && sortParam.includes("_")) {
      const [field, dir] = sortParam.split("_");
      if (field === "price") {
        if (dir === "asc" || dir === "desc") {
          setPriceSortState(dir);
        }
      } else if (field === "new") {
        if (dir === "asc" || dir === "desc") {
          setNewSortState(dir);
        }
      }
    }
  }, [searchParams]);

  const handlePriceSortClick = () => {
    if (priceSortState === null) {
      setPriceSortState("asc");
      setNewSortState(null);
    } else if (priceSortState === "asc") {
      setPriceSortState("desc");
      setNewSortState(null);
    } else if (priceSortState === "desc") {
      setPriceSortState(null);
    }
  };

  const handleNewSortClick = () => {
    if (newSortState === null) {
      setNewSortState("desc");
      setPriceSortState(null);
    } else if (newSortState === "desc") {
      setNewSortState("asc");
      setPriceSortState(null);
    } else if (newSortState === "asc") {
      setNewSortState(null);
    }
  };

  // Kad se promeni sortState, promeni URL
  useEffect(() => {
    const params = new URLSearchParams(searchParams.toString());

    if (priceSortState === "asc") {
      params.set("sort", "price_asc");
    } else if (priceSortState === "desc") {
      params.set("sort", "price_desc");
    } else if (newSortState === "desc") {
      params.set("sort", "new_desc");
    } else if (newSortState === "asc") {
      params.set("sort", "new_asc");
    } else {
      params.delete("sort");
    }

    router.push(`${pathname}?${params.toString()}`, { scroll: false });
  }, [priceSortState, newSortState]);

  return (
    <div className="flex gap-6">
      <button
        onClick={handlePriceSortClick}
        className={`mainButton flex w-[150px] items-center justify-between gap-2 !px-4 !py-2`}
      >
        <span className="text-base">Cena</span>
        {priceSortState && (
          <i
            className={`fa fa-solid fa-arrow-right text-base ${
              priceSortState === "asc" ? "-rotate-90" : "rotate-90"
            }`}
          ></i>
        )}
      </button>
      <button
        onClick={handleNewSortClick}
        className={`invertedButton flex w-[150px] items-center justify-between border border-black !px-4 !py-2 hover:border-primary`}
      >
        {newSortState === "asc" ? "Staro" : "Novo"}
        {/* <span className="text-base">Novo-Staro</span> */}
        {newSortState && (
          <i
            className={`fa fa-solid fa-arrow-right text-base ${
              newSortState === "desc" ? "-rotate-90" : "rotate-90"
            }`}
          ></i>
        )}
      </button>
    </div>
  );
};

export default SortByPriceButton;
