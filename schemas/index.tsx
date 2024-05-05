import * as z from 'zod';

export const LoginSchema = z.object({
  email: z.string().email({ message: 'Email 是必填欄位' }),
  password: z.string().min(1, { message: '密碼是必填欄位' })
});

export const RegisterSchema = z.object({
  email: z.string().email({ message: 'Email 是必填欄位' }),
  password: z.string().min(6, { message: '最少需要六個字' }),
  name: z.string().min(1, { message: 'Name 是必填欄位' })
});
