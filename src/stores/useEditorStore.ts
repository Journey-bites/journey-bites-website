import { create } from 'zustand';
import type { CreateArticleRequest } from '@/types/article';
// interface EditorContent {
//   content: string;
//   wordsCount: number,
// }

interface EditorProps {
  editorProps: CreateArticleRequest | null;
  setEditorProps: (editorProps: CreateArticleRequest) => void;
}

export const useEditor = create<EditorProps>((set) => ({
  editorProps: null,
  setEditorProps: (editorProps) => set({ editorProps }),
}));
