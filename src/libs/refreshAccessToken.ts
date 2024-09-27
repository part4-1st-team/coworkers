import useUserStore from '@/stores/userStore';
import axios from 'axios';

const useRefreshAccessToken = () => {
  const setLogin = useUserStore((state) => state.setLogin);
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
      setLogin(user, accessToken, newRefreshToken);

      // 유저 정보와 함께 localStorage에 새 토큰 저장
      setToken(accessToken, refreshToken);

      return accessToken;
    } catch (error) {
      console.error('리프레시 토큰 갱신 실패:', error);
      throw new Error('토큰 갱신 실패. 다시 로그인하세요.');
    }
  };

  return refreshAccessToken;
};

export default useRefreshAccessToken;
