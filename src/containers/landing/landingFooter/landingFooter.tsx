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
          <a
            href='/privacy-policy'
            className='text-sm hover:text-brand-primary hover:cursor-pointer'
          >
            Privacy Policy
          </a>
          <a
            href='/terms-of-service'
            className='text-sm hover:text-brand-primary hover:cursor-pointer'
          >
            Terms of Service
          </a>
          <a
            href='/contact-us'
            className='text-sm hover:text-brand-primary hover:cursor-pointer'
          >
            Contact Us
          </a>
        </div>
      </div>
    </footer>
  );
}

export default LandingFooter;
