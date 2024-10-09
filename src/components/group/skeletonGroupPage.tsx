function SkeletonGroupPage() {
  return (
    <div className='main-container'>
      <div
        className='w-full h-64 bg-background-secondary rounded-12 border-2 border-border-primary
    dark:bg-background-secondary-dark dark:border-border-primary-dark skeleton'
      />
      <div className='w-full desktop:flex flex-row-reverse gap-[2%]'>
        <div className='desktop:w-[49%] mt-24 desktop:mt-48'>
          <p className='mb-16'>할 일 목록</p>
          <div className='flex flex-col gap-8 desktop:gap-16'>
            <div
              className='relative shadow-md w-full h-40 rounded-12 bg-background-secondary flex
      dark:bg-background-secondary-dark skeleton'
            />
            <div
              className='relative shadow-md w-full h-40 rounded-12 bg-background-secondary flex
      dark:bg-background-secondary-dark skeleton'
            />
            <div
              className='relative shadow-md w-full h-40 rounded-12 bg-background-secondary flex
      dark:bg-background-secondary-dark skeleton'
            />
            <div
              className='relative shadow-md w-full h-40 rounded-12 bg-background-secondary flex
      dark:bg-background-secondary-dark skeleton'
            />
          </div>
        </div>
        <div className='mt-48 desktop:w-[49%] '>
          <p className='mb-16'>리포트</p>
          <section
            className='skeleton w-full h-224 desktop:h-210 shadow-lg bg-background-secondary dark:bg-background-secondary-dark rounded-12 
      px-8 py-24 tablet:p-24 desktop:flex items-center tablet:px-36 desktop:px-48'
          />
        </div>
      </div>
      <div className='mt-24'>
        <p>멤버</p>
        <div className='mt-24 grid grid-cols-1 tablet:grid-cols-3 gap-24'>
          <div className='w-fill h-73 rounded-16 px-24 py-20 shadow-md skeleton' />
          <div className='w-fill h-73 rounded-16 px-24 py-20 shadow-md skeleton' />
          <div className='w-fill h-73 rounded-16 px-24 py-20 shadow-md skeleton' />
        </div>
      </div>
    </div>
  );
}

export default SkeletonGroupPage;
