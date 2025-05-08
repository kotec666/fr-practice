import React, { use } from "react";
import Default from "@/app/components/layouts/Default";
import Container from "@/app/components/ui/container/Container";
import { Metadata } from "next";
import { redirect, RedirectType } from "next/navigation";
import { generateBasicMetadata } from "@/helpers/generateBasicMetadata";
import { env } from "@/consts/env";
import Script from "next/script";
import { getItem, getItems } from "@/api/item";

interface PageProps {
  params: Promise<{ id: string }>;
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ id: string }>;
}): Promise<Metadata> {
  let item;
  try {
    const { id } = await params;
    item = await getItem(id);
  } catch (e) {
    console.log(e);
    return redirect("/", RedirectType.push);
  }

  return generateBasicMetadata({
    title: item.name,
    keywords: item.name,
    description: item.name + " description",
    alternates: {
      canonical: `/isr/${item?.id}`,
    },
    openGraph: {
      url: `/isr/${item.id}`,
    },
  });
}

export async function generateStaticParams() {
  const items = await getItems(45);
  return items.map((item) => ({
    id: `${item.id}`,
  }));
}

const Page = ({ params }: PageProps) => {
  const { id } = use(params);
  const item = use(getItem(id));

  return (
    <Default>
      <Container>
        <section>
          <h1>Name: {item.name}</h1>
          <span>id: {item.id}</span>
        </section>
        <Script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "http://schema.org/",
              "@type": "Product",
              name: item.name,
              description: `${item.name} product_desc`,
              brand: {
                "@type": "Brand",
                name: `${item.name} product_brand`,
              },
              offers: {
                "@type": "Offer",
                priceCurrency: "RUB",
                price: "205",
                url: env.web_url + "isr" + item.id,
                itemCondition: "https://schema.org/NewCondition",
              },
              aggregateRating: {
                "@type": "AggregateRating",
                ratingValue: "4",
                ratingCount: "5009",
                reviewCount: "950",
                worstRating: "2",
                bestRating: "6",
              },
            }),
          }}
        />
      </Container>
    </Default>
  );
};

export default Page;
