import { IconCheck } from '@/assets/IconList';
import Button from '@/components/button/button';
import Dropdown from '@/components/dropdown/Dropdown';
import useDropdown from '@/hooks/useDropdown';
import { useRouter } from 'next/router';
import SideTabList from './SideTabList';

function HeaderGroupDropdown({
  memberships,
  groups,
}: {
  memberships: Membership[];
  groups: ResponseGroup[];
}) {
  const { handleOffDropdown, handleToggleDropdown, isOpen } = useDropdown();
  const router = useRouter();
  const { groupId } = router.query;

  let currentGroup: ResponseGroup | undefined;
  if (router.pathname === '/group/[groupId]') {
    const filterGroup = groups.filter((group) => group.id === Number(groupId));
    [currentGroup] = filterGroup;
  }

  const getGroupName = () => {
    if (router.pathname !== '/group/[groupId]') {
      return '팀 선택하기';
    }
    if (currentGroup) {
      return currentGroup.name;
    }
    return '팀 선택하기';
  };

  return (
    <Dropdown onClose={handleOffDropdown}>
      <Dropdown.Trigger onClick={handleToggleDropdown}>
        <div className='flex items-center gap-11'>
          <p className='text-lg font-medium text-text-primary dark:text-text-primary-dark truncate max-w-110'>
            {getGroupName()}
          </p>
          <IconCheck className='fill-text-inverse' />
        </div>
      </Dropdown.Trigger>
      <Dropdown.Menu isOpen={isOpen}>
        {groups.map((group: ResponseGroup) => {
          const membership = memberships.find(
            (membership: Membership) =>
              membership.groupId === group.id && membership.role === 'ADMIN',
          );
          const isOwner = !!membership;

          return (
            <SideTabList
              onClick={handleOffDropdown}
              key={group.id}
              group={group}
              OWNER={isOwner}
            />
          );
        })}
        <Button
          color='white'
          type='button'
          className='w-186'
          onClick={() => {
            handleOffDropdown();
            router.push('/group/create-group');
          }}
        >
          팀 추가하기
        </Button>
      </Dropdown.Menu>
    </Dropdown>
  );
}

export default HeaderGroupDropdown;
