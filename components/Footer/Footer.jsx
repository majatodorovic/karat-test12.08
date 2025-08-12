"use client";
import Image from "next/image";
import Link from "next/link";

const Footer = () => {
  return (
    <div className="mt-20 bg-lightGray py-[20px] text-black">
      <div className="sectionPaddingX">
        <div className="flex items-center justify-between max-xl:flex-col">
          <Link href={`/`}>
            <Image
              src={"/images/logo/logo.png"}
              width={214}
              height={60}
              alt="Croonus Logo"
            />
          </Link>
          <div className="flex items-center gap-5 max-xl:mt-10">
            <a
              href="https://www.facebook.com/karat.zlatara/"
              target="_blank"
              rel="noreferrer"
              className="text-[17px] font-light hover:text-primary"
            >
              Facebook
            </a>
            <div className="mx-2 h-[3px] w-[3px] rounded-full bg-primary"></div>
            <a
              href="https://www.instagram.com/zlatara.karat/"
              target="_blank"
              rel="noreferrer"
              className="text-[17px] font-light hover:text-primary"
            >
              Instagram
            </a>
          </div>
        </div>
        <div className="mt-6 flex justify-between gap-10 border-b-[2px] border-t border-t-[2px] border-b-white border-t-primary py-7 max-xl:flex-col 2xl:gap-20">
          <div className="flex w-full flex-col items-center justify-between gap-3 max-sm:items-start sm:flex-row">
            <div className="flex flex-wrap items-center gap-1 text-[17px] font-light max-sm:flex-col max-sm:items-start">
              <Link
                href={`/strana/pravilnik-o-zastiti-podataka`}
                className="hover:text-primary"
              >
                Pravilnik o zaštiti podataka
              </Link>
              <div className="rounded-full bg-primary sm:mx-2 sm:h-[3px] sm:w-[3px]"></div>
              <Link href={`/strana/reklamacije`} className="hover:text-primary">
                Reklamacije
              </Link>
              <div className="rounded-full bg-primary sm:mx-2 sm:h-[3px] sm:w-[3px]"></div>
              <Link
                href={`/strana/pravo-na-odustajanje`}
                className="hover:text-primary"
              >
                Pravo na odustajanje
              </Link>
              <div className="rounded-full bg-primary sm:mx-2 sm:h-[3px] sm:w-[3px]"></div>
              <Link
                href={`/strana/zamena-artikala`}
                className="hover:text-primary"
              >
                Zamena artikala
              </Link>
              <div className="rounded-full bg-primary sm:mx-2 sm:h-[3px] sm:w-[3px]"></div>
              <Link href={`/strana/kako-kupiti`} className="hover:text-primary">
                Kako kupiti
              </Link>
            </div>
            <p className="text-[17px] font-light max-sm:mt-4">
              &copy; {new Date().getFullYear()} Zlatara Karat | Sva prava
              zadržana. Powered by{" "}
              <a
                href="https://www.croonus.com"
                target="_blank"
                rel="noreferrer"
                className="cursor-pointer"
              >
                Croonus Technologies
              </a>
            </p>
          </div>
        </div>
        <p className="mb-2 mt-4 text-[13px] font-light">
          Cene na sajtu su iskazane u dinarima sa uračunatim porezom, a plaćanje
          se vrši isključivo u dinarima. Isporuka se vrši SAMO na teritoriji
          Republike Srbije. Nastojimo da budemo što precizniji u opisu
          proizvoda, prikazu slika i samih cena, ali ne možemo garantovati da su
          sve informacije kompletne i bez grešaka. Svi artikli prikazani na
          sajtu su deo naše ponude i ne podrazumeva da su dostupni u svakom
          trenutku. Raspoloživost robe možete proveriti pozivanjem Call Centra
          na{" "}
          <a
            href={`tel:${process.env.TELEPHONE}`}
            className="hover:text-primary"
          >
            {process.env.TELEPHONE}
          </a>{" "}
          (po ceni lokalnog poziva).
        </p>
        <div className="flex flex-wrap items-center gap-1 max-sm:justify-center 2xl:gap-3">
          <a
            href={`https://rs.visa.com/pay-with-visa/security-and-assistance/protected-everywhere.html`}
            rel={"noreferrer"}
            target={"_blank"}
          >
            <Image
              src={"/icons/bank/visaSecure.webp"}
              width={50}
              height={30}
              alt="Visa Secure"
              className="h-[30px] w-auto rounded-sm border bg-white"
            />
          </a>
          <div>
            <Image
              src={"/icons/bank/dinacard.webp"}
              width={50}
              height={30}
              alt="Dinacard"
              className="h-[30px] w-auto rounded-sm border bg-white"
            />
          </div>
          <a
            href={`http://www.mastercard.com/rs/consumer/credit-cards.html`}
            rel={"noreferrer"}
            target={"_blank"}
          >
            <Image
              src={"/icons/bank/idcheck.webp"}
              width={50}
              height={30}
              alt="Idcheck"
              className="h-[30px] w-auto rounded-sm border bg-white"
            />
          </a>
          <div>
            <Image
              src={"/icons/bank/visa.webp"}
              width={50}
              height={30}
              alt="Visa"
              className="h-[30px] w-auto rounded-sm border bg-white"
            />
          </div>
          <div>
            <Image
              src={"/icons/bank/maestro.webp"}
              width={50}
              height={30}
              alt="Maestro"
              className="h-[30px] w-auto rounded-sm border bg-white"
            />
          </div>
          <Image
            src={"/icons/bank/bancaIntesa.webp"}
            width={200}
            height={70}
            alt="Intesa"
            className="h-[30px] w-auto rounded-sm border bg-white"
          />
          <div>
            <Image
              src={"/icons/bank/mastercard.webp"}
              width={50}
              height={30}
              alt="Master Card"
              className="h-[30px] w-auto rounded-sm border bg-white"
            />
          </div>
          <div>
            <Image
              src={"/icons/bank/american.webp"}
              width={50}
              height={30}
              alt="American Express"
              className="h-[30px] w-auto rounded-sm border bg-white"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Footer;
