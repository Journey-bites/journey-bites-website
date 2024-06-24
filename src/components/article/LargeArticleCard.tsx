import Image from 'next/image';
import Link from 'next/link';
import { zhTW } from 'date-fns/locale/zh-TW';
import { formatDistance } from 'date-fns';
import { EllipsisVerticalIcon } from 'lucide-react';
import SocialLink from '../custom/SocialLink';
import { DropdownMenuComponent as DropdownMenu, DropdownMenuLinkItem } from '../custom/DropdownMenu';
import UserAvatar from '../common/UserAvatar';
import { ArticleType } from '@/types/article';

import DefaultThumbnailImg from '@/images/default-thumbnail.webp';

type LargeArticleCardProps = {
  article: ArticleType
  showCreator?: boolean;
  showReadTime?: boolean;
  showCreatedAt?: boolean;
  isUsersArticle?: boolean;
}

export default function LargeArticleCard({ article, showCreator, showReadTime, showCreatedAt, isUsersArticle }: LargeArticleCardProps) {
  const creatorInfo = article.creator.profile;
  return (
    <div className='relative border-t-[6px] border-t-primary-100 bg-grey p-4 md:border-l-4 md:border-t-0 md:border-l-primary-100 md:p-10'>
      {isUsersArticle && (
         <DropdownMenu
            triggerButton={
              <button className='group absolute right-4 top-4'>
                <EllipsisVerticalIcon className='size-4' />
              </button>
              }
            >
          <DropdownMenuLinkItem>
            <Link href='#'>編輯</Link>
          </DropdownMenuLinkItem>
          <DropdownMenuLinkItem>
            <button>分享</button>
          </DropdownMenuLinkItem>
          <DropdownMenuLinkItem className='text-danger'>
            <button>刪除</button>
          </DropdownMenuLinkItem>
        </DropdownMenu>
      )}
      <div className='mb-4 flex flex-col-reverse gap-4 md:mb-6 md:flex-row md:gap-10'>
        <div className='text-grey-500'>
          <h3 className='text-xl font-black md:text-2xl'>{article.title}</h3>
          <p className='md:text-lg'>{article.abstract}</p>
          {showCreator && (
            <div className='mt-5 flex items-center gap-2 text-lg md:mt-11'>
              <UserAvatar userName={creatorInfo.displayName || ''} avatarImgUrl={creatorInfo.avatarImageUrl} imgClassName='w-10' />
              <Link href='#' className='text-primary'>{creatorInfo.displayName}</Link>
              <span className='text-grey-300'>發佈於</span>
              <Link href='#' className='text-primary'>{article.category}</Link>
            </div>
          )}
        </div>
        <Image className='max-h-40 w-full object-cover md:size-auto' src={article.thumbnailUrl || DefaultThumbnailImg} width={240} height={180} alt='' />
      </div>
      <div className='flex justify-between border-t border-grey-200 pb-[6px] pt-[13px]'>
        <span className='text-grey-300'>
          {showCreatedAt && new Date(article.createdAt).toLocaleDateString()}
          {showReadTime && `閱讀時間約為 ${article.readTime} 分鐘`}
          {isUsersArticle && `${formatDistance(new Date(article.updatedAt), new Date(), { addSuffix: true, locale: zhTW })} 分鐘前編輯`}
        </span>
        <SocialLink views={article.status.views} likes={article.status.likes} articleId={article.id}></SocialLink>
      </div>
    </div>
  );
}
