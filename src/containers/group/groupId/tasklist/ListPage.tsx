import getMonthDay from '@/utils/getMonthDay';
import TaskAddButton from '../TaskAddButton';
import useDateStore from '../useDayNavigation';
import DateNavigate from './DateNavigate';
import TaskLists from './TaskLists';
import Tasks from './Tasks';
import TodoAddButton from './TodoAddButton';

function ListPage() {
  const { pickDate } = useDateStore();

  return (
    <main className='main-container relative h-[80vh]'>
      <div className='flex flex-col gap-24'>
        <h2 className='text-xl font-bold text-text-primary'>할 일</h2>
        <div className='flex justify-between items-center'>
          <div className='flex gap-12 items-center'>
            <span className='text-lg font-medium text-text-primary'>
              {getMonthDay(pickDate)}
            </span>
            <DateNavigate />
          </div>
          <TaskAddButton />
        </div>
        <div className='flex flex-col gap-16'>
          <TaskLists />
          <Tasks pickDate={pickDate} />
        </div>
      </div>
      <TodoAddButton />
    </main>
  );
}

export default ListPage;
