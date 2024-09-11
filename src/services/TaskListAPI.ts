import axios from '@/libs/axios';

/**
 * 할 일 목록 리스트 조회
 * @param groupId 할 일 목록을 가지고 있는 그룹 id
 * @param date 특정 날짜 (선택)
 * @returns (type: ResponseTaskLists) 할 일 목록 리스트 데이터 반환
 */
export async function getTaskLists(
  groupId: number,
  date?: string,
): Promise<ResponseTaskLists> {
  const res = await axios.get(`/groups/${groupId}`, {
    params: {
      date,
    },
  });

  return res.data;
}

/**
 * 할 일 목록 조회
 * @param groupId 할 일 목록을 가지고 있는 그룹 id
 * @param taskListId 조회할 할 일 목록의 id
 * @param date 특정 날짜 (선택)
 * @returns (type: TaskList) 할 일 목록 데이터 반환
 */
export async function getTaskList(
  groupId: number,
  taskListId: number,
  date?: string,
): Promise<TaskList> {
  const res = await axios.get(`/groups/${groupId}/task-lists/${taskListId}`, {
    params: {
      date,
    },
  });

  return res.data;
}

/**
 * 할 일 목록 수정
 * @param groupId 할 일 목록을 가지고 있는 그룹 id
 * @param taskListId 조회할 할 일 목록의 id
 * @param name 수정할 할 일 목록의 이름
 * @returns (type: TaskListInform)수정된 할 일 목록에 대한 정보를 반환
 */
export async function patchTaskLists(
  groupId: number,
  taskListId: number,
  name: string,
): Promise<TaskListInform> {
  const res = await axios.patch(`/groups/${groupId}/task-lists/${taskListId}`, {
    name,
  });
  return res.data;
}

/**
 * 할 일 목록 삭제
 * @param groupId 할 일 목록을 가지고 있는 그룹 id
 * @param taskListId 조회할 할 일 목록의 id
 * 반환값 없음, 204 코드 반환
 */
export async function deleteTaskList(
  groupId: number,
  taskListId: number,
): Promise<void> {
  await axios.delete(`/groups/${groupId}/task-lists/${taskListId}`);
}

/**
 * 새로운 할 일 목록 생성
 * @param groupId 할 일 목록을 가지고 있는 그룹 id
 * @param name: 수정할 할 일 목록 이름
 * @returns (type: TaskListInform) 할 일 목록에 대한 정보 반환
 */
export async function postTaskList(
  groupId: number,
  name: string,
): Promise<TaskListInform> {
  const res = await axios.post(`/groups/${groupId}/task-lists`, { name });
  return res.data;
}

/**
 * 할 일 목록 순서 변경
 * @example taskList의 displayIndex를 변경
 * 해당 taskList가 기존 displayIndex를 버리고 넘어가면서, 그 빈 displayIndex는 "한 자리씩 당겨지는 식"으로 변경
 * [1,2,3,4] => (3을 0 인덱스로) => [3,1,2,4] => (4를 1 인덱스로) => [3,4,1,2]
 *
 * @param groupId 할 일 목록을 가지고 있는 그룹 id
 * @param taskListId 조회할 할 일 목록의 id
 * @param displayIndex 변경할 인덱스
 * 반환값 없음, 204코드 반환
 */
export async function patchTaskListOrder(
  groupId: number,
  taskListId: number,
  displayIndex: number,
): Promise<void> {
  await axios.patch(`/groups/${groupId}/task-lists/${taskListId}/order`, {
    displayIndex,
  });
}
