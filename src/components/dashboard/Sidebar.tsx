'use client';

import { useEffect, useRef, useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { CameraIcon } from 'lucide-react';
import { useMutation } from '@tanstack/react-query';
import { Button } from '../ui/button';
import { cn } from '@/lib/utils';
import { uploadImgToFirebase } from '@/lib/firebase/storage';
import { updateUserProfile } from '@/lib/authApi';
import { useUserStore } from '@/providers/userProvider';
import ImagePreviewDialog from './ImagePreviewDialog';
import { toast } from '../ui/use-toast';

import DefaultUserImg from '@/images/default-user.webp';

const menuLinks: { title: string; href: string }[] = [
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
  },
];

export default function Sidebar() {
  const pathname = usePathname();
  const [avatarImgFile, setAvatarImgFile] = useState<File | null>(null);
  const [previewAvatarImgSrc, setPreviewAvatarImgSrc] = useState<string | null>(null);
  const [isUpdating, setIsUpdating] = useState(false);
  const auth = useUserStore((state) => state.auth);
  const { mutate: updateUserProfileMutate } = useMutation({ mutationFn: updateUserProfile });
  const isFirstRender = useRef(true);

  function onClosePreviewDialog() {
    setAvatarImgFile(null);
  }

  function handleFileChange(e: React.ChangeEvent<HTMLInputElement>) {
    const FILE_MAX_SIZE = 5 * 1024 * 1024; //5MB
    if (e.target.files) {
      if(e.target.files[0].size > FILE_MAX_SIZE) {
        return toast({ description: '請選擇小於 5MB 的圖片', variant: 'error' });
      }
      setAvatarImgFile(e.target.files[0]);
    }
  }

  async function updateAvatarImg() {
    if (avatarImgFile && auth?.email) {
      setIsUpdating(true);
      try {
        const avatarImageUrl = await uploadImgToFirebase(avatarImgFile, auth.email);
        setPreviewAvatarImgSrc(URL.createObjectURL(avatarImgFile));
        updateUserProfileMutate({ avatarImageUrl }, {
          onSuccess: () => {
            toast({ title: '更新頭像成功', variant: 'success' });
          },
          onError: () => {
            toast({ title: '更新頭像失敗', description: '請聯繫客服，或稍後再試', variant: 'error' });
          }
        });
      } catch (error) {
        toast({ title: '上傳頭像失敗', description: '請稍後再試', variant: 'error' });
      } finally {
        setIsUpdating(false);
        setAvatarImgFile(null);
      }
    }
  }

  useEffect(() => {
    if (auth?.profile.avatarImageUrl && isFirstRender.current) {
      isFirstRender.current = false;
      setPreviewAvatarImgSrc(auth?.profile.avatarImageUrl);
    }
  }, [auth?.profile.avatarImageUrl]);

  return (
    <>
      <div className='col-span-3 min-h-[733px] rounded-md border border-gray-200 p-6 pt-9 shadow-tabs'>
        <div className='relative mx-auto mb-9 size-[120px] rounded-full'>
          <Image
            src={previewAvatarImgSrc || DefaultUserImg}
            fill
            alt='Journey Bites'
            className='rounded-full object-cover'
          />
          <Button asChild variant='icon' className='group absolute -right-3 bottom-1 cursor-pointer'>
            <label htmlFor='avatar-upload'>
              <CameraIcon size ={20} className='stroke-primary group-hover:stroke-primary-100'/>
            </label>
          </Button>
          <input type='file' accept='image/*' name='avatar' id='avatar-upload' className='hidden' onChange={handleFileChange}/>
        </div>
      {
        menuLinks.map((link) => (
          <Button
            key={link.href}
            asChild
            variant='fullLink'
            className={
              cn({
                'bg-primary-100': link.href === pathname,
                'hover:text-primary': link.href !== pathname
              })
            }
          >
            <Link href={link.href}>{link.title}</Link>
          </Button>
        ))
      }
      </div>
      {
        avatarImgFile && (
          <ImagePreviewDialog
            open={Boolean(avatarImgFile)}
            onClose={onClosePreviewDialog}
            onSave={updateAvatarImg}
            isUpdating={isUpdating}
            imgSrc={URL.createObjectURL(avatarImgFile)}
          />
        )
      }
    </>
  );
}
