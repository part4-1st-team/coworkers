import { useRouter } from 'next/router';
import useUserStore from '@/stores/userStore';
import LangindTitle from '@/containers/landing/componet/landingTitle';
import LangindMainImage from '@/containers/landing/componet/landingmainImg';

function LandingTiteleContent() {
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
    <div className='flex flex-col items-center justify-between h-640 tablet:h-940 desktop:h-1080 '>
      <div className='absolute'>
        <LangindMainImage size='small' />
        <LangindMainImage size='medium' />
        <LangindMainImage size='large' />
      </div>
      <div className='flex flex-col items-center px-16 pt-55 gap-421 tablet:gap-460 desktop:gap-675'>
        <LangindTitle />
      </div>
      <div className='flex flex-col items-center mb-40 tablet:mb-119 z-50 desktop:mb-120'>
        <button
          className='bg-gradient-to-r from-brand-primary to-brand-tertiary rounded-full w-343 px-13 py-14 text-lg font-semibold hover:bg-gradient-to-r hover:from-brand-tertiary hover:to-brand-primary hover:text-text-secondary-dark'
          type='button'
          onClick={() => {
            handleButtonClick();
          }}
        >
          지금시작하기
        </button>
      </div>
    </div>
  );
}

export default LandingTiteleContent;
