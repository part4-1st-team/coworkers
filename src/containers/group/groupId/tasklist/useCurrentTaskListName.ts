import { create } from 'zustand';

interface TaskListNameState {
  currentName: string;
  setCurrentName: (name: string) => void;
}

const useCurrentTaskListName = create<TaskListNameState>((set) => ({
  currentName: '',
  setCurrentName: (name) => set({ currentName: name }),
}));

export default useCurrentTaskListName;
