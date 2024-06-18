import Image from 'next/image';
import { cookies } from 'next/headers';
import { getCreatorById } from '@/lib/nextApi';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import SocialLink from '@/components/custom/SocialLink';
import { JOURNEY_BITES_COOKIE } from '@/constants';
import CreatorInfo from '@/components/creator/CreatorInfo';

import TempImg from '@/images/not-found-img.webp';

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
              <SelectValue placeholder='文章排序' defaultValue='light' />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value='light'>由新到舊</SelectItem>
              <SelectItem value='dark'>由舊到新</SelectItem>
            </SelectContent>
          </Select>
        </div>
        <div className='border-t-[6px] border-t-primary-100 bg-grey p-4 md:border-l-4 md:border-l-primary-100 md:p-10'>
          <div className='mb-4 flex flex-col-reverse gap-4 md:mb-6 md:flex-row md:gap-10'>
            <div className='text-grey-500'>
              <h3 className='text-xl font-black md:text-2xl'>現代藝術</h3>
              <p className='md:text-lg'>Lorem ipsum, dolor sit amet consectetur adipisicing elit. Odio eum neque natus quos rerum dolorem consectetur iure, dolorum hic deleniti! Id tempore hic tempora maxime vitae, temporibus facilis rerum obcaecati?</p>
            </div>
            <Image className='max-h-40 w-full object-cover md:size-auto' src={TempImg} width={240} height={180} alt='' />
          </div>
          <div className='flex justify-between border-t border-grey-200 pb-[6px] pt-[13px]'>
            <span className='text-grey-300'>2024/3/4</span>
            <SocialLink></SocialLink>
          </div>
        </div>
      </section>
    </>
  );
}
