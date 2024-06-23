'use client';

import { Bookmark, Eye, Heart } from 'lucide-react';
import ProtectedComponent from '../common/ProtectedComponent';

type SocialLinkProps = {
  views: number;
  likes: number;
  articleId: string;
}

export default function SocialLink({ views, likes, articleId }: SocialLinkProps) {
  function handleLikeArticle() {
    // TODO: Like article
    console.log(articleId);
  }

  function handleSaveArticle() {
    // TODO: Save article
    console.log(articleId);
  }

  return (
    <div className='flex gap-3'>
      <div className='flex gap-1'>
        <Eye className='stroke-grey-300' />
        <span>{views}</span>
      </div>
      <div className='flex gap-1'>
        <ProtectedComponent onClick={handleLikeArticle}>
          <button>
            <Heart className='stroke-danger' />
          </button>
        </ProtectedComponent>
        <span>{likes}</span>
      </div>
      <ProtectedComponent onClick={handleSaveArticle}>
        <button>
          <Bookmark className='stroke-primary' />
        </button>
      </ProtectedComponent>
    </div>
  );
}
