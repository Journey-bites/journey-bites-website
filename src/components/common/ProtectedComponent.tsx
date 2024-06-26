'use client';

import { ReactElement, cloneElement, isValidElement, type PropsWithChildren } from 'react';
import { usePathname, useRouter } from 'next/navigation';
import { useUserStore } from '@/providers/userProvider';
import { storeRedirectPath } from '@/lib/utils';

type ProtectedComponentProps = {
  onClick?: () => void;
  href?: string;
} & PropsWithChildren;

export default function ProtectedComponent({ children, onClick, href }: ProtectedComponentProps) {
  const { isLogin } = useUserStore((state) => state);
  const router = useRouter();
  const pathname = usePathname();

  const handleClick = (e: MouseEvent) => {
    e.preventDefault();
    if (!isLogin) {
      storeRedirectPath(pathname);
      router.push('/login');
    } else if (typeof onClick === 'function') {
      onClick();
    } else {
      router.push(href || '/');
    }
  };

  if (isValidElement(children)) {
    return cloneElement(children as ReactElement, { onClick: handleClick });
  }

  return (
    <>{children}</>
  );
}
