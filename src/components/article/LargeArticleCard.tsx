'use client';

import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { zhTW } from 'date-fns/locale/zh-TW';
import { formatDistance } from 'date-fns';
import { EllipsisVerticalIcon } from 'lucide-react';
import SocialLink from '@/components/custom/SocialLink';
import { DropdownMenuComponent as DropdownMenu, DropdownMenuLinkItem } from '@/components/custom/DropdownMenu';
import UserAvatar from '@/components/common/UserAvatar';
import LockIconComponent from './LockIconComponent';
import { Article } from '@/types/article';
import { toast } from '@/components/ui/use-toast';
import { useUserStore } from '@/providers/userProvider';

import DefaultThumbnailImg from '@/images/default-thumbnail.webp';

type LargeArticleCardProps = {
  article: Article
  showCreator?: boolean;
  showReadTime?: boolean;
  showCreatedAt?: boolean;
  isUsersArticle?: boolean;
  deleteArticleConfirm?: (deletedArticleId: string) => void
}

export default function LargeArticleCard({ article, showCreator, showReadTime, showCreatedAt, isUsersArticle, deleteArticleConfirm }: LargeArticleCardProps) {
  const { auth } = useUserStore((state) => state);
  const creatorInfo = article.creator?.profile || auth?.profile;
  const router = useRouter();

  function handleShareArticle() {
    navigator.clipboard.writeText(`${window.location.origin}/article/${article.id}`)
      .then(() => {
        toast({ title: '複製網址成功', description: '趕快分享給你的好朋友吧！', variant: 'success' });
     })
      .catch(() => {
        toast({ title: '複製網址失敗', description: '請聯繫客服，協助排查問題', variant: 'error' });
      });
  }

  function handleToArticlePage() {
    router.push(`/article/${article.id}`);
  }

  return (
    <div className='relative border-t-[6px] border-t-primary-100 bg-grey p-4 md:border-l-4 md:border-t-0 md:border-l-primary-100 md:p-10'>
      {isUsersArticle ? (
         <DropdownMenu
            triggerButton={
              <button className='group absolute right-1 top-1 z-10 rounded-full bg-secondary p-2 text-white md:right-4 md:top-4 md:bg-transparent md:p-0 md:text-black'>
                <EllipsisVerticalIcon className='size-4' />
              </button>
              }
            >
          <DropdownMenuLinkItem>
            <Link href={`/article/edit/${article.id}`}>編輯</Link>
          </DropdownMenuLinkItem>
          <DropdownMenuLinkItem>
            <button onClick={handleShareArticle}>分享</button>
          </DropdownMenuLinkItem>
          <DropdownMenuLinkItem className='text-danger'>
            <button
              onClick={() => {
                if (typeof deleteArticleConfirm === 'function') {
                  deleteArticleConfirm(article.id);
                };
              }}>
              刪除
            </button>
          </DropdownMenuLinkItem>
        </DropdownMenu>
      ) : article.isNeedPay ? (
        <LockIconComponent className='-top-4' />
      ) : null
    }
      <div className='mb-4 flex flex-col-reverse justify-between gap-4 md:mb-6 md:flex-row md:gap-10'>
        <div className='grow text-left text-grey-500'>
          <button onClick={handleToArticlePage} className='w-full text-left'>
            <h3 className='text-xl font-black md:text-2xl'>{article.title}</h3>
            <p className='md:text-lg'>{article.abstract}</p>
          </button>
          {showCreator && (
            <div className='mt-5 flex items-center gap-2 text-lg md:mt-11'>
              <UserAvatar userName={creatorInfo.displayName || ''} avatarImgUrl={creatorInfo.avatarImageUrl} />
              <Link href={`/creator/${article.creator.id}`} className='text-primary'>{creatorInfo.displayName}</Link>
              <span className='text-grey-300'>發佈於</span>
              <span className='text-primary'>{article.category}</span>
            </div>
          )}
        </div>
        <div className='relative h-40 w-full shrink-0 md:h-[180px] md:w-[240px]'>
          <Image className='object-cover' src={article.thumbnailUrl || DefaultThumbnailImg} fill alt={article.title} />
        </div>
      </div>
      <div className='flex justify-between border-t border-grey-200 pb-[6px] pt-[13px]'>
        <span className='text-grey-300'>
          {showCreatedAt && new Date(article.createdAt).toLocaleDateString()}
          {showReadTime && `閱讀時間約為 ${article.readTime} 分鐘`}
          {isUsersArticle && `${formatDistance(new Date(article.updatedAt), new Date(), { addSuffix: true, locale: zhTW })}編輯`}
        </span>
        <SocialLink views={article.status.views} likes={article.status.likes} comments={article.commentCount} />
      </div>
    </div>
  );
}
