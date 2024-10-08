import LandingContentImage from '@/containers/landing/landingContentImage/landingContentImage';
import LandingFooter from '@/containers/landing/landingFooter/landingFooter';
import { useRouter } from 'next/router';
import useUserStore from '@/stores/userStore';
import LandingTitle from '@/containers/landing/componet/landingTitle';
import { motion } from 'framer-motion';
import { twMerge } from 'tailwind-merge';

export default function Home() {
  const router = useRouter();
  const { isLoggedIn } = useUserStore();

  const handleButtonClick = () => {
    if (isLoggedIn) {
      router.push('/group/create-group');
    } else {
      router.push('/auth/signup');
    }
  };

  return (
    <main className='mt-60'>
      <motion.section
        initial={{ y: -100, opacity: 0 }} // 처음 상태 (위로 100px, 투명)
        animate={{ y: 0, opacity: 1 }} // 끝 상태 (원래 위치, 불투명)
        transition={{
          delay: 0.3, // 애니메이션 시작 지연 시간 (0.3초 후 시작)
          duration: 1, // 애니메이션이 1초 동안 진행
          ease: 'easeOut', // 부드러운 가속도 설정
        }}
        className={twMerge(
          'w-full h-640 tablet:h-940 desktop:h-1080 pt-84 pb-120 flex flex-col justify-between items-center',
          `bg-[url('/images/img_landing_main_small.png')] bg-no-repeat bg-center`,
          `tablet:bg-[url('/images/img_landing_main_medium.png')]`,
          `desktop:bg-[url('/images/img_landing_main_large.png')]`,
          'bg-cover',
        )}
      >
        <LandingTitle />
        <button
          className='bg-gradient-to-r from-brand-primary to-brand-tertiary rounded-full text-text-primary-dark w-343 px-13 py-14 text-lg font-semibold hover:bg-gradient-to-r hover:from-brand-tertiary hover:to-brand-primary hover:text-text-secondary-dark'
          type='button'
          onClick={() => {
            handleButtonClick();
          }}
        >
          지금시작하기
        </button>
      </motion.section>

      <section className='w-full m-0  desktop:w-996 desktop:mx-auto'>
        <LandingContentImage />
      </section>

      <section
        className={twMerge(
          'w-full h-640 tablet:h-940 desktop:h-1080 pt-123 tablet:pt-176 desktop:pt-230',
          `bg-[url('/images/img_landing_bottom_small.png')] bg-cover bg-no-repeat bg-[center_bottom]`,
          `tablet:bg-[url('/images/img_landing_bottom_medium.png')]`,
          `desktop:bg-[url('/images/img_landing_bottom_large.png')]`,
        )}
      >
        <div className='flex flex-col gap-16 items-center text-text-primary dark:text-text-primary-dark'>
          <p className='text-2xl tablet:text-4xl font-semibold  '>
            지금 바로 시작해보세요
          </p>
          <div className='flex flex-col items-center tablet:hidden'>
            <p>팀원 모두와 같은 방향,</p>
            <p>같은 속도로 나아가는 가장 쉬운 방법</p>
          </div>
          <p className='hidden tablet:block text-2xl'>
            팀원 모두와 같은 방향, 같은 속도로 나아가는 가장 쉬운 방법
          </p>
        </div>
      </section>
      <LandingFooter />
    </main>
  );
}
