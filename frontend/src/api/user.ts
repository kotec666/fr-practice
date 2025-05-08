import fetcher from "@/api/fetcher";
import { User } from "@/types";

export const signIn = async (data: { email: string; password: string }) => {
  return (
    await fetcher.post("auth", {
      json: {
        email: data.email,
        password: data.password,
      },
    })
  ).json();
};

export const signUp = async (data: {
  email: string;
  name: string;
  password: string;
  repeatPassword: string;
}) => {
  return (
    await fetcher.post("users", {
      json: {
        password: data.password,
        repeatPassword: data.repeatPassword,
        email: data.email,
        name: data.name,
      },
    })
  ).json();
};

export const logoutUser = async () => {
  return (await fetcher.post("auth/logout")).json();
};

export const auth = async (cookie?: string): Promise<User> => {
  return (
    await fetcher.get("auth", {
      cache: "no-store",
      headers: {
        cookie: cookie,
      },
      next: { revalidate: 0 },
    })
  ).json();
};
