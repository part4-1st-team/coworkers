import LandingMainImageSmall from '@/assets/images/img_landing_main_small.png';
import LandingMainImageMedium from '@/assets/images/img_landing_main_medium.png';
import LandingMainImageLarge from '@/assets/images/img_landing_main_large.png';

import Image from 'next/image';

interface LangindMainImageProps {
  size: 'small' | 'medium' | 'large';
}

function LangindMainImage({ size }: LangindMainImageProps) {
  return (
    <>
      {size === 'large' && (
        <div className='hidden desktop:block h-1080 overflow-hidden'>
          <Image
            src={LandingMainImageLarge}
            alt='Landing Large'
            className='w-full h-full object-cover'
          />
        </div>
      )}
      {size === 'medium' && (
        <div className='hidden tablet:block desktop:hidden h-940 overflow-hidden '>
          <Image
            src={LandingMainImageMedium}
            alt='Landing Medium'
            className='w-full h-full object-cover'
          />
        </div>
      )}
      {size === 'small' && (
        <div className='block tablet:hidden h-640 overflow-hidden'>
          <Image
            src={LandingMainImageSmall}
            alt='Landing Small'
            className='w-full h-full object-cover object-center mx-auto'
          />
        </div>
      )}
    </>
  );
}

export default LangindMainImage;
