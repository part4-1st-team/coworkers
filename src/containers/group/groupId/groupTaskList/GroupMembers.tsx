import { useEffect, useState } from 'react';
import MemberInfo from '@/components/member/MemberInfo';
import { IconArrowLeft, IconArrowRight } from '@/assets/IconList';
import MemberInviteButton from './MemberInviteButton';
import clsx from 'clsx';
import useUserStore from '@/stores/userStore';

interface GroupMembersProps {
  Members: Member[];
  groupId: number;
}

function GroupMembers({ Members, groupId }: GroupMembersProps) {
  const memberCount = Members.length;
  const [currentPage, setCurrentPage] = useState(0);
  const pageSize = 6;
  const totalPages = Math.ceil(Members.length / pageSize);
  const { user } = useUserStore();
  const [isAdmin, setIsAdmin] = useState<boolean>(false);

  const handlePrevPage = () => {
    setCurrentPage((prev) => Math.max(prev - 1, 0));
  };

  const handleNextPage = () => {
    setCurrentPage((prev) => Math.min(prev + 1, totalPages - 1));
  };

  const paginatedLists = Members.slice(
    currentPage * pageSize,
    (currentPage + 1) * pageSize,
  );

  useEffect(() => {
    const currentUser = Members.find(
      (member) => member.userId === user?.id && member.role === 'ADMIN',
    );
    setIsAdmin(!!currentUser);
  }, [Members, user]);

  return (
    <section className='w-full mt-64'>
      <div className='w-full flex justify-between'>
        <div className='flex gap-8 items-center'>
          <p>멤버</p>
          <p className='text-text-default'>({memberCount}명)</p>
          {totalPages > 1 && (
            <>
              <button
                className={clsx(
                  currentPage === 0
                    ? 'opacity-50 cursor-default'
                    : 'cursor-pointer ',
                )}
                type='button'
                onClick={handlePrevPage}
                aria-label='이전 페이지로 이동'
              >
                <IconArrowLeft className='size-12' />
              </button>
              <button
                className={clsx(
                  'cursor-pointer',
                  currentPage === totalPages - 1
                    ? 'opacity-50 cursor-default '
                    : 'cursor-pointer ',
                )}
                onClick={handleNextPage}
                type='button'
                aria-label='다음 페이지로 이동'
              >
                <IconArrowRight className='size-12' />
              </button>
            </>
          )}
        </div>
        <MemberInviteButton groupId={groupId} />
      </div>
      <section className='mt-24 grid grid-cols-2 tablet:grid-cols-3 gap-24'>
        {paginatedLists.map((item) => (
          <MemberInfo member={item} key={item.userId} isAdmin={isAdmin} />
        ))}
      </section>
    </section>
  );
}

export default GroupMembers;
