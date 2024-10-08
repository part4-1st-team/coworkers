import LandingContentImage from '@/containers/landing/landingContentImage/landingContentImage';
import LandingFooter from '@/containers/landing/landingFooter/landingFooter';

import LandingTitle from '@/containers/landing/componet/landingTitle';
import { motion } from 'framer-motion';
import { twMerge } from 'tailwind-merge';
import clsx from 'clsx';
import LandingTitleContent from '@/containers/landing/landingTitleContent/landingTitleContent';
import LandingBottomContent from '@/containers/landing/landingBottom/landingBottomContent';

export default function Home() {
  return (
    <main className='mt-60'>
      <LandingTitleContent />

      <section className='w-full m-0  desktop:w-996 desktop:mx-auto'>
        <LandingContentImage />
      </section>
      <LandingBottomContent />

      <LandingFooter />
    </main>
  );
}
