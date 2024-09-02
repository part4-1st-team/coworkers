import { ReactNode } from 'react';
import { create } from 'zustand';

interface ModalStoreState {
  isModalOpen: boolean;
  modal: ReactNode | null;
  setModalOpen: (modal: ReactNode) => void;
  setModalClose: () => void;
}

const useModalStore = create<ModalStoreState>((set) => ({
  isModalOpen: false,
  modal: null,
  setModalOpen: (modal) => set({ isModalOpen: true, modal: modal }),
  setModalClose: () => set({ isModalOpen: false, modal: null }),
}));

export default useModalStore;
