'use client';

import { LocalStorageKey } from '@/types';
import Link, { type LinkProps } from 'next/link';
import { usePathname } from 'next/navigation';

export default function LoginLinkWithStorePathname(props: Omit<React.AnchorHTMLAttributes<HTMLAnchorElement>, keyof LinkProps> & Omit<LinkProps, 'href'> & {
    children?: React.ReactNode;
} & React.RefAttributes<HTMLAnchorElement>) {
  const pathname = usePathname();

  const storeRedirectPath = () => {
    localStorage.setItem(LocalStorageKey.REDIRECT_URL, pathname);
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
