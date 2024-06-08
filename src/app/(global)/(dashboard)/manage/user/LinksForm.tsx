'use client';

import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { FieldValues, useForm } from 'react-hook-form';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import InputField from '@/components/custom/InputField';
import { Form } from '@/components/ui/form';
import { updateUserProfile } from '@/lib/authApi';
import { useMutation } from '@tanstack/react-query';
import { SocialLinks } from '@/types';
import { toast } from '@/components/ui/use-toast';

const urlSchema = z.optional(z.string().url({ message: '請填入正確的網址格式, ex: https://www.journeybites.com' })).or(z.literal(''));

const formSchema = z.object({
  facebook: urlSchema,
  instagram: urlSchema,
  website: urlSchema
});

export default function LinksForm({ socialLinks }: { socialLinks?: SocialLinks | null }) {
  const form = useForm<FieldValues>(
    {
      resolver: zodResolver(formSchema),
      mode: 'onBlur',
      defaultValues: {
        facebook: socialLinks?.facebook || '',
        instagram: socialLinks?.instagram || '',
        website: socialLinks?.website || '',
      },
    });
  const { handleSubmit, control, formState: { isValid } } = form;
  const { mutate: updateUserLinksMutate, isPending } = useMutation({ mutationFn: updateUserProfile });

  function onSubmit(data: FieldValues) {
    const { facebook, instagram, website } = data;
    const validFields: SocialLinks = {
      ...(facebook && { facebook }),
      ...(instagram && { instagram }),
      ...(website && { website }),
    };
    updateUserLinksMutate({ socialLinks: validFields }, {
      onSuccess: () => {
        toast({ title: '更新連結設定成功', variant: 'success' });
      },
      onError: () => {
        toast({ title: '更新連結設定失敗', description: '請聯繫客服，或稍後再試', variant: 'error' });
      }
    });
  }

  return (
    <Card className='space-y-4'>
      <CardContent className='space-y-4'>
        <Form {...form}>
          <form onSubmit={handleSubmit(onSubmit)} className='space-y-5'>
            <InputField
              control={control}
              name='facebook'
              label='Facebook'
              placeholder='ex: https://www.facebook.com/journeybites'
              />
            <InputField
              control={control}
              name='instagram'
              label='Instagram'
              placeholder='ex: https://www.instagram.com/journeybites'
            />
            <InputField
              control={control}
              name='website'
              label='Website'
              placeholder='ex: https://www.journeybites.com'
            />
            <Button
              className='min-w-[136px]'
              disabled={!isValid || isPending}
              isLoading={isPending}>
              儲存連結設定
            </Button>
          </form>
        </Form>
      </CardContent>
    </Card>
  );
}
