import type { ReactNode } from 'react';

export default function AuthLayout({ children }: { children: ReactNode }) {
  return (
    <div className='flex h-screen'>
      <div className="hidden w-2/5 bg-[url('../images/auth-page-bg.webp')] bg-cover bg-center md:block" />
      <div className='flex-1 overflow-y-auto pt-[70px]'>
        <div className='mx-auto px-6 pt-14 md:max-w-sm md:px-0'>{children}</div>
      </div>
    </div>
  );
}
