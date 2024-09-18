import axios from '@/libs/axios';
import { StdioNull } from 'child_process';
import {
  Article,
  ArticleResponse,
  RequestArticle,
  Articles,
  PatchResponseArticle,
  ArticleOrder,
} from '@/types/Article';

/**
 * 게시글 작성 함수
 * @param data (type: RequestArticle)
 * @returns (type: ArticleResponse) 작성한 게시글에 대한 정보 반환
 */
export async function postArticle(
  data: RequestArticle,
): Promise<ArticleResponse> {
  const res = await axios.post('/articles', data);

  return res.data;
}

/**
 * 게시글 목록 조회
 * @param page number | null 페이지 번호 (선택)
 * @param pageSize number | null 페이지 당 게시글 수 (선택)
 * @param orderBy ArticleOrder(recent | like) | null 정렬 기준 (선택)
 * @param keyword string | null 키워드 (선택)
 * @returns (type: Articles) 게시글 목록 배열 반환
 */
export async function getArticles(
  page?: number | null,
  pageSize?: number | null,
  orderBy?: ArticleOrder | null,
  keyword?: string | StdioNull,
): Promise<Articles> {
  const res = await axios.get('/articles', {
    params: {
      ...(page ? { page } : {}),
      ...(pageSize ? { pageSize } : {}),
      ...(orderBy ? { orderBy } : {}),
      ...(keyword ? { keyword } : {}),
    },
  });

  return res.data;
}

/**
 * 게시글 상세 조회 함수
 * @param articleId 상세 조회할 게시글 id
 * @returns (type: Article) 해당 게시글 반환
 */
export async function getArticleDetail(articleId: number): Promise<Article> {
  const res = await axios.get(`/articles/${articleId}`);

  return res.data;
}

/**
 * 게시글 수정
 * @param articleId 수정할 게시글의 id
 * @param data (type : RequestArticle) 수정할 게시글의 데이터
 * @returns (type PatchResponseArticle) 수정하고 나서 게시글 데이터 반환
 */
export async function patchArticle(
  articleId: number,
  data: RequestArticle,
): Promise<PatchResponseArticle> {
  const res = await axios.patch(`/articles/${articleId}`, data);

  return res.data;
}

/**
 * 게시글 삭제 함수
 * @param articleId 삭제할 게시글의 id
 * @returns 반환값 없음
 */
export async function deleteArticle(articleId: number): Promise<void> {
  await axios.delete(`/articles/${articleId}`);
}

/**
 * 게시글에 좋아요를 다는 함수
 * @param articleId 좋아요를 달 게시글의 id
 * @returns (type PatchResponseArticle) 좋아요을 달고 나서 게시글에 대한 정보 반환
 */
export async function postArticleLike(
  articleId: number,
): Promise<PatchResponseArticle> {
  const res = await axios.post(`/articles/${articleId}/like`);

  return res.data;
}

/**
 * 게시글에 좋아요를 삭제하는 함수
 * @param articleId 좋아요를 삭제할 게시글의 id
 * @returns (type PatchResponseArticle) 좋아요을 삭제하고 나서 게시글에 대한 정보 반환
 */
export async function deleteArticleLike(
  articleId: number,
): Promise<PatchResponseArticle> {
  const res = await axios.delete(`/articles/${articleId}/like`);

  return res.data;
}
