import { useRouter } from 'next/router';
import { useEffect, useState, useMemo } from 'react';
import useQueryParameter from '@/hooks/useQueryParameter';
import useGroups from '@/hooks/useGroups';
import useUser from '@/hooks/useUser';
import useTaskLists from '@/hooks/useTaskLists';
import { useQueryClient } from '@tanstack/react-query';
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
  const { group, isGroupLoading, groupMembers } = useGroups(groupId);
  const { taskLists, isLoading: isTaskListLoading } = useTaskLists(groupId);
  const queryClient = useQueryClient();

  const [isAdmin, setIsAdmin] = useState<boolean>(false);
  const [activeTab, setActiveTab] = useState<'total' | 'progress'>('total');

  useEffect(() => {
    if (group && user) {
      const userMember = group.members.find(
        (member) => member.userId === user.id,
      );
      setIsAdmin(userMember ? userMember.role === 'ADMIN' : false);
    }
  }, [group, user]);

  const doneTaskCount = useMemo(() => {
    return taskLists.reduce((acc, taskList) => {
      return acc + taskList.tasks.filter((task) => task.doneAt !== null).length;
    }, 0);
  }, [taskLists]);

  const todayTaskCount = useMemo(() => {
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
  }, [taskLists]);

  const totalTaskCount = useMemo(() => {
    return taskLists.reduce(
      (total, taskList) => total + taskList.tasks.length,
      0,
    );
  }, [taskLists]);

  useEffect(() => {
    if (!isGroupLoading && !group) {
      router.push('/group');
    }
  }, [isGroupLoading, group, router]);

  useEffect(() => {
    queryClient.invalidateQueries({ queryKey: ['getTaskLists', groupId] });
  }, [taskLists, groupId, queryClient]);

  const handleTabChange = (tab: 'total' | 'progress') => {
    setActiveTab(tab);
  };

  if (isGroupLoading || isTaskListLoading) {
    return <div>Loading...</div>;
  }

  return (
    <div className='main-container'>
      <div className='text-text-primary text-lg dark:text-text-primary-dark'>
        <section className='w-full desktop:mx-auto pt-24'>
          {group ? (
            <>
              <div className='flex flex-row-reverse gap-4 mb-12'>
                <UnderLine active={activeTab === 'progress'}>
                  <button
                    className='w-64 pb-6 text-text-primary dark:text-text-primary-dark text-md tablet:text-lg desktop:text-2lg'
                    type='button'
                    onClick={() => handleTabChange('progress')}
                  >
                    진척도
                  </button>
                </UnderLine>
                <UnderLine active={activeTab === 'total'}>
                  <button
                    className='w-64 pb-6 text-text-primary dark:text-text-primary-dark text-md tablet:text-lg desktop:text-2lg'
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
                  />
                  <div className='desktop:flex flex-row-reverse gap-12'>
                    <GroupTask Lists={taskLists} />
                    <GroupReport
                      doneCount={doneTaskCount}
                      totalCount={totalTaskCount}
                      todayCount={todayTaskCount}
                    />
                  </div>
                  <GroupMembers Members={groupMembers} groupId={groupId} />
                </div>
              ) : (
                <div className='group-progress'>
                  <TaskListReport Lists={taskLists} />
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
