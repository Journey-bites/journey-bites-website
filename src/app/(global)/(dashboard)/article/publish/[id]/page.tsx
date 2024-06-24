'use client';

import { useRouter, useParams } from 'next/navigation';
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
import { editArticle } from '@/lib/authApi';
import { toast } from '@/components/ui/use-toast';
import { Tag, TagInput } from 'emblor';
import { getCategories } from '@/lib/nextApi';

const categoryDefaultOptions: { id: string; name: string; }[]= [
  { id: '台灣旅遊地圖', name: '台灣旅遊地圖' },
  { id: '步道旅行', name: '步道旅行' },
  { id: '健行日記', name: '健行日記' },
  { id: '旅遊食記', name: '旅遊食記' },
  { id: '台灣百岳', name: '台灣百岳' },
];

const isNeedPayOptions: { id: string; name: string; }[]= [
  { id: '免費', name: '免費' },
  { id: '付費', name: '付費' }
];

function convertTags(tagTexts: string[]): Tag[] {
  return tagTexts.map((text, index) => ({
    id: (index + 1).toString(),
    text: text
  }));
}

// function extractTagTexts(tags: Tag[]): string[] {
//   return tags.map(tag => tag.text);
// }

export default function PublishArticle() {
  const { editorProps } = useEditor();
  const defaultTags: string[] = editorProps?.tags || [];
  const [tags, setTags] = useState <Tag[]> (convertTags(defaultTags) || []);
  const [activeTagIndex, setActiveTagIndex] = useState < number | null > (null);
  const [categoryOptions, setCategoryOptions] = useState<{ id: string; name: string; }[]>([]);
  const [initialLoad, setInitialLoad] = useState(false);
  const router = useRouter();
  const { id } = useParams();

  const categoryValidation = z.string().refine(value => {
    if (categoryOptions.length === 0) {
      return categoryDefaultOptions.some(option => option.id === value);
    } else {
      return categoryOptions.some(option => option.name === value);
    }
  }, {
    message: '選項為必填',
  });

  const isNeedPayValidation = z.string().refine(value => isNeedPayOptions.some(option => option.name === value), {
    message: '選項為必填',
  });

  const formSchema = z.object({
    title: z.string().min(1, { message: '標題是必填欄位' }).max(30, { message: '標題不能超過60個字' }),
    abstract: z.string().max(150, { message: '摘要不能超過150個字' }),
    thumbnailUrl: z.string().optional().refine(val => !val || val.startsWith('https://'), { message: 'URL must start with https' }),
    category: categoryValidation,
    isNeedPay: isNeedPayValidation,
    tags: z.array(z.object({ id: z.string(), text: z.string() })),
  });

  const { mutate: editArticleMutate, isPending: isUpdateEditArticle } = useMutation({
    mutationFn: editArticle,
    onSuccess: () => {
      toast({ title: '成功送出', variant: 'success' });
      router.push(`/article/${id}`);
    },
    onError: (err) => {
      console.log(err);
      toast({ title: '送出失敗', variant: 'error' });
    },
  });

  useEffect(() => {
    if(!editorProps) toast({ title: '無文章內容，無法進行發布', variant: 'error' });
    setInitialLoad(true);
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
    let tags: string[] = [];

    if (initialLoad && defaultTags?.length > 0) {
      tags = defaultTags;
      setInitialLoad(false);
    } else if (selectedValue?.length > 0) {
      tags = values.tags.map(tag => tag.text);
    } else {
      tags = values.tags.map(tag => tag.text);;
    }

    const isNeedPay = (values.isNeedPay === '免費') ? false : true;
    const editArticleRequest = { ...editorProps, ...values, tags, isNeedPay };
    console.log({ editArticleRequest });
    editArticleMutate(editArticleRequest);
  }

  const form = useForm<z.infer<typeof formSchema>>({
    mode: 'onBlur',
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: editorProps?.title || '',
      abstract: editorProps?.abstract || '',
      thumbnailUrl: editorProps?.thumbnailUrl || '',
      category: editorProps?.category || '',
      isNeedPay: editorProps?.isNeedPay ? '付費' : '免費',
      tags: []
    },
  });
  const { control, handleSubmit, formState: { isValid }, trigger, watch } = form;
  const selectedValue = watch('tags');

  function setValue() {
    setInitialLoad(false);
  }

  useEffect(() => {
    trigger();
  }, [trigger]);

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
              <Button className='mr-4 bg-grey text-black hover:bg-grey-400 hover:text-white'>取消</Button>
              <Button type='submit' disabled={!isValid || !editorProps} isLoading={isUpdateEditArticle}>發布文章</Button>
            </div>
          </form>
        </Form>
      </div>
    </main>
  );
}
