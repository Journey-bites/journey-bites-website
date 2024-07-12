'use client';

import { useEffect, useState } from 'react';
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from '@/components/ui/collapsible';
import { type Comment as CommentType } from '@/types/article';
import Comment from './Comment';
import { cn } from '@/lib/utils';

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
    return null;
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
