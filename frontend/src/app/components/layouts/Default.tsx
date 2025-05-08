"use client";
import React, { PropsWithChildren } from "react";
import Header from "@/app/components/layouts/header/Header";
import ToastComponent from "@/app/components/ui/toast/ToastComponent";
import useAuthClient from "@/hooks/useAuthClient";

type IDefaultProps = PropsWithChildren;

const Default = (props: IDefaultProps) => {
  const { isAuthorized } = useAuthClient();

  return (
    <>
      <Header isAuthorized={isAuthorized} />
      <main>{props.children}</main>
      <ToastComponent position="bottom-right" />
    </>
  );
};

export default Default;
