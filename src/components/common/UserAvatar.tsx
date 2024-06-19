import Image from 'next/image';
import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from '@/components/ui/avatar';

import DefaultUserImg from '@/images/default-user.webp';

type UserAvatarProps = {
  userName: string;
  avatarImgUrl?: string | null;
  imgClassName?: string;
}

export default function UserAvatar({ userName, avatarImgUrl, imgClassName }: UserAvatarProps) {
  return (
    <Avatar>
      <AvatarImage asChild src={avatarImgUrl || DefaultUserImg.src}>
        <Image className={imgClassName} width={40} height={40} src={avatarImgUrl || DefaultUserImg} alt={userName} />
      </AvatarImage>
      <AvatarFallback>
        <Image src={DefaultUserImg} alt={userName} />
      </AvatarFallback>
    </Avatar>
  );
}
