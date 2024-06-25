import { Profile } from './index';

// need to be removed
export type Articles = {
  userId: number;
  id: number;
  title: string;
  body: string;
};

type ArticleStatus = {
  views: number;
  likes: number;
  subscriptions: number;
};

export type Article = {
  id: string;
  creator: {
    id: string;
    profile: Profile
  };
  title: string;
  abstract: string;
  content: string;
  isNeedPay: boolean;
  wordCount: number;
  readTime: number;
  status: ArticleStatus;
  category: string;
  createdAt: string;
  updatedAt: string;
  tags?: string[];
  thumbnailUrl?: string;
};

export type CreateArticleRequest = Partial<Omit<Article, 'status' | 'createdAt' | 'updatedAt'>>;

export type Comment = {
  id: string;
  content: string;
  likes: number;
  likedUserIds: string[];
  createdAt: string;
  updatedAt: string;
  user: {
    profile: Profile
  };
};
