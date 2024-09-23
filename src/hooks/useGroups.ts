import { getUserGroups } from '@/services/userAPI';
import { useQuery } from '@tanstack/react-query';

function useGroups() {
  const {
    data: groups,
    isLoading,
    error,
  } = useQuery({
    queryKey: ['groups'],
    queryFn: () => getUserGroups(),
  });

  return { groups: groups ?? [], isLoading, error };
}

export default useGroups;
