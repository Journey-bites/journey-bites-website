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

const formSchema = z.object({
  title: z.string().min(1, { message: '標題是必填欄位' }).max(30, { message: '標題不能超過60個字' }),
  abstract: z.string().max(150, { message: '摘要不能超過150個字' }),
  thumbnailUrl: z.string().optional().refine(val => !val || val.startsWith('https://'), { message: 'URL must start with https' }),
});

export default function PublishArticle() {
  const { editorProps } = useEditor();
  // const form = useForm<FieldValues>({
  //   resolver: zodResolver(formSchema),
  //   mode: 'onBlur',
  //   defaultValues: {
  //     displayName: '',
  //     email: '',
  //   },
  // });

  function onSubmit(values: z.infer<typeof formSchema>) {
    // Do something with the form values.
    // ✅ This will be type-safe and validated.
    console.log(editorProps);
    console.log(values);
  }

  const form = useForm<z.infer<typeof formSchema>>({
    mode: 'onBlur',
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: '',
      abstract: '',
      thumbnailUrl: '',
      // needsPay: false
    },
  });

  const { control } = form;

  return (
    <main className='mx-auto mb-10 grid size-full place-items-center'>
      <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className='space-y-8'>
        <InputField
          className='w-[270px]'
          control={control}
          name='title'
          label='標題'
          placeholder='請輸入標題'
        />
        <TextAreaField
          className='w-[270px] resize-none'
          control={control}
          name='abstract'
          label='摘要'
          placeholder='請輸入摘要'
        />
        <InputField
          className='w-[270px]'
          control={control}
          name='thumbnailUrl'
          label='縮圖'
          placeholder='請輸入縮圖網址 https://'
          formDescription='無縮圖時將由系統自動帶入預設圖片'
        />
        <Button type='submit'>發布文章</Button>
      </form>
    </Form>
    </main>
  );
}
