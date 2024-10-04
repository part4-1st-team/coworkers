import {
  IconRepairLarge,
  IconRepairMedium,
  IconRepairSmall,
} from '@/assets/IconList';

function LangindTitle() {
  return (
    <div className='min-w-375 flex flex-col items-center gap-4 tablet:gap-8 desktop:gap-20'>
      <div className='flex justify-center items-center gap-4'>
        <div className='text-text-primary dark:text-text-primary-dark text-2xl tablet:text-4xl desktop:48 font-semibold'>
          함께 만들어 가는 투두 리스트
        </div>
        <IconRepairSmall className='block tablet:hidden' />
        <IconRepairMedium className='hidden tablet:block desktop:hidden' />
        <IconRepairLarge className='hidden desktop:block' />
      </div>
      <div className='flex items-center w-161 tablet:w-242 desktop:w-322 desktop:h-76 bg-gradient-to-r from-brand-primary to-brand-tertiary text-transparent bg-clip-text text-3xl tablet:text-48 desktop:text-64 font-semibold'>
        Coworkers
      </div>
    </div>
  );
}

export default LangindTitle;
