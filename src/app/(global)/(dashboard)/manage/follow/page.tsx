'use client';

import { UserRoundPlusIcon, TentTreeIcon } from 'lucide-react';
import TitleWithIcon from '@/components/dashboard/TitleWIthIcon';
import TabsWithContent from '@/components/dashboard/TabsWithContent';
import CreatorCard from '@/components/creator/CreatorCard';
import { useQuery } from '@tanstack/react-query';
import { getFollowings, getFollowers } from '@/lib/authApi';
import { QUERY_KEY } from '@/constants';
import Loader from '@/components/custom/Loader';
import NoResults from '@/components/dashboard/NoResults';

export default function FollowPage() {
  const { isPending: getFollowingsPending, data: followings, error: getFollowingsError } = useQuery({
    queryKey: [QUERY_KEY.following],
    queryFn: getFollowings,
  });
  const { isPending: getFollowersPending, data: follower, error: getFollowerError } = useQuery({
    queryKey: [QUERY_KEY.followers],
    queryFn: getFollowers,
  });

  if (getFollowingsPending || getFollowersPending) return <Loader />;

  if (getFollowingsError || getFollowerError) return (
    <div>{getFollowingsError ? getFollowingsError.message : getFollowerError?.message}</div>
  );

  function FollowingsContent() {
    return (
      followings?.length ? (
        <div className='grid grid-cols-1 gap-9 md:grid-cols-2 md:gap-6'>
          {
            followings?.map((item) => (
              <CreatorCard key={item.userId} creator={item} hasFollowed />
            ))
          }
        </div>
      ): (
          <NoResults title='尚無追蹤中的創作者' icon={TentTreeIcon} />
      )
    );
  }

  function FollowersContent() {
    return (
      follower?.length ? (
        <div className='grid grid-cols-1 gap-9 md:grid-cols-2 md:gap-6'>
          {
            follower?.map((item) => {
              const hasFollowed = followings?.some((follow) => follow.userId === item.userId);
              return <CreatorCard key={item.userId} creator={item} hasFollowed={Boolean(hasFollowed)} />;
            })
          }
        </div>
      ): (
          <NoResults title='尚無追蹤者' icon={TentTreeIcon} />
      )
    );
  }

  return (
    <div>
      <TitleWithIcon title='我的追蹤與收藏' icon={UserRoundPlusIcon} />
      <TabsWithContent
        defaultValue='following'
        tabs={[
          {
            value: 'following',
            label: '追蹤中的創作者',
            content: <FollowingsContent />
          },
          {
            value: 'follower',
            label: '我的追蹤者',
            content: <FollowersContent />
          },
          {
            value: 'collection',
            label: '我收藏的文章',
            content: <NoResults title='此功能尚未開放，敬請期待' icon={TentTreeIcon} />
          }]
        }
      />
    </div>
  );
}
