'use client';

import { HeartIcon } from 'lucide-react';
import { Button } from '../ui/button';
import { cn } from '@/lib/utils';
import ProtectedComponent from './ProtectedComponent';

type LikeButtonProps = {
  count: number;
  withBackground?: boolean;
}

export default function LikeButton({ count, withBackground }: LikeButtonProps) {

  return (
    <ProtectedComponent>
      <Button
        variant={withBackground ? 'icon' : 'clean'}
        className={cn('group size-auto items-center justify-center gap-1', { ['bg-grey-100 p-2 hover:bg-grey-100']: withBackground })}
      >
        <HeartIcon className='size-6 stroke-danger group-hover:fill-danger' />
        <span className='text-danger'>{count}</span>
      </Button>
    </ProtectedComponent>
  );
}
