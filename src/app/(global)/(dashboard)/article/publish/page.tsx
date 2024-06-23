'use client';

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

const categoryDefaultOptions: { id: string; name: string; }[]= [
  { id: '666d36fdb8ae1350672e06e7', name: '台灣旅遊地圖' },
  { id: '666d3738b8ae1350672e06e8', name: '步道旅行' },
  { id: '666d3789b8ae1350672e06e9', name: '健行日記' },
  { id: '666d379eb8ae1350672e06ea', name: '創作者列表' },
  { id: '666d37b9b8ae1350672e06eb', name: '旅遊食記' },
  { id: '666d38827f918c5671fdf510', name: '台灣百岳' },
];

const needsPayOptions: { id: string; name: string; }[]= [
  { id: 'false', name: '免費' },
  { id: 'true', name: '付費' }
];

export default function PublishArticle() {
  const { editorProps } = useEditor();
  const [tags, setTags] = useState <Tag[]> ([]);
  const [activeTagIndex, setActiveTagIndex] = useState < number | null > (null);
  const [categoryOptions, setCategoryOptions] = useState<{ id: string; name: string; }[]>([]);

  const categoryValidation = z.string().refine(value => {
    if (categoryOptions.length === 0) {
      return categoryDefaultOptions.some(option => option.id === value);
    } else {
      return categoryOptions.some(option => option.id === value);
    }
  }, {
    message: '選項為必填',
  });

  const needsPayValidation = z.string().refine(value => needsPayOptions.some(option => option.id === value), {
    message: '選項為必填',
  });

  const formSchema = z.object({
    title: z.string().min(1, { message: '標題是必填欄位' }).max(30, { message: '標題不能超過60個字' }),
    abstract: z.string().max(150, { message: '摘要不能超過150個字' }),
    thumbnailUrl: z.string().optional().refine(val => !val || val.startsWith('https://'), { message: 'URL must start with https' }),
    category: categoryValidation,
    needsPay: needsPayValidation,
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
    const needsPay = (values.needsPay === 'false') ? false : Boolean(values.needsPay);
    const createArticleRequest = { ...editorProps, ...values, tags, needsPay, creator: '666b4090cf615869b955ca83' };
    console.log({ createArticleRequest });
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
      needsPay: 'false',
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
              options={categoryOptions.length > 0 ? categoryOptions : categoryDefaultOptions}
            />
            <SelectField
              className='w-full'
              control={control}
              name='needsPay'
              label='內容收費'
              placeholder='設定文章是否收費'
              options={needsPayOptions}
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
              <Button className='mr-4 bg-grey text-black hover:bg-grey-400 hover:text-white'>取消</Button>
              <Button type='submit' disabled={!isValid || !editorProps} isLoading={isUpdateCreateArticle}>發布文章</Button>
            </div>
          </form>
        </Form>
      </div>
    </main>
  );
}