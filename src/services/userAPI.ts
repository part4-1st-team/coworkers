import axios from '@/libs/axios';
import {
  PatchPassword,
  PatchUserType,
  PostResetPassword,
  PostSendResetPasswordEmail,
} from '@/types/userAPIType';

/**
 * 유저 정보 제공
 * @returns (type: User) 유저 정보 반환
 */
export async function getUser(): Promise<User> {
  const res = await axios.get('/user');
  return res.data;
}

/**
 *
 * @param data - nickname과 image를 담은 객체
 * @returns 응답 메시지 객체 반환
 */
export async function patchUser(data: PatchUserType): Promise<Message> {
  const res = await axios.patch('/user', data);
  return res.data;
}

/**
 * 회원 탈퇴
 * 응답 메시지 없음, 204 코드 반환
 */
export async function deleteUser(): Promise<void> {
  await axios.delete('/user');
}

/**
 * 유저가 속한 그룹들을 확인
 * @returns (type: Group) 유저가 속한 그룹 배열 반환
 */
export async function getUserGroups(): Promise<Group[]> {
  const res = await axios.get('/user/groups');
  return res.data;
}

/**
 * 유저의 멤비쉽 확인
 * @returns (type: Membership) 유저의 멤버쉽 배열 반환
 */
export async function getUserMemberships(): Promise<Membership[]> {
  const res = await axios.get('/user/memberships');
  return res.data;
}

/**
 * 완료한 작업 조회
 * @returns (type: History) 유저가 완료한 작업한 내역이 담긴 객체 반환
 */
export async function getUserHistory(): Promise<History> {
  const res = await axios.get('/user/history');
  return res.data;
}

/**
 * 비밀번호 재설정 이메일 전송
 * @returns 응답 메시지 반환
 */
export async function postUserSendResetPasswordEmail(
  data: PostSendResetPasswordEmail,
): Promise<Message> {
  const res = await axios.post('/user/send-reset-password-email', data);
  return res.data;
}

/**
 * 이메일로 전달받은 링크에서 비밀번호 초기화
 * @param data (비밀번호 재설정, 비밀번호, 토큰) 객체
 * @returns 응답 메시지 반환
 */
export async function postUserResetPassword(
  data: PostResetPassword,
): Promise<Message> {
  const res = await axios.post('/user/reset-password', data);
  return res.data;
}

/**
 * 비밀번호 수정
 * @param data (비밀번호 재설정, 비밀번호) 객체
 * @returns 응답 메시지 반환
 */
export async function patchUserPassword(data: PatchPassword): Promise<Message> {
  const res = await axios.patch('/user/password', data);
  return res.data;
}
