import { IconMenu } from '@/assets/IconList';
import TaskLists from './TaskLists';

function TaskListMenu() {
  return (
    <section className='h-[88%] w-70 tablet:w-100 rounded-12 bg-background-secondary px-10 tablet:px-15 items-center py-25 text-center'>
      <div className='flex items-center justify-center'>
        <p className='text-text-default text-md text-medium hidden tablet:block'>
          목록 메뉴
        </p>
        <IconMenu className='block tablet:hidden mb-8' />
      </div>
      <div className='h-3 bg-background-tertiary w-full rounded-8 my-10' />

      <div className='h-[calc(100%-40px)] w-full overflow-y-auto'>
        <TaskLists />
      </div>
    </section>
  );
}
export default TaskListMenu;
