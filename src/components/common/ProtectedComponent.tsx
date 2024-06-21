'use client';

import { ReactElement, cloneElement, isValidElement, type PropsWithChildren } from 'react';
import { usePathname, useRouter } from 'next/navigation';
import { useUserStore } from '@/providers/userProvider';
import { LOCAL_STORAGE_KEY } from '@/constants';

type ProtectedComponentProps = {
  onClick?: () => void;
} & PropsWithChildren;

export default function ProtectedComponent({ children, onClick }: ProtectedComponentProps) {
  const { isLogin } = useUserStore((state) => state);
  const router = useRouter();
  const pathname = usePathname();

  const handleClick = (e: MouseEvent) => {
    if (!isLogin) {
      e.preventDefault();
      localStorage.setItem(LOCAL_STORAGE_KEY.redirectUrl, pathname);
      router.push('/login');
    } else {
      if (typeof onClick === 'function') {
        onClick();
      };
    }
  };

  if (isValidElement(children)) {
    return cloneElement(children as ReactElement, { onClick: handleClick });
  }

  return (
    <>{children}</>
  );
}