'use client';

import Link from 'next/link';
import Image from 'next/image';
import { MouseEvent, MouseEventHandler } from 'react';
import Logo from '@/images/logo-lg.svg';
import CurveLine from '@/images/footer-curve-line.svg';

export function Footer() {

  const onContextMenuHandler:MouseEventHandler<HTMLImageElement> = (e: MouseEvent) => {
      e.preventDefault();
  };

  return (
    <footer className='mt-18 py-13 pb-14 gap-5 bg-grey flex flex-col justify-center items-center'>
      <Image src={Logo} className='object-cover object-center w-[200px] sm:w-[240px] md:w-[240px] lg:w-[245px] xl:w-[250px]' alt='Journey Bites' priority onContextMenu={onContextMenuHandler} />
      <Image src={CurveLine} alt='' className='mt-[-6px] mb-3 lg:mb-3.5' onContextMenu={onContextMenuHandler} />
      <ul className='flex flex-row gap-4 text-base sm:text-xl md:text-xl lg:text-[20px] xl:text-[21px] 2xl:text-[21px]'>
        <li className='font-extrabold'><Link href='javascript:void(0);'>關於我們</Link></li>|
        <li className='font-extrabold'><Link href='javascript:void(0);'>會員條款</Link></li>|
        <li className='font-extrabold'><Link href='javascript:void(0);'>隱私權政策</Link></li>
      </ul>
      <div className='text-base'>
        &copy;2024 Journey Bites
      </div>
    </footer>
  );
}
