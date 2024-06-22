import Image from 'next/image';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from '@/components/ui/avatar';
import SocialLink from './custom/SocialLink';
import type { RecommendArticle } from '@/types/article';

type Props = { post: RecommendArticle };

export default function ArticleContent({ post }: Props) {

  return (
    <Card>
      <div className='grid grid-cols-12'>
        <div className='xs:col-span-7 sm:col-span-10 md:col-span-10 lg:col-span-9 xl:col-span-7 2xl:col-span-8'>
          <CardHeader>
            <CardTitle className='truncate text-xl font-bold'>{post.title}</CardTitle>
          </CardHeader>
          <CardContent>
            <p className='line-clamp-2'>{post.body}</p>
          </CardContent>
        </div>
        <div className='relative flex size-[100px] justify-self-end xs:col-span-5 sm:col-span-2 md:col-span-2 lg:col-span-3 xl:col-span-5 2xl:col-span-4'>
          <Image src={`https://picsum.photos/id/${post.id}/100/100`} alt='jorney bites' sizes='100%' placeholder='empty' priority={false} fill={true} className='rounded-lg' />
        </div>
      </div>
      <CardFooter className='py-2'>
        <Avatar>
          <AvatarImage asChild src={`https://picsum.photos/id/${post.id}/100/100`}>
            <Image src={`https://picsum.photos/id/${post.id}/100/100`} alt='logo' width={40} height={40} />
          </AvatarImage>
          <AvatarFallback>CN</AvatarFallback>
        </Avatar>
        <p className='line-clamp-1 w-5/6 px-2'>{post.title}</p>
      </CardFooter>
      <div className='flex items-center justify-between'>
        <CardDescription>2024/3/23</CardDescription>
        <SocialLink />
      </div>
    </Card>
  );
};
