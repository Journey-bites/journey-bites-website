import { ApiSuccessResponse } from '@/types/apiResponse';
import { Category } from '@/types';
import { HttpException } from '@/lib/HttpExceptions';

const API_BASE_URL = process.env.NODE_ENV === 'development' ? 'http://localhost:3001/api/v1' : process.env.NEXT_PUBLIC_API_BASE_URL;

async function nextFetch<T>(url: string, option?: RequestInit): Promise<T> {
  const res = await fetch(`${API_BASE_URL}${url}`, option);
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
