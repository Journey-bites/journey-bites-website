'use client';

import Image from 'next/image';
import Link from 'next/link';
import { useQuery } from '@tanstack/react-query';
import HeaderNav from './HeaderNav';
import { getCategories } from '@/lib/nextApi';
import SearchBar from '../custom/SearchBar';
import HeaderButtons from './HeaderButtons';

import Logo from '@/images/logo-md.svg';
import LogoSm from '@/images/logo-sm.svg';

export default function Header() {
  const { data: categories } = useQuery({
    queryKey: ['categories'],
    queryFn: getCategories
  });

  return (
    <header className='sticky top-0 z-40 bg-white md:border md:border-b-gray-200'>
      <div className='mx-auto flex w-[67.5%] items-center justify-between py-5 xs:w-full xs:px-4 xl:max-w-[1296px]'>
        <div className='flex items-center gap-12'>
          <Link href='/'>
            <Image className='hidden md:block' src={Logo} alt='Journey Bites' priority />
            <Image className='md:hidden' src={LogoSm} alt='Journey Bites' priority />
          </Link>
          <div className='hidden gap-8 md:flex'>
            {categories && <HeaderNav categories={categories} />}
            <SearchBar />
          </div>
        </div>
        {categories && <HeaderButtons categories={categories} />}
      </div>
    </header>
  );
}
