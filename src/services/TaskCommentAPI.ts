import axios from '@/libs/axios';

/**
 * 댓글들을 확인하는 함수
 * @param taskId 댓글을 확인할 할 일의 id
 * @returns (type: Comment[]) 댓글 리스트 반환
 */
export async function getTaskComments(taskId: number): Promise<Comment[]> {
  const res = await axios.get(`/tasks/${taskId}/comments`);

  return res.data;
}

/**
 * task의 댓글 생성 함수
 * @param taskId 댓글을 달 할 일 task의 id
 * @param content (type: string) 생성할 댓글의 내용
 * @returns (type: ResponseComment) 생성한 댓글에 대한 정보를 담고있는 객체 반환
 */
export async function postTaskComment(
  taskId: number,
  content: string,
): Promise<ResponseComment> {
  const res = await axios.post(`/tasks/${taskId}/comments`, { content });

  return res.data;
}

/**
 *
 * @param taskId 댓글을 가지고 있는 할 일 task의 id
 * @param commentId 수정할 댓글의 id
 * @param content (type: string) 수정할 댓글의 수정 내용
 * @returns (type: ResponseComment) 생성한 댓글에 대한 정보를 담고있는 객체 반환
 */
export async function patchTaskComment(
  taskId: number,
  commentId: number,
  content: string,
): Promise<ResponseComment> {
  const res = await axios.patch(`/tasks/${taskId}/comments/${commentId}`, {
    content,
  });

  return res.data;
}

/**
 * task 댓글 삭제 함수
 * @param taskId 삭제할 댓글의 task id
 * @param commentId 삭제할 댓글의 id
 * @returns 반환값 없음
 */
export async function deleteTaskComment(
  taskId: number,
  commentId: number,
): Promise<void> {
  await axios.delete(`/tasks/${taskId}/comments/${commentId}`);
}
