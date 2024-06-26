'use client';

import { useRouter } from 'next/navigation';
import {
  Form,
} from '@/components/ui/form';
import { Button } from '@/components/ui/button';
import InputField from '@/components/custom/InputField';
import TextAreaField from '@/components/custom/TextAreaField';
import { useEditor } from '@/stores/useEditorStore';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm, Controller } from 'react-hook-form';
import SelectField from '@/components/custom/SelectField';
import { useState, useEffect } from 'react';
import { useMutation } from '@tanstack/react-query';
import { createArticle } from '@/lib/authApi';
import { toast } from '@/components/ui/use-toast';
import { Tag, TagInput } from 'emblor';
import { getCategories } from '@/lib/nextApi';
import Link from 'next/link';
import { urlRegex } from '@/constants/imgUrlValidate';

const isNeedPayOptions: { id: string; name: string; }[]= [
  { id: '免費', name: '免費' },
  { id: '付費', name: '付費' }
];

export default function PublishArticle() {
  const { editorProps } = useEditor();
  const [tags, setTags] = useState <Tag[]> ([]);
  const [activeTagIndex, setActiveTagIndex] = useState < number | null > (null);
  const [categoryOptions, setCategoryOptions] = useState<{ id: string; name: string; }[]>([]);
  const router = useRouter();

  const categoryValidation = z.string().refine(value => categoryOptions.some(option => option.name === value), {
    message: '選項為必填',
  });

  const isNeedPayValidation = z.string().refine(value => isNeedPayOptions.some(option => option.name === value), {
    message: '選項為必填',
  });

  const formSchema = z.object({
    title: z.string().min(1, { message: '標題是必填欄位' }).max(30, { message: '標題不能超過60個字' }),
    abstract: z.string().max(150, { message: '摘要不能超過150個字' }),
    thumbnailUrl: z.string().optional().refine(val => !val || urlRegex.test(val), { message: '請至 imgur 或 unsplash 上傳圖片，造成不便敬請見諒' }),
    category: categoryValidation,
    isNeedPay: isNeedPayValidation,
    // category: z.string().refine(value => categoryOptions.some(option => option.id === value), {
    //   message: '選項為必填',
    // }),
    tags: z.array(z.object({ id: z.string(), text: z.string() })),
  });

  const { mutate: createArticleMutate, isPending: isUpdateCreateArticle } = useMutation({ mutationFn: createArticle });

  useEffect(() => {
    if(!editorProps) toast({ title: '無文章內容，無法進行發布', variant: 'error' });
  }, [editorProps]);

  useEffect(() => {
    (async () => {
      try {
        const res = await getCategories();
        const categoryOptions = res.map(({ id, name }) => ({
          id,
          name
        }));

        setCategoryOptions(categoryOptions);
      } catch (error) {
        toast({ title: 'Error fetching categories: ' + error + '', variant: 'error' });
      }
    })();
  }, []);

  function onSubmit(values: z.infer<typeof formSchema>) {
    console.log('values', values.tags);
    console.log(editorProps);
    if (!editorProps) return;
    const tags = Array.isArray(values.tags) ? values.tags.map(tag => tag.text) : [];
    const isNeedPay = (values.isNeedPay === '免費') ? false : true;

    let createArticleRequest;

    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { thumbnailUrl, ...restEditorProps } = { ...editorProps };
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { thumbnailUrl: _, ...restValues } = { ...values };

    if (values.thumbnailUrl && values.thumbnailUrl.trim()) {
      createArticleRequest = { ...restEditorProps, ...values, tags, isNeedPay };
    } else {
      createArticleRequest = { ...restEditorProps, ...restValues, tags, isNeedPay };
    }
    console.log(createArticleRequest);

    createArticleMutate(createArticleRequest, {
      onSuccess: () => {
        toast({ title: '成功送出', variant: 'success' });
        router.push('/manage/content');
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
      isNeedPay: '免費',
      tags: []
    },
  });
  const { control, handleSubmit, formState: { isValid } } = form;

  function setValue(arg0: string, arg1: [Tag, ...Tag[]]) {
    console.log(arg0, arg1);
    console.log(arg1);
  }

  return (
    <main className='mx-auto mb-10 grid size-full max-w-[800px] place-items-center'>
      <div className='mb-10 pt-10 text-center text-3xl text-primary-300'>
        發布設定
      </div>
      <div className='mb-6 w-full space-y-4 rounded-lg border bg-card p-5 text-card-foreground shadow-sm'>
        <Form {...form}>
          <form onSubmit={handleSubmit(onSubmit)} className='space-y-8'>
            <InputField
              className='w-full'
              control={control}
              name='title'
              label='標題'
              placeholder='文章標題'
            />
            <TextAreaField
              className='w-full resize-none'
              control={control}
              name='abstract'
              label='摘要'
              placeholder='文章摘要'
            />
            <InputField
              className='w-full'
              control={control}
              name='thumbnailUrl'
              label='縮圖'
              placeholder='請輸入縮圖網址 https://'
              formDescription='無縮圖時將由系統自動帶入預設圖片'
            />
            <SelectField
              className='w-full'
              control={control}
              name='category'
              label='文章分類'
              placeholder='設定文章分類'
              options={categoryOptions}
            />
            <SelectField
              className='w-full'
              control={control}
              name='isNeedPay'
              label='內容收費'
              placeholder='設定文章是否收費'
              options={isNeedPayOptions}
            />
            <Controller
              name='tags'
              control={control}
              render={({ field }) => (
                <div className='tagInput'>
                  <TagInput
                    {...field}
                    tags={tags}
                    setTags={(newTags) => {
                      setTags(newTags);
                      setValue('tags', newTags as [Tag, ...Tag[]]);
                      field.onChange(newTags);
                    }}
                    placeholder='為文章加上標籤'
                    className='h-10 w-full sm:max-w-[350px]'
                    activeTagIndex={activeTagIndex}
                    setActiveTagIndex={setActiveTagIndex}
                    inlineTags={false}
                    inputFieldPosition='top'
                    maxTags={5}
                    size={'lg'}
                    showCount={true}
                  />
                </div>
              )}
            />
            <div className='text-center'>
              <Button className='mr-4 bg-grey text-black hover:bg-grey-300 hover:text-white' asChild><Link href='/manage/content'>取消</Link></Button>
              <Button type='submit' disabled={!isValid || !editorProps} isLoading={isUpdateCreateArticle}>發布文章</Button>
            </div>
          </form>
        </Form>
      </div>
    </main>
  );
}
