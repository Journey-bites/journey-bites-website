import jsCookie from 'js-cookie';
import type { AxiosRequestConfig, GenericAbortSignal, Method } from 'axios';
import { JOURNEY_BITES_COOKIE } from '@/constants';
import { ApiService } from './ApiService';
import { ApiResponse, ApiSuccessResponse, ArticlesResponse, CommentResponse, OrdersResponse, SubscribeResponse, UserFollowResponse, UserResponse } from '@/types/apiResponse';
import { Order, Profile } from '@/types';
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

export async function addCommentToArticle({ articleId, content }: { articleId: string, content: string }) {
  const res = await fetchWithToken<CommentResponse>('post', `/article/${articleId}/comment`, {
    data: { content }
  });
  return res.data;
}

export async function likeArticle({ articleId, signal }: { articleId: string, signal: GenericAbortSignal }) {
  const res = await fetchWithToken<ApiResponse>('post', `/article/${articleId}/like`, {
    signal
  });
  return res;
}

export async function unlikeArticle({ articleId, signal }: { articleId: string, signal: GenericAbortSignal }) {
  const res = await fetchWithToken<ApiResponse>('delete', `/article/${articleId}/like`, {
    signal
  });
  return res;
}

export async function deleteArticle({ articleId }: { articleId: string }) {
  const res = await fetchWithToken<ApiResponse>('delete', `/article/${articleId}`);
  return res;
}

export async function getUserArticles() {
  const res = await fetchWithToken<ArticlesResponse>('get', '/user/articles');
  return res.data;
}

export async function subscribeCreator(creatorId: string) {
  const res = await fetchWithToken<SubscribeResponse>('post', `/user/${creatorId}/subscribe`);
  return res.data;
}

export async function getArticlesLikedByUser() {
  const res = await fetchWithToken<ArticlesResponse>('get', '/user/liked-articles');
  return res.data;
}

export async function getOrders() {
  const res = await fetchWithToken<OrdersResponse>('get', '/user/orders');
  return res.data;
}

export async function getOrderByOrderNo(orderNo: string) {
  const res = await fetchWithToken<ApiSuccessResponse<Order>>('get', `/order/ticket/${orderNo}`);
  return res.data;
}