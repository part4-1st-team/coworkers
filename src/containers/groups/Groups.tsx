import useUser from '@/hooks/useUser';
import EmptyGroup from './groupId/groupTaskList/EmptyGroup';
import GroupBar from './groupId/groupTaskList/GroupBar';

function Groups() {
  const { user } = useUser();

  const groups =
    user?.memberships.map((membership) => ({
      ...membership.group,
      role: membership.role,
    })) || [];

  if (!groups.length) {
    return <EmptyGroup />;
  }

  return (
    <div className='main-container flex flex-col gap-12'>
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
  );
}

export default Groups;
