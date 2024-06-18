// need to be replaced
export type Article = {
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