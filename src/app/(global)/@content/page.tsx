// import ArticleCard from '@/components/ArticleCard';
// import { Suspense } from 'react';
// import Loading from '@/components/loading';

// export default async function RecommendArea() {

//   return (
//     <Suspense fallback={<Loading />}>
//       <ArticleCard title='推薦文章' color='primary-100' />
//     </Suspense>
//   );
// }
import ArticleWrapper from '@/components/ArticleWrapper';
import getPosts from '@/lib/actions';
import ArticleCard from '@/components/ArticleCard';

export default async function Content() {
  const posts = await getPosts({ pageParam: 1 });

  return (
    <>
      <ArticleCard color='secondary' type='hot' />
      <ArticleWrapper posts={posts} />
    </>
  );
}
