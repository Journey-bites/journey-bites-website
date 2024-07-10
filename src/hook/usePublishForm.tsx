'use client';

import { useState, useEffect } from 'react';
import { useMutation } from '@tanstack/react-query';
import { z } from 'zod';
import { useForm } from 'react-hook-form';
import { Tag } from 'emblor';
import { getCategories } from '@/lib/nextApi';
import { useRouter } from 'next/navigation';
import { toast } from '@/components/ui/use-toast';
import { handleApiError } from '@/lib/utils';
import { useEditor } from '@/stores/useEditorStore';
import { createArticle, editArticle } from '@/lib/authApi';
import { zodResolver } from '@hookform/resolvers/zod';
import StatusCode from '@/types/StatusCode';
import { IS_NEED_PAY_OPTIONS } from '@/constants';

interface InitialValues {
  title: string;
  abstract: string;
  thumbnailUrl: string;
  category: string;
  isNeedPay: boolean | string;
  tags?: Tag[];
}

function convertTags(tagTexts: string[]): Tag[] {
  return tagTexts.map((text, index) => ({
    id: (index + 1).toString(),
    text: text
  }));
}

export function usePublishForm(initialValues: InitialValues, isEdit: boolean, articleId?: string) {
  const { editorProps } = useEditor();
  const router = useRouter();
  const defaultTags: string[] = editorProps?.tags || [];
  const [tags, setTags] = useState <Tag[]> (convertTags(defaultTags) || []);
  const [categoryOptions, setCategoryOptions] = useState<{ id: string; name: string; }[]>([]);
  const { mutate: mutateArticle, isPending: isUpdateArticle } = useMutation({
    mutationFn: isEdit ? editArticle : createArticle
  });

  const categoryValidation = z.string().refine(value => categoryOptions.some(option => option.name === value), {
    message: '選項為必填',
  });

  const isNeedPayValidation = z.string().refine(value => IS_NEED_PAY_OPTIONS.some(option => option.name === value), {
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

  type FormData = z.infer<typeof formSchema>;

  const form = useForm<FormData>({
    mode: 'onBlur',
    resolver: zodResolver(formSchema),
    defaultValues: {
      ...initialValues,
      isNeedPay: initialValues.isNeedPay ? '付費' : '免費',
      tags: []
    },
  });

  useEffect(() => {
    async function fetchCategories() {
      try {
        const res = await getCategories();
        const categoryOptions = res.map(({ id, name }) => ({ id, name }));
        setCategoryOptions(categoryOptions);
      } catch (error) {
        toast({ title: 'Error fetching categories: ' + error + '', variant: 'error' });
      }
    }

    fetchCategories();
  }, []);

  function onSubmit(values: z.infer<typeof formSchema>) {
    if (!editorProps) return;

    const tags = values.tags?.map(tag => tag.text) || [];
    const isNeedPay = (values.isNeedPay === '免費') ? false : true;
    const { title, abstract, category } = values;
    const articleBody = {
      ...editorProps,
      isNeedPay,
      title,
      abstract,
      category,
      tags
    };
    if (values.thumbnailUrl) {
      articleBody.thumbnailUrl = values.thumbnailUrl;
    }

    mutateArticle(articleBody, {
      onSuccess: () => {
        const successTitle = isEdit ? '文章編輯成功' : '文章發布成功';
        const successDescription = isEdit ? '即將為您跳轉至文章頁' : '即將為您跳轉至文章管理頁';
        toast({ title: successTitle, description: successDescription, variant: 'success' });

        isEdit ? window.location.href = `/article/${articleId}` : router.push('/manage/content');
      },
      onError: (error) => {
        handleApiError(error, {
          [StatusCode.ILLEGAL_PAYLOAD]: () => {
            toast({ title: '請檢查輸入資料', variant: 'error' });
          },
          [StatusCode.PERMISSION_DENIED]: () => {
            toast({ title: '請重新登入', variant: 'error' });
          },
        }, isEdit ? '編輯文章' : '發布文章');
      },
    });
  }

  return { form, onSubmit, categoryOptions, tags, setTags, isUpdateArticle };
}
