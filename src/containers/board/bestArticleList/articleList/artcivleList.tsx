import ArticleCard from './articleListCard/articleListCard';

function ArticleList() {
  return (
    <div className='max-w-desktop mx-auto my-auto flex flex-col gap-32'>
      <div className='flex items-center justify-between'>
        <div className='text-lg font-medium tablet:text-xl  tablet:font-bold text-text-primary'>
          게시글
        </div>
        <div className='bg-background-secondary w-120 h-44 rounded-12 flex items-center justify-center text-sm tablet:text-md text-text-disabled'>
          최신순
        </div>
        {/* TODO : 드롭다운 컴포넌트로 변경하기 */}
        {}
      </div>
      <div className='flex flex-col gap-24'>
        <ArticleCard />
        <ArticleCard />
        <ArticleCard />
      </div>
    </div>
  );
}

export default ArticleList;
