'use client';

import { useEffect, useRef, type ReactNode } from 'react';
import { JOURNEY_BITES_COOKIE } from '@/constants';
import { useUserStore } from '@/providers/userProvider';
import jsCookie from 'js-cookie';
import Header from '@/components/Header';
import { getUser } from '@/lib/authApi';
import StatusCode from '@/types/StatusCode';
import { toast } from '@/components/ui/use-toast';
import { handleApiError } from '@/lib/utils';

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
            handleApiError(error, {
              [StatusCode.USER_NOT_FOUND]: () => {
                toast({ title: '找不到您的帳號資料', description: '請重新登入', variant: 'error' });
              }
            }, '查詢使用者資料');
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
