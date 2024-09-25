import { getUserGroups } from '@/services/userAPI';
import { getGroup } from '@/services/GroupAPI';
import { useQuery } from '@tanstack/react-query';

function useGroups(groupId?: number) {
  const {
    data: groups,
    isLoading: isGroupsLoading,
    error: groupsError,
  } = useQuery({
    queryKey: ['groups'],
    queryFn: () => getUserGroups(),
  });

  const {
    data: group,
    isLoading: isGroupLoading,
    error: groupError,
  } = useQuery({
    queryKey: ['group', groupId],
    queryFn: () => (groupId ? getGroup(groupId) : Promise.resolve(null)),
    enabled: !!groupId,
  });

  const groupMembers = group?.members ?? [];
  const groupTaskLists = group?.taskLists ?? [];

  return {
    groups: groups ?? [],
    isGroupsLoading,
    groupsError,
    group,
    isGroupLoading,
    groupError,
    groupMembers,
    groupTaskLists,
  };
}

export default useGroups;
