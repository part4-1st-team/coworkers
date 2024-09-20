import { create } from 'zustand';
import { persist } from 'zustand/middleware';

interface UserStoreState {
  user: User | null;
  accessToken: string | null;
  refreshToken: string | null;
  isLoggedIn: boolean;
  setLogin: (user: User, atoken: string, rToken: string) => void;
  setLogout: () => void;
}

const useUserStore = create<UserStoreState>()(
  persist(
    (set) => ({
      user: null,
      accessToken: null,
      isLoggedIn: false,
      refreshToken: null,
      setLogin: (newUser: User, aToken: string, rToken: string) =>
        set({
          user: newUser,
          isLoggedIn: true,
          accessToken: aToken,
          refreshToken: rToken,
        }),
      setLogout: () =>
        set({
          user: null,
          isLoggedIn: false,
          accessToken: null,
          refreshToken: null,
        }),
    }),
    {
      name: 'User',
    },
  ),
);

export default useUserStore;
