import { ReactNode } from 'react';
import { v4 as uuidv4 } from 'uuid';
import { create } from 'zustand';

const uuid = uuidv4();

interface ModalStoreState {
  isModalOpen: boolean;
  modal: ReactNode | null;
  modalId: string | null;
  // setModalOpen: (id: string) => void;
  setModalOpen: (modal: ReactNode) => void;
  setModalClose: () => void;
}

/**
 * Modal 상태를 관리하는 zustand store
 *
 * @example
 * const { setModalOpen } = useModalStore();
 * <button onClick={() => setModalOpen(<열고자 하는 모달/>)}
 * ex) <Button
        type='button'
        color='primary'
        onClick={() => setModalOpen(<TaskCreateDateModal />)}
      >
 *
 * @typedef {Object} ModalStoreState
 * @property (boolean) isModalOpen - 모달이 열려 있는지 여부
 * @property (string|null) modalId - uuid로 설정한 고유한 모달 id
 * @property {function(string): void} setModalOpen - 모달을 열고 해당 모달의 ID를 설정하는 함수
 * @property {function(): void} setModalClose - 모달을 닫는 함수
 *
 * @returns {ModalStoreState} 모달 상태와 상태를 변경하는 함수를 포함한 객체를 반환
 */
const useModalStore = create<ModalStoreState>((set) => ({
  isModalOpen: false,
  modal: null,
  modalId: null,
  setModalOpen: (modal) =>
    set({ isModalOpen: true, modalId: uuid, modal: modal }),
  setModalClose: () => set({ isModalOpen: false, modalId: null }),
}));

export default useModalStore;
