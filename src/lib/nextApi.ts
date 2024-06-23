import { ApiSuccessResponse } from '@/types/apiResponse';
import { Category, Creator, Follow, SearchRequestQuery } from '@/types';
import { HttpException } from '@/lib/HttpExceptions';
import { ArticleType } from '@/types/article';

const isDevMode = process.env.NODE_ENV === 'development';

async function nextFetch<T>(url: string, option?: RequestInit, disabledCache?: boolean): Promise<T> {
  const fetchOption = { ...option };
  if (isDevMode || disabledCache) {
    fetchOption.cache = 'no-store';
  } else {
    fetchOption.next = { revalidate: 60 };
  }
  const res = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}${url}`, {
    ...fetchOption
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
}: SearchRequestQuery) {
  const endpoint = '/articles';
  const params = new URLSearchParams();
  const query = Object.entries({ page, pageSize, q, type });

  for(const [key, value] of query) {
    if (value) {
      params.append(key, value.toString());
    }
  }
  const url = `${endpoint}?${params.toString()}`;
  const res = await nextFetch<ArticleType[]>(url);
  return res;
}

export async function getCreators({ page, pageSize, search, type }: SearchRequestQuery) {
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
  const res = await nextFetch<Creator>(`/creator/${id}`, options, true);
  return res;
}

export async function getCreatorFollowers(creatorId: string) {
  const res = await nextFetch<Follow[]>(`/creator/${creatorId}/followers`, {}, true);
  return res;
}