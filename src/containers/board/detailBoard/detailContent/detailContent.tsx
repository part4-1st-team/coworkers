import { useState, useEffect } from 'react';
import { useMutation } from '@tanstack/react-query';
import {
  postArticleLike,
  deleteArticleLike,
  patchArticle,
  deleteArticle,
} from '@/services/ArticleAPI';
import { useRouter } from 'next/router';
import { IconHeart, IconComment } from '@/assets/IconList';
import BoardDropdownMenu from '@/components/board/boardDropdown';
import ArticleEdit from '@/hooks/useArticleEdit';
import EditInput from '@/components/input/editCommentInput';
import AddComment from '@/containers/board/detailBoard/comment/addComment/addComment';
import BoardProfile from '@/components/profile/boardProfile';
import useUser from '@/hooks/useUser';
import useArticleDetail from '@/hooks/useArticleDetail';

interface DetailContentProps {
  boardId: number | number[] | undefined;
}

function DetailContent({ boardId }: DetailContentProps) {
  const router = useRouter();
  const { user: currentUser, isLoading, error: userError } = useUser();

  // useArticleDetail 훅 사용
  const { articleDetail, error, isFetching, refetch } = useArticleDetail(
    boardId as number,
  );

  const [likeCount, setLikeCount] = useState<number>(0);
  const [isLiked, setIsLiked] = useState<boolean>(false);

  const {
    isEditing,
    content,
    toggleEditMode,
    handleContentChange,
    setContent,
  } = ArticleEdit(articleDetail?.content || '');

  useEffect(() => {
    if (articleDetail) {
      setLikeCount(articleDetail.likeCount || 0);
      setIsLiked(articleDetail.isLiked || false);
      setContent(articleDetail.content);
    }
  }, [articleDetail, setContent]);

  const likeMutation = useMutation({
    mutationFn: () => postArticleLike(boardId as number),
    onSuccess: (data) => {
      setLikeCount(data.likeCount);
      setIsLiked(true);
    },
  });

  const dislikeMutation = useMutation({
    mutationFn: () => deleteArticleLike(boardId as number),
    onSuccess: (data) => {
      setLikeCount(data.likeCount);
      setIsLiked(false);
    },
  });

  const patchArticleMutation = useMutation({
    mutationFn: (newContent: string) => {
      const requestBody = {
        title: articleDetail?.title || '',
        content: newContent,
      };
      return patchArticle(boardId as number, requestBody);
    },
    onSuccess: () => {
      toggleEditMode();
      refetch();
    },
  });

  const deleteArticleMutation = useMutation({
    mutationFn: () => deleteArticle(boardId as number),
    onSuccess: () => {
      router.push('/board');
    },
  });

  const handleLikeClick = () => {
    if (isLiked) {
      dislikeMutation.mutate();
    } else {
      likeMutation.mutate();
    }
  };

  const handleSaveEdit = () => {
    patchArticleMutation.mutate(content);
  };

  const handleCancelEdit = () => {
    toggleEditMode();
  };

  const handleEdit = () => {
    toggleEditMode();
  };

  const handleDelete = () => {
    if (window.confirm('정말 이 게시글을 삭제하시겠습니까?')) {
      deleteArticleMutation.mutate();
    }
  };

  if (isFetching || isLoading) return <div>Loading...</div>;
  if (error || userError)
    return <div>{error?.message || userError?.message || 'Unknown error'}</div>;
  if (!articleDetail) return <div>Loading...</div>;

  const { title, commentCount, writer, createdAt } = articleDetail;

  return (
    <div>
      <div className='flex justify-between'>
        <div className='text-lg font-medium tablet:text-2lg text-text-secondary'>
          {title}
        </div>
        {currentUser?.id === writer.id && (
          <BoardDropdownMenu onEdit={handleEdit} onDelete={handleDelete} />
        )}
      </div>
      <div className='mt-16 w-full border-t border-border-primary' />
      <div className='mt-16 flex justify-between gap-16'>
        <div className='flex items-center gap-10'>
          <div className='w-32 h-32'>
            <BoardProfile
              size={32}
              nickname={writer.nickname}
              image={writer.image}
            />
          </div>
          <p className='text-text-primary text-md font-medium'>
            {writer.nickname}
          </p>
          <div className='h-12 border border-background-tertiary' />
          <p className='text-md text-text-disabled'>
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
            <IconHeart
              onClick={handleLikeClick}
              color={isLiked ? 'gray' : 'gray'}
              fill={isLiked ? 'gray' : 'none'}
              style={{ cursor: 'pointer' }}
            />
            <p className='text-md text-text-disabled flex items-center'>
              {likeCount}
            </p>
          </div>
        </div>
      </div>
      <div className='mt-48 py-10 text-md font-normal text-text-secondary'>
        {isEditing ? (
          <EditInput
            value={content}
            onChange={(e) => handleContentChange(e)}
            placeholder='게시글을 수정하세요'
            onSave={handleSaveEdit}
            onCancel={handleCancelEdit}
          />
        ) : (
          <p>{content}</p>
        )}
      </div>
      {typeof boardId === 'number' && <AddComment boardId={boardId} />}
    </div>
  );
}

export default DetailContent;
