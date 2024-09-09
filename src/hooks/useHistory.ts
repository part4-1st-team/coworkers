import { getUserHistory } from '@/services/userAPI';
import { useQuery } from '@tanstack/react-query';

function useHistory() {
  const {
    data: history,
    isLoading,
    error,
  } = useQuery<DoneTask[]>({
    queryKey: ['getHistory'],
    queryFn: () => getUserHistory().then((data) => data.tasksDone),
  });

  return { history, isLoading, error };
}

export default useHistory;
