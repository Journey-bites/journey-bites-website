'use client';

import { HeartIcon } from 'lucide-react';
import { Button } from '../ui/button';
import ProtectedComponent from './ProtectedComponent';

type LikeButtonProps = {
  count: number;
  iconVariant?: boolean;
}

export default function LikeButton({ count, iconVariant }: LikeButtonProps) {

  return (
    <ProtectedComponent>
      {
        iconVariant ? (
          <Button variant='icon' className='group size-auto items-center justify-center gap-1 bg-grey-100 p-2 hover:bg-grey-100'>
            <HeartIcon className='size-6 stroke-danger group-hover:fill-danger' />
            <span className='text-danger'>{count}</span>
          </Button>
          ) : (
          <button className='flex gap-1'>
            <HeartIcon className='stroke-danger group-hover:fill-danger' />
            <span className='text-danger'>{count}</span>
          </button>
          )
      }
    </ProtectedComponent>
  );
}
