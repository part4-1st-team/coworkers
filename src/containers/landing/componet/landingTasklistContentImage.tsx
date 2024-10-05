import { IconSubtract } from '@/assets/IconList';
import LandingTasklistContentImgae from '@/assets/images/img_landing_tasklist_content.png';
import Image from 'next/image';

function LandingTasklistContentImage() {
  return (
    <div>
      <div className='min-w-343 h-467 tablet:h-354 bg-background-tertiary dark:bg-background-tertiary-dark border border-border-primary dark:border-border-primary-dark rounded-40 shadow-md '>
        <div className='flex items-start justify-center w-full h-full '>
          <div className='flex flex-col tablet:flex-row gap-40 tablet:gap-100 desktop:gap-193'>
            <Image
              src={LandingTasklistContentImgae}
              alt='LandingTasklistContentImgae'
              className='w-232 '
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
      </div>
    </div>
  );
}

export default LandingTasklistContentImage;
