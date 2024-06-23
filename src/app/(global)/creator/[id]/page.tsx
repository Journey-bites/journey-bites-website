import { cookies } from 'next/headers';
import { getCreatorById } from '@/lib/nextApi';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { JOURNEY_BITES_COOKIE } from '@/constants';
import CreatorInfo from '@/components/creator/CreatorInfo';
import LargeArticleCard from '@/components/article/LargeArticleCard';
import { OrderBy } from '@/types';

export default async function CreatorInfoPage({ params }: { params: { id: string } }) {
  const token = cookies().get(JOURNEY_BITES_COOKIE);
  const creator = await getCreatorById(params.id, token?.value);
  return (
    <>
      <section className='bg-primary-100 py-10 md:py-15'>
        <div className='w-full px-6 md:mx-auto md:max-w-[56%] md:p-0'>
          <CreatorInfo creatorInfo={creator} />
        </div>
      </section>
      <section className='mt-12 w-full px-6 md:mx-auto md:mt-20 md:max-w-[56%]'>
        <div className='mb-[14px] md:mb-5'>
          <Select>
            <SelectTrigger className='w-[180px]'>
              <SelectValue placeholder='文章排序' defaultValue={OrderBy.DESC} />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value={OrderBy.DESC}>由新到舊</SelectItem>
              <SelectItem value={OrderBy.ASC}>由舊到新</SelectItem>
            </SelectContent>
          </Select>
        </div>
        <LargeArticleCard showCreatedAt />
      </section>
    </>
  );
}
