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
  Image as Img,
  AlignLeft,
  AlignCenter,
  AlignRight,
  Link2,
  Unlink2,
} from 'lucide-react';
import { DialogComponent } from './EditorDialog';
import { useDialog } from '@/lib/useDialog';
import { useEditor } from '@/lib/useEditor';
import { limit, commonActiveClassName, commonClassName } from './settings';
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

  const setLink = () => {
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
    setEditorProps({ content: editor.getHTML(), wordsCount });
  };

  return (
    <div
      className='sticky top-0 z-10 flex w-full flex-wrap items-center
    justify-between gap-5 rounded-t-md border border-gray-700 bg-white/70 px-4 py-3 backdrop-blur-md'
    >
      <div className='flex w-full flex-wrap items-center justify-start gap-5'>
        <button
          onClick={(e) => {
            e.preventDefault();
            editor.chain().focus().toggleBold().run();
          }}
          className={
            editor.isActive('bold')
              ? commonActiveClassName
              : commonClassName
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
              ? commonActiveClassName
              : commonClassName
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
              ? commonActiveClassName
              : commonClassName
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
              ? commonActiveClassName
              : commonClassName
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
            ? commonActiveClassName
            : commonClassName
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
            ? commonActiveClassName
            : commonClassName
        }
        >
          <AlignCenter className='size-5' />
        </button>
        <button
          onClick={() => editor.chain().focus().setTextAlign('right').run()}
          className={editor.isActive({ textAlign: 'right' })
            ? commonActiveClassName
            : commonClassName
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
              ? commonActiveClassName
              : commonClassName
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
              ? commonActiveClassName
              : commonClassName
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
              ? commonActiveClassName
              : commonClassName
          }
        >
          <ListOrdered className='size-5' />
        </button>
        <button onClick={setLink} className={editor.isActive('link') ? 'is-active' : ''}>
          <Link2 className='size-5' />
        </button>
        <button
          onClick={() => editor.chain().focus().unsetLink().run()}
          disabled={!editor.isActive('link')}
        >
          <Unlink2 className='size-5' />
        </button>
        <button onClick={() => handleDialog()}
          className={
            editor.isActive('image')
              ? commonActiveClassName
              : commonClassName
          }>
          <Img className='size-5' />
        </button>
        <button
          onClick={(e) => {
            e.preventDefault();
            editor.chain().focus().undo().run();
          }}
          className={
            editor.isActive('undo')
              ? commonActiveClassName
              : commonClassName
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
              ? commonActiveClassName
              : commonClassName
          }
        >
          <Redo className='size-5' />
        </button>
        <DialogComponent dialog={handleDialog} />
      </div>
      <div>
      {characterCount >= limit ? (
        <div className='text-red-500'>
          {characterCount}/{limit} characters
        </div>
      ) : (
        <div>
          {characterCount}/{limit} characters
        </div>
      )}
    </div>
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
