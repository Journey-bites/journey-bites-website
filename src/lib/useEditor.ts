import { create } from 'zustand';

interface EditorContent {
  content: string;
  wordsCount: number,
}

interface EditorProps {
  editorProps: EditorContent | null;
  setEditorProps: (editorProps: EditorContent) => void;
}

export const useEditor = create<EditorProps>((set) => ({
  editorProps: null,
  setEditorProps: (editorProps) => set({ editorProps }),
}));
