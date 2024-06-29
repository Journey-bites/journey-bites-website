'use client';

import { NewspaperIcon } from 'lucide-react';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import TitleWithIcon from '@/components/dashboard/TitleWithIcon';
// import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
// import { OrderBy } from '@/types';
// import SearchInput from '@/components/custom/SearchInput';
import { deleteArticle, getUserArticles } from '@/lib/authApi';
import LargeArticleCard from '@/components/article/LargeArticleCard';
import { QUERY_KEY } from '@/constants';
import ConfirmDialog from '@/components/custom/ConfirmDialog';
import { toast } from '@/components/ui/use-toast';
import { useState } from 'react';

export default function ContentPage() {
  const [deletedArticleId, setDeletedArticleId] = useState('');
  const [openDeleteDialog, setOpenDeleteDialog] = useState(false);

  const { data: articles } = useQuery({
    queryKey: [QUERY_KEY.article],
    queryFn: getUserArticles,
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
        {/* <div className='flex gap-4'>
          <Select>
            <SelectTrigger className='w-[180px]'>
              <SelectValue placeholder='文章排序' defaultValue={OrderBy.DESC} />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value={OrderBy.DESC}>由新到舊</SelectItem>
              <SelectItem value={OrderBy.ASC}>由舊到新</SelectItem>
            </SelectContent>
          </Select>
          <SearchInput value='' onChange={() => {}} onKeyDown={() => {}} />
        </div> */}
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