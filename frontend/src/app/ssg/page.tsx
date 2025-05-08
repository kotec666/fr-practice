import React, { use } from "react";
import Default from "@/app/components/layouts/Default";
import ItemList from "@/app/components/widgets/ItemList";
import Container from "@/app/components/ui/container/Container";
import "./ssg.css";
import type { Metadata } from "next";
import { generateBasicMetadata } from "@/helpers/generateBasicMetadata";
import { env } from "@/consts/env";
import Script from "next/script";
import { getItems } from "@/api/item";

export const metadata: Metadata = generateBasicMetadata({
  title: "SSG page",
  description: "SSG page description",
  keywords: "key, words",
  alternates: {
    canonical: "/ssg",
  },
  openGraph: {
    url: "/ssg",
  },
});

const Page = () => {
  const items = use(getItems(undefined));
  return (
    <Default>
      <Container>
        <section>
          <h1>ssg items</h1>
          <div className="items-list items-list--margin">
            <ItemList route="ssg" items={items} />
          </div>
        </section>
      </Container>
      <Script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "http://schema.org/",
            "@type": "WebSite",
            url: env.web_url,
            potentialAction: {
              "@type": "SearchAction",
              target: `${env.web_url}/?q={search_term_string}`,
              "query-input": "required name=search_term_string",
            },
          }),
        }}
      />
    </Default>
  );
};

export default Page;
