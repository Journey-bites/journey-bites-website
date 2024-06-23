'use client';

import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { GOOGLE_LOGIN_URL } from '@/constants';

export default function Register() {
  return (
    <>
      <div className='flex justify-between'>
        <h2>註冊帳號</h2>
        <div>
          已有帳號？
          <Link href='/login' className='text-blue-500 underline'>登入</Link>
        </div>
      </div>
      <div className='my-7 flex flex-col gap-5'>
        <Button variant='outline' asChild>
          <a href={GOOGLE_LOGIN_URL}>使用 Google 登入</a>
        </Button>
        {/* Will be developed in the future */}
        {/* <Button variant='outline'>使用 Facebook 註冊</Button> */}
      </div>
      <div className='my-3 text-center'>
        <Link href='/register/email' className='text-primary underline'>或以 Email 註冊</Link>
      </div>
      <div className='text-center'>
          註冊即表示您同意 <Link href='#' className='text-secondary underline'>服務條款</Link> 與 <Link href='#' className='text-secondary underline'>隱私權政策</Link>
      </div>
    </>
  );
}
