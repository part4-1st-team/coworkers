import ArticleCard from './articleListCard/articleListCard';
import BestArticleCard from '../bestArticleCard/bestArticleCard';

function ArticleList() {
  return (
    <div className='max-w-desktop mx-auto my-auto'>
      <div className='flex justify-between'>
        <div className='text-lg font-medium tablet:text-xl tablet:font-bold text-text-primary'>
          게시글
        </div>
        <div className='text-sm tablet:text-md text-text-disabled'>더보기</div>
      </div>
      <div className=''>
        <ArticleCard />
        <BestArticleCard />
      </div>
    </div>
  );
}

export default ArticleList;
