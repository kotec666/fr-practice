import { create } from "zustand";
import { User } from "@/types";

interface UserState {
  user: User | undefined;
  setUser: (user: User | undefined) => void;
  removeUser: () => void;
}

export const useUserStore = create<UserState>((set) => ({
  user: {} as User,
  setUser: (user) =>
    set(() => ({
      user: user,
    })),
  removeUser: () =>
    set(() => ({
      user: undefined as unknown as User,
    })),
}));
