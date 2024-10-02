import { useState } from 'react';
import { IconArrowLeft, IconArrowRight } from '@/assets/IconList';
import GroupTaskList from './GroupTaskList';
import TaskAddButton from '../TaskAddButton';

const colors = ['purple', 'blue', 'cyan', 'pink', 'rose', 'orange', 'yellow'];

function GroupTask({ Lists }: { Lists: TaskList[] }) {
  const [currentPage, setCurrentPage] = useState(0);
  const pageSize = 4;
  const totalPages = Math.ceil(Lists.length / pageSize);

  const handlePrevPage = () => {
    setCurrentPage((prev) => Math.max(prev - 1, 0));
  };

  const handleNextPage = () => {
    setCurrentPage((prev) => Math.min(prev + 1, totalPages - 1));
  };

  const paginatedLists = Lists.slice(
    currentPage * pageSize,
    (currentPage + 1) * pageSize,
  );

  return (
    <section className='w-full mt-24 flex flex-col gap-16'>
      <div className='w-full flex justify-between'>
        <div className='flex gap-8 items-center'>
          <p>할 일 목록</p>
          <p className='text-text-default'>({Lists.length}개)</p>
          {totalPages > 1 && (
            <>
              <IconArrowLeft
                className={`size-16 bg-background-secondary dark:bg-background-tertiary-dark rounded-full cursor-pointer ${currentPage === 0 ? 'opacity-50 cursor-not-allowed' : ''}`}
                onClick={handlePrevPage}
              />
              <IconArrowRight
                className={`size-16 bg-background-secondary dark:bg-background-tertiary-dark rounded-full cursor-pointer ${currentPage === totalPages - 1 ? 'opacity-50 cursor-not-allowed' : ''}`}
                onClick={handleNextPage}
              />
            </>
          )}
        </div>
        <TaskAddButton />
      </div>
      <div className='flex flex-col gap-16'>
        {Lists.length === 0 ? (
          <div className='text-14 font-md text-text-default mx-auto mt-64 mb-48 desktop:mb-64'>
            아직 할 일 목록이 없습니다.
          </div>
        ) : (
          paginatedLists.map((tasklist) => {
            const doneCount = tasklist.tasks.filter(
              (task) => task.doneAt !== null,
            ).length;
            const totalCount = tasklist.tasks.length;

            return (
              <GroupTaskList
                key={tasklist.id}
                doneCount={doneCount}
                totalCount={totalCount}
                color={colors[tasklist.id % 7]}
                isDone={doneCount === totalCount && totalCount !== 0}
                groupId={tasklist.groupId}
                taskListId={tasklist.id}
                taskListName={tasklist.name}
              />
            );
          })
        )}
      </div>
    </section>
  );
}

export default GroupTask;
