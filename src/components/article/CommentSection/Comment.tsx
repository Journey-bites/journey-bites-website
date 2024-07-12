'use client';

import { formatDistance } from 'date-fns';
import { zhTW } from 'date-fns/locale/zh-TW';
import UserAvatar from '@/components/common/UserAvatar';
import { type Comment as CommentType } from '@/types/article';

type Props = {
  data: CommentType;
};

const Comment = ({ data }: Props) => {
  return (
    <div className='mb-4 rounded-lg bg-white p-4 shadow-outlineCard md:mb-6 md:p-6'>
      <div className='flex gap-4'>
        <UserAvatar
          userName={data.user.profile.displayName || ''}
          avatarImgUrl={data.user.profile.avatarImageUrl}
        />
        <div>
          <div className='mb-2 flex flex-col text-xl font-bold md:flex-row'>
            {data.user.profile.displayName}
            <span className='text-base font-normal text-grey-300 md:pl-4'>
              {formatDistance(new Date(data.updatedAt), new Date(), {
                addSuffix: true,
                locale: zhTW,
              })}
            </span>
          </div>
          <p className='mb-4 hidden text-lg md:block'>{data.content}</p>
          {/* TODO: Currently not support comment like feature */}
          {/* <div className='hidden md:block'>
            <LikeButton count={data.likes} />
          </div> */}
        </div>
      </div>
      <div className='md:hidden'>
        <p className='mb-4 text-base'>{data.content}</p>
        {/* <LikeButton count={data.likes} /> */}
      </div>
    </div>
  );
};

export default Comment;
