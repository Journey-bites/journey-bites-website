import { Profile } from './index';

// need to be replaced
export type Articles = {
  userId: number;
  id: number;
  title: string;
  body: string;
};

export type Article = {
  id: string,
  creator_id: string,
  creator: string,
  title: string,
  abstract: string,
  content: string,
  thumbnailUrl: string,
  isNeedPay: boolean,
  wordCount: number,
  readTime: number,
  status: ArticleStatus,
  tags: string[],
  category: string,
  createdAt: Date,
  updatedAt: Date,
}

export type CreateArticleRequest = Partial<Omit<Article, 'creator_id'| 'status' | 'createdAt' | 'updatedAt'>>;

type ArticleStatus = {
  views: number;
  likes: number;
  subscriptions: number;
};

export type ArticleType = {
  id: string;
  creatorId: string;
  creator: {
    profile: Profile
  };
  title: string;
  abstract: string;
  content: string;
  thumbnailUrl?: string;
  isNeedPay: boolean;
  wordCount: number;
  readTime: number;
  status: ArticleStatus;
  tags?: string[];
  category: string;
  createdAt: string;
  updatedAt: string;
};

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
