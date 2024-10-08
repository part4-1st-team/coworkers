// userStore.ts
import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { setTokenCookies, removeTokenCookies } from '@/utils/cookieUtils';
import { useQueryClient } from '@tanstack/react-query';

// user 인터페이스 추가
interface UserStoreState {
  user: BasicUser | null;
  accessToken: string | null;
  refreshToken: string | null;
  isLoggedIn: boolean;
  isSocialLogin: 'kakao' | 'google' | null;
  setLogin: (
    user: User,
    atoken: string,
    rToken: string,
    isSocialLogin: 'kakao' | 'google' | null,
  ) => void;
  setLogout: () => void;
  setToken: (aToken: string, rToken: string) => void;
  removeToken: () => void;
}

const useUserStore = create<UserStoreState>()(
  persist(
    (set) => {
      const queryClient = useQueryClient();

      return {
        user: null,
        accessToken: null,
        isLoggedIn: false,
        refreshToken: null,
        isSocialLogin: null,

        // 로그인 메소드
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

          // useUser 쿼리 갱신
          queryClient.invalidateQueries({ queryKey: ['user'] }); // 쿼리 갱신
        },

        // 로그아웃 메소드
        setLogout: () => {
          set({
            user: null,
            isLoggedIn: false,
            accessToken: null,
            refreshToken: null,
            isSocialLogin: null, // 로그아웃 시 간편 로그인 여부 초기화
          });
          // 쿠키에서 토큰 삭제
          removeTokenCookies();

          // useUser 쿼리 갱신
          queryClient.invalidateQueries({ queryKey: ['user'] }); // 로그아웃 후 쿼리 갱신을 통해 캐시를 무효화
        },

        // 토큰 업데이트 메소드
        setToken: (aToken: string, rToken: string) => {
          set({
            accessToken: aToken,
            refreshToken: rToken,
          });
        },

        // 토큰 삭제 메소드
        removeToken: () => {
          set({
            accessToken: null,
            refreshToken: null,
          });
        },
      };
    },
    {
      name: 'User',
    },
  ),
);

export default useUserStore;
