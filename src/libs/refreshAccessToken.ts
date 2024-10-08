import useUserStore from '@/stores/userStore';
import axios from 'axios';
import { useRouter } from 'next/router';

const useRefreshAccessToken = () => {
  const router = useRouter();

  const refreshAccessToken = async (): Promise<string> => {
    const { refreshToken, setLogout, setLogin, setToken } =
      useUserStore.getState(); // 구조 분해 할당

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
      setToken(accessToken, newRefreshToken);

      return accessToken;
    } catch (error) {
      console.error('리프레시 토큰 갱신 실패:', error);

      // 리프레시 토큰 만료 시 로그아웃 후 로그인 페이지로 이동
      if (axios.isAxiosError(error) && error.response?.status === 401) {
        setLogout();
        alert('세션이 만료되었습니다. 다시 로그인하세요.'); // 사용자에게 알림
        router.push('/auth/signin');
      }

      throw new Error('토큰 갱신 실패. 다시 로그인하세요.');
    }
  };

  return refreshAccessToken;
};

export default useRefreshAccessToken;
