function SkeletonArticleCard() {
  return (
    <div className='w-full tablet:h-220 pt-24 pb-16 tablet:pb-24 px-16 tablet:px-32 flex bg-background-secondary dark:bg-background-secondary-dark rounded-12 relative shadow-md skeleton'>
      <div className='w-full flex flex-col justify-between h-full'>
        <div className='flex justify-between'>
          <div className='flex flex-col'>
            <div className='w-180 tablet:w-400 h-30 tablet:h-30 bg-gray-300 rounded-md skeleton' />
            <div className='mt-10 tablet:mt-20 w-210 tablet:w-auto desktop:w-420 h-30 bg-gray-300 rounded-md skeleton' />
          </div>

          <div className='w-64 h-64 tablet:w-72 tablet:h-72 bg-gray-300 rounded-md skeleton' />
        </div>

        <div className='mt-16 flex justify-between gap-12'>
          <div className='flex items-center gap-12'>
            <div className='w-32 h-32 bg-gray-300 rounded-full skeleton' />
            <div className='w-50 h-12 bg-gray-300 rounded-md skeleton' />
            <div className='w-60 h-12 bg-gray-300 rounded-md skeleton' />
          </div>
        </div>
      </div>
    </div>
  );
}

export default SkeletonArticleCard;
