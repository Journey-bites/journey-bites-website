'use client';

import { useEffect, useRef, type ReactNode } from 'react';
import { useUserStore } from '@/providers/userProvider';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import ReactQueryProvider from '@/providers/ReactQuery';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import { usePathname } from 'next/navigation';

export default function GlobalLayout({
  children,
}: Readonly<{
  children: ReactNode;
  params: string
}>) {

  const { setAuth } = useUserStore((state) => state);
  const isInitRender = useRef(false);
  const pathname = usePathname();

  useEffect(() => {
    if (!isInitRender.current) {
      setAuth();
      isInitRender.current = true;
    }
  }, [setAuth]);

  const articleIdMatch = pathname.match(/\/article\/edit\/(\d+)/);
  const articleId = articleIdMatch ? articleIdMatch[1] : null;

  const hideHeader = pathname === '/article/publish' || pathname === '/article/create' || pathname === `/article/edit/${articleId}`;

  return (
    <>
      <ReactQueryProvider>
        { !hideHeader && <Header /> }
        {children}
        {process.env.NODE_ENV === 'development' && <ReactQueryDevtools initialIsOpen={false} />}
      </ReactQueryProvider>
      <Footer />
    </>
  );
}
