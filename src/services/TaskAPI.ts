import axios from '@/libs/axios';

/**
 * (반복)일정을 생성
 * 아래 /{teamId}/groups/{groupId}/task-lists/{taskListId}/recurring 를 참고하세요
 * ONCE: 한 번만 생성 (해당 일 조회시, 할일 존재)
 * DAILY: 매일 생성 (시작일(startDate) 이후 어느 날짜를 조회해도 존재함)
 * WEEKLY: 매주 생성 (시작일(startDate) 이후 해당 조건에 따라 존재)
 * MONTHLY: 매월 생성 (시작일(startDate) 이후 해당 조건에 따라 존재)
 * @param groupId 할 일 목록을 가지고 있는 그룹 id
 * @param taskListId 조회할 할 일 목록의 id
 * @param data (type: PostTask) 수정할 할 일 데이터
 * @returns (type: TaskRecurring) 수정한 할 일 데이터 반환
 */
export async function postTask(
  groupId: number,
  taskListId: number,
  data: PostTask,
): Promise<TaskRecurring> {
  const res = await axios.post(
    `/groups/${groupId}/task-lists/${taskListId}/tasks`,
    data,
  );
  return res.data;
}

/**
 * 특정 일자, 특정 할일 목록의 할일 리스트
 * @param groupId 할 일 목록을 가지고 있는 그룹 id
 * @param taskListId 조회할 할 일 목록의 id
 * @param date 찾아보고 싶은 특정일자 (선택)
 * @returns (type: DateTask) 할 일 리스트에 대한 배열 반환
 */
export async function getTasks(
  groupId: number,
  taskListId: number,
  date?: string,
): Promise<DateTask> {
  const res = await axios.get(
    `/groups/${groupId}/task-lists/${taskListId}/tasks`,
    {
      params: date ? { date } : {},
    },
  );

  return res.data;
}

/**
 * 특정 할 일 목록의 할 일을 조회
 * @param groupId 할 일 목록을 가지고 있는 그룹 id
 * @param taskListId 조회할 할 일 목록의 id
 * @param taskId 조회하고 싶은 할 일 목록의 할 일 리스트의 아이디
 * @returns (type: DateTask) 특정 할 일 목록의 할 일 객체 반환
 */
export async function getTask(
  groupId: number,
  taskListId: number,
  taskId: number,
): Promise<DateTask> {
  const res = await axios.get(
    `/groups/${groupId}/task-lists/${taskListId}/tasks/${taskId}`,
  );

  return res.data;
}

/**
 * 특정 할 일 수정
 * @param groupId 할 일 목록을 가지고 있는 그룹 id
 * @param taskListId 조회할 할 일 목록의 id
 * @param taskId 조회하고 싶은 할 일 목록의 할 일 리스트의 아이디
 * @returns (type: PatchAfterTask) 수정 후 할 일에 대한 정보 객체 반환
 */
export async function patchTask(
  groupId: number,
  taskListId: number,
  taskId: number,
  data: PatchTask,
): Promise<PatchAfterTask> {
  const res = await axios.patch(
    `/groups/${groupId}/task-lists/${taskListId}/tasks/${taskId}`,
    data,
  );

  return res.data;
}

/**
 * 특정 할 일 삭제
 * @param groupId 할 일 목록을 가지고 있는 그룹 id
 * @param taskListId 조회할 할 일 목록의 id
 * @param taskId 조회하고 싶은 할 일 목록의 할 일 리스트의 아이디
 * 반환값 없음, 204 코드 반환
 */
export async function deleteTask(
  groupId: number,
  taskListId: number,
  taskId: number,
): Promise<void> {
  await axios.delete(
    `/groups/${groupId}/task-lists/${taskListId}/tasks/${taskId}`,
  );
}

/**
 * 할 일 순서 변경
 * @param groupId 할 일 목록을 가지고 있는 그룹 id
 * @param taskListId 조회할 할 일 목록의 id
 * @param taskId 조회하고 싶은 할 일 목록의 할 일의 아이디
 * @param displayIndex 순서를 바꾸고 싶은 할일의 인덱스
 * 반환값 없음 204 코드 반환
 */
export async function patchTaskOrder(
  groupId: number,
  taskListId: number,
  taskId: number,
  displayIndex: number,
): Promise<void> {
  await axios.patch(
    `/groups/${groupId}/task-lists/${taskListId}/tasks/${taskId}`,
    { displayIndex },
  );
}

/**
 * 할 일이 아닌 반복 설정을 삭제 하는 함수
 * @param groupId 할 일 목록을 가지고 있는 그룹 id
 * @param taskListId 조회할 할 일 목록의 id
 * @param taskId 조회하고 싶은 할 일 목록의 할 일의 아이디
 * @param recurringId 반복 할 일 id - task 객체의 recurringId 필드
 * 반환값 없음 204 코드 반환
 */
export async function deleteTaskRecurring(
  groupId: number,
  taskListId: number,
  taskId: number,
  recurringId: number,
): Promise<void> {
  await axios.delete(
    `/groups/${groupId}/task-lists/${taskListId}/tasks/${taskId}/recurring/${recurringId}`,
  );
}

/**
 *
 * @param groupId 할 일 목록을 가지고 있는 그룹 id
 * @param taskListId 조회할 할 일 목록의 id
 * @param taskId 조회하고 싶은 할 일 목록의 할 일의 아이디
 * @param data (type: PostRecurring) 반복 설정할 정보를 담은 객체
 * @returns (type: Recurring)반복 설정에 대한 정보를 담은 객체 반환
 */
export async function postRecurring(
  groupId: number,
  taskListId: number,
  taskId: number,
  data: PostRecurring,
): Promise<Recurring> {
  const res = await axios.post(
    `/groups/${groupId}/task-lists/${taskListId}/tasks/${taskId}/recurring`,
    data,
  );

  return res.data;
}
