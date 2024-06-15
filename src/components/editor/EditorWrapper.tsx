'use client';

import { useState } from 'react';
import Tiptap from './Tiptap';

const EditorWrapper= () => {
  const [content, setContent] = useState<string>('');
  const handleContentChange = (reason: string) => {
    setContent(reason);
    console.log(reason);
  };
  const handleSubmit = (e: { preventDefault: () => void; }) => {
    e.preventDefault();
    setContent('');
  };
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
