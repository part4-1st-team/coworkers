import axios from 'axios';
import type { InternalAxiosRequestConfig } from 'axios';

const instance = axios.create({
  baseURL:
    process.env.NEXT_PUBLIC_API_URL ||
    'https://fe-project-cowokers.vercel.app/7-1',
  // withCredentials: true,
  headers: {
    'Content-Type': 'application/json',
  },
});

// 요청에 Authorization 헤더 추가 (로그인 이후)
instance.interceptors.request.use((config: InternalAxiosRequestConfig) => {
  const token = localStorage.getItem('accessToken');

  if (token) {
    // Authorization 헤더를 추가할 때 set 메서드를 사용하여 타입 호환성 유지
    config.headers.set('Authorization', `Bearer ${token}`);
  }
  return config;
});

// 응답 에러 처리
instance.interceptors.response.use(
  (response) => response,
  (error) => {
    // 에러 메시지를 처리할 수 있음
    if (error.response?.status === 401) {
      // 401 Unauthorized 처리 예시
      console.error('Unauthorized, 다시 로그인하세요.');
    }
    return Promise.reject(error);
  },
);

export default instance;
