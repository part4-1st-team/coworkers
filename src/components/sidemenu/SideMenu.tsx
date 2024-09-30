import { IconX } from '@/assets/IconList';
import useGroups from '@/hooks/useGroups';
import useMemberships from '@/hooks/useMemberships';
import { useRouter } from 'next/router';
import { useEffect } from 'react';
import Link from 'next/link';
import SideTabList from '../header/SideTabList';

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

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      const menu = document.querySelector('.side-menu');
      if (menu && !menu.contains(event.target as Node)) {
        onClose();
      }
    };

    document.addEventListener('mousedown', handleClickOutside);

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [onClose]);

  if (isGroupsLoading) return null;

  return (
    <div className='side-menu w-270 inset-y-0 left-0 p-16 bg-background-secondary z-modal fixed'>
      <div className='flex flex-col gap-8 items-center'>
        <div className='w-full flex flex-row-reverse mb-35'>
          <button type='button' onClick={onClose} aria-label='close button'>
            <IconX className='w-24 h-24' />
          </button>
        </div>
        {memberships.map((membership: Membership) => (
          <SideTabList
            onClick={() => {
              onClose();
            }}
            key={membership.group.id}
            size='side'
            membership={membership}
          />
        ))}
        <Link
          href='/board'
          onClick={() => {
            onClose();
          }}
          className='w-248 h-45 flex items-center justify-between py-7 px-8 hover:bg-slate-700 rounded-8'
        >
          자유게시판
        </Link>
      </div>
    </div>
  );
}

export default SideMenu;
