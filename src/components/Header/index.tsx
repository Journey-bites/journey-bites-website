import Image from 'next/image';
import Link from 'next/link';
import HeaderNav from './HeaderNav';
// import { getCategories } from '@/lib/nextApi';
import SearchBar from '../custom/SearchBar';
import HeaderButtons from './HeaderButtons';

import Logo from '@/images/logo-md.svg';
import LogoSm from '@/images/logo-sm.svg';

export default function Header() {
  // const categories = await getCategories();

  // if (!categories?.length) {
  //   throw new Error('No categories found');
  // }

  return (
    <header className='sticky top-0 z-40 border border-b-gray-200 bg-white'>
      <div className='mx-auto flex w-[67.5%] items-center justify-between py-5 xl:max-w-[1296px] xs:w-full xs:px-4'>
        <div className='flex items-center gap-12'>
          <Link href='/'>
            <Image className='sm:hidden xs:hidden' src={Logo} alt='Journey Bites' priority />
            <Image className='hidden sm:block xs:block' src={LogoSm} alt='Journey Bites' priority />
          </Link>
          <div className='hidden gap-8 md:flex lg:flex xl:flex 2xl:flex'>
            <HeaderNav />
            <SearchBar />
          </div>
        </div>
        <HeaderButtons />
      </div>
    </header>
  );
}
