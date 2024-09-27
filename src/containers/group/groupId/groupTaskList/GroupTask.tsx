import GroupTaskList from './GroupTaskList';
import TaskAddButton from '../TaskAddButton';

const colors = ['purple', 'blue', 'cyan', 'pink', 'rose', 'orange', 'yellow'];

function GroupTask({ Lists }: { Lists: TaskList[] }) {
  return (
    <section className='w-full mt-24 flex flex-col gap-16'>
      <div className='w-full flex justify-between'>
        <div className='flex gap-8'>
          <p>할 일 목록</p>
          <p className='text-text-default'>({Lists.length}개)</p>
        </div>
        <TaskAddButton />
      </div>
      <div className='flex flex-col gap-16'>
        {Lists.length === 0 ? (
          <div className='text-14 font-md text-text-default mx-auto mt-64 mb-48 desktop:mb-64'>
            아직 할 일 목록이 없습니다.
          </div>
        ) : (
          Lists.map((tasklist) => {
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
