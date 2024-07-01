'use client';

import { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { useSearchParams } from 'next/navigation';
import { FrownIcon } from 'lucide-react';
import { getCreators } from '@/lib/nextApi';
import Loader from '@/components/custom/Loader';
import useSearch from '@/hook/useSearch';
import NoResults from '@/components/dashboard/NoResults';
import SearchSection from '@/components/searchPage/SearchSection';
import CreatorCard from '@/components/creator/CreatorCard';
import { useUserStore } from '@/providers/userProvider';
import { QUERY_KEY } from '@/constants';
import { getFollowings } from '@/lib/authApi';
import SearchTabs from '@/components/searchPage/SearchTabs';

export default function CreatorSearchPage() {
  const searchParams = useSearchParams();
  const keywords = searchParams.get('q') || '';
  const [value, setValue] = useState(keywords);
  const { handleSearch } = useSearch({ keywords: value, type: 'creator' });
  const { auth } = useUserStore((state) => state);

  const { data: creators, isFetched, isLoading: isSearching } = useQuery({
    queryKey: [QUERY_KEY.searchCreators],
    queryFn: () => getCreators({ search: value }),
  });

  const { data: userFolloings, isLoading: isGettingFollowings } = useQuery({
    queryKey: [QUERY_KEY.following],
    queryFn: getFollowings,
    enabled: Boolean(auth),
  });

  if (isSearching || (auth && isGettingFollowings)) {
    return (
      <div className='flex min-h-[300px] items-center justify-center'>
        <Loader />
      </div>
    );
  }

  return (
    <>
      <SearchSection value={value} setValue={setValue} handleSearch={handleSearch} results={creators} resultText='位創作者' queryKey={QUERY_KEY.searchCreators} />
      <div className='mx-auto mt-[58px] flex w-full flex-col gap-6 px-6 lg:w-container'>
        <SearchTabs defaultValue='creator' />
        {(isFetched && !creators?.length) ? (
          <NoResults title='目前沒有搜尋結果' icon={FrownIcon} />
        ) : (
            <div className='grid grid-cols-1 gap-6 lg:grid-cols-2'>
              {creators?.map((creator) => {
                const hasFollowed = userFolloings?.some((item) => item.userId === creator.userId) || false;
                return <CreatorCard key={creator.userId} creator={creator} hasFollowed={hasFollowed} />;
              }
              )}
          </div>
        )}
      </div>
    </>
  );
}