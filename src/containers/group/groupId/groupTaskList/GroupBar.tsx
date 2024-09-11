import React from 'react';
import Image from 'next/image';
import { IconGear } from '@/assets/IconList';
import MaskGroupBar from '@/assets/images/img_mask_group_bar.png';
import Dropdown from '@/components/dropdown/Dropdown';
import GroupDropDown from './GroupDropDown';

interface Props {
  children: React.ReactNode;
}

function GroupBar({ children }: Props) {
  return (
    // TODO bg 색상 변경 (slate-50 안 먹힘ㅠ)
    <section className='w-full h-64 bg-white bg-opacity-10 rounded-12 font-medium px-24 border border-border-primary'>
      <div className='flex items-center justify-between'>
        {children}
        {/* TODO 마스크 이미지 z인덱스 설정(글자 뒤로) */}
        <div className='flex items-center gap-32'>
          <Image src={MaskGroupBar} alt='팀 컴포넌트 마스크 이미지' />
          {/* TODO 설정 드롭다운 구현 */}
          <button
            type='button'
            aria-label='팀 수정하기, 삭제하기 드롭다운 버튼'
          >
            <GroupDropDown icon='gear' />
          </button>
        </div>
      </div>
    </section>
  );
}

export default GroupBar;
