import Contact from "@/app/kontakt/components/Contact";
import { headers } from "next/headers";
import BreadcrumbsStatic from "@/components/BreadcrumbsStatic/BreadcrumbsStatic";

const Kontakt = async ({ searchParams }) => {
  const { proizvodIme, proizvodId, atribut } = searchParams;

  const defaultMessage =
    proizvodIme && proizvodId
      ? `Poštovani, \n\nMolim Vas da na datu e-mail adresu pošaljete ponudu za proizvod ${proizvodIme} - ${proizvodId}. ${
          atribut ? atribut : ""
        }.\n\nHvala.`
      : null;

  return (
    <>
      <BreadcrumbsStatic title="Kontakt" breadcrumbs={[{ name: "Kontakt" }]} />
      <section
        data-aos="fade-up"
        className="sectionPaddingX"
      >
        <Contact defaultMessage={defaultMessage} />
      </section>
    </>
  );
};

export default Kontakt;

export const generateMetadata = async () => {
  const header_list = headers();
  let canonical = header_list.get("x-pathname");
  return {
    title: `Kontakt | Zlatara Karat`,
    description: "Dobrodošli na Zlatara Karat",
    alternates: {
      canonical: canonical,
    },
    robots: {
      index: true,
      follow: true,
    },
    openGraph: {
      title: `Kontakt | Zlatara Karat`,
      description: "Dobrodošli na Zlatara Karat",
      type: "website",
      images: [
        {
          url: "https://api.fashiondemo.croonus.com/croonus-uploads/config/b2c/logo-c36f3b94e6c04cc702b9168481684f19.webp",
          width: 800,
          height: 600,
          alt: "Zlatara Karat",
        },
      ],
      locale: "sr_RS",
    },
  };
};
