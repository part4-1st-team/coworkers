import { useState, useEffect } from 'react';
import BestArticleCard from './bestArticleCard/bestArticleCard';
import { getArticles } from '@/services/ArticleAPI';

function BestArticleList() {
  const [bestBoards, setBestBoards] = useState<Article[]>([]);

  return (
    <div className='flex flex-col gap-24 tablet:gap-40'>
      <div className='flex justify-between'>
        <div className='text-lg font-medium tablet:text-xl tablet:font-bold text-text-primary'>
          베스트 게시글
        </div>
        <div className='text-sm tablet:text-md text-text-disabled'>더보기</div>
      </div>
      <div className='flex gap-16'>
        <div className='hidden desktop:flex-grow desktop:block'>
          {bestBoards.map((board) => (
            <BestArticleCard key={board.id} board={board} />
          ))}
        </div>
      </div>

      <div className='w-full border-t border-border-primary' />
    </div>
  );
}

export default BestArticleList;
