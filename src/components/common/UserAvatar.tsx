import Image from 'next/image';
import { Avatar, AvatarImage, AvatarFallback } from '@radix-ui/react-avatar';

import DefaultUserImg from '@/images/default-user.webp';

type UserAvatarProps = {
  userName: string;
  avatarImgUrl?: string | null;
  imgClassName?: string;
}

export default function UserAvatar({ userName, avatarImgUrl, imgClassName }: UserAvatarProps) {
  return (
    <Avatar className='shrink-0'>
      <AvatarImage asChild src={avatarImgUrl || DefaultUserImg.src} />
      <Image className={imgClassName} width={40} height={40} src={avatarImgUrl || DefaultUserImg} alt={userName} />
      <AvatarFallback>
        <Image src={DefaultUserImg} alt={userName} />
      </AvatarFallback>
    </Avatar>
  );
}
