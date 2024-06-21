import { create } from 'zustand';
import type { CreateArticleRequest } from '@/types/article';

interface EditorProps {
  editorProps: CreateArticleRequest | null;
  setEditorProps: (editorProps: CreateArticleRequest) => void;
}

// export const useEditor = create<EditorProps>((set) => ({
//   editorProps: null,
//   setEditorProps: (editorProps) => set({ editorProps }),
// }));

export const useEditor = create<EditorProps>((set) => ({
  editorProps: null,
  setEditorProps: (updatedProps) => set((state) => ({
    editorProps: {
      ...state.editorProps,
      ...updatedProps
    }
  })),
}));
