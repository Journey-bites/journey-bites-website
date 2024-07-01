import { Profile } from './index';

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
  commentCount: number;
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
