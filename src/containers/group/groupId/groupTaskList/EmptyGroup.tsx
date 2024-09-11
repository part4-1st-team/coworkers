import Image from 'next/image';

import Button from '@/components/button/button';
import GroupImg from '@/assets/images/img_group.png';

function EmptyGroup() {
  return (
    <div className='w-312 tablet:w-520 desktop:w-810 text-14 font-md text-text-default flex flex-col items-center m-auto mt-180'>
      <Image src={GroupImg} alt='group page image' />
      <div className='mt-32 tablet:mt-48 flex flex-col items-center '>
        <p>아직 소속된 팀이 없습니다.</p>
        <p>팀을 생성하거나 팀에 참여해보세요.</p>
      </div>
      <div className='w-186 mt-40 tablet:mt-80 flex flex-col gap-8'>
        <Button type='button' color='primary' className='w-full'>
          팀 생성하기
        </Button>
        <Button type='button' color='outline' className='w-full'>
          팀 참여하기
        </Button>
      </div>
    </div>
  );
}

export default EmptyGroup;
