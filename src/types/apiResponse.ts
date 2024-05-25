export interface ApiResponse {
  statusCode: number,
  message: string
}

export interface ApiSuccessResponse<T> extends ApiResponse {
  data?: T,
  meta?: {
    page: number,
    totalPage: number,
    totalCount: number,
    pageSize: number
  }
}

export type LoginResponse = ApiSuccessResponse<{ token: string }>;

export type Category = {
  id: string;
  name: string;
  path: string;
}

export type Profile = {
  id: string;
  displayName: string;
  avatarImageUrl: string;
  bio: string;
  socialLinksId: string;
}

export type UserResponse = ApiSuccessResponse<{
  email: string,
  emailVerified: boolean,
  profile: Profile,
  // oAuthProvider: null,
}>