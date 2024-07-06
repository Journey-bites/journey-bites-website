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
  className?: string;
}

export default function UserAvatar({ userName, avatarImgUrl, className }: UserAvatarProps) {
  return (
    <Avatar className={className}>
      <AvatarImage asChild src={avatarImgUrl || DefaultUserImg.src}>
        <Image fill src={avatarImgUrl || DefaultUserImg} alt={userName} priority />
      </AvatarImage>
      <AvatarFallback className={className}>
        <Image src={DefaultUserImg} alt={userName} />
      </AvatarFallback>
    </Avatar>
  );
}
