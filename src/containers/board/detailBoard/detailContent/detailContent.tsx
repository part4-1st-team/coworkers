import { useState, useEffect } from 'react';
import { useQuery, useMutation } from '@tanstack/react-query';
import {
  getArticleDetail,
  postArticleLike,
  deleteArticleLike,
  patchArticle,
  deleteArticle, // 삭제 API 추가
} from '@/services/ArticleAPI';
import { useRouter } from 'next/router'; // 라우터 추가
import { IconHeart, IconComment } from '@/assets/IconList';
import BoardDropdownMenu from '@/components/borad/boardDropdown';
import ArticleEdit from '@/hooks/useArticleEdit';
import EditInput from '@/components/input/editCommentInput';
import AddComment from '@/containers/board/detailBoard/comment/addComment/addComment';
import BoardProfile from '@/components/profile/boardProfile';
import CurrentUser from '@/hooks/useCurrentUser';

interface DetailContentProps {
  boardId: number | number[] | undefined;
}

function DetailContent({ boardId }: DetailContentProps) {
  const router = useRouter(); // 페이지 이동을 위한 라우터 사용
  const { data: currentUser } = CurrentUser(); // 현재 로그인한 사용자 정보 가져오기

  // 게시글 상세 정보 조회
  const {
    data: articleDetail,
    error,
    isFetching,
    refetch, // 게시글 데이터를 새로고침하는 refetch 함수
  } = useQuery({
    queryKey: ['articleDetail', boardId],
    queryFn: () => {
      if (!boardId || typeof boardId === 'object') {
        throw new Error('게시글 ID가 유효하지 않습니다.');
      }
      return getArticleDetail(boardId);
    },
    enabled: !!boardId && typeof boardId === 'number',
    retry: false,
  });

  // 좋아요 상태 관리
  const [likeCount, setLikeCount] = useState<number>(0); // 좋아요 카운트 상태
  const [isLiked, setIsLiked] = useState<boolean>(false); // 좋아요 상태

  // 수정 모드 관리
  const {
    isEditing,
    content,
    toggleEditMode,
    handleContentChange,
    setContent,
  } = ArticleEdit(articleDetail?.content || ''); // 초기값으로 게시글 내용을 설정

  // 게시글 데이터가 변경되면 초기값 설정
  useEffect(() => {
    if (articleDetail) {
      setLikeCount(articleDetail.likeCount || 0); // 좋아요 카운트 설정
      setIsLiked(articleDetail.isLiked || false); // 좋아요 여부 설정
      setContent(articleDetail.content); // 게시글 내용 설정
    }
  }, [articleDetail, setContent]);

  // 좋아요 API 호출
  const likeMutation = useMutation({
    mutationFn: () => postArticleLike(boardId as number), // 좋아요 추가 API 호출
    onSuccess: (data) => {
      setLikeCount(data.likeCount); // 좋아요 카운트 업데이트
      setIsLiked(true); // 좋아요 상태 true로 설정
    },
  });

  // 좋아요 삭제 API 호출
  const dislikeMutation = useMutation({
    mutationFn: () => deleteArticleLike(boardId as number), // 좋아요 삭제 API 호출
    onSuccess: (data) => {
      setLikeCount(data.likeCount); // 좋아요 카운트 업데이트
      setIsLiked(false); // 좋아요 상태 false로 설정
    },
  });

  // 게시글 수정 API 호출
  const patchArticleMutation = useMutation({
    mutationFn: (newContent: string) => {
      const requestBody = {
        title: articleDetail?.title || '', // 게시글 제목 유지
        content: newContent, // 새로운 내용으로 업데이트
      };
      return patchArticle(boardId as number, requestBody); // 게시글 수정 API 호출
    },
    onSuccess: () => {
      toggleEditMode(); // 수정 모드 종료
      refetch(); // 게시글 새로고침
    },
  });

  // 게시글 삭제 mutation 추가
  const deleteArticleMutation = useMutation({
    mutationFn: () => deleteArticle(boardId as number), // 게시글 삭제 API 호출
    onSuccess: () => {
      router.push('/board'); // 삭제 후 게시글 목록으로 이동
    },
  });

  // 좋아요/좋아요 취소 클릭 핸들러
  const handleLikeClick = () => {
    if (isLiked) {
      dislikeMutation.mutate(); // 좋아요 삭제
    } else {
      likeMutation.mutate(); // 좋아요 추가
    }
  };

  // 수정 저장 버튼 클릭 핸들러
  const handleSaveEdit = () => {
    patchArticleMutation.mutate(content); // 수정 API 호출
  };

  // 수정 취소 버튼 클릭 핸들러
  const handleCancelEdit = () => {
    toggleEditMode(); // 수정 모드 취소
  };

  // 수정하기 이벤트 핸들러
  const handleEdit = () => {
    toggleEditMode(); // 수정 모드로 전환
  };

  // 삭제하기 이벤트 핸들러
  const handleDelete = () => {
    if (window.confirm('정말 이 게시글을 삭제하시겠습니까?')) {
      deleteArticleMutation.mutate(); // 게시글 삭제 호출
    }
  };

  if (isFetching) return <div>Loading...</div>;
  if (error instanceof Error) return <div>{error.message}</div>;
  if (!articleDetail) return <div>Loading...</div>;

  const { title, commentCount, writer, createdAt } = articleDetail; // 게시글 정보 추출

  return (
    <div>
      <div className='flex justify-between'>
        <div className='text-lg font-medium tablet:text-2lg text-text-secondary'>
          {title}
        </div>
        {/* 현재 로그인한 사용자가 작성자인 경우에만 수정/삭제 버튼 노출 */}
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
              onClick={handleLikeClick} // 좋아요/좋아요 취소 클릭 핸들러
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
            value={content} // 수정할 내용
            onChange={(e) => handleContentChange(e)} // 내용 변경 핸들러
            placeholder='게시글을 수정하세요'
            onSave={handleSaveEdit} // 수정 저장 핸들러
            onCancel={handleCancelEdit} // 수정 취소 핸들러
          />
        ) : (
          <p>{content}</p> // 게시글 내용
        )}
      </div>
      {typeof boardId === 'number' && <AddComment boardId={boardId} />}{' '}
      {/* 댓글 추가 */}
    </div>
  );
}

export default DetailContent;
