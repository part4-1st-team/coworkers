import SearchInput from '@/components/input/searchInput';
import BestArticleList from '@/containers/board/bestArticleList/bestArticleList';
import ArticleList from '@/containers/board/articleList/artticleList';

import FloatingButton from '@/components/button/floatingButton';

function BoardPage() {
  return (
    <div className=' mt-32 h-auto tablet:mt-40 mx-16 tablet:mx-24 desktop:w-1200 desktop:mx-auto relative'>
      <div className='flex flex-col gap-24'>
        <div className='text-2lg tablet:text-2xl font-bold text-text-primary'>
          자유게시판
        </div>

        <SearchInput placeholder='검색어를 입력해 주세요' />
        <BestArticleList />
        <div className=''>
          <ArticleList />
        </div>
        <div className='w-104 absolute bottom-145 desktop:bottom-45 right-0'>
          <FloatingButton type='add' text='글쓰기' className='text-lg w-104' />
        </div>
      </div>
    </div>
  );
}

export default BoardPage;
