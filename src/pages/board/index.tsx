import { useCallback, useState } from 'react';
import SearchInput from '@/components/input/searchInput';
import BestArticleList from '@/containers/board/bestArticleList/bestArticleList';
import ArticleList from '@/containers/board/articleList/articleList';
import FloatingActionButton from '@/containers/board/commponent/floatingActionButton';
import Header from '@/containers/board/commponent/header';

// 커스텀 훅으로 검색 로직 분리 (SRP 적용)
function useSearch() {
  const [searchValue, setSearchValue] = useState('');

  const handleSearchChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      setSearchValue(e.target.value);
    },
    [],
  );

  return { searchValue, handleSearchChange };
}

function BoardPage() {
  const { searchValue, handleSearchChange } = useSearch();

  return (
    <main className='main-container relative'>
      <div className='flex flex-col gap-24'>
        <Header title='자유게시판' />
        <SearchInput
          placeholder='검색어를 입력해 주세요'
          value={searchValue}
          onChange={handleSearchChange}
        />
        <BestArticleList />
        <ArticleList searchValue={searchValue} />
        <FloatingActionButton href='/board/add-post' text='글쓰기' />{' '}
      </div>
    </main>
  );
}

export default BoardPage;
