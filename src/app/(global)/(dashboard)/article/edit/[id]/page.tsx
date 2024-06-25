'use client';

import EditorWrapper from '@/components/editor/EditorWrapper';
import { useMutation } from '@tanstack/react-query';
import { getArticleById } from '@/lib/authApi';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { toast } from '@/components/ui/use-toast';
import { useUserStore } from '@/providers/userProvider';
import { verifyAuthor } from '@/lib/utils';
import { Lock } from 'lucide-react';

type Props = {
  params: { id: string }
  searchParams: { [key: string]: string | string[] | undefined }
}

const EditArticle: React.FC<Props> = ({ params }) => {
  const [editContent, setEditContent] = useState();
  const [isAuthor, setIsAuthor] = useState(false);
  const [isVerifying, setIsVerifying] = useState(true);
  const router = useRouter();
  const { id } = params;
  const { auth } = useUserStore();

  console.log(params.id);

  const { mutate: getArticleByIdMutate, isPending: isGetArticleById } = useMutation({
    mutationFn: getArticleById,
    onSuccess: (data) => {
      setEditContent(data);
      if(auth && auth.id) {
        verifyAuthor(data?.data?.creator?.id, auth.id, router, () => setIsAuthor(true));
        setIsVerifying(false);
        // verifyAuthor(data?.data?.creator?.id, auth.id);
      } else {
        console.log('auth is null or undefined');
        toast({ title: '用戶未登入', variant: 'error' });
        // router.replace('/');
      }
    },
    onError: (err) => {
      console.log(err);
      toast({ title: '找不到文章', variant: 'error' });
      // router.replace('/');
    },
  });

  // const verifyAuthor = (creatorId: string, currentUserId: string) => {
  //   if (creatorId === currentUserId) {
  //     setIsAuthor(true);
  //   } else {
  //     toast({ title: '未取得編輯權限', variant: 'error' });
  //     // router.replace('/');
  //   }
  // };

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
        <div className='mt-10 text-center'>
          <main className='mx-auto size-full min-h-[500px] w-full max-w-screen-lg animate-pulse pb-10'>
            Loadding...
            <div className='mx-auto mt-10 min-h-[500px] rounded bg-gray-200 text-center'></div>
          </main>
        </div>
      ) : isAuthor ? (
        <EditorWrapper isEditing={true} editContent={editContent} />
      ) : (
        <div className='mt-10 flex justify-center text-center text-red-500'><Lock /><p className='ml-2'>您沒有編輯此文章的權限</p></div>
      )}
    </main>
  );
};

export default EditArticle;
