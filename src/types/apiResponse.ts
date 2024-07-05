import { Comment, Article } from './article';
import { FollowData, NewebpayRequestData, UserInfo } from './index';
import StatusCode from './StatusCode';

export interface ApiResponse {
  statusCode: StatusCode;
  message: string;
}

export interface ApiSuccessResponse<T> extends ApiResponse {
  data?: T;
  meta?: {
    page: number;
    totalPage: number;
    totalCount: number;
    pageSize: number;
  };
}

export type LoginResponse = ApiSuccessResponse<{ token: string }>;

export type UserResponse = ApiSuccessResponse<UserInfo>;

export type UserFollowResponse = ApiSuccessResponse<FollowData[]>;

export type PostCommentResponse = ApiSuccessResponse<{ commentId: string }>;

export type CommentResponse = ApiSuccessResponse<Comment[]>;

export type ArticlesResponse = ApiSuccessResponse<Article[]>;

export type SubscribeResponse = ApiSuccessResponse<NewebpayRequestData>;
