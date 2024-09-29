import useTaskCommentReaction from '@/hooks/useTaskCommentReaction';
import useUserStore from '@/stores/userStore';
import clsx from 'clsx';
import { useState } from 'react';
import { v4 as uuid } from 'uuid';
import useTaskCommentReactionMutation from './useTaskCommentReactionMutation';

const REACTIONS = {
  like: '❤️',
  thumb: '👍',
  check: '✅',
};

interface EmojiProps {
  type: ReactionType;
  comment: Comment;
}

function Emoji({ type, comment }: EmojiProps) {
  const reaction = REACTIONS[type];
  const { taskId, id: commentId } = comment;

  const user = localStorage.getItem('User');
  const parseUser = JSON.parse(user!);

  const userId = parseUser.state.user.id;

  const { reactionUserList, reactionCount } = useTaskCommentReaction(
    taskId,
    commentId,
    type,
  );

  const [isClicked, setIsClicked] = useState<boolean>(() =>
    reactionUserList
      ? reactionUserList.some((reactionUser) => {
          return Number(reactionUser.userId) === userId;
        })
      : false,
  );

  const addReactionMutation = useTaskCommentReactionMutation(
    taskId,
    commentId,
    userId,
  );

  const handleClickReaction = () => {
    const data: TaskCommentReaction = {
      id: uuid(),
      createdAt: new Date().toISOString(),
    };
    const mutationData: ReactionMutationProps = { type, data };
    addReactionMutation.mutate(mutationData);
    setIsClicked((prev) => !prev);
  };

  if (!reactionUserList || reactionCount === 0) return null;

  return (
    <button
      type='button'
      onClick={handleClickReaction}
      className={clsx(
        'bg-background-tertiary dark:bg-background-tertiary-dark rounded-12 flex items-center gap-8 text-text-secondary dark:text-text-secondary-dark text-md font-medium px-8 py-4',
        'hover:outline hover:outline-brand-primary',
        !isClicked && 'bg-brand-primary',
      )}
    >
      <span>{reaction}</span>
      <span>{reactionCount}</span>
    </button>
  );
}

export default Emoji;
