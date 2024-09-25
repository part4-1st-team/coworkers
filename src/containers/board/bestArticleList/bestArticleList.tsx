import { useState, useEffect } from 'react';
import useBestArticles from '@/hooks/useBestArticles';
import BestArticleCard from './bestArticleCard/bestArticleCard';

function BestArticleList() {
  const [pageSize, setPageSize] = useState<number>(1);

  const handleResize = () => {
    const width = window.innerWidth;
    if (width < 768) {
      setPageSize(1);
    } else if (width < 1200) {
      setPageSize(2);
    } else {
      setPageSize(3);
    }
  };

  useEffect(() => {
    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // 커스텀 훅을 사용하여 데이터를 가져옴
  const { data, isLoading, isError } = useBestArticles(pageSize);

  if (isLoading) {
    return <div>Loading...</div>;
    // TODO 로딩 애니메이션 추가 여부
  }

  if (isError) {
    return <div>Something went wrong...</div>;
  }

  return (
    <div className='flex flex-col gap-24 tablet:gap-40'>
      <div className='flex justify-between'>
        <div className='text-lg font-medium tablet:text-xl tablet:font-bold text-text-primary'>
          베스트 게시글
        </div>
        <div className='text-sm tablet:text-md text-text-disabled'>더보기</div>
      </div>
      <div className='flex gap-16'>
        {data?.list.map((article) => (
          <BestArticleCard key={article.id} article={article} />
        ))}
      </div>

      <div className='w-full border-t border-border-primary' />
    </div>
  );
}

export default BestArticleList;
