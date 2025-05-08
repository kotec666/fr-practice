import { cookies } from "next/headers";
import { User } from "@/types";
import { auth } from "@/api/user";

const useAuth = async (): Promise<
  | { user: undefined; isAuthorized: boolean }
  | { user: User; isAuthorized: boolean }
> => {
  const cookieStore = await cookies();
  const token = cookieStore.get("token");
  try {
    const user = (await auth(`token=${token?.value}`)) as User;
    return { user: user, isAuthorized: !!Object.keys(user).length };
  } catch {
    // const headersList = await headers();
    // read the custom x-url header
    // const header_url = headersList.get("x-url") || "";

    // if (AUTHORIZED_ROUTES[header_url] && url) {
    //   redirect(url, RedirectType.push);
    // }
    return { user: undefined, isAuthorized: false };
  }
};

export default useAuth;
