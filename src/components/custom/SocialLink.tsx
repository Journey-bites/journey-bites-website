'use client';

import { Bookmark, Eye, Heart } from 'lucide-react';

export default function SocialLink() {
  return (
    <div className='flex gap-3'>
      <div className='flex gap-1'>
        <Eye className='stroke-grey-300' />
        <span>2333</span>
      </div>
      <div className='flex gap-1'>
        <button>
          <Heart className='stroke-danger' />
        </button>
        <span>2333</span>
      </div>
      <button>
        <Bookmark className='stroke-primary' />
      </button>
    </div>
  );
}
