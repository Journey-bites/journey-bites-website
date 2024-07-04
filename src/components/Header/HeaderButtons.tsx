'use client';

import { useState } from 'react';
import Link from 'next/link';
import { MenuIcon, SearchIcon, User, User2Icon } from 'lucide-react';
import { Button } from '../ui/button';
import { useUserStore } from '@/providers/userProvider';
import { DropdownMenuComponent as DropdownMenu } from '../custom/DropdownMenu';
import UserMenuList from './UserMenuList';
import { Input } from '../ui/input';
import { Sheet, SheetTrigger, SheetContent, SheetFooter, SheetClose } from '../ui/sheet';
import { cn } from '@/lib/utils';
import LoginLinkWithStorePathname from '../common/LoginLinkWithStorePathname';
import useSearch from '@/hook/useSearch';
import { Category } from '@/types';
import { EXPLORE_LIST } from '@/constants';
import { usePathname } from 'next/navigation';
import { ARTICLE_PAGE_ROUTE_REGEX } from '@/constants/index';

export default function HeaderButtons({ categories }: { categories: Category[] }) {
  const { isLogin } = useUserStore((state) => state);
  const [sideMenuOpen, setSideMenuOpen] = useState(false);
  const [keywords, setKeywords] = useState('');
  const { handleSearch } = useSearch({ keywords });
  const pathname = usePathname();
  const isHideBtn = ARTICLE_PAGE_ROUTE_REGEX.test(pathname);

  function handleSideMenuClose() {
    setKeywords('');
    setSideMenuOpen(false);
  }

  return (
    <>
      <div className='hidden gap-8 md:flex'>
        {typeof isLogin === 'boolean' && (
          !isLogin ? (
            <>
              <Button asChild variant='outline' size='sm'>
                <LoginLinkWithStorePathname />
              </Button>
              <Button asChild size='sm'>
                <Link href='/register'>註冊</Link>
              </Button>
            </>
          ) : (
            <>
              <Button asChild size='sm'>
                { !isHideBtn &&
                  (<Link href='/article/create'>開始創作</Link>)
                }
              </Button>
              <DropdownMenu
                triggerButton={
                  <button>
                    <User className='hover:stroke-primary' />
                  </button>
                }
                >
                  <UserMenuList isDropdownMenu/>
              </DropdownMenu>
            </>
          )
        )}
      </div>
      <div className='md:hidden'>
        {isLogin && (
          <Sheet>
            <SheetTrigger className='size-11 cursor-pointer md:hidden'>
              <User2Icon />
            </SheetTrigger>
            <SheetContent>
              <UserMenuList />
          </SheetContent>
          </Sheet>
        )}
        <Sheet open={sideMenuOpen} onOpenChange={() => setSideMenuOpen(!sideMenuOpen)}>
          <button onClick={() => setSideMenuOpen(true)} className='size-11 cursor-pointer md:hidden'>
            <MenuIcon />
          </button>
          <SheetContent className='flex flex-col'>
            <div className='relative py-2'>
              <div
                className='absolute inset-y-0 left-0 z-10 flex items-center pl-3'
              >
                <SearchIcon className='*:stroke-primary' />
              </div>
              <Input
                value={keywords}
                onChange={(e) => {
                  setKeywords(e.target.value);
                }}
                onKeyDown={(e) => handleSearch(e, handleSideMenuClose)}
                type='text'
                className='rounded-md border-gray-200 py-2 pl-10 pr-4 placeholder:text-gray-300 focus:outline-none'
                placeholder='Search'
              />
            </div>
            {/* TODO: add it back when search page and API (getArticlesByCategory) is ready */}
            <div className='p-2'>
              <h4 className='mb-1 text-base font-bold text-primary'>探索</h4>
              <ul className='font-bold'>
                {EXPLORE_LIST.map((list) => (
                  <StyledListItem key={list.id} title={list.name} href={list.path} />
                ))}
              </ul>
              <h5 className='mt-2 text-sm text-grey-300'>所有分類</h5>
              <ul>
                {categories?.map((category) => (
                  <StyledListItem
                    key={category.id}
                    title={category.name}
                    href={`/articles${category.path}`}
                  />
                ))}
              </ul>
            </div>
            <SheetFooter className='mt-auto'>
              {isLogin ? (
                <SheetClose asChild>
                  <Button asChild>
                    <Link href='/article/create'>開始創作</Link>
                  </Button>
                </SheetClose>
              ): (
                  <div className='flex gap-6'>
                    <SheetClose asChild>
                      <Button variant='outline' className='w-full bg-transparent' asChild>
                        <LoginLinkWithStorePathname />
                      </Button>
                    </SheetClose>
                    <SheetClose asChild>
                      <Button asChild className='w-full'>
                        <Link href='/register'>註冊</Link>
                      </Button>
                    </SheetClose>
                </div>
              )}
            </SheetFooter>
          </SheetContent>
        </Sheet>
      </div>
    </>
  );
}

function StyledListItem({ title, href, className }: { title: string, href: string, className?: string }) {
  return (
    <li className={cn('leading-7 p-2 rounded-lg active:bg-primary active:text-white', className)}>
      <SheetClose asChild>
        <Link href={href}>{title}</Link>
      </SheetClose>
    </li>
  );
}
