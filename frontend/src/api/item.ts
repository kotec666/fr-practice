import fetcher from "@/api/fetcher";
import { Item } from "@/types";

export const createItem = async (data: { name: string }) => {
  return (
    await fetcher.post("item", {
      json: {
        name: data.name,
      },
    })
  ).json();
};

export const getItems = async (
  revalidate: number | undefined,
): Promise<Item[]> => {
  return (
    await fetcher.get("item", {
      cache: "force-cache",
      next: { revalidate: revalidate },
    })
  ).json();
};

export const getItem = async (id: string | number): Promise<Item> => {
  return (await fetcher.get(`item/${id}`)).json();
};
