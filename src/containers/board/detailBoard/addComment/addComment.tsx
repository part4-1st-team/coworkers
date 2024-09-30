import { useState } from 'react';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import BaseButton from '@/components/button/baseButton';
import BoxInput from '@/components/input/boxInput';
import { postArticleComment } from '@/services/ArticleCommentAPI';
import useToast from '@/components/toast/useToast';

interface AddCommentProps {
  boardId: number;
}

function AddComment({ boardId }: AddCommentProps) {
  const [comment, setComment] = useState('');
  const [error, setError] = useState<string | null>(null);
  const { toast } = useToast();
  const queryClient = useQueryClient();

  // 댓글을 생성하는 mutation
  const { mutate: postCommentMutate, status: postCommentStatus } = useMutation({
    mutationFn: (newComment: string) => postArticleComment(boardId, newComment),
    onSuccess: () => {
      setComment('');
      setError(null);

      // 댓글 목록을 다시 불러오기 위해 해당 query 무효화
      queryClient.invalidateQueries({
        queryKey: ['ArticleComments', boardId],
      });

      toast('Success', '댓글이 성공적으로 등록되었습니다.');
    },
    onError: () => {
      toast('Error', '댓글을 등록하는 중 오류가 발생했습니다.');
    },
  });

  // 댓글 등록 버튼 클릭 시 호출되는 함수
  const handleSubmit = () => {
    if (!comment.trim()) {
      toast('Error', '댓글을 입력해주세요.');
      return;
    }

    // 댓글 등록 mutation 실행
    postCommentMutate(comment);
  };

  return (
    <div className='mt-40 flex flex-col gap-16 tablet:gap-24'>
      <p className='text-lg font-medium tablet:text-xl tablet:font-bold text-text-primary dark:text-text-primary-dark'>
        댓글달기
      </p>
      <BoxInput
        placeholder='댓글을 입력해주세요.'
        value={comment}
        onChange={(e) => setComment(e.target.value)}
        className='border-background-tertiary shadow-md'
      />
      {error && <div className='text-red-500'>{error}</div>}
      <div className='flex justify-end'>
        <BaseButton
          type='button'
          color='primary'
          className='w-71 h-32 tablet:w-184 tablet:h-48'
          onClick={handleSubmit}
          disabled={postCommentStatus === 'pending'}
          text={postCommentStatus === 'pending' ? '등록 중...' : '등록'}
        />
      </div>
      <div className='mt-32 tablet:mt-40 w-full border-t border-border-primary dark:border-border-primary-dark' />
    </div>
  );
}

export default AddComment;
