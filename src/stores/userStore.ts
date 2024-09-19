import { create } from 'zustand';
import { persist } from 'zustand/middleware';

interface UserStoreState {
  user: User | null;
  token: string | null;
  isLoggedIn: boolean;
  login: (user: User, token: string) => void;
  logout: () => void;
  setToken: (token: string) => void;
}

const useUserStore = create<UserStoreState>()(
  persist(
    (set) => ({
      user: null,
      token: null,
      isLoggedIn: false,
      login: (newUser: User) => set({ user: newUser, isLoggedIn: true }),
      logout: () => set({ user: null, isLoggedIn: false, token: null }),
      setToken: (token: string) => set({ token }),
    }),
    {
      name: 'User',
    },
  ),
);

export default useUserStore;
