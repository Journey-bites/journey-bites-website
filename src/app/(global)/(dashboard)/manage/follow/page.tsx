'use client';

import { UserRoundPlusIcon, TentTreeIcon } from 'lucide-react';
import TitleWithIcon from '@/components/dashboard/TitleWithIcon';
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
            followings?.map((creator) => (
              <CreatorCard key={creator.userId} creator={creator} />
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
            follower?.map((creator) => <CreatorCard key={creator.userId} creator={creator} />)
          }
        </div>
      ): (
          <NoResults title='尚無追蹤者' icon={TentTreeIcon} />
      )
    );
  }

  return (
    <section>
      <TitleWithIcon title='我的追蹤與粉絲' icon={UserRoundPlusIcon} />
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
            label: '我的粉絲',
            content: <FollowersContent />
          }]
        }
      />
    </section>
  );
}
