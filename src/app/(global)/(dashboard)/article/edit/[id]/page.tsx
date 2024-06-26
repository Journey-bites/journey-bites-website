'use client';

import EditorWrapper from '@/components/editor/EditorWrapper';
import { useMutation } from '@tanstack/react-query';
import { getArticleById } from '@/lib/nextApi';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { toast } from '@/components/ui/use-toast';
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

  const { mutate: getArticleByIdMutate, isPending: isGetArticleById } = useMutation({
    mutationFn: getArticleById,
    onSuccess: (data: Article) => {
      const { creator } = data;

      setEditContent(data);
      if(auth && auth.id) {
        verifyAuthor(creator?.id, auth.id, router, () => setIsAuthor(true));
        setIsVerifying(false);
      } else {
        console.log('auth is null or undefined');
        toast({ title: '用戶未登入', variant: 'error' });
        router.replace('/login');
      }
    },
    onError: (err) => {
      console.log(err);
      toast({ title: '找不到文章', variant: 'error' });
      router.replace('/');
    },
  });

  useEffect(() => {
    const fetchArticle = async () => {
      if (!id) {
        router.replace('/');
        return;
      }

      if(auth) {
        getArticleByIdMutate(id);
      }
    };

    fetchArticle();
  }, [auth, getArticleByIdMutate, id, router]);

  return (
    <main className='min-h-screen w-full pb-10'>
    <div className='mt-10 text-center text-3xl text-primary-300'>
      編輯文章
    </div>
    {isGetArticleById || isVerifying ? (
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
