import IconLeftArrowColor from '@/assets/IconLeftArrowColor';
import useQueryParameter from '@/hooks/useQueryParameter';
import Link from 'next/link';
import DateNavigate from './DateNavigate';
import TasksSection from './Task/TasksSection';
import TaskListMenu from './TaskList/TaskListMenu';
import TaskListAddPlusButton from './TaskListAddPlusButton';
import TodoAddButton from './TodoAddButton';
import useCurrentTaskListName from './useCurrentTaskListName';

function ListPage() {
  const { groupId } = useQueryParameter();
  const { currentName } = useCurrentTaskListName();

  return (
    <main className='main-container relative h-[80vh]'>
      <section className='flex flex-col tablet:flex-row tablet:justify-between  tablet:items-center gap-20 tablet:gap-0'>
        <div className='flex items-center gap-6 tablet:gap-10'>
          <Link href={`/group/${groupId}`}>
            <IconLeftArrowColor strokeColor='#ffffff' width={32} height={32} />
          </Link>
          <h2 className='text-md tablet:text-2lg desktop:text-xl font-bold text-text-primary'>
            &apos;{currentName}&apos; 목록의 할 일
          </h2>
        </div>

        <div className='flex justify-center'>
          <DateNavigate />
        </div>
      </section>
      <article className='relative flex w-full h-full gap-10 tablet:gap-20 mt-15 tablet:mt-25'>
        <div className='flex flex-col gap-10'>
          <TaskListMenu />
          <TaskListAddPlusButton />
        </div>
        {/* <Tasks /> */}
        <TasksSection />
        <TodoAddButton />
      </article>
    </main>
  );
}

export default ListPage;
