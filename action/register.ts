'use server';

import * as z from 'zod';
import { RegisterSchema } from '@/schemas';

export const register = async (value: z.infer<typeof RegisterSchema>) => {
  const validateFields = RegisterSchema.safeParse(value);

  if (!validateFields.success) {
    return { error: 'Invalid fields' };
  }
  return { success: '信件已寄出' };
};
