import Button from '@/components/button/button';
import Image from 'next/image';
import { useRouter } from 'next/router';

function NotPoundPage() {
  const router = useRouter();

  return (
    <main className='main-container'>
      <div className='flex flex-col w-full h-[90vh] gap-50 items-center justify-center text-center'>
        <div className='flex flex-col tablet:flex-row items-center'>
          <div className='relative size-100 tablet:size-300'>
            <Image src='/svgs/img_todo.svg' alt='얼굴 이미지' fill priority />
          </div>
          <div className='flex flex-col gap-10'>
            <h2 className='text-4xl font-bold text-text-primary dark:text-text-primary-dark'>
              4<span className='text-brand-primary'>0</span>4 ERROR
            </h2>

            <h3 className='text-2xl tablet:text-3xl font-semibold text-text-secondary dark:text-text-secondary-dark'>
              페이지를 찾을 수 없습니다
            </h3>

            <p className='text-text-secondary dark:text-text-secondary-dark text-md tablet:text-2lg font-medium'>
              페이지가 존재하지 않거나, 사용할 수 없는 페이지입니다.
              <br />
              입력하신 주소가 정확한지 다시 한 번 확인해주세요
            </p>
          </div>
        </div>
        <div className='flex flex-col tablet:flex-row gap-10 w-[50%] '>
          <Button
            color='white'
            type='button'
            className='w-full'
            onClick={() => router.back()}
          >
            이전으로
          </Button>
          <Button
            color='primary'
            type='button'
            className='w-full'
            onClick={() => router.replace('/')}
          >
            홈으로
          </Button>
        </div>
      </div>
    </main>
  );
}

export default NotPoundPage;
