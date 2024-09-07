import axios from '@/libs/axios';

/**
 * 원하는 그룹에 대한 정보를 조회하는 함수
 * @param groupId 할 일 목록을 가지고 있는 그룹 id
 * @returns (type: Group) 원하는 그룹 정보 객체 반환
 */
export async function getGroup(groupId: number): Promise<Group> {
  const res = await axios.get(`/groups/${groupId}`);

  return res.data;
}

/**
 * 원하는 그룹에 대한 정보를 수정하는 함수
 * @param groupId 할 일 목록을 가지고 있는 그룹 id
 * @param data (type: PatchGroup) 수정할 정보를 담고 있는 데이터 객체
 * @returns (type: ResponseGroup) 수정된 그룹에 대한 정보 객체
 */
export async function patchGroup(
  groupId: number,
  data: PatchGroup,
): Promise<ResponseGroup> {
  const res = await axios.patch(`/groups/${groupId}`, data);

  return res.data;
}

/**
 * 원하는 그룹을 삭제하는 함수
 * @param groupId 삭제할 그룹 id
 * @returns 반환값 없음
 */
export async function deleteGroup(groupId: number): Promise<void> {
  await axios.delete(`/groups/${groupId}`);
}

/**
 * 그룹을 생성하는 함수
 * @param data (type: PostGroupRequest) 그룹을 생성할 데이터를 담고 있는 객체
 * @returns (type: PostGroupResponse) 생성한 그룹에 대한 정보를 담고 있는 객체 반환
 */
export async function postGroup(
  data: PostGroupRequest,
): Promise<PostGroupResponse> {
  const res = await axios.post('/groups', data);

  return res.data;
}

/**
 * 그룹에 소속된 유저 조회 그룹 조회(GET /groups/:id)시, 멤버로 가입된 유저 목록도 함께 조회됨.
 * @param groupId 조회할 그룹 Id
 * @param memberUserId 조회할 멤버 Id
 * @returns (type: Member) 해당 그룹에 대한 멤버 정보 반환
 */
export async function getGroupMember(
  groupId: number,
  memberUserId: number,
): Promise<Member> {
  const res = await axios.get(`/groups/${groupId}/member/${memberUserId}`);

  return res.data;
}

/**
 * 그룹에서 멤버를 삭제하는 함수
 * @param groupId 멤버를 삭제할 그룹의 id
 * @param memberUserId 삭제할 멤버 id
 * @returns 반환값 없음, 204코드 반환
 */
export async function deleteGroupMember(
  groupId: number,
  memberUserId: number,
): Promise<void> {
  await axios.delete(`/groups/${groupId}/member/${memberUserId}`);
}

/**
 * 초대 링크용 토큰 생성
 * 초대 링크에 토큰을 포함시켜서, 초대 링크를 받은 사용자가 접속시, 토큰을 사용해서 초대를 수락하여 스스로를 그룹에 포함시키게 됨.
 * @param groupId 초대할 그룹 Id
 * @returns (type: string) 초대용 링크 토큰 반환
 */
export async function getGroupInvitation(groupId: number): Promise<string> {
  const res = await axios.get(`/groups/${groupId}/invitation`);

  return res.data;
}

/**
 * GET {id}/invitation으로 생성한 토큰으로, 초대를 수락하는 엔드포인트
 * @param data 초대를 수락하기 위한 정보를 담은 객체
 * @param data-userEmail : 초대를 수락하는 유저의 이메일
 * @param data-token : 초대 링크에 포함되어있는 토큰
 * @returns (type: InvitedGroup) 초대를 수락한 그룹 id 객체 반환
 */
export async function postGroupInvitation(
  data: AcceptInvitation,
): Promise<InvitedGroup> {
  const res = await axios.post('/groups/accept-invitation', data);

  return res.data;
}

/**
 * 초대 링크없이 그룹에 유저를 추가하는 엔드포인트
 * @param groupId 유저를 초대할 그룹 id
 * @param data (type: userEmail) 초대할 유저의 이메일 값을 담고 있는 객체
 * @returns 반환값 없음, 204 코드 반환
 */
export async function postGroupMember(
  groupId: number,
  data: PostGroupMember,
): Promise<void> {
  await axios.post(`/groups/${groupId}/member`, data);
}

/**
 * 특정 일자, 특정 할일 리스트의 할일 리스트
 * @param groupId 할일 리스트를 조회할 그룹의 id
 * @param date 날짜 (선택)
 * @returns (type: Task[]) 할 일 리스트에 대한 배열
 */
export async function getGroupTasks(
  groupId: number,
  date?: string,
): Promise<Task[]> {
  const res = await axios.get(`/groups/${groupId}/tasks`, {
    params: date ? { date } : {},
  });

  return res.data;
}
