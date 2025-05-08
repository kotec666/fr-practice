import React from "react";
import Image from "next/image";
import "./toast.css";

type Props = {
  message?: string | boolean;
  success?: boolean;
};
export const ToastMsg = (props: Props) => (
  <div className="toast-container">
    {!props.success && (
      <Image alt="error" height={16} src="/svg/error.svg" width={16} />
    )}
    <span className="toast-message">
      {props.message || "Something went wrong, try again"}
    </span>
  </div>
);
