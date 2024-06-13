'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import Tiptap from './Tiptap';
import { useEditor } from '@/lib/useEditor';

const EditorWrapper= () => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const router = useRouter();
  const [content, setContent] = useState<string>('');
  const { editorProps } = useEditor();
  const handleContentChange = (reason: string) => {
    setContent(reason);
    console.log(reason);
  };
  const handleSubmit = (e: { preventDefault: () => void; }) => {
    e.preventDefault();
    setIsSubmitting(true);
    router.push('/article/publish');
    setContent('');
    console.log(editorProps);
  };

  useEffect(() => {
    const handleBeforeUnload = (e: { preventDefault: () => void; returnValue: string; }) => {
      if (!isSubmitting) {
        e.preventDefault();
        e.returnValue = '您即將離開檔案未儲存';
      }
    };

    window.addEventListener('beforeunload', handleBeforeUnload);

    return () => {
      window.removeEventListener('beforeunload', handleBeforeUnload);
    };
  }, [isSubmitting]);

  return (
    <form
      onSubmit={handleSubmit}
      className='mx-auto mb-10 grid size-full max-w-[1308] place-items-center pt-10'
    >
      <div className='mb-10 text-center text-3xl text-primary-300'>
        新增文章
      </div>
      <Tiptap
        content={content}
        onChange={(newContent: string) => handleContentChange(newContent)}
      />
    </form>
  );
};

export default EditorWrapper;
