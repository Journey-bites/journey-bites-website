'use client';

import { useEffect, useRef, type ReactNode } from 'react';
import { JOURNEY_BITES_COOKIE } from '@/constants';
import { useUserStore } from '@/providers/userProvider';
import jsCookie from 'js-cookie';
import Header from '@/components/Header';
import { getUser } from '@/lib/authApi';
import { handleApiError } from '@/lib/utils';
import StatusCode from '@/types/StatusCode';
import { toast } from '@/components/ui/use-toast';
import Footer from '@/components/Footer';
import ReactQueryProvider from '@/providers/ReactQuery';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';

export default function GlobalLayout({
  children,
}: Readonly<{
  children: ReactNode;
}>) {

  const { setAuth } = useUserStore((state) => state);
  const isInitRender = useRef(false);

  useEffect(() => {
    if (!isInitRender.current) {
      setAuth();
      isInitRender.current = true;
    }
  }, [setAuth]);

  return (
    <>
      <ReactQueryProvider>
        <Header />
        {children}
        {process.env.NODE_ENV === 'development' && <ReactQueryDevtools initialIsOpen={false} />}
      </ReactQueryProvider>
      <Footer />
    </>
  );
}
