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
import { useMutation, useQuery } from '@tanstack/react-query';
import { editArticle } from '@/lib/authApi';
import { toast } from '@/components/ui/use-toast';
import { Tag, TagInput } from 'emblor';
import { getArticleById, getCategories } from '@/lib/nextApi';
import Link from 'next/link';
import { handleApiError, verifyAuthor } from '@/lib/utils';
import StatusCode from '@/types/StatusCode';
import { CreateArticleRequest } from '@/types/article';
import { useUserStore } from '@/providers/userProvider';
import LoadingEditorSkeleton from '@/components/LoadingEditorSkeleton';
import { Lock } from 'lucide-react';

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

export default function PublishArticle({ params }: { params: { id: string } }) {
  const { editorProps } = useEditor();
  const defaultTags: string[] = editorProps?.tags || [];
  const [tags, setTags] = useState <Tag[]> (convertTags(defaultTags) || []);
  const [activeTagIndex, setActiveTagIndex] = useState < number | null > (null);
  const [categoryOptions, setCategoryOptions] = useState<{ id: string; name: string; }[]>([]);
  const [initialLoad, setInitialLoad] = useState(false);
  const [isAuthor, setIsAuthor] = useState(false);
  const [isVerifying, setIsVerifying] = useState(true);
  const router = useRouter();
  const { id } = params;
  const { auth } = useUserStore((state) => state);

  const categoryValidation = z.string().refine(value => categoryOptions.some(option => option.name === value), {
    message: '選項為必填',
  });

  const isNeedPayValidation = z.string().refine(value => isNeedPayOptions.some(option => option.name === value), {
    message: '選項為必填',
  });

  const formSchema = z.object({
    title: z.string().min(1, { message: '標題是必填欄位' }).max(30, { message: '標題不能超過60個字' }),
    abstract: z.string().max(150, { message: '摘要不能超過150個字' }),
    thumbnailUrl: z.string().optional().refine(val => !val || val.startsWith('https://'), { message: '請輸入有效的網址，並以 https:// 開頭' }),
    category: categoryValidation,
    isNeedPay: isNeedPayValidation,
    tags: z.array(z.object({ id: z.string(), text: z.string() })).optional(),
  });

  const { mutate: editArticleMutate, isPending: isUpdateEditArticle } = useMutation({
    mutationFn: editArticle
  });

  const { isPending, isError, data, error } = useQuery({
    queryKey: ['getArticleById', id],
    queryFn: () => getArticleById(id),
  });

  useEffect(() => {
    if (data) {
      const { creator } = data;

      if (auth && auth.id) {
        verifyAuthor(creator?.id, auth.id, router, () => setIsAuthor(true));
        setIsVerifying(false);
        return;

      }

      if (isError) {
        console.log(error);
      }
    }

    setInitialLoad(true);
  }, [id, router, data, auth, isError, error, editorProps]);

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
    if (!editorProps) return;
    let tags: string[] | undefined = [];

    if (initialLoad && defaultTags?.length > 0) {
      tags = defaultTags;
      setInitialLoad(false);
    } else {
      tags = values.tags?.map(tag => tag.text);;
    }

    const isNeedPay = (values.isNeedPay === '免費') ? false : true;
    const { title, abstract, category } = values;
    const { content, wordCount, id } = editorProps;
    const editArticleBody: CreateArticleRequest = {
      id,
      content,
      wordCount,
      isNeedPay,
      title,
      abstract,
      category,
      tags
    };
    if (values.thumbnailUrl) {
      editArticleBody.thumbnailUrl = values.thumbnailUrl;
    }
    editArticleMutate(editArticleBody, {
      onSuccess: () => {
        toast({ title: '文章發布成功', description: '即將為您跳轉至文章頁', variant: 'success' });
        router.push(`/article/${id}`);
      },
      onError: (error) => {
        handleApiError(error, {
          [StatusCode.ILLEGAL_PAYLOAD]: () => {
            toast({ title: '請檢查輸入資料', variant: 'error' });
          },
          [StatusCode.PERMISSION_DENIED]: () => {
            toast({ title: '請重新登入', variant: 'error' });
          },
        }, '編輯文章');
      },
    });
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
  const { control, handleSubmit, formState: { isValid }, trigger } = form;

  function setValue() {
    setInitialLoad(false);
  }

  useEffect(() => {
    if (categoryOptions.length > 0) {
      trigger();
    }
  }, [trigger, categoryOptions]);

  return (
    <main className='mx-auto mb-10 grid size-full max-w-[800px] place-items-center'>
      <div className='mb-10 pt-10 text-center text-3xl text-primary-300'>
        發布設定
      </div>
      {isPending || isVerifying ? (
        <LoadingEditorSkeleton />
      ) : isAuthor ? (
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
                      setValue();
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
              <Button className='mr-4 bg-grey text-black hover:bg-grey-300 hover:text-white' asChild><Link href='/manage/content' replace={true}>取消</Link></Button>
              <Button type='submit' disabled={!isValid || !editorProps} isLoading={isUpdateEditArticle}>發布文章</Button>
            </div>
          </form>
        </Form>
      </div>) : (
        <div className='mt-10 flex justify-center text-center text-red-500'><Lock /><p className='ml-2'>您沒有編輯此文章的權限</p></div>
      )}
    </main>
  );
}
