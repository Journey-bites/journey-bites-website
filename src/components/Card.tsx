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
import type { Article } from '@/types/article';

type Props = { post: Article };

const Post = ({ post }: Props) => {
  return (
    <Card>
      <div className='grid grid-cols-12'>
        <div className='xs:col-span-7 sm:col-span-10 md:col-span-10 lg:col-span-9 xl:col-span-7 2xl:col-span-8'>
          <CardHeader>
            <CardTitle className='text-xl font-bold truncate'>探索京都的古老魅力：千年古都的神秘之旅探索京都的古老魅力：千年古都的神秘之旅</CardTitle>
          </CardHeader>
          <CardContent>
            <p className='line-clamp-2'>京都是一個充滿歷史與文化的城市，擁有眾多古老的寺廟和神社。在這裡，您可以體驗到日本傳統的茶道、花道等文化活動。</p>
          </CardContent>
        </div>
        <div className='relative xs:col-span-5 sm:col-span-2 md:col-span-2 lg:col-span-3 xl:col-span-5 2xl:col-span-4 flex justify-self-end w-[100px] h-[100px]'>
          <Image src={'https://picsum.photos/id/10/100/100'} alt='jorney bites' sizes='100%' placeholder='empty' priority={false} fill={true} className='rounded-lg' />
        </div>
      </div>
      <CardFooter className='py-2'>
        <Avatar>
          <AvatarImage asChild src={'https://picsum.photos/id/20/100/100'}>
            <Image src={'https://picsum.photos/id/20/100/100'} alt='logo' width={40} height={40} />
          </AvatarImage>
          <AvatarFallback>CN</AvatarFallback>
        </Avatar>
        <p className='px-2 w-5/6 line-clamp-1'>{post.title}</p>
      </CardFooter>
      <div className='flex align-center justify-between'>
        <CardDescription>2024/3/23</CardDescription>
        <SocialLink />
      </div>
    </Card>
  );
};

export default Post;
