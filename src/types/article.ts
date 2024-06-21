export type RecommendArticle = {
  userId: number;
  id: number;
  title: string;
  body: string;
};

// export type CreateArticleRequest = {
//   creator?: string,
//   title: string,
//   abstract?: string,
//   content: string,
//   thumbnailUrl?: string,
//   needsPay: boolean,
//   wordsCount: number,
//   tags?: string[],
//   category: string,
// }

export type Article = {
  id: string,
  creator_id: string,
  creator: string,
  title: string,
  abstract: string,
  content: string,
  thumbnailUrl: string,
  needsPay: boolean,
  wordsCount: number,
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
