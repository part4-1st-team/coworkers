import clsx from 'clsx';

function SkeletonBestArticleCard() {
  return (
    <div
      className={clsx(
        'w-full tablet:h-220 pt-9 pb-16 px-24',
        'bg-gray-300',
        'rounded-12 skeleton',
      )}
    >
      <div className='pt-15 w-54 h-26 flex items-center gap-4'>
        <div className='w-12 h-12 bg-gray-300 rounded-full skeleton' />
        <div className='w-24 h-6 bg-gray-300 rounded-md skeleton' />
      </div>
      <div className='mt-16 flex justify-between'>
        <div className='w-224 h-10 bg-gray-300 rounded-md skeleton' />
        <div className='w-72 h-72 bg-gray-300 rounded-md skeleton' />
      </div>
      <div className='mt-10 w-40 h-6 bg-gray-300 rounded-md skeleton' />
      <div className='mt-16 tablet:mt-34 flex justify-between gap-12'>
        <div className='flex items-center gap-12'>
          <div className='w-32 h-32 bg-gray-300 rounded-full skeleton' />
          <div className='w-24 h-6 bg-gray-300 rounded-md skeleton' />
        </div>
        <div className='flex items-center gap-12'>
          <div className='flex gap-4'>
            <div className='w-6 h-6 bg-gray-300 rounded-full skeleton' />
            <div className='w-12 h-6 bg-gray-300 rounded-md skeleton' />
          </div>
        </div>
      </div>
    </div>
  );
}

export default SkeletonBestArticleCard;
