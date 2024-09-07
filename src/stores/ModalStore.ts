import { create } from 'zustand';

interface ModalStoreState {
  isModalOpen: boolean;
  modalId: string | null;
  setModalOpen: (id: string) => void;
  setModalClose: () => void;
}

/**
 * Modal 상태를 관리하는 zustand store
 *
 * @example
 * const { modalId, setModalOpen } = useModalStore();
 * <button onClick={() => setModalOpen(모달 아이디)}
 * {modalId === 모달아이디 &&  <해당 모달 />}
 * // 모달 아이디는 모달이름과 유사하게 작성합니다 ex) PasswordChangeModal -> password-change
 * // 멤버 모달같이 같은 모달을 열지만 다른 내용일 경우 id도 다르게 설정합니다 ex) profile-modal-3, profile-modal-4
 *
 * @typedef {Object} ModalStoreState
 * @property {boolean} isModalOpen - 모달이 열려 있는지 여부
 * @property {string|null} modalId - 현재 열려 있는 모달의 ID, 모달이 열려 있지 않으면 null
 * @property {function(string): void} setModalOpen - 모달을 열고 해당 모달의 ID를 설정하는 함수
 * @property {function(): void} setModalClose - 모달을 닫는 함수
 *
 * @returns {ModalStoreState} 모달 상태와 상태를 변경하는 함수를 포함한 객체를 반환
 */

const useModalStore = create<ModalStoreState>((set) => ({
  isModalOpen: false,
  modalId: null,
  setModalOpen: (id) => set({ isModalOpen: true, modalId: id }),
  setModalClose: () => set({ isModalOpen: false, modalId: null }),
}));

export default useModalStore;
