import { useQuery } from '@tanstack/react-query';
import {
  getArticleDetail,
  patchArticle,
  postArticleLike,
} from '@/services/ArticleAPI';
import { IconHeart, IconComment, IconKebabLarge } from '@/assets/IconList';
import Dropdown from '@/components/dropdown/Dropdown';
import useDropdown from '@/hooks/useDropdown';
import AddComment from '../comment/addComment/addComment';

interface DetailContentProps {
  boardId: number | number[] | undefined;
}

function DetailContent({ boardId }: DetailContentProps) {
  const { isOpen, handleToggleDropdown, handleOffDropdown } = useDropdown();

  // React Query를 사용하여 게시글 데이터를 불러오기
  const {
    data: articleDetail,
    error,
    isFetching,
  } = useQuery({
    queryKey: ['articleDetail', boardId], // queryKey
    queryFn: () => {
      if (!boardId || typeof boardId === 'object') {
        throw new Error('게시글 ID가 유효하지 않습니다.');
      }
      return getArticleDetail(boardId);
    },
    enabled: !!boardId, // boardId가 있을 때만 실행
    retry: false, // 실패 시 재시도하지 않도록 설정 (옵션)
  });

  if (isFetching) return <div>Loading...</div>;
  if (error instanceof Error) return <div>{error.message}</div>;

  if (!articleDetail) return <div>Loading...</div>;

  const { title, content, likeCount, commentCount, writer, createdAt } =
    articleDetail;

  return (
    <div>
      <div className='flex justify-between'>
        <div className='text-lg font-medium tablet:text-2lg text-text-secondary'>
          {title}
        </div>
        <Dropdown onClose={handleOffDropdown}>
          <Dropdown.Trigger onClick={handleToggleDropdown}>
            <IconKebabLarge />
          </Dropdown.Trigger>
          <Dropdown.Menu isOpen={isOpen} className='right-10'>
            <Dropdown.List onClick={() => console.log('수정하기')}>
              수정하기
            </Dropdown.List>
            <Dropdown.List onClick={() => console.log('삭제하기')}>
              삭제하기
            </Dropdown.List>
          </Dropdown.Menu>
        </Dropdown>
      </div>

      <div className='mt-16 w-full border-t border-border-primary' />
      <div className='mt-16 flex justify-between gap-16 '>
        <div className='flex items-center gap-10'>
          <div className='w-32 h-32 pb-12 rounded-[9999px]'>{writer.image}</div>
          <p className='text-text-primary text-md font-medium '>
            {writer.nickname}
          </p>
          <div className='h-12 border border-background-tertiary' />
          <p className='text-md text-text-disabled '>
            {new Date(createdAt).toLocaleDateString()}
          </p>
        </div>
        <div className='flex items-center gap-16'>
          <div className='flex gap-4'>
            <IconComment />
            <p className='text-md text-text-disabled flex items-center'>
              {commentCount}
            </p>
          </div>

          <div className='flex items-center gap-4'>
            <IconHeart />
            <p className='text-md text-text-disabled flex items-center'>
              {likeCount}
            </p>
          </div>
        </div>
      </div>
      <div className='mt-48 py-10 text-md font-normal text-text-secondary'>
        <p>{content}</p>
      </div>
      <AddComment boardId={boardId}/>
    </div>
  );
}

export default DetailContent;
