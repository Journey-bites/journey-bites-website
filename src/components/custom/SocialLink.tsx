'use client';

import { EyeIcon, HeartIcon, MessageCircleMoreIcon } from 'lucide-react';

type SocialLinkProps = {
  views: number;
  likes: number;
  comments: number;
}

export default function SocialLink({ views, likes, comments }: SocialLinkProps) {
  return (
    <div className='flex gap-3'>
      {views > 0 && (
        <div className='flex gap-1'>
          <EyeIcon className='stroke-grey-300' />
          <span>{views}</span>
        </div>
      )}
      <div className='flex gap-1'>
        <MessageCircleMoreIcon className='stroke-grey-300' />
        <span>{comments}</span>
      </div>
      <div className='flex gap-1'>
        <HeartIcon className='stroke-danger' />
        <span>{likes}</span>
      </div>
      {/* <Bookmark className='stroke-primary' /> */}
    </div>
  );
}
