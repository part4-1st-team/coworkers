export interface ArticleComment {
  writer: Writer;
  updatedAt: string;
  createdAt: string;
  content: string;
  id: number;
}

export interface ArticleComments {
  nextCursor: number | null;
  list: ArticleComment[];
}

export interface ArticleResponse extends ArticleComment {
  title: string;
  image: string | null;
  likeCount: number;
}

export interface RequestArticle {
  title: string;
  content: string;
  image?: string | null;
}

export interface Article extends ArticleResponse {
  commentCount: number;
}

export interface Articles {
  totalCount: number;
  list: Article[];
}

export type ArticleOrder = 'recent' | 'like';

export interface PatchResponseArticle extends ArticleComment {
  likeCount: number;
  image: string | null;
  title: string;
  commentCount: number;
  isLiked: boolean;
}
