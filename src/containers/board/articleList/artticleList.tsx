// import { useState, useEffect } from 'react';
// import { getArticles } from '@/services/ArticleAPI';
// import { Article } from '@/types/Article';
// import Dropdown from '@/components/dropdown/Dropdown';
// import useDropdown from '@/hooks/useDropdown';
// import ArticleCard from './articleListCard/articleListCard';
// import { IconToggleDown } from '@/assets/IconList';

// function ArticleList() {
//   const [Boards, setBoards] = useState<Article[]>([]);
//   const [loading, setLoading] = useState(true);
//   const [pageSize, setPageSize] = useState<number>(3);
//   const { isOpen, handleToggleDropdown, handleOffDropdown } = useDropdown();

//   const fetchArticles = async () => {
//     try {
//       const data = await getArticles(
//         1, // page
//         pageSize, // pageSize
//         'like', // orderBy
//       );
//       console.log('데이터확인');
//       console.log('Fetched data:', data);
//       const response = data;
//       setBoards(response.list);
//       setLoading(false);
//     } catch (error) {
//       console.error(error);
//       setLoading(false);
//     }
//   };

//   useEffect(() => {
//     fetchArticles();
//   }, []);

//   return (
//     <div className='max-w-desktop h-auto overflow-hidden mx-auto my-auto flex flex-col gap-32'>
//       <div className='flex items-center justify-between'>
//         <p className='text-lg font-medium tablet:text-xl  tablet:font-bold text-text-primary'>
//           게시글
//         </p>
//         <Dropdown onClose={handleOffDropdown}>
//           <Dropdown.Trigger onClick={handleToggleDropdown}>
//             <div className='bg-background-secondary text-text-primary font-normal w-120 h-44 px-14 py-10 rounded-12 flex items-center justify-between text-sm tablet:text-md text-text-disabled'>
//               최신순
//               <IconToggleDown className='text-icon-primary' />
//             </div>
//           </Dropdown.Trigger>
//           <Dropdown.Menu isOpen={isOpen} className='w-120 absolute top-44'>
//             <Dropdown.List onClick={() => console.log('최신순')}>
//               최신순
//             </Dropdown.List>
//             <Dropdown.List onClick={() => console.log('좋아요 순')}>
//               좋아요 순
//             </Dropdown.List>
//           </Dropdown.Menu>
//         </Dropdown>
//         {/* TODO : 드롭다운 컴포넌트로 변경하기 */}
//         {}
//       </div>

//       <div className='flex flex-col gap-24 desktop:grid desktop:grid-cols-2'>
//         {Boards.map((board) => (
//           <ArticleCard key={board.id} board={board} />
//         ))}
//       </div>
//     </div>
//   );
// }

// export default ArticleList;

import { useState, useEffect, useCallback } from 'react';
import { getArticles } from '@/services/ArticleAPI';
import { Article } from '@/types/Article';
import Dropdown from '@/components/dropdown/Dropdown';
import useDropdown from '@/hooks/useDropdown';
import { IconToggleDown } from '@/assets/IconList';
import ArticleCard from './articleListCard/articleListCard';

type ArticleOrder = 'like' | 'recent';

function ArticleList() {
  const [boards, setBoards] = useState<Article[]>([]);
  const [loading, setLoading] = useState(true);
  const [pageSize, setPageSize] = useState<number>(4);
  const [page, setPage] = useState<number>(1);
  const [hasMore, setHasMore] = useState<boolean>(true);
  const [orderBy, setOrderBy] = useState<string>('recent');
  const { isOpen, handleToggleDropdown, handleOffDropdown } = useDropdown();

  const fetchArticles = useCallback(async () => {
    try {
      const data = await getArticles(
        page, // page
        pageSize, // pageSize
        orderBy, // orderBy
      );
      if (data.list.length < pageSize) {
        setHasMore(false); // 더 이상 로드할 데이터가 없을 경우
      }
      setBoards((prev) => [...prev, ...data.list]);
      setLoading(false);
    } catch (error) {
      console.error(error);
      setLoading(false);
    }
  }, [page, pageSize, orderBy]);

  useEffect(() => {
    setBoards([]); // 페이지 변경 시 데이터 초기화
    setPage(1); // 페이지를 처음으로 초기화
  }, [orderBy]);

  useEffect(() => {
    fetchArticles();
  }, [fetchArticles]);

  useEffect(() => {
    const handleScroll = () => {
      if (
        window.innerHeight + document.documentElement.scrollTop !==
          document.documentElement.offsetHeight ||
        loading
      ) {
        return;
      }
      if (hasMore) {
        setPage((prev) => prev + 1);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [loading, hasMore]);

  const handleSortChange = (sortType: ArticleOrder) => {
    setOrderBy(sortType);
    handleOffDropdown();
  };

  return (
    <div className='max-w-desktop h-auto overflow-hidden mx-auto my-auto flex flex-col gap-32'>
      <div className='flex items-center justify-between'>
        <p className='text-lg font-medium tablet:text-xl tablet:font-bold text-text-primary'>
          게시글
        </p>
        <Dropdown onClose={handleOffDropdown}>
          <Dropdown.Trigger onClick={handleToggleDropdown}>
            <div className='bg-background-secondary text-text-primary font-normal w-130 h-44 px-14 py-10 rounded-12 flex items-center justify-between text-sm tablet:text-md '>
              {orderBy === 'like' ? '좋아요 많은순' : '최신순'}
              <IconToggleDown className='text-icon-primary' />
            </div>
          </Dropdown.Trigger>
          <Dropdown.Menu isOpen={isOpen} className='w-130 absolute top-44'>
            <Dropdown.List
              onClick={() => handleSortChange('like')}
              onClose={handleOffDropdown}
            >
              좋아요 많은순
            </Dropdown.List>
            <Dropdown.List
              onClick={() => handleSortChange('recent')}
              onClose={handleOffDropdown}
            >
              최신순
            </Dropdown.List>
          </Dropdown.Menu>
        </Dropdown>
      </div>

      <div className='flex flex-col gap-24 desktop:grid desktop:grid-cols-2'>
        {boards.map((board) => (
          <ArticleCard key={board.id} board={board} />
        ))}
      </div>

      {loading && <div>Loading...</div>}
    </div>
  );
}

export default ArticleList;
