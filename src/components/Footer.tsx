import Link from 'next/link';
import Image from 'next/image';
import { Separator } from '@radix-ui/react-separator';

import LogoImg from '@/images/logo-lg.svg';
import LogoSmImg from '@/images/logo-sm.svg';
import CurveImg from '@/images/curve.svg';

export default function Footer() {
  return (
    <footer className='sticky top-[100vh] mt-[100px] flex flex-col items-center bg-grey py-12 leading-7 text-grey-500'>
      <Link href='/'>
        <Image className='mb-5 hidden md:block' src={LogoImg} alt='Journey Bites' />
        <Image className='mb-4 md:hidden' src={LogoSmImg} alt='Journey Bites' />
      </Link>
      <Image className='mb-9' src={CurveImg} alt='curve' />
      <ul className='mb-3 flex gap-4 font-bold'>
        <li>
          <Link href='#'>關於我們</Link>
        </li>
        <Separator orientation='vertical' className='w-[1px] bg-grey-300' />
        <li>
          <Link href='#'>會員條款</Link>
        </li>
        <Separator orientation='vertical' className='w-[1px] bg-grey-300' />
        <li>
          <Link href='#'>隱私權政策</Link>
        </li>
      </ul>
      <div className='text-sm md:text-base'>&copy; 2024 Journey Bites</div>
    </footer>
  );
}