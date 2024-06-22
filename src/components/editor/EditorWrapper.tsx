'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import Tiptap from './Tiptap';
import { useEditor } from '@/stores/useEditorStore';

interface PostData {
  userId: number;
  id: number;
  title: string;
  body: string;
}

interface EditorWrapperProps {
  isEditing: boolean;
  editContent?: PostData | undefined;
}

const EditorWrapper: React.FC<EditorWrapperProps> = ({ isEditing, editContent }) => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const router = useRouter();
  const [content, setContent] = useState<string>('');
  const [isLoading, setLoading] = useState(true);
  const { setEditorProps } = useEditor();

  const handleContentChange = (reason: string) => {
    setContent(reason);
  };
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);

    if(isEditing && editContent?.id) {
      const updatedProps = {
        id: editContent?.id.toString(),
        title: editContent?.title,
        abstract: '簡單摘要',
        thumbnailUrl: '',
        category: '666d3789b8ae1350672e06e9',
        needsPay: true,
        tags: ['旅遊', '台灣']
      };

      setEditorProps(updatedProps);
      return router.push(`/article/publish/${editContent?.id}`);
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
    if(editContent) {
      setContent(editContent.body);
      setLoading(false);
    }
    setLoading(false);
  }, [editContent]);

  return (
    <form
      onSubmit={handleSubmit}
      className='mx-auto mb-10 grid size-full max-w-screen-lg place-items-center px-4 pt-10'
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
