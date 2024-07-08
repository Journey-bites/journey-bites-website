'use client';

import Link from 'next/link';
import { useState } from 'react';
import { NewspaperIcon, TentTreeIcon } from 'lucide-react';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import TitleWithIcon from '@/components/dashboard/TitleWithIcon';
import { deleteArticle, getUserArticles } from '@/lib/authApi';
import LargeArticleCard from '@/components/article/LargeArticleCard';
import { QUERY_KEY } from '@/constants';
import ConfirmDialog from '@/components/custom/ConfirmDialog';
import { toast } from '@/components/ui/use-toast';
import OrderBySelect from '@/components/article/OrderBySelect';
import Loader from '@/components/custom/Loader';
import NoResults from '@/components/dashboard/NoResults';
import { Button } from '@/components/ui/button';
import { sortDataByCreatedAt } from '@/lib/utils';
import { OrderBy } from '@/types/enum';

export default function ContentPage() {
  const [deletedArticleId, setDeletedArticleId] = useState('');
  const [openDeleteDialog, setOpenDeleteDialog] = useState(false);
  const [orderBy, setOrderBy] = useState(OrderBy.DESC);

  const { data: articles, isPending, error, isFetched } = useQuery({
    queryKey: [QUERY_KEY.article],
    queryFn: () => getUserArticles(),
    select: (data) => sortDataByCreatedAt(data, orderBy),
  });

  const queryClient = useQueryClient();
  const { mutate: deleteArticleMutate } = useMutation({
    mutationFn: deleteArticle,
    onSuccess: () => {
      toast({ title: '刪除成功', variant: 'success' });
      queryClient.invalidateQueries({ queryKey: [QUERY_KEY.article] });
    },
    onError: () => {
      toast({ title: '刪除失敗', description: '請聯繫客服，或稍後再試', variant: 'error' });
    }
  });

  if (isPending) return <Loader />;
  if (error) return <div>{error.message}</div>;

  function deleteArticleConfirm(articleId: string) {
    setOpenDeleteDialog(true);
    setDeletedArticleId(articleId);
  }

  return (
    <section>
      <TitleWithIcon title='內容作品管理' icon={NewspaperIcon} />
      {isFetched && !articles?.length ? (
        <NoResults title='目前沒有創作，點擊下方按鈕開始創作吧！' icon={TentTreeIcon}>
          <Button asChild>
            <Link href='/article/create'>開始創作</Link>
          </Button>
        </NoResults>
      ) : (
        <>
          <div className='flex gap-4'>
            <OrderBySelect orderBy={orderBy} setOrderBy={setOrderBy} />
          </div>
          <p className='my-5 text-grey-300'>共 {articles?.length} 篇文章</p>
          <div className='flex flex-col gap-6'>
            {articles?.map((article) => (
              <LargeArticleCard key={article.id} article={article} isUsersArticle deleteArticleConfirm={deleteArticleConfirm} />
            ))}
          </div>
          <ConfirmDialog
            isOpen={openDeleteDialog}
            onClose={() => setOpenDeleteDialog(false)}
            description='確定要刪除嗎？'
            onConfirm={() => deleteArticleMutate({ articleId: deletedArticleId })}
          />
        </>
      )}
    </section>
  );
}
