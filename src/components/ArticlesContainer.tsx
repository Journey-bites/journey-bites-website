import Image from 'next/image';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { PartyPopper, ThumbsUp } from 'lucide-react';
import SocialLink from './custom/SocialLink';
import { Button } from './ui/button';
import { cn } from '@/lib/utils';

import DefaultUserImg from '@/images/default-user.webp';

type ArticlesContainerProps = {
  type: 'hot' | 'recommend';
  color: 'primary' | 'secondary';
  showBtn: boolean,
  post?: {
    userId: number;
    id: number;
    title: string;
    body: string;
  }[] | undefined;
}

async function getRecipes() {
  const resp = await fetch('https://jsonplaceholder.typicode.com/users');

  await new Promise((resolve) => setTimeout(resolve, 3000));
  return resp.json();
}

export default async function ArticlesContainer({
  type,
  color,
  showBtn
}: ArticlesContainerProps) {
  const isHotType = type === 'hot';
  const datas = await getRecipes();

  return (
    <div className={cn('relative rounded-lg md:p-9 py-2 px-3', color === 'primary' ? 'bg-primary-100' : 'bg-secondary-100')}>
      <div className={cn('flex justify-center items-center gap-3 rounded-tl-lg md:border-b-10 md:border-r-10 md:border-white py-3 md:py-4 px-8 text-white absolute left-0 top-0', `bg-${color}`)}>
        {isHotType ? <PartyPopper className='size-5 md:size-6' /> : <ThumbsUp />}
        <h1 className='text-xl md:text-2xl'>{isHotType ? '熱門文章' : '推薦文章'}</h1>
      </div>
      <div className='flex justify-end'>
        <Button variant='outline' className={cn('rounded-lg px-4 py-2 md:px-5 md:py-3', {
            ['md:hidden']: !showBtn,
          })}>
            查看更多
        </Button>
      </div>
      <div className={cn('mt-7 grid grid-cols-1 gap-x-4 gap-y-10 md:grid-cols-2', {
        ['md:mt-[116px]']: !showBtn,
      })}>
        {'1234'.split('').map((item, index) => (
          <Card key={item}>
            <div className='flex flex-col-reverse gap-3 lg:flex-row'>
              <div className='max-w-[232px] lg:max-w-[73.5%]'>
                <CardHeader>
                  <CardTitle className='truncate text-xl font-bold'>
                    探索京都的古老魅力：千年古都的神秘之旅探索京都的古老魅力：千年古都的神秘之旅
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className='line-clamp-2 text-grey-500'>
                    京都是一個充滿歷史與文化的城市，擁有眾多古老的寺廟和神社。在這裡，您可以體驗到日本傳統的茶道、花道等文化活動。
                  </p>
                </CardContent>
              </div>
              <div className='relative h-[140px] w-full lg:size-[100px]'>
                <Image
                  src={`https://picsum.photos/id/${index + 10}/200/200`}
                  placeholder='empty'
                  className='rounded-lg object-cover'
                  sizes='(max-width: 768px) 33vw, (max-width: 1200px) 50vw, 100vw'
                  fill
                  alt='journey bites'
                />
              </div>
            </div>
            <CardFooter className='my-2'>
              <Avatar className='size-6'>
                <AvatarImage src={`https://picsum.photos/id/${index + 20}/100/100`} asChild>
                  <Image
                    src={`https://picsum.photos/id/${index + 20}/100/100`}
                    alt='logo'
                    width={24}
                    height={24}
                  />
                </AvatarImage>
                <AvatarFallback>
                  <Image src={DefaultUserImg} alt='user' />
                </AvatarFallback>
              </Avatar>
              <p className='px-2'>{datas[item].name}</p>
            </CardFooter>
            <div className='flex items-center justify-between'>
              <CardDescription>2024/3/23</CardDescription>
              <SocialLink />
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
}
