import { z } from 'zod';

export const JOURNEY_BITES_COOKIE = 'JOURNEY_BITES_COOKIE';

export const PASSWORD_VALIDATION = z.string().regex(/^(?=.*[a-zA-Z])(?=.*\d)[a-zA-Z\d]{6,20}$/, { message: '密碼不符規則，請再輸入一次' });

export const GOOGLE_LOGIN_URL = `${process.env.NEXT_PUBLIC_API_BASE_URL}/auth/google`;
