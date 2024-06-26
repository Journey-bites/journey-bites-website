'use client';

import EditorWrapper from '@/components/editor/EditorWrapper';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';

type Props = {
  params: { id: string }
  searchParams: { [key: string]: string | string[] | undefined }
}

const EditArticle: React.FC<Props> = ({ params }) => {
  const [editContent, setEditContent] = useState();
  const router = useRouter();
  const { id } = params;
  console.log(params.id);
  useEffect(() => {
    if(!id) {
      router.replace('/');
      return;
    }
    try {
      fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/article/${id}`)
      .then(response => response.json())
      .then(json => {
        setEditContent(json);
      });
    } catch(err) {
      console.log(err);
    }
  }, [id, router]);

  return (
    <main className='min-h-screen w-full pb-10'>
      <div className='mt-10 text-center text-3xl text-primary-300'>
        編輯文章
      </div>
      <EditorWrapper isEditing={true} editContent={editContent} />
    </main>
  );
};

export default EditArticle;
