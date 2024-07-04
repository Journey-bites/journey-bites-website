import type { PropsWithChildren } from 'react';

import Image from 'next/image';
import Link from 'next/link';

import Logo from '@/images/logo-md.svg';
import LogoSm from '@/images/logo-sm.svg';

export default function AuthLayout({ children }: { children: PropsWithChildren }) {
  return (
    <div className='flex h-screen'>
      <div className="hidden w-2/5 bg-[url('../images/auth-page-bg.webp')] bg-cover bg-center md:block" />
      <div className='flex-1 overflow-y-auto pt-[70px]'>
        <div className='flex justify-center'>
          <Link href='/'>
            <Image className='hidden md:block' src={Logo} alt='Journey Bites' priority />
            <Image className='md:hidden' src={LogoSm} alt='Journey Bites' priority />
          </Link>
        </div>
        <div className='mx-auto px-6 pt-14 md:max-w-sm md:px-0'>{children}</div>
      </div>
    </div>
  );
}
