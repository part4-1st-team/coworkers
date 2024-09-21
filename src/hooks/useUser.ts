import { getUser } from '@/services/userAPI';
import { useQuery } from '@tanstack/react-query';

function useUser() {
  const {
    data: user,
    isLoading,
    error,
  } = useQuery<User>({
    queryKey: ['user'],
    queryFn: () => getUser(),
  });

  return { user, isLoading, error };
}

export default useUser;
