"use client";
import { AriaButtonProps, useButton } from "@react-aria/button";
import { RefObject, useRef } from "react";

export const ButtonReactAria = (props: AriaButtonProps<"button">) => {
  const ref: RefObject<HTMLButtonElement | null> = useRef(null);
  const { buttonProps } = useButton(props, ref);

  return (
    <button {...buttonProps} ref={ref}>
      {props.children}
    </button>
  );
};
