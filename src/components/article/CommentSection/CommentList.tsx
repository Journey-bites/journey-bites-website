'use client';

import { useEffect, useState } from 'react';
import { FrownIcon } from 'lucide-react';
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from '@/components/ui/collapsible';
import { type Comment as CommentType } from '@/types/article';
import { cn } from '@/lib/utils';
import Comment from './Comment';

type Props = {
  data: CommentType[];
};

const CommentList = ({ data }: Props) => {
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    if (isOpen) {
      window.document.body.scrollIntoView({ behavior: 'smooth', block: 'end' });
    }
  }, [isOpen, data.length]);

  if (data.length === 0) {
    return (
      <div className='flex min-h-[356px] flex-col items-center justify-center rounded-lg bg-white shadow-outlineCard'>
        <FrownIcon
          className='mb-2 stroke-grey-400'
          size={32}
        />
        <h4 className='mb-1 text-grey-400'>目前尚無回應</h4>
        <p className='text-base text-grey-300'>快成為第一個留言的人吧！</p>
      </div>
    );
  }

  return (
    <Collapsible
      open={isOpen}
      onOpenChange={setIsOpen}
    >
      <Comment data={data[0]} />
      <CollapsibleContent>
        {data.slice(1).map((comment) => (
          <Comment
            key={comment.id}
            data={comment}
          />
        ))}
      </CollapsibleContent>
      <CollapsibleTrigger asChild>
        <div
          className={cn('cursor-pointer select-none text-center font-bold text-primary', {
            hidden: isOpen,
          })}
        >
          {`顯示全部 (${data.length})`}
        </div>
      </CollapsibleTrigger>
    </Collapsible>
  );
};

export default CommentList;
