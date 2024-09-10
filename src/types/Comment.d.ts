interface BaseComment {
  content: string;
  updatedAt: string;
  createdAt: string;
  id: number;
  user: BaseUser;
}

interface Comment extends BaseComment {
  taskId: number;
  userId: number;
}

interface ResponseComment extends BaseComment {}

interface CommentState {
  content: string;
}
