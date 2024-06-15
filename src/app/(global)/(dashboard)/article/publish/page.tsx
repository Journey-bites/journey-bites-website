'use client';

import {
  Form,
} from '@/components/ui/form';
import { Button } from '@/components/ui/button';
import InputField from '@/components/custom/InputField';
import TextAreaField from '@/components/custom/TextAreaField';
import { useEditor } from '@/lib/useEditor';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import SelectField from '@/components/custom/SelectField';
import { useUserStore } from '@/providers/userProvider';
import { useEffect } from 'react';
import { useMutation } from '@tanstack/react-query';
import { createArticle } from '@/lib/authApi';
import { toast } from '@/components/ui/use-toast';

const categoryOptions: { label: string; value: string; }[]= [
  { label: '台灣旅遊地圖', value: '台灣旅遊地圖' },
  { label: '步道旅行', value: '步道旅行' },
  { label: '健行日記', value: '健行日記' },
  { label: '創作者列表', value: '創作者列表' },
  { label: '旅遊食記', value: '旅遊食記' },
  { label: '台灣百岳', value: '台灣百岳' },
];

const needsPayOptions: { label: string; value: string; }[]= [
  { label: '免費', value: 'false' },
  { label: '付費', value: 'true' }
];

const tagOptions: { label: string; value: string; }[]= [
  { label: '台灣', value: 'Taiwan' },
  { label: '日本', value: 'Japan' },
  { label: '中國', value: 'China' },
  { label: '泰國', value: 'Thailand' },
  { label: '丹麥', value: 'Denmark' },
  { label: '冰島', value: 'Iceland' },
  { label: '克羅埃西亞', value: 'Croatia' },
  { label: '西班牙', value: '西班牙' },
  { label: '南非', value: 'South Africa' },
];

function generateValidationValues(options: { value: string; }[]): [string, string] {
  const values = options.map(option => option.value) as [string, string];
  return values;
}

const formSchema = z.object({
  title: z.string().min(1, { message: '標題是必填欄位' }).max(30, { message: '標題不能超過60個字' }),
  abstract: z.string().max(150, { message: '摘要不能超過150個字' }),
  thumbnailUrl: z.string().optional().refine(val => !val || val.startsWith('https://'), { message: 'URL must start with https' }),
  category: z.enum(generateValidationValues(categoryOptions), {
    message: '選項為必填',
  }),
  needsPay: z.enum(generateValidationValues(needsPayOptions), {
    message: '選項為必填',
  })
});

export default function PublishArticle() {
  const providers = useUserStore((state) => state);
  console.log(providers);
  const { editorProps } = useEditor();

  const { mutate: createArticleMutate, isPending: isUpdateCreateArticle } = useMutation({ mutationFn: createArticle });

  useEffect(() => {

  }, []);

  function onSubmit(values: z.infer<typeof formSchema>) {
    if (!editorProps) return;
    const needsPay = Boolean(values.needsPay);
    const createArticleRequest = { ...values, needsPay, ...editorProps, creator: '666b4090cf615869b955ca83' };
    // console.log({ ...createArticleRequest, ...editorProps });
    createArticleMutate(createArticleRequest, {
      onSuccess: () => {
        toast({ title: '成功送出', variant: 'success' });
      },
      onError: () => {
        toast({ title: '送出失敗', variant: 'error' });
      },
    });
  }

  const form = useForm<z.infer<typeof formSchema>>({
    mode: 'onBlur',
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: '',
      abstract: '',
      thumbnailUrl: '',
      category: '',
      needsPay: 'false'
    },
  });

  return (
    <main className='mx-auto mb-10 grid size-full place-items-center'>
      <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className='space-y-8'>
        <InputField
          className='w-[270px]'
          control={form.control}
          name='title'
          label='標題'
          placeholder='請輸入標題'
        />
        <TextAreaField
          className='w-[270px] resize-none'
          control={form.control}
          name='abstract'
          label='摘要'
          placeholder='請輸入摘要'
        />
        <InputField
          className='w-[270px]'
          control={form.control}
          name='thumbnailUrl'
          label='縮圖'
          placeholder='請輸入縮圖網址 https://'
          formDescription='無縮圖時將由系統自動帶入預設圖片'
        />
        <SelectField
          className='w-[270px]'
          control={form.control}
          name='category'
          label='文章分類'
          placeholder='設定文章分類'
          options={categoryOptions}
        />
        <SelectField
          className='w-[270px]'
          control={form.control}
          name='needsPay'
          label='內容收費'
          placeholder='設定文章是否收費'
          options={needsPayOptions}
        />
        <Button type='submit' disabled={!form.formState.isValid} isLoading={isUpdateCreateArticle}>發布文章</Button>
      </form>
    </Form>
    </main>
  );
}
