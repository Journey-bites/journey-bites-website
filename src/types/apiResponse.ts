import { Comment } from './article';
import { Follow, UserInfo } from './index';
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

export type UserFollowResponse = ApiSuccessResponse<Follow[]>;

export type PostCommentResponse = ApiSuccessResponse<{ commentId: string }>;

export type CommentResponse = ApiSuccessResponse<Comment[]>;
