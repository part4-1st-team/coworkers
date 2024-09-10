import axios from '@/libs/axios';
import { isAxiosError } from 'axios';

interface LoginPayload {
  email: string;
  password: string;
}

interface LoginResponse {
  accessToken: string;
  refreshToken: string;
  user: {
    id: number;
    email: string;
    nickname: string;
    updatedAt: string;
    createdAt: string;
    image: string | null;
    teamId: string;
  };
}

async function login(payload: LoginPayload): Promise<LoginResponse> {
  try {
    const response = await axios.post<LoginResponse>('/auth/signIn', payload);
    // eslint-disable-next-line no-console
    console.log(response);
    return response.data;
  } catch (error) {
    // 오류 처리
    if (isAxiosError(error) && error.response) {
      const errorMessage =
        error.response?.data?.message || 'An unknown error occurred';
      // eslint-disable-next-line no-console
      console.error('API error:', errorMessage);
    } else {
      // eslint-disable-next-line no-console
      console.error('Unexpected error:', error);
      throw new Error('Unexpected error occurred');
    }
    throw error;
  }
}

export default login;
