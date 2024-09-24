import React from 'react';
import Image from 'next/image';
import MaskGroupBar from '@/assets/images/img_mask_group_bar.png';
import { useRouter } from 'next/router';
import useModalStore from '@/stores/ModalStore';
import { IconSecession } from '@/assets/IconList';
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

  return (
    // TODO bg 색상 변경 (slate-50 안 먹힘ㅠ)
    <div className='w-full h-64 bg-white bg-opacity-10 rounded-12 font-medium px-24 border border-border-primary'>
      <div className='flex items-center justify-between'>
        {children}
        {/* TODO 마스크 이미지 z인덱스 설정(글자 뒤로) */}
        <div className='flex items-center gap-32'>
          <Image src={MaskGroupBar} alt='팀 컴포넌트 마스크 이미지' />
          {isAdmin ? (
            <GroupDropDown
              icon='gear'
              handleEdit={() => {
                router.push(`/group/${groupId}/edit`);
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
