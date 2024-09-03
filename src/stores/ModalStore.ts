import { create } from 'zustand';

interface ModalStoreState {
  isModalOpen: boolean;
  modalId: string | null;
  setModalOpen: (id: string) => void;
  setModalClose: () => void;
}

const useModalStore = create<ModalStoreState>((set) => ({
  isModalOpen: false,
  modal: null,
  modalId: null,
  setModalOpen: (id) => set({ isModalOpen: true, modalId: id }),
  setModalClose: () => set({ isModalOpen: false, modalId: null }),
}));

export default useModalStore;
