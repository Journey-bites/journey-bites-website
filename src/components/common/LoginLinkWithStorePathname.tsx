'use client';

import type { AnchorHTMLAttributes, RefAttributes } from 'react';
import Link, { type LinkProps } from 'next/link';
import { usePathname } from 'next/navigation';
import { storeRedirectPath } from '@/lib/utils';

type Props = Omit<AnchorHTMLAttributes<HTMLAnchorElement>, keyof LinkProps> & Omit<LinkProps, 'href'> & RefAttributes<HTMLAnchorElement>;

export default function LoginLinkWithStorePathname(props: Props) {
  const pathname = usePathname();

  return (
    <Link
      onClick={() => storeRedirectPath(pathname)}
      href='/login'
      {...props}
    >
      登入
    </Link>
  );
}
