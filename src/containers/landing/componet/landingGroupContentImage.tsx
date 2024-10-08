import { IconFolder } from '@/assets/IconList';
import LandingGroupContent from '@/assets/images/img_landing_group_content.png';
import useVisibility from '@/hooks/useVisibility';
import { motion } from 'framer-motion';
import Image from 'next/image';

function LandingGroupContentImage() {
  const { ref, isVisible } = useVisibility();
  return (
    <motion.div
      ref={ref}
      initial={{ x: -100, opacity: 0 }} // 처음 상태
      animate={isVisible ? { x: 0, opacity: 1 } : {}} // 보일 때 애니메이션 적용
      transition={{ duration: 0.5, ease: 'easeOut' }} // 애니메이션 설정
      className='min-w-343 h-467 tablet:h-354 p-1 bg-gradient-to-r from-brand-primary to-brand-tertiary rounded-40 backdrop-blur-lg'
      style={{ boxShadow: '0px 0px 12px 2px #FFFFFF40' }}
    >
      <div className='flex items-end justify-center w-full h-full bg-background-primary dark:bg-background-primary-dark rounded-40 shadow-md'>
        <div className='flex flex-col tablet:flex-row gap-40 tablet:gap-100 desktop:gap-193'>
          <Image
            src={LandingGroupContent}
            alt='LandingGroupContent'
            className='w-232 hidden tablet:block'
          />
          <div className='flex flex-col gap-16 tablet:mt-43'>
            <div className='flex items-center justify-center w-48 h-48 rounded-12 border border-border-primary dark:border-border-primary-dark border-opacity-10 bg-background-secondary dark:bg-background-secondary-dark'>
              <IconFolder />
            </div>
            <div className='text-text-primary dark:text-text-primary-dark text-2lg font-normal'>
              <p> 그룹으로</p>
              <p>할 일을 관리해요</p>
            </div>
          </div>
          <Image
            src={LandingGroupContent}
            alt='LandingGroupContent'
            className='w-232 tablet:hidden'
          />
        </div>
      </div>
    </motion.div>
  );
}

export default LandingGroupContentImage;
