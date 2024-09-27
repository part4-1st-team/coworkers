import useBestArticles from '@/hooks/useBestArticles';
import BestArticleCard from './bestArticleCard/bestArticleCard';

const BEST_ARTICLE_SIZE = 3;

function BestArticleList() {
  const { data, isLoading, isError } = useBestArticles(BEST_ARTICLE_SIZE);

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (isError) {
    return <div>Something went wrong...</div>;
  }

  return (
    <div className='best-article-list flex flex-col gap-24 tablet:gap-40'>
      <div className='flex justify-between'>
        <div className='text-lg font-medium tablet:text-xl tablet:font-bold text-text-primary'>
          베스트 게시글
        </div>
        <div className='text-sm tablet:text-md text-text-disabled'>더보기</div>
      </div>

      {/* 그리드에 "best-article-grid" 클래스를 추가 */}
      <div className='best-article-grid grid grid-cols-1 tablet:grid-cols-2 desktop:grid-cols-3 gap-16'>
        {data?.list.map((article) => (
          <BestArticleCard key={article.id} article={article} />
        ))}
      </div>

      <div className='w-full border-t border-border-primary' />
    </div>
  );
}

export default BestArticleList;
