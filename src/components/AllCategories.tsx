import Image from 'next/image';
import Link from 'next/link';
import { Category } from '@/types';
import { Button } from './ui/button';

import CurveImg from '@/images/long-curve.svg';

export default function AllCategories({ categories }: { categories: Category[] }) {

  return (
    <div className='rounded-lg border-2 p-9 shadow-outlineCard'>
      <div className='mb-7'>
        <h3 className='mb-3 text-3xl'>所有分類</h3>
        <Image src={CurveImg} alt='popular attractions' />
      </div>
      <div className='flex flex-wrap gap-x-2 gap-y-3'>
        {categories.map((item) => (
        <Button key={item.id} asChild variant='pillPrimary' size='sm'>
          <Link href={`articles${item.path}`}>{item.name}</Link>
        </Button>
      ))}
      </div>
    </div>
  );
}
