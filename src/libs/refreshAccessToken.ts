import useUserStore from '@/stores/userStore';
import axios from 'axios';
import { useRouter } from 'next/router';

const useRefreshAccessToken = () => {
  const router = useRouter();
  const setLogin = useUserStore((state) => state.setLogin);
  const setLogout = useUserStore((state) => state.setLogout);
  const refreshToken = useUserStore((state) => state.refreshToken);
  const setToken = useUserStore((state) => state.setToken);

  const refreshAccessToken = async (): Promise<string> => {
    if (!refreshToken) throw new Error('리프레시 토큰이 없습니다.');

    try {
      const response = await axios.post(
        `${process.env.NEXT_PUBLIC_API_URL}/auth/refresh-token`,
        { refreshToken },
      );
      const { accessToken, newRefreshToken, user } = response.data;

      // 새로운 액세스 및 리프레시 토큰 저장
      setLogin(user, accessToken, newRefreshToken, null);
      // TODO 여기 로그인 상태 설정

      // userStore에 토큰 저장
      setToken(accessToken, refreshToken);

      return accessToken;
    } catch (error) {
      setLogout();
      console.error('리프레시 토큰 갱신 실패:', error);

      // 로그아웃 후 로그인 페이지로 리다이렉트
      router.push('/auth/signin');

      throw new Error('토큰 갱신 실패. 다시 로그인하세요.');
    }
  };

  return refreshAccessToken;
};

export default useRefreshAccessToken;
