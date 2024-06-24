export enum InputType {
  TEXT = 'text',
  PASSWORD = 'password',
}

export enum OrderBy {
  ASC = 'asc',
  DESC = 'desc',
}

export enum SearchType {
  Article = 'article',
  // Category = 'category',
  // Creator = 'creator'
}

export type Tab = {
  value: string;
  label: string;
  content: React.ReactNode;
};

export type Category = {
  id: string;
  name: string;
  path: string;
};

export type SocialLinks = {
  [key in 'website' | 'instagram' | 'facebook']?: string;
};

export interface Profile {
  displayName?: string;
  avatarImageUrl?: string | null;
  bio?: string | null;
  socialLinks?: SocialLinks | null;
};

export interface UserInfo {
  id: string;
  email: string;
  emailVerified: boolean;
  profile: Profile;
};

export type RequestPageQuery = {
  page?: number;
  pageSize?: number;
}

export type SearchRequestQuery = {
  search?: string;
  type?: 'hot' | 'random';
} & RequestPageQuery;

export interface Creator extends Profile {
  userId: string;
  email: string;
  followersCount: number;
  userAlreadyFollowed?: boolean;
  followers: {
    followerId: string
  }[];
  followings: {
    followingsId: string
  }[];
}

export interface Follow extends Profile {
  userId: string;
  email: string;
  isMutualFollow: boolean;
}
