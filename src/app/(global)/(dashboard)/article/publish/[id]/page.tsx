'use client';

import jsCookie from 'js-cookie';
import { notFound } from 'next/navigation';
import {
  Form,
} from '@/components/ui/form';
import { Button } from '@/components/ui/button';
import InputField from '@/components/custom/InputField';
import TextAreaField from '@/components/custom/TextAreaField';
import { useEditor } from '@/stores/useEditorStore';
import { Controller } from 'react-hook-form';
import SelectField from '@/components/custom/SelectField';
import { useState, useEffect } from 'react';
import { useQuery } from '@tanstack/react-query';
import { getArticleById } from '@/lib/nextApi';
import Link from 'next/link';
import { Tag, TagInput } from 'emblor';
import { useUserStore } from '@/providers/userProvider';
import LoadingEditorSkeleton from '@/components/LoadingEditorSkeleton';
import { IS_NEED_PAY_OPTIONS, JOURNEY_BITES_COOKIE, QUERY_KEY } from '@/constants';
import { Lock } from 'lucide-react';
import { usePublishForm } from '@/hook/usePublishForm';

export default function PublishArticle({ params }: { params: { id: string } }) {
  const token = jsCookie.get(JOURNEY_BITES_COOKIE);
  const { id } = params;
  const { auth } = useUserStore((state) => state);
  const { editorProps } = useEditor();
  const defaultTags: string[] = editorProps?.tags || [];
  const [tags, setTags] = useState<Tag[]>(defaultTags.map((text, index) => ({ id: (index + 1).toString(), text })));
  const [activeTagIndex, setActiveTagIndex] = useState<number | null>(null);
  const [isAuthor, setIsAuthor] = useState(false);

  const { isPending, data, isError } = useQuery({
    queryKey: [QUERY_KEY.article, id],
    queryFn: () => getArticleById(id, token),
  });

  useEffect(() => {
    if (data) {
      const { creator } = data;

      if (auth && auth.id) {
        setIsAuthor(creator.id === auth.id);
      }
    }
  }, [id, token, data, auth]);

  const initialValues = {
    title: editorProps?.title || '',
    abstract: editorProps?.abstract || '',
    thumbnailUrl: editorProps?.thumbnailUrl || '',
    category: editorProps?.category || '',
    isNeedPay: editorProps?.isNeedPay || false,
    tags: tags,
  };

  const { form, onSubmit, categoryOptions, setTags: setFormTags, isUpdateArticle } = usePublishForm(initialValues, true, id);
  const { control, handleSubmit, formState: { isValid }, setValue, trigger } = form;

  useEffect(() => {
    if (categoryOptions.length > 0) {
      trigger();
    }

    setValue('tags', tags);
  }, [trigger, categoryOptions, setValue, tags]);

  if (isPending) {
    return <LoadingEditorSkeleton />;
  }

  if (isError) {
    return notFound();
  }

  if (!isAuthor) {
    return (
      <main className='min-h-screen w-full pb-10'>
        <div className='mt-10 flex justify-center text-center text-red-500'>
          <Lock /><p className='ml-2'>您沒有編輯此文章的權限</p>
        </div>
      </main>
    );
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
              isRequired={true}
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
              isRequired={true}
            />
            <SelectField
              className='w-full'
              control={control}
              name='isNeedPay'
              label='內容收費'
              placeholder='設定文章是否收費'
              options={IS_NEED_PAY_OPTIONS}
              isRequired={true}
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
                      setFormTags(newTags);
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
              <Button type='submit' disabled={!isValid || !editorProps} isLoading={isUpdateArticle}>發布文章</Button>
            </div>
          </form>
        </Form>
      </div>
    </main>
  );
}
