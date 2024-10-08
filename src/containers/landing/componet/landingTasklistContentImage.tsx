import { IconSubtract } from '@/assets/IconList';
import LandingTasklistContentImgae from '@/assets/images/img_landing_tasklist_content.png';
import useVisibility from '@/hooks/useVisibility';
import { motion } from 'framer-motion';
import Image from 'next/image';

function LandingTasklistContentImage() {
  const { ref, isVisible } = useVisibility();

  return (
    <motion.div
      ref={ref}
      initial={{ x: -100, opacity: 0 }} // 처음 상태
      animate={isVisible ? { x: 0, opacity: 1 } : {}} // 보일 때 애니메이션 적용
      transition={{ duration: 0.5, ease: 'easeOut' }} // 애니메이션 설정
      className='min-w-343 h-467 tablet:h-354 bg-background-secondary dark:bg-background-secondary-dark border border-border-primary dark:border-border-primary-dark rounded-40 shadow-md '
    >
      <div className='flex items-start justify-center w-full h-full '>
        <div className='flex flex-col tablet:flex-row gap-40 tablet:gap-100 desktop:gap-193'>
          <Image
            src={LandingTasklistContentImgae}
            alt='LandingTasklistContentImgae'
            width={232}
          />
          <div className='flex flex-col gap-16 tablet:mt-126'>
            <div className='flex items-center justify-center w-48 h-48 rounded-12 border border-border-primary dark:border-border-primary-dark border-opacity-10 bg-background-secondary dark:bg-background-secondary-dark'>
              <IconSubtract />
            </div>
            <div className='text-text-primary dark:text-text-primary-dark text-2lg font-normal'>
              <p>할 일도 간편하게</p>
              <p>체크해요</p>
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
}

export default LandingTasklistContentImage;
