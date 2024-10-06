import useUser from '@/hooks/useUser';
import { useRouter } from 'next/router';
import EmptyGroup from '../group/groupId/groupTaskList/EmptyGroup';
import GroupBar from '../group/groupId/groupTaskList/GroupBar';
import Button from '@/components/button/button';

function Groups() {
  const { user } = useUser();
  const router = useRouter();

  const handleJoinGroup = () => {
    router.push('/group/join-group');
  };

  const handleCreateGroup = () => {
    router.push('/group/create-group');
  };

  const groups =
    user?.memberships.map((membership) => ({
      ...membership.group,
      role: membership.role,
    })) || [];

  if (!groups.length) {
    return <EmptyGroup />;
  }

  return (
    <div className='main-container'>
      <div className='text-xl text-text-primary dark:text-text-primary-dark flex items-center justify-between'>
        <p>내 팀 목록</p>
        <div className='flex gap-8'>
          <Button
            type={'button'}
            size='sm'
            color='outline'
            onClick={handleJoinGroup}
          >
            팀 참여하기
          </Button>
          <Button
            type={'button'}
            size='sm'
            color='outline'
            onClick={handleCreateGroup}
          >
            팀 추가하기
          </Button>
        </div>
      </div>
      <div className='border border-border-primary dark:border-border-primary-dark mt-12' />
      <div className='flex flex-col gap-16 desktop:grid grid-cols-2 mt-24'>
        {groups.map((group) => (
          <GroupBar
            key={group.id}
            groupId={group.id}
            groupName={group.name}
            isAdmin={group.role === 'ADMIN'}
          >
            {group.name}
          </GroupBar>
        ))}
      </div>
    </div>
  );
}

export default Groups;
