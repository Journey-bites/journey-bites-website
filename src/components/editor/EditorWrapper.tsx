'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import Tiptap from './Tiptap';
import { useEditor } from '@/stores/useEditorStore';
import { type Article } from '@/types/article';
import LoadingEditorSkeleton from '../LoadingEditorSkeleton';

interface EditorWrapperProps {
  isEditing: boolean;
  editContent?: {
    data: Article;
  };
}

const initialOptions: Partial<Article> = {};

const EditorWrapper: React.FC<EditorWrapperProps> = ({ isEditing, editContent }) => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const router = useRouter();
  const [content, setContent] = useState<string>('');
  const [options, setOptions] = useState<Partial<Article>>(initialOptions);
  const [isLoading, setLoading] = useState(true);
  const { setEditorProps } = useEditor();

  const handleContentChange = (reason: string) => {
    setContent(reason);
  };
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);

    if(isEditing && options) {

      const updatedProps = {
        id: options?.id,
        title: options?.title,
        abstract: options?.abstract,
        content,
        thumbnailUrl: options?.thumbnailUrl,
        category: options?.category,
        isNeedPay: options?.isNeedPay,
        tags: options?.tags,
      };

      setEditorProps(updatedProps);
      return router.push(`/article/publish/${options?.id}`);
    }
    router.push('/article/publish');
    // setContent('');
    // console.log(editorProps)
  };

  useEffect(() => {
    const handleBeforeUnload = (e: BeforeUnloadEvent) => {
      if (!isSubmitting) {
        e.preventDefault();
      }
    };

    window.addEventListener('beforeunload', handleBeforeUnload);

    return () => {
      window.removeEventListener('beforeunload', handleBeforeUnload);
    };
  }, [isSubmitting]);

  useEffect(() => {
    if(editContent && editContent.data) {
      setOptions(editContent?.data);
      setContent(editContent?.data?.content);
      setLoading(false);
    }
    setLoading(false);
  }, [editContent]);

  return (
    <>
      {isLoading && (
        <LoadingEditorSkeleton />
      )}
      <form
        onSubmit={handleSubmit}
        className='mx-auto mb-10 grid size-full max-w-screen-lg place-items-center px-4 pt-10'
      >
        {isEditing && content && (
          <Tiptap
            content={content}
            onChange={(newContent) => handleContentChange(newContent)}
          />
        )}
        {!isEditing && (
          <Tiptap
            content={content}
            onChange={(newContent) => handleContentChange(newContent)}
          />
        )}
      </form>
    </>
  );
};

export default EditorWrapper;
