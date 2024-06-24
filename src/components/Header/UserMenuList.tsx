import Image from 'next/image';
import Link from 'next/link';
import { LogOutIcon } from 'lucide-react';
import { useUserStore } from '@/providers/userProvider';
import { DropdownMenuLinkItem } from '../custom/DropdownMenu';
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

export default function UserMenuList({ isDropdownMenu }: { isDropdownMenu?: boolean }) {
  const { auth, removeAuth } = useUserStore((state) => state);

  async function handleLogout() {
    try {
      await logout();
      removeAuth();
    } catch (error) {
      removeAuth();
    }
  }

  return (
    <>
      <Link href={`/creator/${auth?.id}`} className='mb-4 flex gap-3'>
        <div className='relative size-10 overflow-hidden rounded-full'>
          <Image src={auth?.profile?.avatarImageUrl || DefaultUserImg} fill className='object-cover' alt='user img' />
        </div>
        <div>
          <div className='font-bold leading-7 text-grey-500'>{auth?.profile.displayName}</div>
          <span className='text-grey-300'>{auth?.email}</span>
        </div>
      </Link>
      {
        MenuLinks.map((link) => (
          isDropdownMenu ? (
            <DropdownMenuLinkItem key={link.href} className='mb-1'>
              <Link href={link.href}>{link.title}</Link>
            </DropdownMenuLinkItem>
          ) : (
            <Link
              key={link.href}
              href={link.href}
              className='relative mb-1 flex w-full cursor-pointer select-none items-center rounded-sm px-2 py-1 leading-7 focus:bg-primary focus:text-white'
            >
              {link.title}
            </Link>
          )
        ))
      }
      {isDropdownMenu ? (
        <DropdownMenuLinkItem className='mt-3 font-bold text-primary' onClick={handleLogout}>
          <button>
            <LogOutIcon className='mr-2 size-6' />
            <span>登出</span>
          </button>
        </DropdownMenuLinkItem>
      ) : (
        <button className='mt-3 flex w-full cursor-pointer items-center px-2 py-1 font-bold leading-7 text-primary' onClick={handleLogout}>
          <LogOutIcon className='mr-2 size-6' />
          <span>登出</span>
        </button>
      )}
    </>
  );
}
