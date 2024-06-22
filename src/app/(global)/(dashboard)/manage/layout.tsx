import type { PropsWithChildren } from 'react';
import Sidebar from '@/components/dashboard/Sidebar';

export default function ManageLayout({ children }: PropsWithChildren) {
  return (
    <div className='mx-auto mt-6 grid max-w-[1296px] grid-cols-12 gap-6 md:mt-15'>
      <Sidebar />
      <div className='col-span-12 px-10 md:col-span-9 '>
        {children}
      </div>
    </div>
  );
}
