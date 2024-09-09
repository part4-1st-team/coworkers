import BaseButton from '@/components/button/baseButton';

function BoardPage() {
  return (
    <div className='flex justify-center'>
      <BaseButton
        type='button'
        text='생성하기'
        className='w-332 h-32 '
        color='primary'
      />
    </div>
  );
}

export default BoardPage;
