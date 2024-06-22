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
  const res = await nextFetch<Category[]>('/category');
  return res;
}
