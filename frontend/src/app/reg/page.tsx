import React from "react";
import Default from "@/app/components/layouts/Default";
import Container from "@/app/components/ui/container/Container";
import "./reg.css";
import RegForm from "@/app/reg/components/RegForm";
import type { Metadata } from "next";
import { generateBasicMetadata } from "@/helpers/generateBasicMetadata";

export const metadata: Metadata = generateBasicMetadata({
  title: "Регистрация",
  description: "Регистрация description",
  keywords: "key, words",
  alternates: {
    canonical: "/reg",
  },
  openGraph: {
    url: `/reg`,
  },
});

const Page = () => {
  return (
    <Default>
      <Container>
        <RegForm />
      </Container>
    </Default>
  );
};

export default Page;
