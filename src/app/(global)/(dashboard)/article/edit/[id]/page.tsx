'use client';

import EditorWrapper from '@/components/editor/EditorWrapper';
import { useQuery } from '@tanstack/react-query';
import { getArticleById } from '@/lib/nextApi';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { useUserStore } from '@/providers/userProvider';
import { verifyAuthor } from '@/lib/utils';
import { Lock } from 'lucide-react';
import LoadingEditorSkeleton from '@/components/LoadingEditorSkeleton';
import { type Article } from '@/types/article';

type Props = {
  params: { id: string }
  searchParams: { [key: string]: string | string[] | undefined }
}

const EditArticle: React.FC<Props> = ({ params }) => {
  const [editContent, setEditContent] = useState<Article | undefined>(undefined);
  const [isAuthor, setIsAuthor] = useState(false);
  const [isVerifying, setIsVerifying] = useState(true);
  const router = useRouter();
  const { id } = params;
  const { auth } = useUserStore((state) => state);

  const { isPending, isError, data, error } = useQuery({
    queryKey: ['getArticleById', id],
    queryFn: () => getArticleById(id),
  });

  useEffect(() => {
    if (data) {
      const { creator } = data;
      setEditContent(data);

      if (auth && auth.id) {
        verifyAuthor(creator?.id, auth.id, router, () => setIsAuthor(true));
        setIsVerifying(false);
      }

      if (isError) {
        console.log(error);
      }
    }
  }, [data, auth, router, isError, error]);

  return (
    <main className='min-h-screen w-full pb-10'>
    <div className='mt-10 text-center text-3xl text-primary-300'>
      編輯文章
    </div>
    {isPending || isVerifying ? (
      <LoadingEditorSkeleton />
      ) : isAuthor ? (
        <>
        <EditorWrapper isEditing={true} editContent={editContent} />
        </>
      ) : (
        <div className='mt-10 flex justify-center text-center text-red-500'><Lock /><p className='ml-2'>您沒有編輯此文章的權限</p></div>
      )}
    </main>
  );
};

export default EditArticle;
