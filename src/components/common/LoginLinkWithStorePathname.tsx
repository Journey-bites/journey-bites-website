'use client';

import type { AnchorHTMLAttributes, RefAttributes } from 'react';
import { LOCAL_STORAGE_KEY } from '@/constants';
import Link, { type LinkProps } from 'next/link';
import { usePathname } from 'next/navigation';

type Props = Omit<AnchorHTMLAttributes<HTMLAnchorElement>, keyof LinkProps> & Omit<LinkProps, 'href'> & RefAttributes<HTMLAnchorElement>;

export default function LoginLinkWithStorePathname(props: Props) {
  const pathname = usePathname();

  const storeRedirectPath = () => {
    localStorage.setItem(LOCAL_STORAGE_KEY.redirectUrl, pathname);
  };

  return (
    <Link
      onClick={storeRedirectPath}
      href='/login'
      {...props}
    >
      登入
    </Link>
  );
}
