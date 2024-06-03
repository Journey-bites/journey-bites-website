import Image from 'next/image';
import { ComponentProps } from 'react';
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

type ArticleCardTitleProps = {
  title: '熱門文章' | '推薦文章';
  color: 'primary-100' | 'secondary-100';
  post?: {
    userId: number;
    id: number;
    title: string;
    body: string;
  }[] | undefined;
} & ComponentProps<'div'>

async function getRecipes() {
  const resp = await fetch('https://jsonplaceholder.typicode.com/users');

  await new Promise((resolve) => setTimeout(resolve, 3000));
  return resp.json();
}

export default async function ArticleCardTemplate({
  title,
  color,
}: ArticleCardTitleProps) {
  const colorVariants: Record<'primary-100' | 'secondary-100', string> = {
    'primary-100': 'bg-primary-100',
    'secondary-100': 'bg-secondary-100',
  };

  const containerClass = `relative rounded-lg ${colorVariants[color]}`;

  const datas = await getRecipes();

  return (
    <div className={containerClass}>
      {title === '熱門文章' ?
        <>
          <h1 className='flex w-[200px] justify-center gap-3 border-b-10 border-r-10 border-white bg-secondary p-4 text-2xl text-white'>
            <PartyPopper />
            {title}
          </h1>
          <div className='absolute right-9 top-7 border-2 border-solid border-blue-600'>
            <a
              href=''
              className='block px-4 py-3 text-blue-500'
            >
              查看更多
            </a>
          </div>
        </>
      : (<h1 className='flex w-[200px] justify-center gap-3 border-b-10 border-r-10 border-white bg-primary p-4 text-2xl text-white'>
          <ThumbsUp />
          {title}
        </h1>
      )}
      <div className='grid gap-x-4 gap-y-9 p-9 lg:grid-cols-2 xl:grid-cols-2 2xl:grid-cols-2'>
        {'1234'.split('').map((item, index) => (
          <Card key={item} >
            <div className='grid grid-cols-12'>
              <div className='sm:col-span-10 md:col-span-10 lg:col-span-9 xl:col-span-7 2xl:col-span-8 xs:col-span-7'>
                <CardHeader>
                  <CardTitle className='truncate text-xl font-bold'>
                    探索京都的古老魅力：千年古都的神秘之旅探索京都的古老魅力：千年古都的神秘之旅
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className='line-clamp-2'>
                    京都是一個充滿歷史與文化的城市，擁有眾多古老的寺廟和神社。在這裡，您可以體驗到日本傳統的茶道、花道等文化活動。
                  </p>
                </CardContent>
              </div>
              <div className='relative flex size-[100px] justify-self-end sm:col-span-2 md:col-span-2 lg:col-span-3 xl:col-span-5 2xl:col-span-4 xs:col-span-5'>
                <Image
                  src={`https://picsum.photos/id/${index + 10}/100/100`}
                  alt='jorney bites'
                  sizes='100%'
                  placeholder='empty'
                  priority={false}
                  fill={true}
                  className='rounded-lg'
                />
              </div>
            </div>
            <CardFooter className='py-2'>
              <Avatar>
                <AvatarImage
                  asChild
                  src={`https://picsum.photos/id/${index + 20}/100/100`}
                >
                  <Image
                    src={`https://picsum.photos/id/${index + 20}/100/100`}
                    alt='logo'
                    width={40}
                    height={40}
                  />
                </AvatarImage>
                <AvatarFallback>CN</AvatarFallback>
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
