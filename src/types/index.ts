import { NEWEB_PAY_DATA_NAMES } from '@/constants';

export type Tab = {
  value: string;
  label: string;
  content: React.ReactNode;
};

export type Category = {
  id: string;
  name: string;
  path: string;
  articleCount: number;
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
  type?: 'hot' | 'random';
} & RequestPageQuery;

export type GetArticlesQuery = {
  q?: string;
  category?: string;
} & SearchRequestQuery;

export type GetCreatorQuery = {
  search?: string;
} & SearchRequestQuery;

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

export interface FollowData extends Profile {
  userId: string;
  email: string;
  isMutualFollow: boolean;
}

type NewebPayDataNames = typeof NEWEB_PAY_DATA_NAMES[number];

export type NewebpayRequestData = Record<NewebPayDataNames, string>