'use client';

import { NewspaperIcon } from 'lucide-react';
import TitleWIthIcon from '@/components/dashboard/TitleWIthIcon';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { OrderBy } from '@/types';
import SearchInput from '@/components/custom/SearchInput';
import LargeArticleCard from '@/components/article/LargeArticleCard';

export default function ContentPage() {
  return (
    <>
      <TitleWIthIcon title='內容作品管理' icon={NewspaperIcon} />
      <section>
        <div className='flex gap-4'>
          <Select>
            <SelectTrigger className='w-[180px]'>
              <SelectValue placeholder='文章排序' defaultValue={OrderBy.DESC} />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value={OrderBy.DESC}>由新到舊</SelectItem>
              <SelectItem value={OrderBy.ASC}>由舊到新</SelectItem>
            </SelectContent>
          </Select>
          <SearchInput value='' onChange={() => {}} onKeyDown={() => {}} />
        </div>
        <p className='my-5 text-grey-300'>共 10 篇文章</p>
        {/* <LargeArticleCard isUsersArticle /> */}
      </section>
    </>
  );
}