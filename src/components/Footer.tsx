'use client';
import Link from 'next/link';
import Image from 'next/image';
import Logo from '@/images/logo-lg.svg';
import CurveLine from '@/images/footer-curve-line.svg';

export function Footer() {

  const onContextMenuHandler = (e) => {
    if(e.preventDefault != undefined)
      e.preventDefault();
    if(e.stopPropagation != undefined)
      e.stopPropagation();
    return false;
  };

  return (
    <footer className='mt-18 py-13 pb-14 gap-5 bg-grey flex flex-col justify-center items-center'>
      <div className='footer-title' onContextMenu={onContextMenuHandler}>
        <Image src={Logo} className='object-cover object-center w-[200px] sm:w-[240px] md:w-[240px] lg:w-[245px] xl:w-[250px]' alt='Journey Bites' priority />
      </div>
      <div className='footer-curve-line mt-[-6px] mb-3 lg:mb-3.5' onContextMenu={onContextMenuHandler}>
        <Image src={CurveLine} alt='' />
      </div>
      <ul className='footer-text flex flex-row gap-4 text-base sm:text-xl md:text-xl lg:text-[20px] xl:text-[21px] 2xl:text-[21px]'>
        <li className='font-extrabold'><Link href='javascript:void(0);'>關於我們</Link></li>|
        <li className='font-extrabold'><Link href='javascript:void(0);'>會員條款</Link></li>|
        <li className='font-extrabold'><Link href='javascript:void(0);'>隱私權政策</Link></li>
      </ul>
      <div className='footer-copyright text-base'>
        &copy;2024 Journey Bites
      </div>
    </footer>
  );
}
