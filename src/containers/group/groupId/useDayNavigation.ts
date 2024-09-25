import useQueryParameter from '@/hooks/useQueryParameter';
import getMonthDay from '@/utils/getMonthDay';
import { useQueryClient } from '@tanstack/react-query';
import { Dispatch, SetStateAction } from 'react';

function useDayNavigation(setPickDate: Dispatch<SetStateAction<Date>>) {
  const queryClient = useQueryClient();
  const { groupId, taskListId } = useQueryParameter();

  const handleNavigateDay = (type: 'next' | 'prev') =>
    setPickDate((prevDate) => {
      const newDate = new Date(prevDate);
      if (type === 'next') {
        newDate.setDate(newDate.getDate() + 1); // 하루 전날로 변경
      } else {
        newDate.setDate(newDate.getDate() - 1); // 하루 전날로 변경
      }
      queryClient.invalidateQueries({
        queryKey: ['getTasks', groupId, taskListId, getMonthDay(newDate)],
      });

      return newDate;
    });

  return handleNavigateDay;
}

export default useDayNavigation;
