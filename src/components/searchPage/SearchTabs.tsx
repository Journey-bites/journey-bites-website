'use client';

import { useRouter, useSearchParams } from 'next/navigation';
import { Tabs, TabsList, TabsTrigger } from '../ui/tabs';

const SEARCH_TABS = [
  {
    value: 'article',
    label: '文章內容'
  },
  {
    value: 'creator',
    label: '創作者'
  },
];

export default function SearchTabs({ defaultValue }: { defaultValue: string }) {
  const router = useRouter();
  const searchParams = useSearchParams();

  function handleChange(value: string) {
    const keywords = searchParams.get('q');
    router.push(`/search/${value}?q=${keywords}`);
  }
  return (
    <Tabs defaultValue={defaultValue} onValueChange={handleChange}>
      <TabsList className='mb-10 gap-4 overflow-hidden rounded-lg bg-grey p-0 text-grey-300 shadow-tabs xs:mb-6'>
      {SEARCH_TABS.map((tab) => (
        <TabsTrigger
          key={tab.value}
          className='px-4 py-3 data-[state=active]:bg-primary data-[state=active]:text-white'
          value={tab.value}>
          {tab.label}
        </TabsTrigger>
      ))}
      </TabsList>
    </Tabs>
  );
}
