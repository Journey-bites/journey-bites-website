'use client';

import EditorWrapper from '@/components/editor/EditorWrapper';
import { useEffect } from 'react';

type Props = {
  params: { id: string }
  searchParams: { [key: string]: string | string[] | undefined }
}

const EditArticle: React.FC<Props> = ({ params, searchParams }) => {
  useEffect(() => {

  });
	console.log(params, searchParams);
  return (
    <main className='min-h-screen w-full pb-10'>
      <EditorWrapper editContent={'123'} />
    </main>
  );
};

export default EditArticle;
