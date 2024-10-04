function LandingFooter() {
  return (
    <footer className='w-full mt-30 bg-background-secondary dark:bg-background-secondary-dark text-text-primary dark:text-text-primary-dark py-16'>
      <div className='flex flex-col gap-20 mx-80'>
        <div className='mb-4 tablet:mb-0'>
          <p className='text-sm'>
            &copy; 2024 SPRINT 1 TIM. All rights reserved.
          </p>
        </div>
        <div className='flex space-x-4 justify-between'>
          <p className='text-sm hover:text-brand-primary'>Privacy Policy</p>
          <p className='text-sm hover:text-brand-primary'>Terms of Service</p>
          <p className='text-sm hover:text-brand-primary'>Contact Us</p>
        </div>
      </div>
    </footer>
  );
}

export default LandingFooter;
