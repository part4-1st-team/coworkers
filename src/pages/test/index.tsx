import BaseButton from '@/components/button/baseButton';
import FloatingButton from '@/components/button/floatingButton';
import CircleButton from '@/components/button/CircleButton';
import { IconArrowLeft } from '@/assets/IconList';

function BoardPage() {
  return (
    <div className='flex items-center flex-col justify-center'>
      <BaseButton
        type='button'
        color='bgNon'
        className='w-[333px] h-55 '
        text='생성하기'
        disabled
      />

      <FloatingButton
        color='outlined'
        icon='checkGreen'
        text='완료 취소하기'
        className='w-200 h-30 '
      />

      <FloatingButton
        color='outlined'
        icon='checkGreen'
        text='완료 취소하기'
        disabled
        className='w-200 h-30 '
      />
      <FloatingButton
        color='primary'
        icon='checkWhite'
        text='완료하기'
        disabled
        className='w-200 h-30 '
      />
      <FloatingButton
        color='primary'
        icon='checkWhite'
        text='완료하기'
        className='w-200 h-30 '
      />
      <CircleButton text='아' className='w-50 h-50' />
    </div>
  );
}

export default BoardPage;
