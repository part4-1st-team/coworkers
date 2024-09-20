interface ArticleComment {
  writer: Writer;
  updatedAt: string;
  createdAt: string;
  content: string;
  id: number;
}

interface ArticleComments {
  nextCursor: number | null;
  list: ArticleComment[];
}

interface ArticleResponse extends ArticleComment {
  title: string;
  image: string | null;
  likeCount: number;
}

interface RequestArticle {
  title: string;
  content: string;
  image?: string | null;
}

interface Article extends ArticleResponse {
  commentCount: number;
  isLiked: boolean;
}

interface Articles {
  totalCount: number;
  list: Article[];
}

type ArticleOrder = 'recent' | 'like';

interface PatchResponseArticle extends ArticleComment {
  likeCount: number;
  image: string | null;
  title: string;
  commentCount: number;
  isLiked: boolean;
}
