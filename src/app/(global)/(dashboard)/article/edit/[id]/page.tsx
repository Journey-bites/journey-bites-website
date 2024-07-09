'use client';

import EditorWrapper from '@/components/editor/EditorWrapper';
import { useQuery } from '@tanstack/react-query';
import { getArticleById } from '@/lib/nextApi';
import { notFound, useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { useUserStore } from '@/providers/userProvider';
import { Lock, PenLine } from 'lucide-react';
import LoadingEditorSkeleton from '@/components/LoadingEditorSkeleton';
import jsCookie from 'js-cookie';
import { JOURNEY_BITES_COOKIE, QUERY_KEY } from '@/constants';

type Props = {
  params: { id: string }
}

const EditArticle: React.FC<Props> = ({ params }) => {
  const [isAuthor, setIsAuthor] = useState(false);
  const router = useRouter();
  const { id } = params;
  const { auth } = useUserStore((state) => state);

  const token = jsCookie.get(JOURNEY_BITES_COOKIE);
  const { isLoading, data: editingContent, isError } = useQuery({
    queryKey: [QUERY_KEY.article, id],
    queryFn: () => getArticleById(id, token),
  });

  useEffect(() => {
    if (editingContent) {
      const { creator } = editingContent;

      if (auth && auth.id) {
        if(creator.id === auth.id) {
          setIsAuthor(true);
        } else {
          setIsAuthor(false);
        }
      }
    }
  }, [editingContent, auth, router]);

  if (isLoading) {
    return (
      <main className='min-h-screen w-full pb-10'>
        <LoadingEditorSkeleton />
      </main>
    );
  }

  if (isError) {
    return notFound();
  }

  if (!isAuthor) {
    return (
      <main className='min-h-screen w-full pb-10'>
        <div className='mt-10 flex justify-center text-center text-red-500'>
          <Lock /><p className='ml-2'>您沒有編輯此文章的權限</p>
        </div>
      </main>
    );
  }

  return (
    <main className='min-h-screen w-full pb-10'>
      <div className='mt-10 flex items-center justify-center gap-2 text-center text-2xl font-semibold text-grey-300'>
        <PenLine />編輯文章
      </div>
      <EditorWrapper isEditing={true} editContent={editingContent} />
    </main>
  );
};

export default EditArticle;
