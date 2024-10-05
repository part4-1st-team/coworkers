import { useTheme } from '@/hooks/useThemeContext';
import LandingTiteleContent from '@/containers/landing/landingTitleContent/landingTitleContent';
import LandingContentImage from '@/containers/landing/landingContentImage/landingContentImage';
import LandingBottomContent from '@/containers/landing/landingBottom/landingBottomContente';
import LandingFooter from '@/containers/landing/landingFooter/landingFooter';

export default function Home() {
  const { switchTheme } = useTheme();
  return (
    <main className='main-container mt-60 mb-0  px-0 min-w-375 text-text-primary dark:text-text-primary-dark relative '>
      <button
        className='bg-brand-primary rounded-12 w-80 h-30 absolute top-20 left-20 z-10 '
        type='button'
        onClick={switchTheme}
      >
        테마 전환
      </button>
      <LandingTiteleContent />
      <LandingContentImage />
      <LandingBottomContent />
      <LandingFooter />
    </main>
  );
}
