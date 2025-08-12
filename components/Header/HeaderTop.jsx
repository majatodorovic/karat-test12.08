import Link from "next/link";
import React from "react";

function HeaderTop() {
  return (
    <div className="w-full bg-primary">
      <div className="sectionPaddingX flex h-[34px] items-center justify-between bg-primary">
        <div className="flex items-center gap-5 text-base font-light text-white 2xl:text-[17px]">
          <Link href="/strana/o-nama" className="hover:underline">
            O nama
          </Link>
          <Link href="/kontakt" className="hover:underline">
            Kontakt
          </Link>
          <Link href="/lokacije" className="hover:underline">
            Lokacije
          </Link>
        </div>
        <div className="text-base font-light text-white 2xl:text-[17px]">
          Doživite nova iskustva uz najbolje proizvode i online uslugu. Sigurna
          i pouzdana kupovina.
        </div>
        <div className="flex items-center gap-5 font-light text-white 2xl:text-[17px]">
          <a href={`tel:${process.env.TELEPHONE}`} className="hover:underline">
            {process.env.TELEPHONE}
          </a>
          <a href={`mailto:${process.env.EMAIL}`} className="hover:underline">
            {process.env.EMAIL}
          </a>
        </div>
      </div>
    </div>
  );
}

export default HeaderTop;
