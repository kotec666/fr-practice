import React, { PropsWithChildren } from "react";
import styles from "./container.module.css";

type IContainerProps = PropsWithChildren;

const Container = (props: IContainerProps) => {
  return <div className={styles.container}>{props.children}</div>;
};

export default Container;
