import { useState } from 'react';
import { useMutation, useQueryClient } from '@tanstack/react-query'; // useQueryClient 추가
import Button from '@/components/button/button';
import BoxInput from '@/components/input/boxInput';
import { postArticleComment } from '@/services/ArticleCommentAPI';

interface AddCommentProps {
  boardId: number; // 댓글을 작성할 게시글 ID
}

function AddComment({ boardId }: AddCommentProps) {
  const [comment, setComment] = useState(''); // 댓글 내용
  const [error, setError] = useState<string | null>(null);

  const queryClient = useQueryClient(); // QueryClient 가져오기

  // 댓글을 생성하는 mutation
  const { mutate: postCommentMutate, status: postCommentStatus } = useMutation({
    mutationFn: (newComment: string) => postArticleComment(boardId, newComment),
    onSuccess: () => {
      setComment(''); // 성공적으로 댓글을 작성하면 입력 필드 초기화
      setError(null); // 에러 초기화

      // 댓글 목록을 다시 불러오기 위해 해당 query 무효화
      queryClient.invalidateQueries({
        queryKey: ['ArticleComments', boardId], // 쿼리 키 배열
      });

      console.log('댓글이 성공적으로 등록되었습니다.');
    },
    onError: () => {
      setError('댓글을 등록하는 중 오류가 발생했습니다.');
    },
  });

  // 댓글 등록 버튼 클릭 시 호출되는 함수
  const handleSubmit = () => {
    if (!comment.trim()) {
      setError('댓글을 입력해주세요.');
      return;
    }

    // 댓글 등록 mutation 실행
    postCommentMutate(comment);
  };

  return (
    <div className='mt-80 flex flex-col gap-16 tablet:gap-24'>
      <p className='text-lg font-medium tablet:text-xl tablet:font-bold text-text-primary'>
        댓글달기
      </p>
      <BoxInput
        placeholder='댓글을 입력해주세요.'
        value={comment}
        onChange={(e) => setComment(e.target.value)}
      />
      {error && <div className='text-red-500'>{error}</div>}
      <div className='flex justify-end'>
        <Button
          type='button'
          color='primary'
          className='w-74 h-32 tablet:w-184 tablet:h-48'
          onClick={handleSubmit}
          disabled={postCommentStatus === 'pending'} // 로딩 중일 때 버튼 비활성화
        >
          {postCommentStatus === 'pending' ? '등록 중...' : '등록'}
        </Button>
      </div>
    </div>
  );
}

export default AddComment;
