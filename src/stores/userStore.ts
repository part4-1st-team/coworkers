// userStore.ts
import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { setTokenCookies, removeTokenCookies } from '@/utils/cookieUtils';

// user 인터페이스 추가

interface UserStoreState {
  user: BasicUser | null;
  accessToken: string | null;
  refreshToken: string | null;
  isLoggedIn: boolean;
  isSocialLogin: 'kakao' | 'google' | null;
  hasAgreedToTerms: boolean; // 약관 동의 여부
  setLogin: (
    user: User,
    atoken: string,
    rToken: string,
    isSocialLogin?: 'kakao' | 'google' | null,
  ) => void;
  setLogout: () => void;
  setToken: (aToken: string, rToken: string) => void;
  removeToken: () => void;
  setAgreedToTerms: (agreed: boolean) => void; // 약관 동의 상태 업데이트
}

const useUserStore = create<UserStoreState>()(
  persist(
    (set) => ({
      user: null,
      accessToken: null,
      isLoggedIn: false,
      refreshToken: null,
      isSocialLogin: null,
      hasAgreedToTerms: false,
      setLogin: (
        newUser: User,
        aToken: string,
        rToken: string,
        isSocialLogin = null, // 인자 3개 전달 오류 해결을 위해 기본값 설정
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
          isSocialLogin: null, // 로그아웃 시 간편 로그인 여부 초기화
          hasAgreedToTerms: false,
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
      setAgreedToTerms: (agreed: boolean) => {
        set({
          hasAgreedToTerms: agreed,
        });
      }, // 새로운 메서드 구현
    }),
    {
      name: 'User',
    },
  ),
);

export default useUserStore;
