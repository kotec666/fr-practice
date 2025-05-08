import { MetadataRoute } from "next";
import ky from "ky";

interface IItem {
  id: number;
  name: string;
}

type changeFrequency =
  | "always"
  | "hourly"
  | "daily"
  | "weekly"
  | "monthly"
  | "yearly"
  | "never"
  | undefined;

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const urls = [
    {
      api: "http://localhost:3001/api",
      web: "localhost:3000",
    },
  ];

  const dateStr = new Date();
  const yyyy = dateStr.getFullYear();
  let mm: string | number = dateStr.getMonth() + 1; // Months start at 0!
  let dd: string | number = dateStr.getDate();

  if (dd < 10) dd = "0" + dd;
  if (mm < 10) mm = "0" + mm;

  const formattedDate = yyyy + "-" + mm + "-" + dd;

  const itemsEntries: {
    url: string;
    lastModified: string;
    changeFrequency: changeFrequency;
    priority: number;
  }[] = [];

  let currentIdx = 0;

  const getItemsData = async (route: "ssg" | "isr") => {
    try {
      const items: IItem[] = await ky
        .get(`${urls[currentIdx].api}/item`)
        .json();

      return items.forEach((item) => {
        itemsEntries.push({
          url: `${urls[currentIdx].web}/${route}/${item.id}`,
          lastModified: formattedDate,
          changeFrequency: "weekly",
          priority: 1.0,
        });
      });
    } catch (e) {
      if (e instanceof Error && "response" in e) {
        console.log("CATCHED item idx", currentIdx);
        currentIdx++; // Увеличиваем индекс в случае ошибки
        if (currentIdx < urls.length) {
          await getItemsData(route); // Рекурсивно вызываем функцию с новым индексом
        } else {
          console.error("Все URL items были обработаны с ошибками");
        }
      } else {
        console.error("Unexpected error occurred:", e);
      }
    }
  };

  await getItemsData("ssg");
  await getItemsData("isr");

  return [
    {
      // url: `${env.web_url}/`, // главная
      url: `${urls[currentIdx].web}`, // главная
      lastModified: formattedDate,
      priority: 1.0,
    },
    ...itemsEntries,
  ];
}
