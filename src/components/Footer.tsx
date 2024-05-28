import Link from 'next/link';
import Image from 'next/image';
import Logo from '@/images/logo-lg.svg';
import CurveLine from '@/images/footer-curve-line.svg';

export function Footer() {
  return (
    <footer className='mt-21 py-12 pb-13 gap-5 bg-grey flex flex-col justify-center items-center'>
      <div className='footer-title text-4xl'>
        <Image src={Logo} alt='Journey Bites' priority />
      </div>
      <div className='footer-curve-line text-2xl'>
        <Image src={CurveLine} alt='' />
      </div>
      <ul className='footer-text flex flex-row gap-4 text-2xl'>
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
