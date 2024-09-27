type ReactionType = 'like' | 'thumb' | 'check';

interface TaskCommentReaction {
  id: string;
  createdAt: string;
}

interface ReactionMutationProps {
  type: ReactionType;
  data: TaskCommentReaction;
  action?: Action;
}

type Action = 'add' | 'remove';
