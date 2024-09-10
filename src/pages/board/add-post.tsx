import Button from '@/components/button/button';
import Input from '@/components/input/input';
import BoxInput from '@/components/input/boxInput';
import { IconPlus } from '@/assets/IconList';

function AddPostPage() {
  return (
    <div className='mt-40 min-w-343 h-auto tablet:mt-56 mx-16 tablet:mx-24 desktop:w-1200 desktop:mx-auto relative'>
      <div className='flex items-center justify-between'>
        <p className='text-lg font-medium tablet:text-xl tablet:font-bold text-text-primary'>
          게시글 쓰기
        </p>
        <div className='hidden tablet:block'>
          <Button
            type='button'
            color='primary'
            size='lg'
            className=' w-184 h-48'
          >
            등록
          </Button>
        </div>
      </div>

      <div className='mt-32  w-full border-t border-border-primary' />

      <div className='flex flex-col mt-24 tablet:mt-40  '>
        <div className='flex gap-6 mb-16'>
          <p className='text-brand-tertiary'>*</p>
          <p className='text-md tablet:text-lg font-medium text-text-primary'>
            제목
          </p>
        </div>
        <Input placeholder='제목을 입력해 주세요.' className='h-48 ' />
        <div className='flex gap-6 mb-16 mt-32 tablet:mt-40'>
          <p className='text-brand-tertiary'>*</p>
          <p className='text-md tablet:text-lg font-medium text-text-primary'>
            내용
          </p>
        </div>
        <BoxInput placeholder='내용을 입력해 주세요.' className='h-240 ' />

        <p className='mb-16 text-md mt-32 tablet:mt-40 tablet:text-lg font-medium text-text-primary'>
          이미지
        </p>
        <div className='w-160 h-160 tablet:w-240 tablet:h-240  flex flex-col items-center gap-14 justify-center bg-background-secondary rounded-12 border border-border-primary hover:border-interaction-hover  focus:border-interaction-focus 0'>
          <IconPlus width={48} height={48} />
          <p className='text-text-default text-lg'>이미지 등록</p>
        </div>
        <div className='block tablet:hidden mt-32 '>
          <Button
            type='button'
            color='primary'
            size='lg'
            className='w-full h-48'
          >
            등록
          </Button>
        </div>
      </div>
    </div>
  );
}

export default AddPostPage;
