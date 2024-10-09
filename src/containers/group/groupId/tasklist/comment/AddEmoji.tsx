import IconSmile from '@/assets/images/ic_smile.png';
import useUserStore from '@/stores/userStore';
import Image from 'next/image';
import { useState } from 'react';
import { v4 as uuid } from 'uuid';
import useTaskCommentReactionMutation from './useTaskCommentReactionMutation';

function AddEmoji({ comment }: { comment: Comment }) {
  const { taskId, id: commentId } = comment;

  const user = localStorage.getItem('User');
  const parseUser = JSON.parse(user!);

  const userId = parseUser.state.user.id;

  const [showEmojiList, setShowEmojiList] = useState<boolean>(false);
  let timeoutRef: any = null; // 타이머 참조를 저장할 변수

  const handleMouseEnter = () => {
    clearTimeout(timeoutRef);
    setShowEmojiList(true);
  };

  const handleMouseLeave = () => {
    timeoutRef = setTimeout(() => {
      setShowEmojiList(false);
    }, 200);
  };

  const handleEmojiListMouseEnter = () => {
    clearTimeout(timeoutRef); // 리스트에 마우스가 들어오면 타이머 클리어
  };

  const handleEmojiListMouseLeave = () => {
    timeoutRef = setTimeout(() => {
      setShowEmojiList(false);
    }, 200);
  };

  const reactionMutation = useTaskCommentReactionMutation(
    taskId,
    commentId,
    userId,
  );

  const handleClickAddReaction = (type: ReactionType) => {
    const data: TaskCommentReaction = {
      id: uuid(),
      createdAt: new Date().toISOString(),
    };
    const mutationData: ReactionMutationProps = { type, data, action: 'add' };
    reactionMutation.mutate(mutationData);
  };

  return (
    <div
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      className='relative flex items-center'
    >
      <button
        type='button'
        className='rounded-full bg-text-secondary-dark dark:bg-text-secondary-dark'
      >
        <Image src={IconSmile} alt='emoji button' width={24} height={24} />
      </button>
      {showEmojiList && (
        <div
          onMouseEnter={handleEmojiListMouseEnter}
          onMouseLeave={handleEmojiListMouseLeave}
          className='absolute shadow-md bg-background-tertiary dark:bg-background-tertiary-dark top-[-45px] rounded-12 flex gap-12 py-7 px-14 text-2lg'
        >
          <button type='button' onClick={() => handleClickAddReaction('like')}>
            ❤️
          </button>
          <button type='button' onClick={() => handleClickAddReaction('thumb')}>
            👍
          </button>
          <button type='button' onClick={() => handleClickAddReaction('check')}>
            ✅
          </button>
        </div>
      )}
    </div>
  );
}

export default AddEmoji;
