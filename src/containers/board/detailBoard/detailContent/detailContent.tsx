import { useState, useEffect, useCallback } from 'react';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import {
  postArticleLike,
  deleteArticleLike,
  patchArticle,
  deleteArticle,
} from '@/services/ArticleAPI';
import { useRouter } from 'next/router';
import {
  getArticleViewCount,
  postArticleViewCount,
} from '@/services/ArticleViewCount.API'; // postArticleViewCount 추가
import { IconHeart, IconComment, IconSearch } from '@/assets/IconList';
import BoardDropdownMenu from '@/components/board/boardDropdown';
import ArticleEdit from '@/hooks/useArticleEdit';
import EditInput from '@/components/input/editCommentInput';
import BoardProfile from '@/components/profile/boardProfile';
import useArticleDetail from '@/hooks/useArticleDetail';
import Image from 'next/image';
import useModalStore from '@/stores/ModalStore';
import DeleteArticleModal from '@/components/modal/DeleteArticleModal';
import TitleEditInput from '@/components/input/titleEditInput';
import useUserStore from '@/stores/userStore';

interface DetailContentProps {
  boardId: number | number[] | undefined;
}

function DetailContent({ boardId }: DetailContentProps) {
  const router = useRouter();
  const queryClient = useQueryClient();
  const { user: currentUser } = useUserStore();

  // 게시글 세부 정보, 댓글, 좋아요 등을 불러오는 훅
  const { articleDetail, error, isFetching, refetch } = useArticleDetail(
    boardId as number,
  );

  const [viewCount, setViewCount] = useState<number>(0);
  const [likeCount, setLikeCount] = useState<number>(0);
  const [isLiked, setIsLiked] = useState<boolean>(false);

  // 게시글 수정 모드를 관리하는 훅 (제목 및 본문 수정)
  const {
    isEditing,
    title,
    content,
    toggleEditMode,
    handleContentChange,
    handleTitleChange,
    setContent,
    setTitle,
  } = ArticleEdit(articleDetail?.title || '', articleDetail?.content || '');

  // 조회수를 Firestore에서 가져오는 useEffect
  useEffect(() => {
    if (router.isReady && boardId) {
      const viewedArticles = JSON.parse(
        localStorage.getItem('viewedArticles') || '[]',
      );

      // 처음 들어왔을 때만 조회수를 증가시키고, 로컬 스토리지에 저장
      if (!viewedArticles.includes(boardId)) {
        postArticleViewCount(boardId as number, () => {}).then(() => {
          // 조회수 증가 후 Firestore에서 조회수 가져오기
          getArticleViewCount(boardId as number, () => {}).then((views) => {
            if (views !== null) {
              setViewCount(views); // 최신 조회수를 가져와서 상태에 설정
            }
          });
        });

        // 로컬 스토리지에 게시글 ID 저장
        localStorage.setItem(
          'viewedArticles',
          JSON.stringify([...viewedArticles, boardId]),
        );
      } else {
        // 이미 조회한 게시글이라면 Firestore에서 조회수 가져오기만 함
        getArticleViewCount(boardId as number, () => {}).then((views) => {
          if (views !== null) {
            setViewCount(views); // 최신 조회수를 가져와서 상태에 설정
          }
        });
      }
    }
  }, [router.isReady, boardId]);

  // 게시글 데이터가 변경될 때마다 상태값 업데이트
  useEffect(() => {
    if (articleDetail) {
      setLikeCount(articleDetail.likeCount || 0);
      setIsLiked(articleDetail.isLiked || false);
      setContent(articleDetail.content);
      setTitle(articleDetail.title);
    }
  }, [articleDetail, setContent, setTitle]);

  // 페이지가 다시 열릴 때마다 서버에서 최신 데이터 가져오기
  useEffect(() => {
    if (boardId) {
      refetch();
    }
  }, [router.asPath, boardId, refetch]);

  // 좋아요 추가 Mutation (성공 시 상태 업데이트)
  const likeMutation = useMutation({
    mutationFn: () => postArticleLike(boardId as number),
    onSuccess: (data) => {
      setLikeCount(data.likeCount);
      setIsLiked(true);
      queryClient.invalidateQueries({ queryKey: ['articleDetail', boardId] });
      queryClient.invalidateQueries({ queryKey: ['articles'] });
      queryClient.invalidateQueries({ queryKey: ['bestArticles'] });
    },
  });

  // 좋아요 취소 Mutation (성공 시 상태 업데이트)
  const dislikeMutation = useMutation({
    mutationFn: () => deleteArticleLike(boardId as number),
    onSuccess: (data) => {
      setLikeCount(data.likeCount);
      setIsLiked(false);
      queryClient.invalidateQueries({ queryKey: ['articleDetail', boardId] });
      queryClient.invalidateQueries({ queryKey: ['articles'] });
      queryClient.invalidateQueries({ queryKey: ['bestArticles'] });
    },
  });

  // 게시글 수정 Mutation (성공 시 수정 모드 종료 및 refetch 호출)
  const patchArticleMutation = useMutation({
    mutationFn: () => patchArticle(boardId as number, { title, content }),
    onSuccess: () => {
      toggleEditMode();
      refetch();
    },
  });

  // 게시글 삭제 Mutation (성공 시 게시판 페이지로 리다이렉트)
  const deleteArticleMutation = useMutation({
    mutationFn: () => deleteArticle(boardId as number),
    onSuccess: () => {
      router.push('/board');
    },
  });

  // 모달을 제어하기 위한 상태 관리
  const { setModalOpen, setModalClose } = useModalStore();

  // 게시글 삭제 시 모달을 열고, 삭제 확정 시 Mutation 실행
  const handleDelete = useCallback(() => {
    setModalOpen(
      <DeleteArticleModal
        onConfirm={() => {
          deleteArticleMutation.mutate();
          setModalClose();
        }}
        onCancel={setModalClose}
      />,
    );
  }, [deleteArticleMutation, setModalOpen, setModalClose]);

  // 좋아요 또는 좋아요 취소 버튼 클릭 시 호출되는 함수
  const handleLikeClick = useCallback(() => {
    if (isLiked) {
      dislikeMutation.mutate();
    } else {
      likeMutation.mutate();
    }
  }, [isLiked, likeMutation, dislikeMutation]);

  // 게시글 수정 완료 버튼 클릭 시 호출되는 함수
  const handleSaveEdit = useCallback(() => {
    patchArticleMutation.mutate();
  }, [patchArticleMutation]);

  // 게시글 수정 취소 시 수정 모드 종료
  const handleCancelEdit = useCallback(() => {
    toggleEditMode();
  }, [toggleEditMode]);

  // 수정 모드로 전환
  const handleEdit = useCallback(() => {
    toggleEditMode();
  }, [toggleEditMode]);

  // 데이터 로딩 상태 처리
  if (isFetching)
    return (
      <div className='flex items-center text-text-primary dark:text-text-primary-dark font-medium text-md'>
        Loading...
      </div>
    );

  // 에러 처리
  if (error) return <div>{error?.message || 'Unknown error'}</div>;

  // 데이터가 없을 경우
  if (!articleDetail) return <div>Loading...</div>;

  const { commentCount, writer, createdAt, image } = articleDetail;

  return (
    <div className='p-16 tablet:p-30 rounded-12 bg-background-secondary dark:bg-background-secondary-dark border border-background-tertiary dark:border-background-tertiary-dark shadow-md'>
      <div>
        <div className='flex justify-between'>
          {isEditing ? (
            <TitleEditInput
              value={title}
              onChange={handleTitleChange}
              placeholder='제목을 수정하세요'
            />
          ) : (
            <div className='text-lg font-bold tablet:text-2lg text-text-secondary dark:text-text-secondary-dark'>
              {title}
            </div>
          )}
          {currentUser?.id === writer.id && (
            <BoardDropdownMenu onEdit={handleEdit} onDelete={handleDelete} />
          )}
        </div>
        <div className='mt-16 w-full border-t border-border-primary dark:border-border-primary-dark border-opacity-10' />
        <div className='mt-16 flex justify-between gap-8 tablet:gap-16'>
          <div className='flex items-center gap-6 tablet:gap-16'>
            <div className='w-32 h-32'>
              <BoardProfile
                size={32}
                nickname={writer.nickname}
                image={writer.image}
              />
            </div>
            <p className='text-text-primary dark:text-text-primary-dark text-sm tablet:text-md font-medium'>
              {writer.nickname}
            </p>
            <div className='h-12 border border-background-tertiary dark:border-background-tertiary-dark' />
            <p className='text-sm tablet:text-md text-text-disabled dark:text-text-disabled-dark'>
              {new Date(createdAt).toLocaleDateString()}
            </p>
          </div>
          <div className='flex items-center gap-6 tablet:gap-16'>
            <div className='flex gap-4'>
              <IconSearch
                width={20}
                height={20}
                className='text-icon-primary dark:text-icon-primary-dark'
              />
              <p className='text-md text-text-disabled dark:text-text-disabled-dark flex items-center'>
                {viewCount}
              </p>
            </div>
            <div className='flex gap-4'>
              <IconComment />
              <p className='text-md text-text-disabled dark:text-text-disabled-dark flex items-center'>
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
              <p className='text-md text-text-disabled dark:text-text-disabled-dark flex items-center'>
                {likeCount}
              </p>
            </div>
          </div>
        </div>
        <div className='mt-28 py-10 text-md font-normal text-text-secondary dark:text-text-secondary-dark'>
          {isEditing ? (
            <EditInput
              value={content}
              onChange={(e) => handleContentChange(e)}
              placeholder='게시글을 수정하세요'
              onSave={handleSaveEdit}
              onCancel={handleCancelEdit}
            />
          ) : (
            <div className='flex flex-row'>
              <p className='text-lg font-medium text-text-secondary dark:text-text-secondary-dark whitespace-pre-wrap'>
                {content}
              </p>
              {image && (
                <Image
                  src={image}
                  alt='샘플이미지'
                  width={100}
                  height={100}
                  className='ml-auto'
                />
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default DetailContent;
