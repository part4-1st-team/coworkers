import axios from '@/libs/axios';

/**
 * 게시글에 댓글을 생성하는 함수
 * @param articleId 댓글을 쓸 게시글의 id
 * @param content (type: string) 생성할 댓글에 대한 내용
 * @returns (type: ArticleComment) 생성한 댓글에 대한 정보
 */
export async function postArticleComment(
  articleId: number,
  content: string,
): Promise<ArticleComment> {
  const res = await axios.post(`/articles/${articleId}/comments`, { content });

  return res.data;
}

/**
 * 게시글의 댓글 목록 조회
 * @param articleId 댓글 목록을 조회할 게시글 id
 * @param limit 조회할 댓글의 개수
 * @param cursor 페이지네이션 할 때 다음 댓글의 커서 (선택)
 * @returns (type: ArticleComments) 댓글 리스트 반환
 */
export async function getArticleComment(
  articleId: number,
  limit: number,
  cursor?: number,
): Promise<ArticleComments> {
  const res = await axios.get(`/articles/${articleId}/comments`, {
    params: {
      limit,
      ...(cursor ? { cursor } : {}),
    },
  });

  return res.data;
}

/**
 * 댓글 수정하는 함수
 * @param commentId 수정할 댓글의 id
 * @param content (type: string) 수정할 댓글의 내용
 * @returns (type: ArticleComment) 수정한 댓글에 대한 정보 반환
 */
export async function patchArticleComment(
  commentId: number,
  content: string,
): Promise<ArticleComment> {
  const res = await axios.patch(`/comments/${commentId}`, { content });

  return res.data;
}

/**
 * 게시글의 댓글을 삭제하는 함수
 * @param commentId 삭제할 댓글의 id
 * @returns 반환값 없음
 */
export async function deleteArticleComment(commentId: number): Promise<void> {
  await axios.delete(`/comments/${commentId}`);
}
