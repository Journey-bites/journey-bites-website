import { z } from 'zod';

export const urlRegex = /^https:\/\/(images\.unsplash\.com|i\.imgur\.com|unsplash\.com)\/.+/;

export function imgUrlValidate(url: string): string[] | null {
  const schema = z.string().url({ message: '請填入正確的網址格式, ex: https://www.journeybites.com' }).or(z.literal(''));

  try {
    schema.parse(url);
    return null;
  } catch (e) {
    if (e instanceof z.ZodError) {
      const errors = e.errors.map(error => error.message);
      return errors;
    } else {
      throw new Error('Unexpected error occurred');
    }
  }
}
