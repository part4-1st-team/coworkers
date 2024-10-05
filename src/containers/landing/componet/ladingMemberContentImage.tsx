import { IconMessage } from '@/assets/IconList';
import LandingMemberContentImgae from '@/assets/images/img_landing_member_content.png';
import Image from 'next/image';

function LadingMemberContentImage() {
  return (
    <div>
      <div className='min-w-343 h-467 tablet:h-354 bg-background-secondary dark:bg-background-secondary-dark border border-border-primary dark:border-border-primary-dark rounded-40 shadow-md '>
        <div className='flex items-start justify-center w-full h-full '>
          <div className='flex flex-col tablet:flex-row gap-40 tablet:gap-100 desktop:gap-193'>
            <Image
              src={LandingMemberContentImgae}
              alt='LandingMemberContentImgae'
              className='w-232  tablet:hidden'
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
              className='w-232 hidden tablet:block'
            />
          </div>
        </div>
      </div>
    </div>
  );
}

export default LadingMemberContentImage;
