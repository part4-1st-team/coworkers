import useQueryParameter from '@/hooks/useQueryParameter';
import useGroups from '@/hooks/useGroups';
import { useEffect, useState } from 'react';

import EmptyGroup from './EmptyGroup';
import GroupBar from './GroupBar';
import GroupTask from './GroupTask';
import GroupReport from './GroupReport';
import GroupMembers from './GroupMembers';

function GroupPage() {
  const { groupId } = useQueryParameter();
  const { group, isGroupLoading, groupError, groupTaskLists, groupMembers } =
    useGroups(Number(groupId));


  // 전체 할 일, 전체 한 일, 오늘의 할 일
  const [doneTaskCount, setTaskDoneCount] = useState<number>(0);
  const [todayTaskCount, setTodayTaskCount] = useState<number>(0);
  const [totalTaskCount, setTotalTaskCount] = useState<number>(0);

  const calculateDoneCount = (taskLists: TaskList[]) => {
    return taskLists.reduce((acc, taskList) => {
      return (
        acc +
        taskList.tasks.filter(
          (task) => task.doneAt !== null || task.doneBy !== null,
        ).length
      );
    }, 0);
  };

  const calculateTodayCount = (taskLists: TaskList[]) => {
    const today = new Date();
    return taskLists.reduce((acc, taskList) => {
      return (
        acc +
        taskList.tasks.filter((task) => {
          const taskDate = new Date(task.date);
          return (
            taskDate.getFullYear() === today.getFullYear() &&
            taskDate.getMonth() === today.getMonth() &&
            taskDate.getDate() === today.getDate()
          );
        }).length
      );
    }, 0);
  };

  useEffect(() => {
    if (groupTaskLists) {
      const doneCount = calculateDoneCount(groupTaskLists);
      const todayCount = calculateTodayCount(groupTaskLists);
      const totalCount = groupTaskLists.reduce(
        (total, taskList) => total + taskList.tasks.length,
        0,
      );

      setTaskDoneCount(doneCount);
      setTodayTaskCount(todayCount);
      setTotalTaskCount(totalCount);
    }
  }, [groupTaskLists]);

  useEffect(() => {}, [groupMembers]);

  if (isGroupLoading) {
    return <div>Loading...</div>;
  }

  if (groupError) {
    return <div>Error loading group data.</div>;
  }

  // TODO 그룹 목록 페이지로 따로 처리하기
  if (!group) {
    return <EmptyGroup />;
  }

  return (
    <div className='main-container'>
      <div className='w-full h-full bg-background-primary text-text-primary text-lg px-24'>
        <section className='w-full desktop:w-1200 desktop:mx-auto pt-24'>
          <GroupBar>{group.name}</GroupBar>
          <GroupTask Lists={groupTaskLists} />
          <GroupReport
            doneCount={doneTaskCount}
            totalCount={totalTaskCount}
            todayCount={todayTaskCount}
          />
          <GroupMembers Members={groupMembers} groupId={groupId} />
        </section>
      </div>
    </div>
  );
}
export default GroupPage;
