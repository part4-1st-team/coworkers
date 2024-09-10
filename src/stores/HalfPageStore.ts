import { ReactNode } from 'react';
import { create } from 'zustand';

interface HalfPageStoreState {
  isHalfPageOpen: boolean;
  HalfPage: ReactNode | null;
  setHalfPageOpen: (HalfPage: ReactNode) => void;
  setHalfPageClose: () => void;
}

const useHalfPageStore = create<HalfPageStoreState>((set) => ({
  isHalfPageOpen: false,
  HalfPage: null,
  setHalfPageOpen: (HalfPage) => set({ isHalfPageOpen: true, HalfPage }),
  setHalfPageClose: () => set({ isHalfPageOpen: false, HalfPage: null }),
}));

export default useHalfPageStore;
