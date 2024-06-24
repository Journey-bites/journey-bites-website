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
import Placeholder from '@tiptap/extension-placeholder';
import GlobalDragHandle from 'tiptap-extension-global-drag-handle';
import Document from '@tiptap/extension-document';
import { ResizableImage } from 'tiptap-extension-resizable-image';
import '@/components/editor/style.css';
import 'tiptap-extension-resizable-image/styles.css';
import { useCallback, useMemo } from 'react';

interface TiptapProps {
  onChange: (value: string) => void
  content: string;
}

const forceTitleDocument = Document.extend({
  content: 'heading block*',
});

const Tiptap = ({ onChange, content }: TiptapProps) => {
  const handleChange = useCallback((newContent: string) => {
    onChange(newContent);
  }, [onChange]);

  const editor = useEditor({
    content,
    editable: true,
    extensions: useMemo(() => [
      forceTitleDocument,
      ResizableImage,
      StarterKit.configure({
        document: false,
        heading: {
          HTMLAttributes:
          {
            class: 'mb-9 text-3xl font-black',
          }
        },
        paragraph: {
          HTMLAttributes:
          {
            class: 'mb-6',
          }
        }
      }),
      GlobalDragHandle.configure({
        dragHandleWidth: 20, // default
        scrollTreshold: 100,
        dragHandleSelector: '.custom-drag-handle',
    }),
      Underline,
      TiptapImage.configure({
        // inline: true,
        HTMLAttributes: {
          class: 'object-contain rounded-lg border border-muted inline-block',
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
      Placeholder.configure({
        // considerAnyAsEmpty: true,
        // showOnlyCurrent: false,
        // placeholder: '開始屬於你的精彩創作...',
        placeholder: ({ node }) => {
          if (node.type.name === 'heading') {
            return '請輸入標題';
          }

          return '開始屬於你的精彩創作...';
        },
      }),
    ], []),
    editorProps: {
      attributes: {
        class:
          'flex-auto flex-col px-4 py-3 justify-start text-primary-400 items-center w-full gap-3 font-medium text-[16px] pt-4 rounded-bl-md rounded-br-md outline-none',
      },
    },
    onUpdate: ({ editor }) => {
      handleChange(editor.getHTML());
    },
  });

  return (
    <div className='relative min-h-[500px] w-full border-muted shadow-lg'>
      <Toolbar editor={editor} content={content}/>
      <EditorContent style={{ whiteSpace: 'pre-line' }} editor={editor} />
    </div>
  );
};

export default Tiptap;
