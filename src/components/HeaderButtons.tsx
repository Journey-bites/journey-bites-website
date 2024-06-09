'use client';

import Link from 'next/link';
import Image from 'next/image';
import { LogOut, User } from 'lucide-react';
import { Button } from './ui/button';
import { useUserStore } from '@/providers/userProvider';
import { DropdownMenuComponent as DropdownMenu, DropdownMenuLinkItem } from './custom/DropdownMenu';
import { logout } from '@/lib/authApi';

import DefaultUserImg from '@/images/default-user.webp';

const MenuLinks: { title: string, href: string }[] = [
  {
    title: '個人資料管理',
    href: '/manage/user',
  },
  {
    title: '內容作品管理',
    href: '/manage/content',
  },
  {
    title: '我的追蹤與收藏',
    href: '/manage/follow',
  },
  {
    title: '訂單記錄',
    href: '/manage/orders',
  },
  {
    title: '我的收入',
    href: '/manage/income',
  }
];

export default function HeaderButtons() {
  const { isLogin, removeAuth, auth } = useUserStore((state) => state);

  async function handleLogout() {
    try {
      await logout();
      removeAuth();
    } catch (error) {
      removeAuth();
    }
  }

  return (
    <div className='hidden gap-8 sm:flex md:flex lg:flex xl:flex 2xl:flex'>
      {typeof isLogin === 'boolean' && (
        !isLogin ? (
          <>
            <Button asChild variant='outline' size='sm'>
              <Link href='/login'>登入</Link>
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
                <div className='mb-4 flex gap-3'>
                  <div className='relative size-10 overflow-hidden rounded-full'>
                    <Image src={auth?.profile?.avatarImageUrl || DefaultUserImg} fill className='object-cover' alt='user img' />
                  </div>
                  <div>
                    <div className='font-bold leading-7 text-grey-500'>{auth?.profile.displayName}</div>
                    <span className='text-grey-300'>{auth?.email}</span>
                  </div>
                </div>
                {
                  MenuLinks.map((link) => (
                    <DropdownMenuLinkItem key={link.href} className='mb-1'>
                      <Link href={link.href}>{link.title}</Link>
                    </DropdownMenuLinkItem>
                  ))
                }
                <DropdownMenuLinkItem className='mt-3 font-bold text-primary' onClick={handleLogout}>
                  <button>
                    <LogOut className='mr-2 size-6' />
                    <span>登出</span>
                  </button>
                </DropdownMenuLinkItem>
            </DropdownMenu>
          </>
        )
      )}
    </div>
  );
}
