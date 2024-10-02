import { IconX } from '@/assets/IconList';
import useGroups from '@/hooks/useGroups';
import useMemberships from '@/hooks/useMemberships';
import { useRouter } from 'next/router';
import useDetectClose from '@/hooks/useDetectClose';
import Link from 'next/link';
import CrownIcon from '../icon/Crown';

function SideMenu({ onClose }: { onClose: () => void }) {
  const { memberships } = useMemberships();
  const { groups, isGroupsLoading } = useGroups();
  const router = useRouter();
  const { groupId } = router.query;

  let currentGroup: ResponseGroup | undefined;
  if (router.pathname === '/group/[groupId]') {
    const filterGroup = groups.filter((group) => group.id === Number(groupId));
    [currentGroup] = filterGroup;
  }

  const ref = useDetectClose(onClose);

  if (isGroupsLoading) return null;

  return (
    <div
      ref={ref}
      className='side-menu w-270 inset-y-0 left-0 p-16 bg-background-secondary dark:bg-background-secondary-dark z-modal fixed'
    >
      <div className='flex flex-col gap-8 items-center'>
        <div className='w-full flex flex-row-reverse mb-35'>
          <button type='button' onClick={onClose} aria-label='close button'>
            <IconX className='w-24 h-24' />
          </button>
        </div>
        {memberships.map((membership: Membership) => (
          <Link
            key={membership.groupId}
            href={`/group/${membership.groupId}`}
            onClick={() => {
              onClose();
            }}
            className='w-248 h-45 flex items-center py-7 px-8 hover:bg-background-primary dark:hover:bg-background-tertiary-dark rounded-8'
          >
            {String(groupId) === String(membership.groupId) && (
              <div className='absolute size-8 rounded-full bg-brand-primary' />
            )}
            <div className='pl-14 flex items-center gap-6'>
              <span className='truncate max-w-150'>
                {membership.group.name}
              </span>
              {membership.role === 'ADMIN' && <CrownIcon />}
            </div>
          </Link>
        ))}
        <Link
          href='/board'
          onClick={() => {
            onClose();
          }}
          className='w-248 h-45 flex items-center py-6 px-8 hover:bg-background-primary dark:hover:bg-background-tertiary-dark rounded-8'
        >
          {router.pathname === '/board' && (
            <div className='absolute size-8 rounded-full bg-brand-primary' />
          )}
          <span className='pl-14'>자유게시판</span>
        </Link>
      </div>
    </div>
  );
}

export default SideMenu;
