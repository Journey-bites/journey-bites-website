import { z } from 'zod';

export const urlRegex = /^https:\/\/(images\.unsplash\.com|i\.imgur\.com|unsplash\.com)\/.+/;

export function imgUrlValidate(url: string): string[] | null {
  // const urlRegex = /^https:\/\/(images\.unsplash\.com|i\.imgur\.com|unsplash\.com)\/.+/;
  const schema = z.string().regex(urlRegex);

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
