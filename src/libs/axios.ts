import type { InternalAxiosRequestConfig } from 'axios';
import axios from 'axios';
import useUserStore from '@/stores/userStore';
import useRefreshAccessToken from './refreshAccessToken';

// Axios 인스턴스 생성
const instance = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
  // withCredentials: true,
});

// 요청 인터셉터: 액세스 토큰이 있으면 요청에 추가
instance.interceptors.request.use((config: InternalAxiosRequestConfig) => {
  const user = localStorage.getItem('User');
  let token;

  if (user) {
    const parseUser = JSON.parse(user);
    token = parseUser.state.accessToken;
  }

  // config를 복사한 후 수정
  const updatedConfig = {
    ...config,
  };

  if (token) {
    updatedConfig.headers.Authorization = `Bearer ${token}`;
  }
  return updatedConfig;
});

// 응답 인터셉터: 401 에러 발생 시 토큰 갱신 시도
instance.interceptors.response.use(
  (response) => response, // 성공적인 응답은 그대로 반환
  async (error) => {
    const originalRequest = error.config;
    const { response } = error;

    const { setLogout } = useUserStore.getState();

    // 401 오류 발생 시 (만료된 액세스 토큰 처리)
    // eslint-disable-next-line no-underscore-dangle
    if (response?.status === 401 && !originalRequest._retry) {
      // eslint-disable-next-line no-underscore-dangle
      originalRequest._retry = true; // 무한 루프 방지

      try {
        // 리프레시 토큰을 사용하여 새로운 액세스 토큰을 가져옴
        const refreshAccessToken = useRefreshAccessToken();
        const accessToken = await refreshAccessToken();

        // 요청 헤더에 새로운 액세스 토큰을 추가하여 다시 시도
        originalRequest.headers.Authorization = `Bearer ${accessToken}`;
        return await axios(originalRequest);
      } catch (err) {
        return Promise.reject(err);
      }
    }
    return Promise.reject(error); // 다른 오류는 그대로 반환
  },
);

export default instance;

export const basicInstance = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});
