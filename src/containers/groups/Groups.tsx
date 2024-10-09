import useUser from '@/hooks/useUser';
import { useRouter } from 'next/router';
import Button from '@/components/button/button';
import useMemberships from '@/hooks/useMemberships';
import { useEffect } from 'react';
import useGroups from '@/hooks/useGroups';
import EmptyGroup from '../group/groupId/groupTaskList/EmptyGroup';
import GroupBar from '../group/groupId/groupTaskList/GroupBar';

function Groups() {
  const { user } = useUser();
  const { groups, refetch: refetchGroups } = useGroups();
  const router = useRouter();
  const { memberships, refetch: refetchMemberships } = useMemberships();

  useEffect(() => {
    if (user) {
      refetchGroups();
      refetchMemberships(); // 유저 정보가 변경될 때마다 memberships를 재요청
    }
  }, [user, groups, refetchGroups, refetchMemberships]);

  const handleJoinGroup = () => {
    router.push('/group/join-group');
  };

  const handleCreateGroup = () => {
    router.push('/group/create-group');
  };

  const currentGroups =
    memberships.map((membership) => ({
      ...membership.group,
      role: membership.role,
    })) || [];

  if (!groups.length) {
    return <EmptyGroup />;
  }

  return (
    <div className='main-container'>
      <div className='text-xl text-text-primary dark:text-text-primary-dark flex items-end justify-between'>
        <p>내 팀 목록</p>
        <div className='flex gap-8'>
          <Button
            type='button'
            size='sm'
            color='primary'
            className='p-12'
            onClick={handleCreateGroup}
          >
            팀 생성하기
          </Button>
          <Button
            type='button'
            size='sm'
            color='outline'
            className='p-12'
            onClick={handleJoinGroup}
          >
            팀 참여하기
          </Button>
        </div>
      </div>
      <div className='border border-border-primary dark:border-border-primary-dark mt-12' />
      <div className='flex flex-col gap-16 desktop:grid grid-cols-2 mt-24'>
        {currentGroups.map((group) => (
          <GroupBar
            key={group.id}
            groupId={group.id}
            groupName={group.name}
            isAdmin={group.role === 'ADMIN'}
          />
        ))}
      </div>
    </div>
  );
}

export default Groups;
