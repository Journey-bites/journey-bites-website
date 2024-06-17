'use client';

import { useEditor, EditorContent } from '@tiptap/react';
import StarterKit from '@tiptap/starter-kit';
import Toolbar from './Toolbar';
import Underline from '@tiptap/extension-underline';
import { Image as TiptapImage } from '@tiptap/extension-image';
import TextAlign from '@tiptap/extension-text-align';
import { Link as TiptapLink } from '@tiptap/extension-link';
import CharacterCount from '@tiptap/extension-character-count';
import { LIMIT as limit } from '../../constants/editorSettings';
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
    content: content,
    editable: true,
    extensions: [
      StarterKit,
      Underline,
      TiptapImage.configure({
        HTMLAttributes: {
          class: 'object-contain',
        }
      }),
      TextAlign.configure({
        types: ['heading', 'paragraph'],
      }),
      TiptapLink.configure({
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
    <div className='w-[67.5%] sm:w-full sm:px-4 md:w-full md:px-4 xs:w-full xs:px-4'>
      <Toolbar editor={editor} content={content}/>
      <EditorContent style={{ whiteSpace: 'pre-line' }} editor={editor} />
    </div>
  );
};

export default Tiptap;
