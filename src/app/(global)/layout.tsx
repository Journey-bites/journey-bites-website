'use client';

import { useEffect, useRef, type ReactNode } from 'react';
import { JOURNEY_BITES_COOKIE } from '@/constants';
import { useUserStore } from '@/providers/userProvider';
import jsCookie from 'js-cookie';
import Header from '@/components/Header';
import { getUser } from '@/lib/authApi';
import { isAxiosError } from 'axios';
import StatusCode from '@/types/StatusCode';
import { ApiResponse } from '@/types/apiResponse';
import { toast } from '@/components/ui/use-toast';

export default function GlobalLayout({
  children,
}: Readonly<{
  children: ReactNode;
}>) {

  const { setAuth, removeAuth } = useUserStore((state) => state);
  const isCheckLogin = useRef(false);

  useEffect(() => {
    if (!isCheckLogin.current) {
      const userCookie = jsCookie.get(JOURNEY_BITES_COOKIE);
      if (userCookie) {
        getUser()
          .then((res) => {
            if (res) {
              setAuth(res);
            }
          })
          .catch((error) => {
            if (!isAxiosError(error)) return;
            if((error.response?.data as ApiResponse).statusCode === StatusCode.USER_NOT_FOUND) {
              toast({ title: '找不到您的帳號資料', description: '請重新登入', variant: 'error' });
            } else {
              toast({ title: '網站錯誤', description: '請聯絡客服，或稍後再試', variant: 'error' });
            }
            removeAuth();
          });
      } else {
        removeAuth();
      }
      isCheckLogin.current = true;
    }
  }, [setAuth, removeAuth]);

  return (
    <>
      <Header />
      {children}
    </>
  );
}
