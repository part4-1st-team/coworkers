import React from 'react';
import Image from 'next/image';

function MemberInfo() {
  const defaultProfile: string = '/svgs/ic_member.svg';
  const verticalEllipsis: string = '/svgs/ic_verticalEllipsis.svg';

  return (
    <div className='flex justify-between items-center w-[384px] h-[73px] rounded-[16px] px-[24px] py-[20px]'>
      <div className='flex flex-start gap-[12px]'>
        <Image
          src={defaultProfile}
          alt='프로필 이미지'
          width={32}
          height={32}
        />
        <div className='flex flex-col'>
          <b className='text-text-primary text-[14px]'>우지은</b>
          <p className='text-text-default text-[12px]'>Email</p>
        </div>
      </div>
      <button type='button'>
        <Image
          src={verticalEllipsis}
          alt='verticalEllipsis(수직 줄임표)'
          width={2}
          height={8}
        />
      </button>
    </div>
  );
}

export default MemberInfo;
