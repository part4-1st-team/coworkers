import axios from 'axios';
import type { InternalAxiosRequestConfig } from 'axios';
import jwt_decode from 'jwt-decode';
import { refreshAccessToken, isTokenExpired } from './tokenUtils'; // 토큰 유틸 함수들

const instance = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

instance.interceptors.request.use(
  async (config: InternalAxiosRequestConfig) => {
    let token = localStorage.getItem('accessToken');

    if (token && isTokenExpired(token)) {
      try {
        token = await refreshAccessToken(); // 만료된 경우 새로운 액세스 토큰 발급
      } catch (error) {
        // 토큰 갱신 실패 시 처리
        console.error('토큰 갱신에 실패했습니다.');
        return Promise.reject(error);
      }
    }

    if (token) {
      config.headers.set('Authorization', `Bearer ${token}`);
    }

    return config;
  },
  (error) => Promise.reject(error),
);

// 응답 에러 처리
instance.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      console.error('Unauthorized, 다시 로그인하세요.');
    }
    return Promise.reject(error);
  },
);

export default instance;
