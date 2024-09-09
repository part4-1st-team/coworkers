import BestArticleCard from './bestArticleCard/bestArticleCard';

function BestArticleList() {
  return (
    <div className='flex flex-col gap-24 tablet:gap-40'>
      <div className='flex justify-between'>
        <div className='text-lg font-medium tablet:text-xl tablet:font-bold text-text-primary'>
          베스트 게시글
        </div>
        <div className='text-sm tablet:text-md text-text-disabled'>더보기</div>
      </div>
      <div className='flex gap-16'>
        <div className='flex-grow tablet:h-220 '>
          <BestArticleCard />
        </div>
        <div className='hidden tablet:flex-grow tablet:block'>
          <BestArticleCard />
        </div>
        <div className='hidden desktop:flex-grow desktop:block'>
          <BestArticleCard />
        </div>
      </div>
      <div className='w-full border-t border-border-primary' />
    </div>
  );
}

export default BestArticleList;
