'use client';

import type { PropsWithChildren } from 'react';
import { useRouter } from 'next/navigation';
import { useUserStore } from '@/providers/userProvider';
import { useEffect } from 'react';

export default function ArticleLayout({ children }: PropsWithChildren) {
  const { isLogin } = useUserStore((state) => state);
  const router = useRouter();

  // useEffect(() => {
  //   if (isLogin === false) {
  //     router.replace('/login');
  //   }
  // }, [isLogin, router]);

  return (
    <>
      {children}
    </>
  );
}
