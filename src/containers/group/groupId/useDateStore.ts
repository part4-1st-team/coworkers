import getMonthDay from '@/utils/getMonthDay';
import { QueryClient } from '@tanstack/react-query';
import { create } from 'zustand';

interface DateState {
  pickDate: Date;
  setPickDate: (date: Date) => void;
  handleNavigateDay: (
    type: 'next' | 'prev',
    queryClient: QueryClient,
    groupId: number,
    taskListId: number,
    userId: number,
  ) => void;
}

const useDateStore = create<DateState>((set) => ({
  pickDate: new Date(),
  setPickDate: (date: Date) => set({ pickDate: date }),
  handleNavigateDay: (
    type: 'next' | 'prev',
    queryClient: QueryClient,
    groupId: number,
    taskListId: number,
    userId: number,
  ) =>
    set((state) => {
      const newDate = new Date(state.pickDate);
      if (type === 'next') {
        newDate.setDate(newDate.getDate() + 1);
      } else {
        newDate.setDate(newDate.getDate() - 1);
      }

      queryClient.invalidateQueries({
        queryKey: ['getTasks', groupId, taskListId, getMonthDay(newDate)],
      });
      queryClient.invalidateQueries({
        queryKey: [
          'getPriorityTasks',
          groupId,
          taskListId,
          getMonthDay(newDate),
          userId,
        ],
      });
      return { pickDate: newDate };
    }),
}));

export default useDateStore;
