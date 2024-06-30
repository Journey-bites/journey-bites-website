// Tailwind utilities
import { type ClassValue, clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

import { isAxiosError } from 'axios';
import { toast } from '@/components/ui/use-toast';
import StatusCode from '@/types/StatusCode';
import { ApiResponse } from '@/types/apiResponse';
import { LOCAL_STORAGE_KEY } from '@/constants';
import { OrderBy } from '@/types/enum';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

type ErrorHandlingConfig = {
  [key in StatusCode]?: (error: unknown) => void;
};

export function handleApiError(error: unknown, config: ErrorHandlingConfig, operation?: string) {
  if (!isAxiosError(error) || !error.response?.data?.statusCode) {
    return toast({ title: `${operation || '操作'}失敗`, description: '請確認您的網路連線是否正常', variant: 'error' });
  }

  const statusCode = (error.response?.data as ApiResponse).statusCode;
  const handler = config[statusCode];

  if (handler) {
    handler(error);
  } else {
    toast({ title: `${operation || '操作'}失敗`, description: '請聯繫客服，或稍後再試', variant: 'error' });
  }
}

export const storeRedirectPath = (pathname: string) => {
  localStorage.setItem(LOCAL_STORAGE_KEY.redirectUrl, pathname);
};

export function sortDataByCreatedAt<T>(data: T & { createdAt: string }[] | undefined, orderBy: OrderBy) {
  if (!data) return;
  if (orderBy === OrderBy.DESC) {
    return data.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
  } else {
    return data.sort((a, b) => new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime());
  }
}