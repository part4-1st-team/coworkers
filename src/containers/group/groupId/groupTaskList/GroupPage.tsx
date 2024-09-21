// 컴포넌트 import
import { useRouter } from 'next/router';
import EmptyGroup from './EmptyGroup';
import GroupBar from './GroupBar';
import GroupTask from './GroupTask';
import GroupReport from './GroupReport';
import GroupMembers from './GroupMembers';
import { useEffect, useState } from 'react';
import { getGroup } from '@/services/GroupAPI';

function GroupPage() {
  const router = useRouter();
  const { groupId } = router.query;

  const [group, setGroup] = useState<Group | null>(null);
  const [taskLists, setTaskLists] = useState<TaskList[]>([]);
  const [members, setMembers] = useState<Member[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [doneCout, setDoneCount] = useState<number>(0);
  const [totalCount, setTotalCount] = useState<number>(0);

  useEffect(() => {
    async function fetchData() {
      if (groupId) {
        try {
          const groupData = await getGroup(Number(groupId));
          const { members, taskLists } = groupData;

          setGroup(groupData);
          setTaskLists(taskLists);
          setMembers(members);
        } catch (error) {
          console.error('Error fetching group data:', error);
        } finally {
          setIsLoading(false);
        }
      }
    }

    fetchData();
  }, [groupId, taskLists]);

  if (isLoading) {
    return <div>Loading...</div>;
  }

  // TODO 그룹 목록 페이지로 따로 처리하기
  if (!group) {
    return <EmptyGroup />;
  }

  return (
    <div className='w-full h-full bg-background-primary text-text-primary text-lg px-24'>
      <section className='w-full desktop:w-1200 desktop:mx-auto pt-24'>
        <GroupBar>{group.name}</GroupBar>
        <GroupTask Lists={taskLists} />
        {/* TODO 데이터에 맞게 할당 */}
        <GroupReport doneCount={5} totalCount={20} />
        <GroupMembers Members={members} />
      </section>
    </div>
  );
}
export default GroupPage;
