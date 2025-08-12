"use client";
import { useCategory } from "@/hooks/ecommerce.hooks";
import { generateBreadcrumbSchema } from "@/_functions";
import BreadcrumbsStatic from "../../../components/BreadcrumbsStatic/BreadcrumbsStatic";

export const SingleCategory = ({ slug, path, base_url, text = "" }) => {
  const { data: singleCategory } = useCategory({ slug });

  const breadcrumbs_schema = generateBreadcrumbSchema({
    parents: singleCategory?.parents,
    path,
    base_url,
  });

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbs_schema) }}
      />
      <BreadcrumbsStatic
        breadcrumbs={[
          ...(singleCategory?.parents?.map((parent) => ({
            name: parent?.name,
            url: `${parent?.slug_path}`,
          })) ?? []),
          {
            name: singleCategory?.basic_data?.name,
            url: `${singleCategory?.slug_path}`,
          },
        ]}
      />
      <div data-aos="fade-up" className="sectionPaddingX mb-10">
        <h1 className="text-3xl text-4xl font-light 2xl:text-5xl 3xl:text-6xl">
          {singleCategory?.basic_data?.name ?? text ?? ""}
        </h1>
        {singleCategory?.basic_data?.short_description && (
          <p
            className="max-w-ful mt-10 w-full font-light 2xl:w-1/2 2xl:text-lg"
            dangerouslySetInnerHTML={{
              __html: singleCategory?.basic_data?.short_description,
            }}
          ></p>
        )}
        {singleCategory?.basic_data?.description && (
          <p
            className="max-w-ful mt-10 w-full font-light 2xl:text-lg"
            dangerouslySetInnerHTML={{
              __html: singleCategory?.basic_data?.description,
            }}
          ></p>
        )}
        {/* {singleCategory?.images?.image && (
          <Image
            src={singleCategory?.images?.image}
            alt={singleCategory?.basic_data?.name}
            width={1920}
            height={200}
            className="mt-12"
          />
        )} */}
      </div>
    </>
  );
};
