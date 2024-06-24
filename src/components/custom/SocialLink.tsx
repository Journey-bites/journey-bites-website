'use client';

import { EyeIcon, HeartIcon } from 'lucide-react';

type SocialLinkProps = {
  views: number;
  likes: number;
  articleId: string;
}

export default function SocialLink({ views, likes }: SocialLinkProps) {
  return (
    <div className='flex gap-3'>
      <div className='flex gap-1'>
        <EyeIcon className='stroke-grey-300' />
        <span>{views}</span>
      </div>
      <div className='flex gap-1'>
        <HeartIcon className='stroke-danger' />
        <span>{likes}</span>
      </div>
      {/* <Bookmark className='stroke-primary' /> */}
    </div>
  );
}
