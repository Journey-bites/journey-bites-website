'use client';

import Link from 'next/link';
import { SendIcon, FrownIcon } from 'lucide-react';
import { formatDistance } from 'date-fns';
import { zhTW } from 'date-fns/locale/zh-TW';
import { useUserStore } from '@/providers/userProvider';
import { Comment } from '@/types/article';
import { Button } from '../ui/button';
import { Input } from '../ui/input';
import LikeButton from '../common/LikeButton';
import UserAvatar from '../common/UserAvatar';
import LoginLinkWithStorePathname from '../common/LoginLinkWithStorePathname';

export default function CommentSection({ comments }: { comments: Comment[] | [] }) {
  const { isLogin, auth } = useUserStore((state) => state);
  return (
    <section className='overflow-hidden border-2 border-x-0 border-grey-200 text-grey-500 md:rounded-lg md:border-x-2'>
      <div className='bg-grey bg-comment-texture bg-[length:40px] bg-repeat px-3 py-5 md:p-10'>
        <h3 className='mb-6'>
          回應
          <small className='pl-2 text-lg text-grey-300'>({comments.length})</small>
        </h3>
        {
          comments.length === 0 && (
            <div className='flex min-h-[356px] flex-col items-center justify-center rounded-lg bg-white shadow-outlineCard'>
              <FrownIcon className='mb-2 stroke-grey-400' size={32} />
              <h4 className='mb-1 text-grey-400'>目前尚無回應</h4>
              <p className='text-base text-grey-300'>快成為第一個留言的人吧！</p>
            </div>
          )
        }
        {
          comments.length > 0 && (
            comments.map((comment) => (
              <div key={comment.commentId} className='mb-4 rounded-lg bg-white p-4 shadow-outlineCard md:mb-6 md:p-6'>
                <div className='flex gap-4'>
                  <UserAvatar userName={comment.user.displayName} avatarImgUrl={comment.user.avatarImgUrl} />
                  <div>
                    <div className='mb-2 flex flex-col text-xl font-bold md:flex-row'>
                      {comment.user.displayName}
                      <span className='text-base font-normal text-grey-300 md:pl-4'>{formatDistance(new Date(comment.updatedAt), new Date(), { addSuffix: true, locale: zhTW })}</span>
                    </div>
                    <p className='mb-4 hidden text-lg md:block'>{comment.content}</p>
                    <div className='hidden md:block'>
                      <LikeButton count={comment.likes} />
                    </div>
                  </div>
                </div>
                <div className='md:hidden'>
                  <p className='mb-4 text-base'>{comment.content}</p>
                  <LikeButton count={comment.likes} />
                </div>
              </div>
            ))
          )
        }
      </div>
      <div className='flex items-center gap-2 border-t-2 border-grey-200 px-[18px] py-5'>
        {
          isLogin ? (
            <>
              <UserAvatar userName={auth?.profile.displayName || ''} avatarImgUrl={auth?.profile.avatarImageUrl} />
              <Input type='text' className='w-full border-none' placeholder='留言...' />
              <Button variant='icon' className='group shrink-0'>
                <SendIcon className='stroke-primary group-hover:stroke-primary-100' />
              </Button>
            </>
          ): (
              <p className='flex-1 text-center [&>a]:text-secondary'>如果需要留言，請先
                {' '}<LoginLinkWithStorePathname />
                {' '}
                或
                {' '}
                <Link href='/register'>註冊會員</Link>
              </p>
          )
        }
      </div>
    </section>
  );
}
