import clsx from 'clsx';
import Link from 'next/link';
import useBestArticles from '@/hooks/useBestArticles';
import BestArticleCard from './bestArticleCard/bestArticleCard';

const BEST_ARTICLE_SIZE = 3;

function BestArticleList() {
  const { bestArticles, isLoading, isError } =
    useBestArticles(BEST_ARTICLE_SIZE);

  if (isLoading) {
    return (
      <div className='flex items-center text-text-primary dark:text-text-primary-dark font-medium text-md'>
        Loading...
      </div>
    );
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
        <Link href='/board/best-article' passHref>
          <div className='text-sm tablet:text-md text-text-disabled cursor-pointer hover:text-text-primary  dark:hover:text-text-primary-dark'>
            더보기
          </div>
        </Link>
      </div>

      <div className='flex flex-row gap-16'>
        {bestArticles?.list.map((article, index) => (
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

      <div className='w-full border-b border-border-primary dark:border-border-primary-dark border-opacity-10' />
    </div>
  );
}

export default BestArticleList;
