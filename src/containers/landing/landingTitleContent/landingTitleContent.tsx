import { useRouter } from 'next/router';
import useUserStore from '@/stores/userStore';
import LandingTitle from '@/containers/landing/componet/landingTitle';
import LandingMainImage from '@/containers/landing/componet/landingmainImg';
import { motion } from 'framer-motion';
import useVisibility from '@/hooks/useVisibility';

function LandingTitleContent() {
  const router = useRouter();
  const { isLoggedIn } = useUserStore();

  const { ref, isVisible } = useVisibility();

  const handleButtonClick = () => {
    if (isLoggedIn) {
      router.push('/group/create-group');
    } else {
      router.push('/auth/signup');
    }
  };

  return (
    <motion.div
      ref={ref}
      initial={{ y: -100, opacity: 0 }} // 처음 상태 (위로 100px, 투명)
      animate={isVisible ? { y: 0, opacity: 1 } : {}}
      transition={{
        delay: 0.3, // 애니메이션 시작 지연 시간 (0.3초 후 시작)
        duration: 1, // 애니메이션이 1초 동안 진행
        ease: 'easeOut', // 부드러운 가속도 설정
      }}
      className='flex flex-col items-center justify-between h-640 tablet:h-940 desktop:h-1080 '
    >
      <div className='absolute'>
        <LandingMainImage size='small' />
        <LandingMainImage size='medium' />
        <LandingMainImage size='large' />
      </div>
      <div className='flex flex-col items-center px-16 pt-55 gap-421 tablet:gap-460 desktop:gap-675'>
        <LandingTitle />
      </div>
      <div className='flex flex-col items-center mb-40 tablet:mb-119 z-50 desktop:mb-120'>
        <button
          className='bg-gradient-to-r from-brand-primary to-brand-tertiary rounded-full w-343 px-13 py-14 text-lg font-semibold hover:bg-gradient-to-r hover:from-brand-tertiary hover:to-brand-primary hover:text-text-secondary-dark'
          type='button'
          onClick={() => {
            handleButtonClick();
          }}
        >
          지금 시작하기
        </button>
      </div>
    </motion.div>
  );
}

export default LandingTitleContent;
