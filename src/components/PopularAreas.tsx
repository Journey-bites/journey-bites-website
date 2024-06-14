import Link from 'next/link';
import Image from 'next/image';

import CurveImg from '@/images/long-curve.svg';

export default function PopularAttractions() {
  const data = ['日本', '京都', '夏威夷', '泰國', '長灘島', '拉斯維加斯', '北海道', '台南', '布拉格', '比利時'];

  return (
    <div className='mb-9 rounded-lg border-2 p-5 shadow-outlineCard md:p-9'>
      <div className='mb-7'>
        <h3 className='mb-2 text-2xl font-medium md:mb-3 md:text-3xl'>熱門景點</h3>
        <Image src={CurveImg} alt='popular attractions' />
      </div>
      <div className='flex flex-wrap gap-x-2 gap-y-3'>
      {data.map((item) => (
        <Link key={item} href='' className='rounded-[100px] border-2 border-primary-200 px-4 py-1 font-bold text-primary-200'>{item}</Link>
      ))}
      </div>
    </div>
  );
}
