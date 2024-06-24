import Image from 'next/image';
import Link from 'next/link';
// import HeaderNav from './HeaderNav';
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
    <header className='sticky top-0 z-40 bg-white md:border md:border-b-gray-200'>
      <div className='mx-auto flex w-[67.5%] items-center justify-between py-5 xs:w-full xs:px-4 xl:max-w-[1296px]'>
        <div className='flex items-center gap-12'>
          <Link href='/'>
            <Image className='hidden md:block' src={Logo} alt='Journey Bites' priority />
            <Image className='md:hidden' src={LogoSm} alt='Journey Bites' priority />
          </Link>
          {/* TODO: add it back when search page is ready */}
          <div className='hidden gap-8 md:flex'>
            {/* <HeaderNav /> */}
            <SearchBar />
          </div>
        </div>
        <HeaderButtons />
      </div>
    </header>
  );
}
