import { useState, useEffect } from 'react';
import { useQuery } from '@tanstack/react-query';
import { getArticles } from '@/services/ArticleAPI';
import BestArticleCard from './bestArticleCard/bestArticleCard';

function BestArticleList() {
  const [pageSize, setPageSize] = useState<number>(1); // 기본값을 데스크탑 사이즈로 설정

  const handleResize = () => {
    const width = window.innerWidth;
    if (width < 768) {
      // 모바일 사이즈
      setPageSize(1);
    } else if (width < 1200) {
      // 테블릿 사이즈
      setPageSize(2);
    } else {
      // 데스크탑 사이즈
      setPageSize(3);
    }
  };

  useEffect(() => {
    handleResize(); // 초기 화면 크기 설정
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // React Query를 사용하여 데이터를 페칭
  const { data, isLoading, isError } = useQuery({
    queryKey: ['bestArticles', pageSize],
    queryFn: () => getArticles(1, pageSize, 'like'),
  });

  if (isLoading) {
    return <div>Loading...</div>;
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
        {data?.list.map((board: Article) => (
          <BestArticleCard key={board.id} board={board} />
        ))}
      </div>

      <div className='w-full border-t border-border-primary' />
    </div>
  );
}

export default BestArticleList;
