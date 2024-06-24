import jsCookie from 'js-cookie';
import type { AxiosRequestConfig, Method } from 'axios';
import { JOURNEY_BITES_COOKIE } from '@/constants';
import { ApiService } from './ApiService';
import { ApiResponse, UserFollowResponse, UserResponse } from '@/types/apiResponse';
import { Profile } from '@/types';
import { CreateArticleRequest } from '@/types/article';

const apiService = new ApiService();

async function fetchWithToken<T>(method: Method, url: string, options?: AxiosRequestConfig): Promise<T> {
  const token = jsCookie.get(JOURNEY_BITES_COOKIE);
  if (!token) {
    throw new Error('Authorization token not found');
  }
  apiService.setAuthToken(token);
  return apiService.fetchData<T>(method, url, options);
}

export async function getUser() {
  const res = await fetchWithToken<UserResponse>('get', '/user');
  return res.data;
}

export async function resetPassword(password: string) {
  const data = { password };
  const res = await fetchWithToken<ApiResponse>('patch', '/auth/reset-password', { data });
  return res;
}

export async function logout() {
  return fetchWithToken<ApiResponse>('post', '/auth/logout');
}

export async function updateUserProfile(profile: Profile) {
  const res = await fetchWithToken<ApiResponse>('patch', '/user', { data: profile });
  return res;
}

export async function createArticle(createArticleRequest : CreateArticleRequest) {
  const res = await fetchWithToken<ApiResponse>('post', '/article', { data: createArticleRequest });
  return res;
}

export async function editArticle(editArticleRequest : CreateArticleRequest) {
  const res = await fetchWithToken<ApiResponse>('patch', `/article/${editArticleRequest.id}`, { data: editArticleRequest });
  return res;
}

export async function followCreator(creatorId: string) {
  return await fetchWithToken<ApiResponse>('post', `/user/${creatorId}/follow`);
}

export async function unFollowCreator(creatorId: string) {
  return await fetchWithToken<ApiResponse>('delete', `/user/${creatorId}/follow`);
}

export async function getFollowings() {
  const res = await fetchWithToken<UserFollowResponse>('get', '/user/followings');
  return res.data;
}

export async function getFollowers() {
  const res = await fetchWithToken<UserFollowResponse>('get', '/user/followers');
  return res.data;
}
