'use client';

import { useRouter } from 'next/navigation';
import { Form } from '@/components/ui/form';
import { Button } from '@/components/ui/button';
import { useState } from 'react';
import { Controller } from 'react-hook-form';
import InputField from '@/components/custom/InputField';
import TextAreaField from '@/components/custom/TextAreaField';
import SelectField from '@/components/custom/SelectField';
import { TagInput } from 'emblor';
import { useEditor } from '@/stores/useEditorStore';
import Link from 'next/link';
import { usePublishForm } from '@/hook/usePublishForm';
import { toast } from '@/components/ui/use-toast';
import { IS_NEED_PAY_OPTIONS } from '@/constants';

const PublishArticle = () => {
  const { editorProps } = useEditor();
  const router = useRouter();
  const [activeTagIndex, setActiveTagIndex] = useState < number | null > (null);

  const { form, onSubmit, categoryOptions, tags, setTags, isUpdateArticle } = usePublishForm({
    title: '',
    abstract: '',
    thumbnailUrl: '',
    category: '',
    isNeedPay: '免費',
  }, false);

  const { control, handleSubmit, formState: { isValid } } = form;

  if (!editorProps) {
    toast({ title: '您必須先建立文章，才能進行發布內容', variant: 'error' });
    router.replace('/article/create');
    return null;
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
              <Button className='mr-4 bg-grey text-black hover:bg-grey-300 hover:text-white' asChild>
                <Link href='/manage/content' replace={true}>取消</Link>
              </Button>
              <Button type='submit' disabled={!isValid || !editorProps} isLoading={isUpdateArticle}>
                發布文章
              </Button>
            </div>
          </form>
        </Form>
      </div>
    </main>
  );
};

export default PublishArticle;
