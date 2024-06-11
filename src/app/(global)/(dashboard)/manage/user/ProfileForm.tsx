'use client';

import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { FieldValues, useForm } from 'react-hook-form';
import { useMutation } from '@tanstack/react-query';
import { Button } from '@/components/ui/button';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import InputField from '@/components/custom/InputField';
import { Form } from '@/components/ui/form';
import TextAreaField from '@/components/custom/TextAreaField';
import PasswordInput from '@/components/custom/PasswordInput';
import { PASSWORD_VALIDATION } from '@/constants';
import { resetPassword, updateUserProfile } from '@/lib/authApi';
import { toast } from '@/components/ui/use-toast';

const formSchema = z.object({
  displayName: z.string(),
  bio: z.optional(z.string().max(500, { message: '最多只能輸入 500 個字' })),
});

const passwordFormSchema = z.object({
  password: PASSWORD_VALIDATION,
  confirmPassword: PASSWORD_VALIDATION,
}).refine(
  (values) => {
    return values.password === values.confirmPassword;
  },
  {
    message: '密碼輸入不相符，請重新輸入',
    path: ['confirmPassword'],
  }
);

type ProfileFormProps = {
  displayName: string;
  email: string;
  bio: string;
}

export default function ProfileForm({ displayName, email, bio }: ProfileFormProps) {
  const { mutate: passwordMutate, isPending: isUpdatePasswordPending } = useMutation({ mutationFn: resetPassword });
  const { mutate: updatePasswordMutate, isPending: isUpdateProfilePending } = useMutation({ mutationFn: updateUserProfile });

  const form = useForm<FieldValues>(
    {
      resolver: zodResolver(formSchema),
      mode: 'onBlur',
      defaultValues: {
        displayName,
        bio: bio || ''
      },
    });
  const { handleSubmit, control, formState: { isValid } } = form;

  const resetPasswordForm = useForm<FieldValues>(
    {
      resolver: zodResolver(passwordFormSchema),
      mode: 'onBlur',
      defaultValues: {
        password: '',
        confirmPassword: ''
      },
    });
  const { handleSubmit: handleSubmitPassword, control: controlPassword, formState: { isValid: isValidPassword } } = resetPasswordForm;

  function onSubmit(data: FieldValues) {
    const { displayName, bio } = data;
    updatePasswordMutate({ displayName, bio }, {
      onSuccess: () => {
        toast({ title: '更新個人資料成功', variant: 'success' });
      },
      onError: () => {
        toast({ title: '更新個人資料失敗', variant: 'error' });
      },
    });
  }

  async function onSubmitPassword(data: FieldValues) {
    const { password } = data;
    passwordMutate(password as string, {
      onSuccess: () => {
        toast({ title: '重設密碼成功', variant: 'success' });
      },
      onError: () => {
        toast({ title: '重設密碼失敗', variant: 'error' });
      },
    });
  }

  return (
    <>
      <Card className='mb-6 space-y-4'>
        <CardHeader>
          <CardTitle>個人資料編輯</CardTitle>
        </CardHeader>
        <CardContent className='space-y-4'>
          <div className='flex items-center gap-3'>
            <span>帳號</span>
            <span>{email}</span>
          </div>
          <Form {...form}>
            <form onSubmit={handleSubmit(onSubmit)} className='space-y-5'>
              <InputField
                control={control}
                name='displayName'
                label='暱稱'
                placeholder='請輸入暱稱'
                />
              <TextAreaField
                control={control}
                name='bio'
                label='自我介紹'
                placeholder='向其他人簡單介紹你自己吧! 可以分享你的創作理念、寫作方向，建議字數為 50 - 150 字為佳！'
              />
              <Button
                className='min-w-[130px]'
                disabled={!isValid || isUpdatePasswordPending}
                isLoading={isUpdateProfilePending}>
                儲存個人資料
              </Button>
            </form>
          </Form>
        </CardContent>
      </Card>
      <Card className='space-y-4'>
        <CardHeader>
          <CardTitle>重設密碼</CardTitle>
        </CardHeader>
        <CardContent className='space-y-4'>
          <Form {...resetPasswordForm}>
            <form onSubmit={handleSubmitPassword(onSubmitPassword)} className='space-y-5'>
              <PasswordInput control={controlPassword} name='password' label='新密碼'/>
              <PasswordInput control={controlPassword} name='confirmPassword' label='再輸入一次密碼'/>
              <Button
                className='min-w-[130px]'
                disabled={!isValidPassword || isUpdatePasswordPending}
                type='submit'
                isLoading={isUpdatePasswordPending}
              >
                確認修改
              </Button>
            </form>
          </Form>
        </CardContent>
      </Card>
    </>
  );
}
