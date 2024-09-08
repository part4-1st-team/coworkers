import SearchInput from '@/components/input/searchInput';
import BestArticleList from '@/containers/board/bestArticleList/bestArticleList';
import ArticleCard from '@/containers/board/bestArticleList/articleList/articleListCard/articleListCard';

function BoardPage() {
  return (
    <div className='mt-32 h-auto tablet:mt-40 mx-16 tablet:mx-24 desktop:w-1200 desktop:mx-auto'>
      <div className='flex flex-col gap-24'>
        <div className='text-2lg text-text-primary'>자유게시판</div>
        <SearchInput placeholder='검색어를 입력해 주세요' />
        <BestArticleList />
        {/* 임시로 ArticleCard 추가 */}
        <div className='border border-red-500'>
          <ArticleCard />
        </div>
      </div>
    </div>
  );
}

export default BoardPage;
