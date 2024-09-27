import useQueryParameter from '@/hooks/useQueryParameter';
import useGroups from '@/hooks/useGroups';
import { useEffect, useState } from 'react';
import useUser from '@/hooks/useUser';
import EmptyGroup from './EmptyGroup';
import GroupBar from './GroupBar';
import GroupTask from './GroupTask';
import GroupReport from './GroupReport';
import GroupMembers from './GroupMembers';

function GroupPage() {
  const { groupId } = useQueryParameter();
  const { user } = useUser();
  const { group, isGroupLoading, groupError, groupTaskLists, groupMembers } =
    useGroups(groupId);

  const [isAdmin, setIsAdmin] = useState<boolean>(false);
  const checkRole = () => {
    if (group && group.members && user) {
      const userMember = group.members.find(
        (member) => member.userId === user.id,
      );
      return userMember ? userMember.role === 'ADMIN' : false;
    }
    return false;
  };

  // 전체 할 일, 전체 한 일, 오늘의 할 일
  const [doneTaskCount, setTaskDoneCount] = useState<number>(0);
  const [todayTaskCount, setTodayTaskCount] = useState<number>(0);
  const [totalTaskCount, setTotalTaskCount] = useState<number>(0);

  const calculateDoneCount = (taskLists: TaskList[]) => {
    return taskLists.reduce((acc, taskList) => {
      return acc + taskList.tasks.filter((task) => task.doneAt !== null).length;
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
    if (group && user) {
      const isAdminCheck = checkRole();
      setIsAdmin(isAdminCheck);
    }
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
  }, [group, user, groupTaskLists]);

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
      <div className='text-text-primary text-lg px-24'>
        <section className='w-full desktop:mx-auto pt-24'>
          <GroupBar
            groupId={Number(groupId)}
            groupName={group.name}
            isAdmin={isAdmin}
          >
            {group.name}
          </GroupBar>
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
