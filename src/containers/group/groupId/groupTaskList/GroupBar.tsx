import React from 'react';
import Image from 'next/image';
import MaskGroupBar from '@/assets/images/img_mask_group_bar.png';
import { useRouter } from 'next/router';
import useModalStore from '@/stores/ModalStore';
import { IconSecession } from '@/assets/IconList';
import GroupEditModal from '@/components/modal/GroupEditModal';
import GroupLeaveModal from '@/components/modal/GroupLeaveModal';
import GroupDeleteModal from '@/components/modal/GroupDeleteModal';
import GroupDropDown from './GroupDropDown';

interface Props {
  groupId: number;
  groupName: string;
  isAdmin: boolean;
  children: React.ReactNode;
}

function GroupBar({ groupId, groupName, isAdmin, children }: Props) {
  const router = useRouter();
  const { setModalOpen } = useModalStore();
  const handleGroupClick = () => {
    router.push(`/group/${groupId}`);
  };

  return (
    <div
      className='relative w-full h-64 bg-background-secondary rounded-12 font-medium px-24 border-2 border-border-primary
    dark:bg-background-secondary-dark dark:border-border-primary-dark dark:text-text-primary-dark'
    >
      <div className='relative'>
        <Image
          src={MaskGroupBar}
          height={62}
          alt='팀 컴포넌트 마스크 이미지'
          className='absolute top-0 right-32 object-contain'
        />
      </div>
      <div className='flex h-full items-center justify-between'>
        <button
          type='button'
          onClick={handleGroupClick}
          className='w-fill overflow-hidden text-ellipsis whitespace-nowrap '
          title={typeof children === 'string' ? children : ''}
        >
          {children}
        </button>
        <div className='flex items-center h-64'>
          {isAdmin ? (
            <GroupDropDown
              icon='gear'
              handleEdit={() => {
                setModalOpen(<GroupEditModal />);
              }}
              handleDelete={() => setModalOpen(<GroupDeleteModal />)}
            />
          ) : (
            <button
              type='button'
              aria-label='leave group'
              onClick={() =>
                setModalOpen(<GroupLeaveModal groupName={groupName} />)
              }
            >
              <IconSecession />
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
export default GroupBar;
