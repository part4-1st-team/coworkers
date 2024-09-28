import clsx from 'clsx';
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
        <div className='text-lg font-medium tablet:text-xl tablet:font-bold text-text-primary dark:text-text-primary-dark'>
          베스트 게시글
        </div>
        <div className='text-sm tablet:text-md text-text-disabled'>더보기</div>
      </div>

      <div className='flex flex-row gap-16'>
        {data?.list.map((article, index) => (
          <BestArticleCard
            key={article.id}
            article={article}
            className={clsx({
              'hidden tablet:block': index === 1,
              'hidden desktop:block': index === 2,
            })}
          />
        ))}
      </div>

      <div className='w-full border-t border-border-primary dark:border-border-primary-dark' />
    </div>
  );
}

export default BestArticleList;
