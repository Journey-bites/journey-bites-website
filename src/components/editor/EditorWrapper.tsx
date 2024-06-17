'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import Tiptap from './Tiptap';
import { useEditor } from '@/stores/useEditorStore';

interface EditorWrapperProps {
  isEditing: boolean;
  editContent?: string | undefined;
}

const EditorWrapper: React.FC<EditorWrapperProps> = ({ isEditing, editContent }) => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const router = useRouter();
  const [content, setContent] = useState<string>('');
  const [isLoading, setLoading] = useState(true);
  const { editorProps } = useEditor();

  const handleContentChange = (reason: string) => {
    setContent(reason);
  };
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);
    router.push('/article/publish');
    setContent('');
    console.log(editorProps);
  };

  useEffect(() => {
    const handleBeforeUnload = (e: BeforeUnloadEvent) => {
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

  useEffect(() => {
    if(editContent) {
      setContent(editContent);
      setLoading(false);
    }
    setLoading(false);
  }, [editContent]);

  return (
    <form
      onSubmit={handleSubmit}
      className='mx-auto mb-10 grid size-full max-w-[1308px] place-items-center pt-10'
    >
      {isLoading ? (
        <p>Loading...</p> // 載入狀態顯示 Loading...
        ) : (
          isEditing ? (
            content && <Tiptap
            content={content}
            onChange={(newContent) => handleContentChange(newContent)}
          />
        ) : (
          <Tiptap
            content={content}
            onChange={(newContent) => handleContentChange(newContent)}
          />
        )
      )}
    </form>
  );
};

export default EditorWrapper;
