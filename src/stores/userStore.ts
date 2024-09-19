import { create } from 'zustand';
import { persist } from 'zustand/middleware';

interface UserStoreState {
  user: User | null;
  token: string | null;
  isLoggedIn: boolean;
  login: (user: User, token: string) => void;
  logout: () => void;
}

const useUserStore = create<UserStoreState>()(
  persist(
    (set) => ({
      user: null,
      token: null,
      isLoggedIn: false,
      login: (newUser: User, newToken: string) =>
        set({ user: newUser, isLoggedIn: true, token: newToken }),
      logout: () => set({ user: null, isLoggedIn: false, token: null }),
    }),
    {
      name: 'User',
    },
  ),
);

export default useUserStore;
