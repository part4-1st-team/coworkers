import BaseButton from '@/components/button/baseButton';

function BoardPage() {
  return (
    <div className='flex justify-center'>
      <BaseButton
        type='button'
        color='bgNon'
        className='w-[333px] h-55 '
        text='생성하기'
        disabled
      />
    </div>
  );
}

export default BoardPage;
