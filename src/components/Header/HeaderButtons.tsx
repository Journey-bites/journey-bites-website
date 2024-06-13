'use client';

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

export default function HeaderButtons() {
  const { isLogin } = useUserStore((state) => state);

  return (
    <>
      <div className='hidden gap-8 sm:flex md:flex lg:flex xl:flex 2xl:flex'>
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
                <Link href='#'>開始創作</Link>
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
      <div className='hidden xs:flex'>
        {isLogin && (
          <Sheet>
            <SheetTrigger className='hidden size-11 cursor-pointer xs:block'>
              <User2Icon />
            </SheetTrigger>
            <SheetContent>
              <UserMenuList />
          </SheetContent>
          </Sheet>
        )}
        <Sheet>
          <SheetTrigger className='hidden size-11 cursor-pointer xs:block'>
            <MenuIcon />
          </SheetTrigger>
          <SheetContent className='flex flex-col'>
            <div className='relative py-2'>
              <div
                className='absolute inset-y-0 left-0 z-10 flex items-center pl-3'
              >
                <SearchIcon className='*:stroke-primary' />
              </div>
              <Input
                type='text'
                className='rounded-md border-gray-200 py-2 pl-10 pr-4 placeholder:text-gray-300 focus:outline-none'
                placeholder='Search'
              />
            </div>
            <div className='p-2'>
              <h4 className='mb-1 text-base font-bold text-primary'>探索</h4>
              <ul className='font-bold'>
                <StyledListItem title='熱門景點' href='#'/>
                <StyledListItem title='最新文章' href='#'/>
              </ul>
              <h5 className='mt-2 text-sm text-grey-300'>所有分類</h5>
              <ul>
                <StyledListItem title='台灣旅遊地圖' href='#'/>
              </ul>
            </div>
            <SheetFooter className='mt-auto'>
              {isLogin ? (
                <SheetClose asChild>
                  <Button asChild>
                    <Link href='/manage/create'>開始創作</Link>
                  </Button>
                </SheetClose>
              ): (
                  <div className='flex gap-6'>
                    <Button variant='outline' className='w-full bg-transparent' asChild>
                      <LoginLinkWithStorePathname />
                    </Button>
                    <Button className='w-full'>
                      <Link href='/register'>註冊</Link>
                    </Button>
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
      <Link href={href}>{title}</Link>
    </li>
  );
}