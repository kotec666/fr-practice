import Default from "@/app/components/layouts/Default";
import CreateItem from "@/app/CreateItem";
import Container from "@/app/components/ui/container/Container";
import type { Metadata } from "next";
import { generateBasicMetadata } from "@/helpers/generateBasicMetadata";
import Script from "next/script";
import { env } from "@/consts/env";
import { headers } from "next/headers";
import { use } from "react";

export const metadata: Metadata = generateBasicMetadata({
  title: "Home page",
  description: "Home page description",
  keywords: "key, words",
  openGraph: {
    url: "",
  },
});

const Home = () => {
  const nonce = use(headers()).get("x-nonce") as string;
  return (
    <Default>
      <Container>
        <CreateItem />
      </Container>
      <Script
        type="application/ld+json"
        nonce={nonce}
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

export default Home;
