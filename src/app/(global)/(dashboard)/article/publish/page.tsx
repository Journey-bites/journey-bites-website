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

const EditArticle = {
  // title: '冰島旅遊適合你嗎？──兩次造訪冰島後我學到的事',
  // abstract: '像《白日夢冒險王》的班史提勒在遼闊公路上追夢？在極光、瀑布、懸崖前露出觀光客的滿足微笑？這些你對冰島旅遊的美好想像，可能都會在親訪後大失所望。分別在秋季、夏季踏上冰島的作者，比較兩者的旅行體驗差異，並帶來當地最真實的氣候、路況指南。',
  // thumbnailUrl: 'https://cw-image-resizer.cwg.tw/resize/uri/https%3A%2F%2Fstorage.googleapis.com%2Fcrossing-cms-cwg-tw%2Farticle%2F202205%2Farticle-6274da3fed0eb.jpg/?w=1170&format=webp',
  // category: [{ label: '旅遊食記', value: '旅遊食記' }]
};

// const defaultTags: Tag[] = [
//   { id: '1', text: '旅遊' },
//   { id: '2', text: '冰島' },
//   { id: '3', text: '極光' },
//   { id: '4', text: '白日夢冒險王' },
//   { id: '5', text: '雷克雅維克' },
// ];
const defaultTags: Tag[] = [];

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
  }),
  tags: z.array(z.object({ id: z.string(), text: z.string() })),
});

export default function PublishArticle() {
  const { editorProps } = useEditor();
  const [tags, setTags] = useState <Tag[]> (defaultTags || []);
  const [activeTagIndex, setActiveTagIndex] = useState < number | null > (null);

  const { mutate: createArticleMutate, isPending: isUpdateCreateArticle } = useMutation({ mutationFn: createArticle });

  useEffect(() => {
    if(!editorProps) toast({ title: '無文章內容，無法進行發布', variant: 'error' });
  }, [editorProps]);

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
      title: EditArticle?.title || '',
      abstract: EditArticle?.abstract || '',
      thumbnailUrl: EditArticle?.thumbnailUrl || '',
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
              options={categoryOptions}
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
