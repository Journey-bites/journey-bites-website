import { ApiSuccessResponse } from '@/types/apiResponse';
import { Category, Creator, Follow, GetArticlesQuery, GetCreatorQuery } from '@/types';
import { HttpException } from '@/lib/HttpExceptions';
import { Article, Comment } from '@/types/article';

async function nextFetch<T>(url: string, option?: RequestInit): Promise<T> {
  const res = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}${url}`, {
    cache: 'no-store',
    ...option
  });
  const data: ApiSuccessResponse<T> = await res.json();

  if (!res.ok) {
    throw new HttpException({ httpCode: res.status, statusCode: data.statusCode, message: data.message, data: data.data });
  }

  return data.data as T;
}

export async function getCategories() {
  const res = await nextFetch<Category[]>('/category');
  return res;
}

export async function getArticles({
  page,
  pageSize,
  q,
  type,
}: GetArticlesQuery) {
  const endpoint = '/articles';
  const params = new URLSearchParams();
  const query = Object.entries({ page, pageSize, q, type });

  for(const [key, value] of query) {
    if (value) {
      params.append(key, value.toString());
    }
  }
  const url = `${endpoint}?${params.toString()}`;
  const res = await nextFetch<Article[]>(url);
  return res;
}

export async function getCreators({ page, pageSize, search, type }: GetCreatorQuery) {
  const endpoint = '/creator';
  const params = new URLSearchParams();
  const query = Object.entries({ page, pageSize, search, type });

  for(const [key, value] of query) {
    if (value) {
      params.append(key, value.toString());
    }
  }
  const url = `${endpoint}?${params.toString()}`;
  const res = await nextFetch<Creator[]>(url, { method: 'GET' });
  return res;
}

export async function getCreatorById(id: string, token?: string) {
  const options: RequestInit = {
    method: 'GET',
  };
  if (token) {
    options.headers = {
      Authorization: `Bearer ${token}`,
    };
  }
  const res = await nextFetch<Creator>(`/creator/${id}`, options);
  return res;
}

export async function getCreatorFollowers(creatorId: string) {
  const res = await nextFetch<Follow[]>(`/creator/${creatorId}/followers`);
  return res;
}

export async function getArticleById(id: string) {
  const res = await nextFetch<Article>(`/article/${id}`);
  return res;
}

export async function getCommentsByArticleId(articleId: string) {
  const res = await nextFetch<Comment[]>(`/article/${articleId}/comments`);
  return res;
}

export async function getCreatorArticles({ creatorId }: { creatorId: string }) {
  const res = await nextFetch<Article[]>(`/creator/${creatorId}/articles`);
  return res;
}