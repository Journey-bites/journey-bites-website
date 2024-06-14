import type { ReactNode } from 'react';

export default function AuthLayout({ children }: { children: ReactNode }) {
  return (
    <div className='flex h-screen'>
      <div className="w-2/5 bg-[url('../images/auth-page-bg.webp')] bg-cover bg-center xs:hidden sm:hidden" />
      <div className='flex-1 overflow-y-auto pt-[70px]'>
        <div className='mx-auto max-w-xs px-1 pt-14 md:max-w-sm md:px-0'>{children}</div>
      </div>
    </div>
  );
}
