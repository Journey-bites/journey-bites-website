import Link from 'next/link';
import type { DetailedHTMLProps, HTMLAttributes, PropsWithChildren } from 'react';
import DOMPurify from 'isomorphic-dompurify';
import parse from 'html-react-parser';
import LikeButton from '@/components/common/LikeButton';
import CreatorInfo from '@/components/creator/CreatorInfo';
import CommentSection from '@/components/article/CommentSection';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import { getArticleById, getCreatorById } from '@/lib/nextApi';
import FollowBtn from '@/components/article/FollowBtn';
import SubscriptionLayer from '@/components/article/SubscriptionLayer';
import UserAvatar from '@/components/common/UserAvatar';
import { cookies } from 'next/headers';
import { JOURNEY_BITES_COOKIE } from '@/constants';

DOMPurify.setConfig({
  ADD_ATTR: ['target', 'rel'],
});

function ArticleContainer({ children, className, ...props }: PropsWithChildren & DetailedHTMLProps<HTMLAttributes<HTMLDivElement>, HTMLDivElement>) {
  return (
    <div
      className={cn('lg:mx-auto text-grey-500 lg:mt-[124px] lg:max-w-[56%] 2xl:max-w-[854px]', className)}
      {...props}
    >
      {children}
    </div>
  );
}

export default async function ArticlePage({ params }: { params: { id: string } }) {
  const token = cookies().get(JOURNEY_BITES_COOKIE)?.value;
  const article = await getArticleById(params.id, token);
  const cleanContentHtml = DOMPurify.sanitize(article.content);
  const creatorInfo = await getCreatorById(article.creator.id);
  return (
    <>
      <ArticleContainer className='mx-6'>
        <article>
          <small className='mb-1 block text-grey-300'>{new Date(article.createdAt).toLocaleDateString()}</small>
          <h1 className='mb-5 text-xl font-bold md:mb-9 md:text-3xl md:font-black'>{article.title}</h1>
          <div className='mb-9 flex items-center justify-between'>
            <div className='flex items-center gap-2 p-0 xs:p-1'>
              <UserAvatar userName={creatorInfo.displayName || ''} avatarImgUrl={creatorInfo.avatarImageUrl} className='size-15' />
              <div className='flex flex-col items-start gap-1'>
                <Link href={`/creator/${creatorInfo.userId}`} className='text-xl font-medium'>{creatorInfo.displayName}</Link>
                <FollowBtn creatorId={creatorInfo.userId} />
              </div>
            </div>
            <div className='flex flex-col items-end gap-1'>
              <small className='text-grey-300'>{article.readTime} min</small>
              <LikeButton articleId={params.id} count={article.status.likes} withBackground />
            </div>
          </div>
          {parse(cleanContentHtml)}
          {
            article.isNeedPay && (
              <SubscriptionLayer creatorId={article.creator.id} />
            )
          }
          <div className='mt-5 flex flex-wrap gap-4 md:mt-9'>
            {
              article.tags?.map((tag) => (
                <Button asChild key={tag} variant='pillPrimary' size='sm'>
                  <div>{tag}</div>
                </Button>
              ))
            }
          </div>
        </article>
        <section className='my-10 rounded-lg bg-primary-100 p-10 md:my-15'>
          <CreatorInfo creatorInfo={creatorInfo} bioClassName='p-6 bg-[#FFFFFF99] text-grey-400 md:text-lg' />
        </section>
      </ArticleContainer>
      <ArticleContainer>
        <CommentSection articleId={params.id} />
      </ArticleContainer>
    </>
  );
}
