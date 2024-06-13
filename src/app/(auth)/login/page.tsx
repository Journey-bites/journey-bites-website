'use client';

import Link from 'next/link';
import { useSearchParams, useRouter } from 'next/navigation';
import { useCallback, useLayoutEffect, useState } from 'react';
import { zodResolver } from '@hookform/resolvers/zod';
import { type FieldValues, useForm } from 'react-hook-form';
import { z } from 'zod';
import jsCookie from 'js-cookie';
import { useUserStore } from '@/providers/userProvider';
import { Button } from '@/components/ui/button';
import { Form } from '@/components/ui/form';
import { useToast } from '@/components/ui/use-toast';
import InputField from '@/components/custom/InputField';
import PasswordInput from '@/components/custom/PasswordInput';
import { login } from '@/lib/api';
import { GOOGLE_LOGIN_URL, JOURNEY_BITES_COOKIE, PASSWORD_VALIDATION } from '@/constants';
import StatusCode from '@/types/StatusCode';
import { handleApiError } from '@/lib/utils';
import { LocalStorageKey } from '@/types';

const formSchema = z.object({
  email: z.string().email({ message: '非 Email 格式，請重新輸入' }),
  password: PASSWORD_VALIDATION,
});

export default function Login() {
  const [isLoading, setIsLoading] = useState(false);
  const { setAuth } = useUserStore(
    (state) => state,
  );
  const { toast } = useToast();
  const form = useForm<FieldValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: '',
      password: '',
    },
  });
  const { control, handleSubmit, formState: { isValid } } = form;
  const router = useRouter();
  const searchParams = useSearchParams();
  const buttonDisabled = Boolean(isLoading || !isValid);

  const redirectToPreviousPage = useCallback(() => {
    const redirectUrl = localStorage.getItem(LocalStorageKey.REDIRECT_URL);
    if (redirectUrl) {
      router.replace(redirectUrl);
    } else {
      router.replace('/manage/user');
    }
  }, [router]);

  async function onSubmit({ email, password }: FieldValues) {
    setIsLoading(true);
    try {
      await login({ email, password });
      setAuth();
      redirectToPreviousPage();
    } catch (error) {
      const loginErrorToast = () => toast({ title: '登入失敗', description: '請確認您的帳號或密碼是否正確', variant: 'error' });
      const errorHandlingConfig = {
        [StatusCode.USER_NOT_FOUND]: () => {
          loginErrorToast();
        },
        [StatusCode.USER_PASSWORD_NOT_MATCH]: () => {
          loginErrorToast();
        }
      };
      handleApiError(error, errorHandlingConfig, '登入');
    } finally {
      setIsLoading(false);
    }
  }

  useLayoutEffect(() => {
    const tokenFromGoogleOAuth = searchParams.get('token');
    if (tokenFromGoogleOAuth) {
      jsCookie.set(JOURNEY_BITES_COOKIE, tokenFromGoogleOAuth, { expires: 3 });
      setAuth();
      redirectToPreviousPage();
    }
  }, [redirectToPreviousPage, router, searchParams, setAuth]);

  return (
    <>
      <div className='flex justify-between'>
        <h2>登入</h2>
        <div>
          新用戶？
          <Link href='/register' className='text-secondary underline'>快速註冊</Link>
        </div>
      </div>
      <div className='my-5 flex flex-col gap-5'>
        <Button variant='outline' asChild>
          <a href={GOOGLE_LOGIN_URL}>使用 Google 登入</a>
        </Button>
        <Button variant='outline'>使用 Facebook 登入</Button>
      </div>
      <Form {...form}>
        <form onSubmit={handleSubmit(onSubmit)} className='space-y-5'>
          <InputField
            control={control}
            name='email'
            label='帳號'
            placeholder='請輸入你的 Email'
          />
          <PasswordInput control={control} name='password' formDescription='請輸入 6 到 20 位英文及數字' />
          <Button type='submit' className='w-full' disabled={buttonDisabled} isLoading={isLoading}>登入</Button>
        </form>
      </Form>
    </>
  );
}
