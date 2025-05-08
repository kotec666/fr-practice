import ky from "ky";
import { env } from "@/consts/env";

const fetcher = ky.extend({
  prefixUrl: env.api + "/api",
  credentials: "include",
});

export default fetcher;
