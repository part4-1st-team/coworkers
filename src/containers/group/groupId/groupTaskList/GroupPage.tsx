import { useRouter } from 'next/router';
import useQueryParameter from '@/hooks/useQueryParameter';
import useGroups from '@/hooks/useGroups';
import { useEffect, useState } from 'react';
import useUser from '@/hooks/useUser';
import EmptyGroup from './EmptyGroup';
import GroupBar from './GroupBar';
import GroupTask from './GroupTask';
import GroupReport from './GroupReport';
import GroupMembers from './GroupMembers';
import UnderLine from '../tasklist/underline';
import TaskListReport from './TaskListReport';

function GroupPage() {
  const router = useRouter();
  const { groupId } = useQueryParameter();
  const { user } = useUser();
  const { group, isGroupLoading, groupTaskLists, groupMembers } =
    useGroups(groupId);

  const [isAdmin, setIsAdmin] = useState<boolean>(false);
  const [doneTaskCount, setTaskDoneCount] = useState<number>(0);
  const [todayTaskCount, setTodayTaskCount] = useState<number>(0);
  const [totalTaskCount, setTotalTaskCount] = useState<number>(0);
  const [activeTab, setActiveTab] = useState<'total' | 'progress'>('total');

  const checkRole = () => {
    if (group && group.members && user) {
      const userMember = group.members.find(
        (member) => member.userId === user.id,
      );
      return userMember ? userMember.role === 'ADMIN' : false;
    }
    return false;
  };

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
    if (user && group) {
      const isAdminCheck = checkRole();
      setIsAdmin(isAdminCheck);
    }
  }, [group, user]);

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

  useEffect(() => {
    if (!isGroupLoading && !group) {
      router.push('/group');
    }
  }, [isGroupLoading, group, router]);

  const handleTabChange = (tab: 'total' | 'progress') => {
    setActiveTab(tab);
  };

  if (isGroupLoading) {
    return <div>Loading...</div>;
  }

  return (
    <div className='main-container'>
      <div className='text-text-primary text-lg px-24'>
        <section className='w-full desktop:mx-auto pt-24'>
          {group ? (
            <>
              <div className='flex flex-row-reverse gap-4 mb-12'>
                <UnderLine active={activeTab === 'progress'}>
                  <button
                    className='w-64 pb-6 text-text-primary text-md tablet:text-lg desktop:text-2lg'
                    type='button'
                    onClick={() => handleTabChange('progress')}
                  >
                    진척도
                  </button>
                </UnderLine>
                <UnderLine active={activeTab === 'total'}>
                  <button
                    className='w-64 pb-6 text-text-primary text-md tablet:text-lg desktop:text-2lg'
                    type='button'
                    onClick={() => handleTabChange('total')}
                  >
                    전체
                  </button>
                </UnderLine>
              </div>
              {activeTab === 'total' ? (
                <div className='group-total'>
                  <GroupBar
                    groupId={groupId}
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
                </div>
              ) : (
                <div className='group-progress'>
                  <TaskListReport Lists={groupTaskLists} />
                </div>
              )}
            </>
          ) : (
            <EmptyGroup />
          )}
        </section>
      </div>
    </div>
  );
}

export default GroupPage;
