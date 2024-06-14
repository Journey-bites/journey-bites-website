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

export type Profile = {
  displayName?: string;
  avatarImageUrl?: string | null;
  bio?: string | null;
  socialLinks?: SocialLinks | null;
};

export type UserInfo = {
  email: string;
  emailVerified: boolean;
  profile: Profile;
};
