import Button from '@/components/button/button';
import BoxInput from '@/components/input/boxInput';

function AddComment() {
  return (
    <div className='mt-80 flex flex-col gap-16 tablet:gap-24'>
      <p className='text-lg font-medium tablet:text-xl  tablet:font-bold text-text-primary'>
        댓글달기
      </p>
      <BoxInput placeholder='댓글을 입력해주세요.' />
      <div className='flex justify-end'>
        <Button
          type='button'
          color='primary'
          className='w-74 h-32 tablet:w-184 tablet:h-48'
        >
          등록
        </Button>
      </div>
    </div>
  );
}

export default AddComment;
