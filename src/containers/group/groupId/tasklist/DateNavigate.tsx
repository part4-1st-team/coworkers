import { IconCalendar } from '@/assets/IconList';
import ArrowButton from '@/components/button/arrowButton';
import Calendar from '@/components/calendar/Calendar';
import useQueryParameter from '@/hooks/useQueryParameter';
import { useQueryClient } from '@tanstack/react-query';
import useDateStore from '../useDateStore';

function DateNavigate() {
  const { pickDate, setPickDate, handleNavigateDay } = useDateStore();
  const { groupId, taskListId } = useQueryParameter();
  const queryClient = useQueryClient();

  return (
    <>
      <div className='flex gap-4'>
        <ArrowButton
          direction='left'
          onClick={() =>
            handleNavigateDay('prev', queryClient, groupId, taskListId)
          }
        />
        <ArrowButton
          direction='right'
          onClick={() =>
            handleNavigateDay('next', queryClient, groupId, taskListId)
          }
        />
      </div>
      <Calendar
        trigger={
          <button
            type='button'
            aria-label='캘린더'
            className='flex items-center'
          >
            <IconCalendar width={16} height={16} />
          </button>
        }
        pickDate={pickDate}
        setPickDate={setPickDate}
      />
    </>
  );
}

export default DateNavigate;
