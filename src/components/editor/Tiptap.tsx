'use client';

import { useEditor, EditorContent } from '@tiptap/react';
import StarterKit from '@tiptap/starter-kit';
import Toolbar from './Toolbar';
import Underline from '@tiptap/extension-underline';
import Image from '@tiptap/extension-image';
import TextAlign from '@tiptap/extension-text-align';
import Link from '@tiptap/extension-link';
import CharacterCount from '@tiptap/extension-character-count';
import { limit, content1 } from './settings';
import '@/components/editor/style.css';

interface TiptapProps {
  onChange: (value: string) => void
  content: string;
}

const Tiptap = ({ onChange, content }: TiptapProps) => {
  const handleChange = (newContent: string) => {
    onChange(newContent);
  };
  const editor = useEditor({
    content: content1,
    editable: true,
    extensions: [
      StarterKit,
      Underline,
      Image.configure({
        HTMLAttributes: {
          class: 'object-contain',
        }
      }),
      TextAlign.configure({
        types: ['heading', 'paragraph'],
      }),
      Link.configure({
        autolink: true,
        openOnClick: false,
        validate: (href: string) => /^https?:\/\//.test(href),
        HTMLAttributes: {
          class: 'text-primary',
        },
      }),
      CharacterCount.configure({
        limit,
      }),
    ],
    editorProps: {
      attributes: {
        class:
          'flex-auto flex-col px-4 py-3 justify-start border-b border-r border-l border-gray-700 text-primary-400 items-center w-full gap-3 font-medium text-[16px] pt-4 rounded-bl-md rounded-br-md outline-none',
      },
    },
    onUpdate: ({ editor }) => {
      handleChange(editor.getHTML());
    },
  });

  return (
    <div className='w-full px-4'>
      <Toolbar editor={editor} content={content}/>
      <EditorContent style={{ whiteSpace: 'pre-line' }} editor={editor} />
    </div>
  );
};

export default Tiptap;
