import { useEffect, useState } from "react";
import { useUserStore } from "@/store/user";
import { User } from "@/types";
import { auth } from "@/api/user";

const useAuthClient = (): { user: User | undefined; isAuthorized: boolean } => {
  const [state, setState] = useState<{
    user: User | undefined;
    isAuthorized: boolean;
  }>({
    user: undefined,
    isAuthorized: false,
  });
  const setUser = useUserStore((state) => state.setUser);

  useEffect(() => {
    (async () => {
      try {
        const user = (await auth()) as User;

        if (Object.keys(user).length) {
          setUser(user);
          setState((p) => ({ ...p, user: user, isAuthorized: true }));
        }
      } catch {
        setUser(undefined);
        return setState((p) => ({
          ...p,
          user: undefined,
          isAuthorized: false,
        }));
      }
    })();
  }, [setUser]);

  return {
    user: state.user,
    isAuthorized: state.isAuthorized,
  };
};

export default useAuthClient;
