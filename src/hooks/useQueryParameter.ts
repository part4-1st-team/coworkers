import { useRouter } from 'next/router';

function useQueryParameter() {
  const router = useRouter();
  const { groupId, tasklistId } = router.query;

  return { groupId: Number(groupId), taskListId: Number(tasklistId) };
}

export default useQueryParameter;
