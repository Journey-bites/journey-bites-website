import StatusCode from '@/types/StatusCode';

export interface HttpErrorArgs<T> {
  httpCode: number;
  statusCode: StatusCode;
  message: string;
  data?: T;
}

export class HttpException extends Error {
  public httpCode: number;
  public statusCode: StatusCode;
  public data: unknown;

  constructor({ httpCode, statusCode, message, data }: HttpErrorArgs<unknown>) {
    super(message);
    this.httpCode = httpCode;
    this.statusCode = statusCode;
    this.data = data;
  }
}