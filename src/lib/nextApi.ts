import { ApiSuccessResponse } from '@/types/apiResponse';
import { Category, Creator, SearchRequestQuery } from '@/types';
import { HttpException } from '@/lib/HttpExceptions';

const isDevMode = process.env.NODE_ENV === 'development';

async function nextFetch<T>(url: string, option?: RequestInit): Promise<T> {
  const fetchOption = { ...option };
  if (isDevMode) {
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
  const res = await nextFetch<Category[]>('/categories');
  return res;
}

export async function getArticles({
  pageParam = 1,
}: {
  pageParam: unknown;
}) {
  const res = await fetch(
    `https://jsonplaceholder.typicode.com/posts?_page=${pageParam}&_limit=6`
  );
  return res.json();
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
