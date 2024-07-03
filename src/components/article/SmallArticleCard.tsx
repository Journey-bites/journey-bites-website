import Image from 'next/image';
import Link from 'next/link';
import { Avatar, AvatarImage, AvatarFallback } from '@/components/ui/avatar';
import SocialLink from '@/components/custom/SocialLink';
import { Card, CardHeader, CardTitle, CardContent, CardFooter, CardDescription } from '@/components/ui/card';
import { Article } from '@/types/article';

import DefaultUserImg from '@/images/default-user.webp';
import DefaultThumbnailImg from '@/images/default-thumbnail.webp';

export default function SmallArticleCard({ article }: { article: Article }) {
  return (
    <Card>
      <Link href={`/article/${article.id}`} className='flex flex-col-reverse justify-between gap-3 lg:flex-row'>
        <div className='max-w-[232px]'>
          <CardHeader>
            <CardTitle className='truncate text-xl font-bold'>
              {article.title}
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className='line-clamp-2 text-grey-500'>
              {article.abstract}
            </p>
          </CardContent>
        </div>
        <div className='relative size-[140px] w-full shrink-0 lg:size-[100px]'>
          <Image
            src={article.thumbnailUrl || DefaultThumbnailImg.src}
            placeholder='empty'
            className='rounded-lg object-cover'
            sizes='(max-width: 768px) 33vw, (max-width: 1200px) 50vw, 100vw'
            fill
            alt={article.title}
          />
        </div>
      </Link>
      <CardFooter className='my-2'>
        <Avatar className='size-6'>
          <AvatarImage src={article.creator.profile.avatarImageUrl || DefaultUserImg.src} asChild>
            <Image
              src={article.creator.profile.avatarImageUrl || DefaultUserImg}
              alt='logo'
              width={24}
              height={24}
            />
          </AvatarImage>
          <AvatarFallback>
            <Image src={DefaultUserImg} alt='user' />
          </AvatarFallback>
        </Avatar>
        <Link href={`/creator/${article.creator.id}`} className='px-2'>{article.creator.profile.displayName}</Link>
      </CardFooter>
      <div className='flex items-center justify-between'>
        <CardDescription>{new Date(article.createdAt).toLocaleDateString()}</CardDescription>
        <SocialLink views={article.status.views} likes={article.status.likes} comments={article.commentCount} />
      </div>
    </Card>
  );
}
