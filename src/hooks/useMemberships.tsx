import { getUserMemberships } from '@/services/userAPI';
import { useQuery } from '@tanstack/react-query';

function useMemberships() {
  const {
    data: memberships,
    isLoading,
    error,
  } = useQuery({
    queryKey: ['memberships'],
    queryFn: () => getUserMemberships(),
  });

  return { memberships: memberships ?? [], isLoading, error };
}

export default useMemberships;
