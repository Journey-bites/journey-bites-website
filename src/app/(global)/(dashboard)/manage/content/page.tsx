'use client';

import { useState } from 'react';
import { NewspaperIcon } from 'lucide-react';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import TitleWithIcon from '@/components/dashboard/TitleWithIcon';
// import SearchInput from '@/components/custom/SearchInput';
import { deleteArticle, getUserArticles } from '@/lib/authApi';
import LargeArticleCard from '@/components/article/LargeArticleCard';
import { QUERY_KEY } from '@/constants';
import ConfirmDialog from '@/components/custom/ConfirmDialog';
import { toast } from '@/components/ui/use-toast';
import OrderBySelect from '@/components/article/OrderBySelect';
import { sortDataByCreatedAt } from '@/lib/utils';
import { OrderBy } from '@/types/enum';

export default function ContentPage() {
  const [deletedArticleId, setDeletedArticleId] = useState('');
  const [openDeleteDialog, setOpenDeleteDialog] = useState(false);
  const [orderBy, setOrderBy] = useState(OrderBy.DESC);

  const { data: articles } = useQuery({
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

  function deleteArticleConfirm(articleId: string) {
    setOpenDeleteDialog(true);
    setDeletedArticleId(articleId);
  }

  return (
    <section>
      <TitleWithIcon title='內容作品管理' icon={NewspaperIcon} />
      <div>
        <div className='flex gap-4'>
          <OrderBySelect orderBy={orderBy} setOrderBy={setOrderBy} />
          {/* Add it back when search article api is ready */}
          {/* <SearchInput value='' onChange={() => {}} onKeyDown={() => {}} /> */}
        </div>
        <p className='my-5 text-grey-300'>共 {articles?.length} 篇文章</p>
        <div className='flex flex-col gap-4'>
          {articles?.map((article) => (
            <LargeArticleCard key={article.id} article={article} isUsersArticle deleteArticleConfirm={deleteArticleConfirm} />
          ))}
        </div>
      </div>
      <ConfirmDialog
        isOpen={openDeleteDialog}
        onClose={() => setOpenDeleteDialog(false)}
        description='確定要刪除嗎？'
        onConfirm={() => deleteArticleMutate({ articleId: deletedArticleId })}
      />
    </section>
  );
}