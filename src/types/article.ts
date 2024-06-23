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
  readingTime: number,
  status: {
    views: number,
    likes: number,
    subscriptions: number,
  },
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
  articleId: string;
  creatorId: string;
  creator: string;
  title: string;
  abstract: string;
  content: string;
  thumbnailUrl: string;
  needsPay: boolean;
  wordsCount: number;
  readingTime: number;
  status: ArticleStatus;
  tags: string[];
  category: string;
  createdAt: Date;
  updatedAt: Date;
};

export type Comment = {
  commentId: string;
  articleId: string;
  user: {
    id: string;
    displayName: string;
    avatarImgUrl: string;
  }
  content: string;
  likes: number;
  updatedAt: Date;
};
