import React from "react";
import "./ItemList.css";
import Link from "next/link";
import { Item } from "@/types";

const ItemList = (props: { items: Item[]; route: string }) => {
  return (
    <div role="list" className="list">
      {props.items.map((item) => (
        <Link
          href={`/${props.route}/${item.id}`}
          key={item.id}
          role="listitem"
          className="list__item list__item--bordered"
        >
          {item.name}
        </Link>
      ))}
    </div>
  );
};

export default ItemList;
