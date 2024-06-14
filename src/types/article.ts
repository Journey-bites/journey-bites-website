export type RecommendArticle = {
  userId: number;
  id: number;
  title: string;
  body: string;
};

export type Articles = {
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
