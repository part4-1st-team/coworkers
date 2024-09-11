// import { useEffect, useState } from 'react';
import GroupTaskList from './GroupTaskList';

const colors = ['purple', 'blue', 'cyan', 'pink', 'rose', 'orange', 'yellow'];

// NOTE 무한 랜딩 됨... 왜....?

function GroupTask({ Lists }: { Lists: MockTaskLists[] }) {
  // const [listCount, setListCount] = useState(0);
  // const [doneCount, setDoneCount] = useState(0);
  // const [totalCount, setTotalCount] = useState(0);
  // const [isDone, setIsDone] = useState(false);

  // function countDone({ tasks }: { tasks: MockTasks[] }) {
  //   setTotalCount(tasks.length);

  // let cnt = 0;

  //   tasks.map((item) => (item.done === true ? cnt++ : cnt));
  //   setDoneCount(cnt);

  //   if (doneCount === totalCount) {
  //     setIsDone(true);
  //   }
  // }

  return (
    <section className='w-full mt-24 flex flex-col gap-16'>
      <div className='w-full flex justify-between'>
        <div className='flex gap-8'>
          <p>할 일 목록</p>
          <p className='text-text-default'>({Lists.length}개)</p>
        </div>
        <p className='text-brand-primary '>+ 새로운 목록 추가하기</p>
      </div>
      {/* TODO 데이터 연동, 설정 클릭 구현, 색상 변경 구현 */}
      <div className='flex flex-col gap-16'>
        {Lists.length === 0 ? (
          <div className='text-14 font-md text-text-default mx-auto mt-64 mb-48 desktop:mb-64'>
            아직 할 일 목록이 없습니다.
          </div>
        ) : (
          Lists.map((tasklist) => (
            <GroupTaskList
              key={tasklist.id}
              doneCount={3}
              totalCount={5}
              color={colors[tasklist.id % 7]}
              isDone={false}
            >
              {tasklist.name}
            </GroupTaskList>
          ))
        )}
      </div>
    </section>
  );
}

export default GroupTask;
