import LandingBottomImageLarge from '@/assets/images/img_landing_bottom_large.png';
import LandingBottomImageMedium from '@/assets/images/img_landing_bottom_medium.png';
import LandingBottomImageSmall from '@/assets/images/img_landing_bottom_small.png';

import Image from 'next/image';

interface LangindMainImageProps {
  size: 'small' | 'medium' | 'large';
}

function LangindBottomImage({ size }: LangindMainImageProps) {
  return (
    <>
      {size === 'large' && (
        <div className='hidden desktop:block h-1080 overflow-hidden'>
          <Image
            src={LandingBottomImageLarge}
            alt='Landing Large'
            className='w-full h-full object-cover'
          />
        </div>
      )}
      {size === 'medium' && (
        <div className='hidden tablet:block desktop:hidden h-940 overflow-hidden '>
          <Image
            src={LandingBottomImageMedium}
            alt='Landing Medium'
            className='w-full h-full object-cover'
          />
        </div>
      )}
      {size === 'small' && (
        <div className='block tablet:hidden h-640 overflow-hidden'>
          <Image
            src={LandingBottomImageSmall}
            alt='Landing Small'
            className='w-full h-full object-cover object-center mx-auto'
          />
        </div>
      )}
    </>
  );
}

export default LangindBottomImage;
