export enum InputType {
  TEXT = 'text',
  PASSWORD = 'password',
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
  followers: {
    followerId: string
  }[];
  followings: {
    followingsId: string
  }[];
}