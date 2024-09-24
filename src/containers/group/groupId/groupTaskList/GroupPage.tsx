import useQueryParameter from '@/hooks/useQueryParameter';
import { useEffect, useState } from 'react';
import { getGroup } from '@/services/GroupAPI';

import EmptyGroup from './EmptyGroup';
import GroupBar from './GroupBar';
import GroupTask from './GroupTask';
import GroupReport from './GroupReport';
import GroupMembers from './GroupMembers';
import { getUser } from '@/services/userAPI';

function GroupPage() {
  const { groupId } = useQueryParameter();

  const [group, setGroup] = useState<Group | null>(null);
  const [groupTaskLists, setGroupTaskLists] = useState<TaskList[]>([]);
  const [groupMembers, setGroupMembers] = useState<Member[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [doneCount, setDoneCount] = useState<number>(0);
  const [totalCount, setTotalCount] = useState<number>(0);
  const [isAdmin, setIsAdmin] = useState<boolean>(false);

  useEffect(() => {
    async function fetchData() {
      if (groupId) {
        try {
          const groupData = await getGroup(Number(groupId));
          const { members, taskLists } = groupData;

          setGroup(groupData);
          setGroupTaskLists(taskLists);
          setGroupMembers(members);

          const userData = await getUser();
          const userId = userData.id;

          const userRole = members.find(
            (member) => member.userId === userId,
          )?.role;
          if (userRole === 'ADMIN') {
            setIsAdmin(true);
          } else {
            setIsAdmin(false);
          }
        } catch (error) {
          console.error('Error fetching group data:', error);
        } finally {
          setIsLoading(false);
        }
      }
    }

    fetchData();
  }, [groupId, groupTaskLists]);

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
        <GroupBar groupId={groupId} groupName={group.name} isAdmin={isAdmin}>
          {group.name}
        </GroupBar>
        <GroupTask Lists={groupTaskLists} />
        <GroupReport doneCount={doneCount} totalCount={totalCount} />
        <GroupMembers Members={groupMembers} />
      </section>
    </div>
  );
}
export default GroupPage;
