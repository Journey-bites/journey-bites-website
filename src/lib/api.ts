import jsCookie from 'js-cookie';
import { ApiResponse, LoginResponse } from '@/types/apiResponse';
import { JOURNEY_BITES_COOKIE } from '@/constants';
import { ApiService } from './ApiService';

const apiService = new ApiService();

export async function login({ email, password }: { email: string; password: string }) {
  const data = { email, password };
  const res = await apiService.fetchData<LoginResponse>('post', '/auth/login', { data });

  if(res.data) {
    jsCookie.set(JOURNEY_BITES_COOKIE, res.data.token, { expires: 3 });
  }
  return res.data;
}

export async function register({ email, password, displayName }: { email: string; password: string, displayName: string }) {
  const data = { email, password, displayName };
  const res = await apiService.fetchData<ApiResponse>('post', '/auth/register', { data });
  return res;
}

export async function verifyEmail(email: string) {
  const data = { email };
  const res = await apiService.fetchData<ApiResponse>('post', '/auth/verify-email', { data });
  return res;
}