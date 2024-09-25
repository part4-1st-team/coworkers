import { IconCalendar } from '@/assets/IconList';
import Calendar from '@/components/calendar/Calendar';
import useQueryParameter from '@/hooks/useQueryParameter';
import getMonthDay from '@/utils/getMonthDay';
import { useQueryClient } from '@tanstack/react-query';
import useDateStore from '../useDateStore';
import UnderLine from './underline';

function DateNavigate() {
  const { pickDate, setPickDate, handleNavigateDay } = useDateStore();
  const { groupId, taskListId } = useQueryParameter();
  const queryClient = useQueryClient();

  return (
    <div className='flex items-center'>
      <div className='mr-15'>
        <Calendar
          trigger={
            <button
              type='button'
              aria-label='캘린더'
              className='flex items-center'
            >
              <IconCalendar className='size-16 tablet:size-24' />
            </button>
          }
          pickDate={pickDate}
          setPickDate={setPickDate}
        />
      </div>

      <div className='flex gap-8 items-center'>
        <UnderLine>
          <button
            type='button'
            className='p-10 text-text-primary text-md tablet:text-lg desktop:text-2lg'
            onClick={() =>
              handleNavigateDay('prev', queryClient, groupId, taskListId)
            }
          >
            {getMonthDay(pickDate, 'prev', false)}
          </button>
        </UnderLine>

        <UnderLine active>
          <button
            className='p-10 text-text-primary text-md tablet:text-lg desktop:text-2lg'
            type='button'
          >
            {getMonthDay(pickDate, undefined, false)}
          </button>
        </UnderLine>

        <UnderLine>
          <button
            type='button'
            className='p-10 text-text-primary text-md tablet:text-lg desktop:text-2lg'
            onClick={() =>
              handleNavigateDay('next', queryClient, groupId, taskListId)
            }
          >
            {getMonthDay(pickDate, 'next', false)}
          </button>
        </UnderLine>
      </div>
    </div>
  );
}

export default DateNavigate;
