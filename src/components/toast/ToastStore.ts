import { create } from 'zustand';

const MAX_TOASTS = 5; // 최대 토스트 개수

export type ToastType = 'Success' | 'Error'; // 토스트 타입

export interface Toast {
  // 토스트가 가지고 있는 데이터들의 타입
  id: string;
  type: ToastType;
  message: string;
}

interface ToastState {
  toastList: Toast[]; // 토스트는 여러개가 뜰 수 있으므로 배열로 관리함
  addToastList: (toast: Toast) => void;
  removeToastList: (id: string) => void;
}

const useToastStore = create<ToastState>((set) => ({
  toastList: [],
  addToastList: (toast: Toast) =>
    set((state) => {
      const updatedToastList =
        state.toastList.length >= MAX_TOASTS // 최대 개수가 넘으면 오래된 토스트를 제거
          ? [...state.toastList.slice(1), toast] // 첫 번째 토스트 제거
          : [...state.toastList, toast];
      return { toastList: updatedToastList };
    }),
  removeToastList: (id: string) =>
    set((state) => ({
      toastList: state.toastList.filter((toast) => toast.id !== id), // 해당 id값을 가진 토스트는 제거하기
    })),
}));

export default useToastStore;
