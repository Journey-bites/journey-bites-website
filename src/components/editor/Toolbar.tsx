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
import { LIMIT } from '../../constants/editorSettings';
import { Button } from '@/components/ui/button';
import { Toggle } from '@/components/ui/toggle';

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
    // const wordsCount = editor.getText().replace(/\s+/g, ' ').trim().length;
    setEditorProps({
      content: editor.getHTML(),
      wordsCount: characterCount,
    });
  };

  return (
    <div
      className='sticky top-0 z-10 flex w-full flex-wrap items-center justify-between gap-5 rounded-t-md bg-white/70 px-4 py-3 backdrop-blur-md'
    >
      <div className='flex w-full flex-wrap items-center justify-start gap-5'>
        <Toggle
          className='px-2'
          size='sm'
          pressed={editor.isActive('bold')}
          onPressedChange={() => { editor.chain().focus().toggleBold().run(); }}
        >
          <Bold className='size-4' />
        </Toggle>
        <Toggle
          className='px-2'
          size='sm'
          pressed={editor.isActive('italic')}
          onPressedChange={() => { editor.chain().focus().toggleItalic().run(); }}
        >
          <Italic className='size-4' />
        </Toggle>
        <Toggle
          className='px-2'
          size='sm'
          pressed={editor.isActive('underline')}
          onPressedChange={() => { editor.chain().focus().toggleUnderline().run(); }}
        >
          <Underline className='size-4' />
        </Toggle>
        <Toggle
          className='px-2'
          size='sm'
          pressed={editor.isActive('strike')}
          onPressedChange={() => { editor.chain().focus().toggleStrike().run(); }}
        >
          <Strikethrough className='size-4' />
        </Toggle>
        <Toggle
          className='px-2'
          size='sm'
          pressed={editor.isActive({ textAlign: 'left' })}
          onPressedChange={() => { editor.chain().focus().setTextAlign('left').run(); }}
        >
          <AlignLeft className='size-4' />
        </Toggle>
        <Toggle
          className='px-2'
          size='sm'
          pressed={editor.isActive({ textAlign: 'center' })}
          onPressedChange={() => { editor.chain().focus().setTextAlign('center').run(); }}
        >
          <AlignCenter className='size-4' />
        </Toggle>
        <Toggle
          className='px-2'
          size='sm'
          pressed={editor.isActive({ textAlign: 'right' })}
          onPressedChange={() => { editor.chain().focus().setTextAlign('right').run(); }}
        >
          <AlignRight className='size-4' />
        </Toggle>
        <Toggle
          className='px-2'
          size='sm'
          pressed={editor.isActive('heading', { level: 1 })}
          onPressedChange={() => { editor.chain().focus().toggleHeading({ level: 1 }).run(); }}
        >
          <Heading1 className='size-4' />
        </Toggle>
        <Toggle
          className='px-2'
          size='sm'
          pressed={editor.isActive('bulletList')}
          onPressedChange={() => { editor.chain().focus().toggleBulletList().run(); }}
        >
          <ListOrdered className='size-4' />
        </Toggle>
        <Toggle
          className='px-2'
          size='sm'
          pressed={editor.isActive('orderedList')}
          onPressedChange={() => { editor.chain().focus().toggleOrderedList().run(); }}
        >
          <List className='size-4' />
        </Toggle>
        <Toggle
          className='px-2'
          size='sm'
          pressed={editor.isActive('link')}
          onPressedChange={setLink}
        >
          <Link2 className='size-4' />
        </Toggle>
        <Toggle
          className='px-2'
          size='sm'
          data-state='off'
          pressed={!editor.isActive('link')}
          onPressedChange={() => { editor.chain().focus().unsetLink().run(); }}
        >
          <Unlink2 className='size-4' />
        </Toggle>
        <Toggle
          className='px-2'
          size='sm'
          pressed={editor.isActive('image')}
          onPressedChange={() => { handleDialog(); }}
        >
          <ImageIcon className='size-4' />
        </Toggle>
        <Toggle
          className='px-2'
          size='sm'
          pressed={editor.isActive('undo')}
          onPressedChange={() => { editor.chain().focus().undo().run(); }}
        >
          <Undo className='size-4' />
        </Toggle>
        <Toggle
          className='px-2'
          size='sm'
          pressed={editor.isActive('redo')}
          onPressedChange={() => { editor.chain().focus().redo().run(); }}
        >
          <Redo className='size-4' />
        </Toggle>
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
      {!editor.isEmpty && characterCount > 0 && (
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
