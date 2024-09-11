import { ReactNode } from 'react';
import { create } from 'zustand';

interface HalfPageStoreState {
  isHalfPageOpen: boolean;
  halfPage: ReactNode | null;
  setHalfPageOpen: (HalfPage: ReactNode) => void;
  setHalfPageClose: () => void;
}

const useHalfPageStore = create<HalfPageStoreState>((set) => ({
  isHalfPageOpen: false,
  halfPage: null,
  setHalfPageOpen: (halfPage) => set({ isHalfPageOpen: true, halfPage }),
  setHalfPageClose: () => set({ isHalfPageOpen: false, halfPage: null }),
}));

export default useHalfPageStore;
