import SearchInput from '@/components/input/searchInput';
import BestArticleList from '@/containers/board/bestArticleList/bestArticleList';
import ArticleList from '@/containers/board/articleList/articleList';
import FloatingActionButton from '@/containers/board/commponent/floatingActionButton';
import BoardHeader from '@/containers/board/commponent/boardHeader';
import useSearch from '@/hooks/useSearch';

function BoardPage() {
  const { searchValue, searchQuery, handleSearchChange, handleKeyPress } =
    useSearch();

  return (
    <main className='main-container relative min-w-375'>
      <div className='flex flex-col gap-24'>
        <BoardHeader title='자유게시판' />
        <SearchInput
          placeholder='검색어를 입력하세요'
          value={searchValue}
          onChange={handleSearchChange}
          onKeyPress={handleKeyPress}
        />
        <BestArticleList />
        <ArticleList searchValue={searchQuery} />
        <FloatingActionButton href='/board/add-post' text='글쓰기' />
      </div>
    </main>
  );
}

export default BoardPage;
