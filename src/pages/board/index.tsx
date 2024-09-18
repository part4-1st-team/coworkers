import SearchInput from '@/components/input/searchInput';
import BestArticleList from '@/containers/board/bestArticleList/bestArticleList';
import ArticleList from '@/containers/board/articleList/artticleList';
import Link from 'next/link';
import FloatingButton from '@/components/button/floatingButton';

function BoardPage() {
  return (
    <div className='mt-32 tablet:mt-40 mx-16 tablet:mx-24 desktop:w-1200 desktop:mx-auto relative '>
      <div className='flex flex-col gap-24'>
        <div className='text-2lg tablet:text-2xl font-bold text-text-primary'>
          자유게시판
        </div>

        <SearchInput placeholder='검색어를 입력해 주세요' />
        <BestArticleList />
        <div className=''>
          <ArticleList />
        </div>
        <div className='w-104 fixed bottom-145 desktop:bottom-45 right-21 tablet:right-25 desktop:right-80 '>
          <Link href='/board/add-post'>
            <FloatingButton
              type='button'
              icon='plus'
              className='text-lg w-104 h-49'
            >
              글쓰기
            </FloatingButton>
          </Link>
        </div>
      </div>
    </div>
  );
}

export default BoardPage;
