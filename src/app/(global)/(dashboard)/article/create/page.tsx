import EditorWrapper from '@/components/editor/EditorWrapper';
import { PencilLine } from 'lucide-react';

export default function CreateArticle() {
  return (
    <main className='min-h-screen w-full pb-10'>
      <div className='mt-10 flex items-center justify-center gap-2 text-center text-2xl font-semibold text-grey-300'>
        <PencilLine /> 新增文章
      </div>
      <EditorWrapper isEditing={false} />
    </main>
  );
}
