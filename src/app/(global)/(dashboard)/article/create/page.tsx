import EditorWrapper from '@/components/editor/EditorWrapper';

export default function CreateArticle() {
  return (
    <main className='min-h-screen w-full pb-10'>
      <div className='mt-10 text-center text-3xl text-primary-300'>
        新增文章
      </div>
      <EditorWrapper isEditing={false} />
    </main>
  );
}
