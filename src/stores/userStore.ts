// userStore.ts
import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { setTokenCookies, removeTokenCookies } from '@/utils/cookieUtils';
import { NextRouter } from 'next/router';

// user 인터페이스 추가
interface User {
  id: number;
  email: string;
  nickname: string;
  updatedAt: string;
  createdAt: string;
  image: string | null;
  teamId: string;
}

interface UserStoreState {
  user: User | null;
  accessToken: string | null;
  refreshToken: string | null;
  isLoggedIn: boolean;
  isSocialLogin: boolean; // 간편 로그인 여부 상태 추가
  setLogin: (user: User, atoken: string, rToken: string) => void;
  setLogout: () => void;
  setToken: (aToken: string, rToken: string) => void;
  removeToken: () => void;
}

const useUserStore = create<UserStoreState>()(
  persist(
    (set) => ({
      user: null,
      accessToken: null,
      isLoggedIn: false,
      refreshToken: null,
      isSocialLogin: false, // 기본값 false
      setLogin: (
        newUser: User,
        aToken: string,
        rToken: string,
        isSocialLogin = false, // 인자 3개 전달 오류 해결을 위해 기본값 설정
      ) => {
        set({
          user: newUser,
          isLoggedIn: true,
          accessToken: aToken,
          refreshToken: rToken,
          isSocialLogin, // 간편 로그인 여부 저장
        });
        // 쿠키에 토큰 저장
        setTokenCookies(aToken, rToken);
      },
      // 로그아웃 메소드
      setLogout: () => {
        set({
          user: null,
          isLoggedIn: false,
          accessToken: null,
          refreshToken: null,
          isSocialLogin: false, // 로그아웃 시 간편 로그인 여부 초기화
        });
        // 쿠키에서 토큰 삭제
        removeTokenCookies();
      },
      setToken: (aToken: string, rToken: string) => {
        set({
          accessToken: aToken,
          refreshToken: rToken,
        });
      },
      removeToken: () => {
        set({
          accessToken: null,
          refreshToken: null,
        });
      },
    }),
    {
      name: 'User',
    },
  ),
);

export default useUserStore;
