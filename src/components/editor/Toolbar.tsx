/* eslint-disable tailwindcss/no-custom-classname */
'use client';

import { type Editor } from '@tiptap/react';
import {
  Bold,
  Strikethrough,
  Italic,
  List,
  ListOrdered,
  Heading1,
  Underline,
  Undo,
  Redo,
  ImageIcon,
  AlignLeft,
  AlignCenter,
  AlignRight,
  Link2,
  Unlink2,
} from 'lucide-react';
import { DialogComponent } from './EditorDialog';
import { useDialog } from '@/stores/useDialogStore';
import { useEditor } from '@/stores/useEditorStore';
import { LIMIT, COMMON_ACTIVE_CLASS_NAME, COMMON_CLASS_NAME } from '../../constants/editorSettings';
import { Button } from '@/components/ui/button';

type Props = {
  editor: Editor | null;
  content: string;
};

const Toolbar = ({ editor }: Props) => {
  const { onOpen, setData } = useDialog();
  const { setEditorProps } = useEditor();

  if (!editor) {
    return null;
  }

  const characterCount = editor.storage.characterCount.characters();

  const setLink = (e: { preventDefault: () => void; }) => {
    e.preventDefault();
    const previousUrl = editor.getAttributes('link').href;
    const url = window.prompt('URL', previousUrl);

    // cancelled
    if (url === null) {
      return;
    }

    // empty
    if (url === '') {
      editor.chain().focus().extendMarkRange('link').unsetLink().run();

      return;
    }

    // update link
    editor.chain().focus().extendMarkRange('link').setLink({ href: url }).run();
  };

  const handleDialog = (url?: string) => {
    onOpen();
    if(url) editor.chain().focus().setImage({ src: url }).run();
    setData({ url: '' });
  };

  const handleSubmit = () => {
    // console.log(editor.getText().replace(/\s+/g, ' ').trim().length);
    const wordsCount = editor.getText().replace(/\s+/g, ' ').trim().length;
    console.log(editor.getHTML());
    setEditorProps({
      content: editor.getHTML(),
      wordsCount,
      id: '',
      title: '',
      creator: '',
      abstract: '',
      thumbnailUrl: '',
      needsPay: false,
      readingTime: 0,
      tags: [],
      category: ''
    });
  };

  return (
    <div
      className='sticky top-0 z-10 flex w-full flex-wrap items-center justify-between gap-5 rounded-t-md border border-gray-700 bg-white/70 px-4 py-3 backdrop-blur-md'
    >
      <div className='flex w-full flex-wrap items-center justify-start gap-5'>
        <button
          onClick={(e) => {
            e.preventDefault();
            editor.chain().focus().toggleBold().run();
          }}
          className={
            editor.isActive('bold')
              ? COMMON_ACTIVE_CLASS_NAME
              : COMMON_CLASS_NAME
          }
        >
          <Bold className='size-5' />
        </button>
        <button
          onClick={(e) => {
            e.preventDefault();
            editor.chain().focus().toggleItalic().run();
          }}
          className={
            editor.isActive('italic')
              ? COMMON_ACTIVE_CLASS_NAME
              : COMMON_CLASS_NAME
          }
        >
          <Italic className='size-5' />
        </button>
        <button
          onClick={(e) => {
            e.preventDefault();
            editor.chain().focus().toggleUnderline().run();
          }}
          className={
            editor.isActive('underline')
              ? COMMON_ACTIVE_CLASS_NAME
              : COMMON_CLASS_NAME
          }
        >
          <Underline className='size-5' />
        </button>
        <button
          onClick={(e) => {
            e.preventDefault();
            editor.chain().focus().toggleStrike().run();
          }}
          className={
            editor.isActive('strike')
              ? COMMON_ACTIVE_CLASS_NAME
              : COMMON_CLASS_NAME
          }
        >
          <Strikethrough className='size-5' />
        </button>
        <button
          onClick={(e) => {
            e.preventDefault();
            editor.chain().focus().setTextAlign('left').run();
          }}
          className={
            editor.isActive({ textAlign: 'left' })
            ? COMMON_ACTIVE_CLASS_NAME
            : COMMON_CLASS_NAME
          }
        >
          <AlignLeft className='size-5' />
        </button>
        <button
          onClick={(e) => {
            e.preventDefault();
            editor.chain().focus().setTextAlign('center').run();
          }}
          className={editor.isActive({ textAlign: 'center' })
            ? COMMON_ACTIVE_CLASS_NAME
            : COMMON_CLASS_NAME
        }
        >
          <AlignCenter className='size-5' />
        </button>
        <button
          onClick={() => editor.chain().focus().setTextAlign('right').run()}
          className={editor.isActive({ textAlign: 'right' })
            ? COMMON_ACTIVE_CLASS_NAME
            : COMMON_CLASS_NAME
        }
        >
          <AlignRight className='size-5' />
        </button>
        <button
          onClick={(e) => {
            e.preventDefault();
            editor.chain().focus().toggleHeading({ level: 1 }).run();
          }}
          className={
            editor.isActive('heading', { level: 1 })
              ? COMMON_ACTIVE_CLASS_NAME
              : COMMON_CLASS_NAME
          }
        >
          <Heading1 className='size-5' />
        </button>

        <button
          onClick={(e) => {
            e.preventDefault();
            editor.chain().focus().toggleBulletList().run();
          }}
          className={
            editor.isActive('bulletList')
              ? COMMON_ACTIVE_CLASS_NAME
              : COMMON_CLASS_NAME
          }
        >
          <List className='size-5' />
        </button>
        <button
          onClick={(e) => {
            e.preventDefault();
            editor.chain().focus().toggleOrderedList().run();
          }}
          className={
            editor.isActive('orderedList')
              ? COMMON_ACTIVE_CLASS_NAME
              : COMMON_CLASS_NAME
          }
        >
          <ListOrdered className='size-5' />
        </button>
        <button onClick={setLink} className={
          editor.isActive('link')
            ? COMMON_ACTIVE_CLASS_NAME
            : COMMON_CLASS_NAME
          }>
          <Link2 className='size-5' />
        </button>
        <button
          onClick={(e) => {
            e.preventDefault();
            editor.chain().focus().unsetLink().run();
          }}
          disabled={!editor.isActive('link')}
        >
          <Unlink2 className='size-5' />
        </button>
        <button onClick={(e) => {
            e.preventDefault();
            handleDialog();
          }}
          className={
            editor.isActive('image')
              ? COMMON_ACTIVE_CLASS_NAME
              : COMMON_CLASS_NAME
          }>
          <ImageIcon className='size-5' />
        </button>
        <button
          onClick={(e) => {
            e.preventDefault();
            editor.chain().focus().undo().run();
          }}
          className={
            editor.isActive('undo')
              ? COMMON_ACTIVE_CLASS_NAME
              : COMMON_CLASS_NAME
          }
        >
          <Undo className='size-5' />
        </button>
        <button
          onClick={(e) => {
            e.preventDefault();
            editor.chain().focus().redo().run();
          }}
          className={
            editor.isActive('redo')
              ? COMMON_ACTIVE_CLASS_NAME
              : COMMON_CLASS_NAME
          }
        >
          <Redo className='size-5' />
        </button>
        <DialogComponent handleDialog={handleDialog} />
      </div>
      {characterCount >= LIMIT ? (
        <div className='py-2 text-red-500'>
          {characterCount}/{LIMIT} 字
        </div>
      ) : (
        <div className='py-2'>
          {characterCount}/{LIMIT} 字
        </div>
      )}
      {!editor.isEmpty && (
        <Button
        onClick={() => handleSubmit()}
          type='submit'
          className='rounded-md bg-primary px-4 py-2 text-white'
        >
          送出
        </Button>
      )}
    </div>
  );
};

export default Toolbar;
