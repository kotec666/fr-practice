import React from "react";
import Default from "@/app/components/layouts/Default";
import Image from "next/image";
import Container from "@/app/components/ui/container/Container";
import { preload } from "react-dom";
import type { Metadata } from "next";
import { generateBasicMetadata } from "@/helpers/generateBasicMetadata";

export const metadata: Metadata = generateBasicMetadata({
  title: "Images page",
  description: "Images page description",
  keywords: "key, words",
  alternates: {
    canonical: "/images",
  },
  openGraph: {
    url: "/images",
  },
});

const Page = () => {
  preload("/img/cat1.avif", {
    as: "image",
    fetchPriority: "high",
    crossOrigin: "anonymous",
  });
  preload("/img/cat2.avif", {
    as: "image",
    fetchPriority: "high",
    crossOrigin: "anonymous",
  });

  return (
    <Default>
      <Container>
        <section>
          <div role="list" className="list">
            <Image
              src="/img/cat1.avif"
              role="listitem"
              alt="Зеленый кот с миской."
              width={635}
              height={483}
            />
            <Image
              src="/img/cat2.avif"
              role="listitem"
              alt="Зеленый кот."
              width={209}
              height={241}
            />
          </div>
        </section>
      </Container>
    </Default>
  );
};

export default Page;
