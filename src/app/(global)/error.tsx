'use client';

import Image from 'next/image';
import NotFoundImg from '@/images/not-found-img.webp';

export default function Error() {
  // TODO: Maybe can send error message to Firebase Analytics
  return (
    <div className='mt-10 flex flex-col items-center justify-center'>
      <p className='mb-5 text-3xl font-bold'>搜尋不到您要的資料，請重新搜尋</p>
      <Image src={NotFoundImg} width={500} height={500} className='rounded-lg' alt='搜尋不到您要的資料' />
    </div>
  );
}
