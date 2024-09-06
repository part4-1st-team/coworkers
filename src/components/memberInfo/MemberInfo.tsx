import React from 'react';
import { ReactSVG } from 'react-svg';

function MemberInfo() {
  return (
    <div className='w-[200px] h-[200px]'>
      <ReactSVG src='/assets/icons/ic_user.svg' />
      프로필 정보
    </div>
  );
}

export default MemberInfo;
