import { useQuery } from '@tanstack/react-query';
import { getUser } from '@/services/userAPI'; // getUser 함수 가져오기

const CurrentUser = () => {
  return useQuery({
    queryKey: ['currentUser'],
    queryFn: getUser,
    staleTime: 1000 * 60 * 5,
  });
};

export default CurrentUser;
