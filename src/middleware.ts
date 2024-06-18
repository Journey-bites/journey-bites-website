import { NextResponse, type NextRequest } from 'next/server';
import { cookies } from 'next/headers';
import { JOURNEY_BITES_COOKIE } from './constants';
import StatusCode from './types/StatusCode';
import { UserResponse } from './types/apiResponse';

export async function middleware(request: NextRequest) {
  const token = cookies().get(JOURNEY_BITES_COOKIE)?.value;
  if (!token) return NextResponse.redirect(new URL('/login', request.url));

  try {
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/user`, {
        headers: {
          Authorization: `Bearer ${token}`,
        }
      }
    );
    const userResponse: UserResponse = await res.json();
    switch (userResponse.statusCode) {
      case StatusCode.NORMAL:
        NextResponse.next();
        break;
      case StatusCode.USER_NOT_AUTHORIZED:
      case StatusCode.USER_NOT_FOUND:
        throw new Error(userResponse.message);
      default:
        throw new Error('Unknown error in middleware while getting user: ' + userResponse.message);
    }
  } catch (error) {
    if (error instanceof Error && error.message.includes('Unknown')) {
      console.log(error);
      return NextResponse.redirect(new URL('/', request.url));
    }
    return NextResponse.redirect(new URL('/login', request.url));
  }
}

export const config = {
  matcher: ['/manage/:path*', '/article/create', '/article/edit/:path*'],
};