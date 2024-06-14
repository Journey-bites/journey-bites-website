import type { PropsWithChildren } from 'react';
import Sidebar from '@/components/dashboard/Sidebar';

export default function ManageLayout({ children }: PropsWithChildren) {
  return (
    <div className='mx-auto mt-[60px] grid max-w-[1296px] grid-cols-12 gap-6 xs:mt-6 sm:mt-6'>
      <Sidebar />
      <div className='col-span-9 px-10 xs:col-span-12 sm:col-span-12'>
        {children}
      </div>
    </div>
  );
}
