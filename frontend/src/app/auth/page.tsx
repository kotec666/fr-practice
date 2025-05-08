import React from "react";
import Default from "@/app/components/layouts/Default";
import Container from "@/app/components/ui/container/Container";
import AuthForm from "@/app/auth/components/AuthForm";
import type { Metadata } from "next";
import { generateBasicMetadata } from "@/helpers/generateBasicMetadata";

export const metadata: Metadata = generateBasicMetadata({
  title: "Авторизация",
  description: "Авторизация description",
  keywords: "key, words",
  alternates: {
    canonical: "/auth",
  },
  openGraph: {
    url: `/auth`,
  },
});

const Page = () => {
  return (
    <Default>
      <Container>
        <AuthForm />
      </Container>
    </Default>
  );
};

export default Page;
