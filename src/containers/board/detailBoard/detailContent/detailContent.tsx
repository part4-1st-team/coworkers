import { useEffect, useState } from 'react';
import {
  getArticleDetail,
  patchArticle,
  postArticleLike,
} from '@/services/ArticleAPI';
import { Article } from '@/types/Article';
import { IconHeart, IconComment } from '@/assets/IconList';
import BoxInput from '@/components/input/boxInput';
import Button from '@/components/button/button';

interface DetailContentProps {
  boardId: number | number[] | undefined;
}

function DetailContent({ boardId }: DetailContentProps) {
  const [articleDetail, setArticleDetail] = useState<Article | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchArticlesDetail = async () => {
      try {
        if (!boardId || typeof boardId === 'object')
          throw new Error('게시글 ID가 없습니다.');

        const data = await getArticleDetail(boardId);

        if (!data) {
          throw new Error('게시글 데이터를 찾을 수 없습니다.');
        }

        setArticleDetail(data);
      } catch (err) {
        setError(
          err instanceof Error
            ? err.message
            : '알 수 없는 오류가 발생했습니다.',
        );
      }
    };

    if (boardId) {
      fetchArticlesDetail();
    }
  }, [boardId]);

  if (error) return <div>{error}</div>;
  if (!articleDetail) return <div>Loading...</div>;

  const { title, content, likeCount, commentCount, writer, image, createdAt } =
    articleDetail;

  return (
    <div>
      <div className='text-lg font-medium tablet:text-2lg text-text-secondary'>
        {title}
      </div>

      <div className='mt-16 w-full border-t border-border-primary' />
      <div className='mt-16 flex justify-between gap-16 '>
        <div className='flex items-center gap-10'>
          <div className='w-32 h-32 pb-12 rounded-[9999px] bg-white' />
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
              {likeCount} +
            </p>
          </div>
        </div>
      </div>
      <div className='mt-48 py-10 text-md font-normal text-text-secondary'>
        <p>{content}</p>
      </div>
      <div className='mt-80 flex flex-col gap-16 tablet:gap-24'>
        <p className='text-lg font-medium tablet:text-xl  tablet:font-bold text-text-primary'>
          댓글달기
        </p>
        <BoxInput placeholder='댓글을 입력해주세요.' />
        <div className='flex justify-end'>
          <Button
            type='button'
            color='primary'
            className='w-74 h-32 tablet:w-184 tablet:h-48'
          >
            등록
          </Button>
        </div>
      </div>
    </div>
  );
}

export default DetailContent;
