import type { DetailedHTMLProps, HTMLAttributes, PropsWithChildren } from 'react';
import Image from 'next/image';
import DOMPurify from 'isomorphic-dompurify';
import parse from 'html-react-parser';
import LikeButton from '@/components/common/LikeButton';
import CreatorInfo from '@/components/creator/CreatorInfo';
import { Creator } from '@/types';
import CommentSection from '@/components/article/CommentSection';
import { ArticleType, Comment } from '@/types/article';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';

import DefaultUserImg from '@/images/default-user.webp';
import { CONTENT_1 } from '@/constants/editorSettings';

const creatorInfo: Creator = {
  displayName: 'Render Lai',
  avatarImageUrl: DefaultUserImg.src,
  followersCount: 0,
  userId: 'creator-id',
  userAlreadyFollowed: false,
  bio: '嗨，大家好！我是 Render Lai，一位熱愛旅行、探索世界的旅遊部落客。透過我的部落格，我將帶領你踏上一場充滿冒險、驚喜和文化交流的旅程。',
  email: '作者信箱',
  followers: [],
  followings: []
};

const travelArticle: ArticleType = {
  articleId: '12404202',
  creatorId: '8763',
  creator: 'Render Lai',
  title: '探索北海道的美麗風景',
  abstract: '<p>飛驒匠文化館對面有一家岡田屋，是賣伴手禮的小店，除了伴手禮之外，也有飛驒牛肉串以及烤團子可以買。</p>',
  content: CONTENT_1,
  thumbnailUrl: 'https://vocus.cc/article/6218eafefd897800013f48ba',
  needsPay: false,
  wordsCount: 1200,
  readingTime: 10,
  status: {
    views: 0,
    likes: 0,
    subscriptions: 0,
  },
  tags: ['Japan', 'Hokkaido', 'Travel', 'Nature'],
  category: 'travel',
  createdAt: new Date(),
  updatedAt: new Date(),
};

const commentData: Comment[] = [
  {
    commentId: 'commentId1',
    articleId: 'articleId1',
    user: {
      id: 'userId1',
      displayName: 'Render Lai',
      avatarImgUrl: DefaultUserImg.src,
    },
    content: '這是第一則評論。這則評論的內容非常詳盡，描述了多個觀點和細節，讓人讀起來非常有收穫。希望這樣的評論能夠幫助其他讀者更好地理解文章的重點和內涵。',
    likes: 5,
    updatedAt: new Date('2022-01-01')
  },
  {
    commentId: 'commentId2',
    articleId: 'articleId2',
    user: {
      id: 'userId2',
      displayName: 'Journey Bites',
      avatarImgUrl: DefaultUserImg.src,
    },
    content: '這是第二則評論。這則評論對文章的每一個細節都進行了深入的分析和討論，並且提供了多方面的見解。這樣的評論能夠激發更多的討論和思考，對讀者來說非常有幫助。',
    likes: 77,
    updatedAt: new Date('2024-06-02')
  },
  {
    commentId: 'commentId3',
    articleId: 'articleId3',
    user: {
      id: 'userId3',
      displayName: 'Render Lai 2.0',
      avatarImgUrl: DefaultUserImg.src,
    },
    content: '這是第三則評論。這則評論從不同的角度探討了文章的主題，並且提出了許多有價值的觀點和建議。希望更多的人能夠看到這些評論，從而對文章有更深刻的理解和認識。',
    likes: 99,
    updatedAt: new Date()
  }
];

function ArticleContainer({ children, className, ...props }: PropsWithChildren & DetailedHTMLProps<HTMLAttributes<HTMLDivElement>, HTMLDivElement>) {
  return (
    <div
      className={cn('md:mx-auto text-grey-500 md:mt-[124px] md:max-w-[56%] 2xl:max-w-[854px]', className)}
      {...props}
    >
      {children}
    </div>
  );
}

export default function ArticlePage({ params }: { params: { id: string } }) {
  console.log(params.id);
  const content = travelArticle.needsPay ? travelArticle.abstract : travelArticle.content;
  const cleanContentHtml = DOMPurify.sanitize(content);
  return (
    <>
      <ArticleContainer className='mx-6'>
        <article>
          <small className='mb-1 block text-grey-300'>{travelArticle.createdAt.toLocaleDateString()}</small>
          <h1 className='mb-5 text-xl font-bold md:mb-9 md:text-3xl md:font-black'>{travelArticle.title}</h1>
          <div className='mb-9 flex items-center justify-between'>
            <div className='flex items-center gap-2 p-0 xs:p-1'>
              <div className='relative size-10 md:size-15'>
                <Image fill sizes='5vw' src={creatorInfo.avatarImageUrl || DefaultUserImg} alt={creatorInfo.displayName || 'creator'} />
              </div>
              <div className='flex flex-col items-start gap-1'>
                <span className='text-xl font-medium'>{creatorInfo.displayName}</span>
                <button className='text-primary'>追蹤</button>
              </div>
            </div>
            <div className='flex flex-col items-end gap-1'>
              <small className='text-grey-300'>{travelArticle.readingTime} min</small>
              <LikeButton count={travelArticle.status.likes} withBackground />
            </div>
          </div>
          {parse(cleanContentHtml)}
          {/* TODO: need to handle needsPay & user is already paid */}
          {
            travelArticle.needsPay && (
              <div className='flex justify-center bg-gradient-to-t from-primary-100 to-white py-9'>
                <Button size='sm'>付費即可解鎖閱讀</Button>
              </div>
            )
          }
          <div className='mt-5 flex flex-wrap gap-4 md:mt-9'>
            {
              travelArticle.tags.map((tag) => (
                <Button key={tag} variant='pillPrimary' size='sm'>{tag}</Button>
              ))
            }
          </div>
        </article>
        <section className='my-10 rounded-lg bg-primary-100 p-10 md:my-15'>
          <CreatorInfo creatorInfo={creatorInfo} bioClassName='p-6 bg-[#FFFFFF99] text-grey-400 md:text-lg' />
        </section>
      </ArticleContainer>
      <ArticleContainer>
        <CommentSection comments={commentData} />
      </ArticleContainer>
    </>
  );
}
