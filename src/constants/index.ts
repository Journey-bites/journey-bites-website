import { Category } from '@/types';
import { z } from 'zod';

export const JOURNEY_BITES_COOKIE = 'JOURNEY_BITES_COOKIE';

export const PASSWORD_VALIDATION = z.string().regex(/^(?=.*[a-zA-Z])(?=.*\d)[a-zA-Z\d]{6,20}$/, { message: '密碼不符規則，請再輸入一次' });

export const GOOGLE_LOGIN_URL = `${process.env.NEXT_PUBLIC_API_BASE_URL}/auth/google`;

export const LOCAL_STORAGE_KEY = {
  redirectUrl: 'redirect_url',
};

export const QUERY_KEY = {
  following: 'following',
  followers: 'followers',
  comments: 'comments',
  article: 'article',
  searchArticles: 'searchArticles',
  searchCreators: 'searchCreators',
};

export const EXPLORE_LIST: Omit<Category, 'articleCount'>[] = [
  {
    id: '0',
    name: '熱門文章',
    path: '/articles?type=hot',
  },
  {
    id: '1',
    name: '最新文章',
    path: '/articles?type=new',
  },
];