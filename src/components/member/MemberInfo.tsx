import React from 'react';
import useModalStore from '@/stores/ModalStore';
import ProfileModal from '../modal/ProfileModal';
import ProfileImage from './ProfileImage';
import CrownIcon from '../icon/Crown';
import GroupMemberRemoveModal from '../modal/GroupMemberRemoveModal';
import { IconUserExport } from '@/assets/IconList';

function MemberInfo({
  member,
  isAdmin,
}: {
  member: IMember;
  isAdmin?: boolean;
}) {
  const { setModalOpen } = useModalStore();
  const { role, userName, userEmail, userImage } = member;

  return (
    <div className='flex items-center justify-between w-fill h-73 rounded-16 px-24 py-20 shadow-md before:bg-background-secondary dark:bg-background-secondary-dark'>
      <button
        type='button'
        onClick={() => setModalOpen(<ProfileModal member={member} />)}
        className='flex items-center gap-12 w-full h-full'
      >
        <ProfileImage userImage={userImage} size={32} />
        <div className='flex flex-col items-start justify-center w-fill h-33 gap-2'>
          <b className='relative flex items-center gap-4 text-text-primary dark:text-text-primary-dark text-md'>
            {userName}
            {role === 'ADMIN' && <CrownIcon />}
          </b>
          <p className='hidden tablet:inline-block text-text-default dark:text-text-default-dark text-xs'>
            {userEmail}
          </p>
        </div>
      </button>

      {isAdmin && role === 'MEMBER' && (
        <button
          type='button'
          aria-label='그룹에서 내보내기 모달'
          onClick={() =>
            setModalOpen(
              <GroupMemberRemoveModal
                userId={member.userId}
                userName={member.userName}
              />,
            )
          }
        >
          <IconUserExport className='size-24 fill-icon-primary' />
        </button>
      )}
    </div>
  );
}

export default MemberInfo;
