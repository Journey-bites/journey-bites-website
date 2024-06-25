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
// import { Button } from './ui/button';
import { cn } from '@/lib/utils';
import { Article } from '@/types/article';

import DefaultUserImg from '@/images/default-user.webp';
import DefaultThumbnailImg from '@/images/default-thumbnail.webp';
import Link from 'next/link';

type ArticlesContainerProps = {
  type: 'hot' | 'recommend';
  color: 'primary' | 'secondary';
  showBtn: boolean,
  articles: Article[]
}

export default async function ArticlesContainer({
  type,
  color,
  // showBtn,
  articles
}: ArticlesContainerProps) {
  const isHotType = type === 'hot';

  return (
    <div className={cn('relative rounded-lg md:p-9 py-2 px-3', color === 'primary' ? 'bg-primary-100' : 'bg-secondary-100')}>
      <div className={cn('flex justify-center items-center gap-3 rounded-tl-lg md:border-b-10 md:border-r-10 md:border-white py-3 md:py-4 px-8 text-white absolute left-0 top-0', `bg-${color}`)}>
        {isHotType ? <PartyPopper className='size-5 md:size-6' /> : <ThumbsUp />}
        <h1 className='text-xl md:text-2xl'>{isHotType ? '熱門文章' : '推薦文章'}</h1>
      </div>
      {/* TODO: add it back when search page is ready */}
      {/* <div className='flex justify-end'>
        <Button variant='outline' className={cn('rounded-lg px-4 py-2 md:px-5 md:py-3', {
            ['md:hidden']: !showBtn,
          })}>
            查看更多
        </Button>
      </div> */}
      <div className={cn('mt-7 grid grid-cols-1 gap-x-4 gap-y-10 md:grid-cols-2', {
        ['md:mt-[116px]']: true, //!showBtn,
      })}>
        {articles.map((item) => (
          <Card key={item.id}>
            <Link href={`/article/${item.id}`} className='flex flex-col-reverse justify-between gap-3 lg:flex-row'>
              <div className='max-w-[232px]'>
                <CardHeader>
                  <CardTitle className='truncate text-xl font-bold'>
                    {item.title}
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className='line-clamp-2 text-grey-500'>
                    {item.abstract}
                  </p>
                </CardContent>
              </div>
              <div className='relative size-[140px] w-full shrink-0 lg:size-[100px]'>
                <Image
                  src={item.thumbnailUrl || DefaultThumbnailImg}
                  placeholder='empty'
                  className='rounded-lg object-cover'
                  sizes='(max-width: 768px) 33vw, (max-width: 1200px) 50vw, 100vw'
                  fill
                  alt={item.title}
                />
              </div>
            </Link>
            <CardFooter className='my-2'>
              <Avatar className='size-6'>
                <AvatarImage src={item.creator.profile.avatarImageUrl || DefaultUserImg.src} asChild>
                  <Image
                    src={item.creator.profile.avatarImageUrl || DefaultUserImg}
                    alt='logo'
                    width={24}
                    height={24}
                  />
                </AvatarImage>
                <AvatarFallback>
                  <Image src={DefaultUserImg} alt='user' />
                </AvatarFallback>
              </Avatar>
              <Link href={`/creator/${item.creator.id}`} className='px-2'>{item.creator.profile.displayName}</Link>
            </CardFooter>
            <div className='flex items-center justify-between'>
              <CardDescription>{new Date(item.createdAt).toLocaleDateString()}</CardDescription>
              <SocialLink articleId={item.id} views={item.status.views} likes={item.status.likes} />
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
}
