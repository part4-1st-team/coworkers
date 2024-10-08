import { IconMessage } from '@/assets/IconList';
import LandingMemberContentImgae from '@/assets/images/img_landing_member_content.png';
import useVisibility from '@/hooks/useVisibility';
import { motion } from 'framer-motion';
import Image from 'next/image';

function LadingMemberContentImage() {
  const { ref, isVisible } = useVisibility();

  return (
    <motion.div
      ref={ref}
      initial={{ x: 100, opacity: 0 }} // 처음 상태
      animate={isVisible ? { x: 0, opacity: 1 } : {}} // 보일 때 애니메이션 적용
      transition={{ duration: 0.5, ease: 'easeOut' }} // 애니메이션 설정
      className='min-w-343 h-467 tablet:h-354 bg-background-secondary dark:bg-background-secondary-dark border border-border-primary dark:border-border-primary-dark rounded-40 shadow-md '
    >
      <div className='flex items-start justify-center w-full h-full '>
        <div className='flex flex-col tablet:flex-row gap-40 tablet:gap-100 desktop:gap-193'>
          <Image
            src={LandingMemberContentImgae}
            alt='LandingMemberContentImgae'
            className='tablet:hidden'
            width={232}
          />
          <div className='flex flex-col gap-16 tablet:mt-126'>
            <div className='flex items-center justify-center w-48 h-48 rounded-12 border border-border-primary dark:border-border-primary-dark border-opacity-10 bg-background-secondary dark:bg-background-secondary-dark'>
              <IconMessage />
            </div>
            <div className='text-text-primary dark:text-text-primary-dark text-2lg font-normal'>
              <p>간단하게 멤버들을</p>
              <p>초대해요</p>
            </div>
          </div>
          <Image
            src={LandingMemberContentImgae}
            alt='LandingMemberContentImgae'
            className='hidden tablet:block'
            width={232}
          />
        </div>
      </div>
    </motion.div>
  );
}

export default LadingMemberContentImage;
