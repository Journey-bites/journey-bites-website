import { type PropsWithChildren } from 'react';
// import TabsWithContent from '@/components/dashboard/TabsWithContent';
// import { notFound, useParams } from 'next/navigation';
// import { SearchType } from '@/types';

// TODO: Search by creator and category

export default function SearchLayout({ children }: PropsWithChildren) {
  // const router = useRouter();
  // const params = useParams<{ type: SearchType }>();

  // if (!Object.values(SearchType).includes(params.type)) {
  //   return notFound();
  // }

  // function navigateToSearchTypePage(searchType: string | SearchType) {
  //   router.push(`/search/${searchType}?q=${value}`);
  // }

  return (
    <>
      {/* <div className='flex justify-center bg-primary-100 pb-10 pt-15'>
        <div className='w-container'>
          <SearchInput value={value} onChange={(e) => setValue(e.target.value)} />
          <p className='mt-4 text-grey-300'>{resultContent}</p>
        </div>
      </div>
      <div className='mx-auto mt-[58px] w-container'> */}
        {/* Currently only support article */}
        {/* <TabsWithContent
          defaultValue={params.type}
          onTabChange={navigateToSearchTypePage}
          tabs={[
            {
              value: SearchType.Article,
              label: '文章內容',
              content: children
            },
            {
              value: SearchType.Creator,
              label: '創作者',
              content: children
            },
            {
              value: SearchType.Category,
              label: '分類',
              content: children
            }]
          }
        /> */}
        {children}
      {/* </div> */}
    </>
  );
}