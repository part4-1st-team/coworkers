import useVisibility from '@/hooks/useVisibility';
import { motion } from 'framer-motion';
import LangindBottomImage from '../componet/landingBottomImg';

function LandingBottomContent() {
  const { ref, isVisible } = useVisibility();
  return (
    <motion.div
      initial={{ y: 100, opacity: 0 }} // 처음 상태 (위로 100px, 투명)
      animate={isVisible ? { y: 0, opacity: 1 } : {}}
      transition={{
        delay: 0.3, // 애니메이션 시작 지연 시간 (0.3초 후 시작)
        duration: 1, // 애니메이션이 1초 동안 진행
        ease: 'easeOut', // 부드러운 가속도 설정
      }}
      className='h-640 tablet:h-940 desktop:h-1080 relative flex justify-center'
      ref={ref}
    >
      <div className='flex flex-col gap-16 items-center mt-123 tablet:mt-176 desktop:mt-230 text-text-primary dark:text-text-primary-dark'>
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

      <div className='absolute'>
        <LangindBottomImage size='small' />
        <LangindBottomImage size='medium' />
        <LangindBottomImage size='large' />
      </div>
    </motion.div>
  );
}

export default LandingBottomContent;
