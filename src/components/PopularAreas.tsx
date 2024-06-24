// import Link from 'next/link';
import Image from 'next/image';

import CurveImg from '@/images/long-curve.svg';

export default function PopularAttractions() {
  const data = ['日本', '京都', '夏威夷', '泰國', '長灘島', '拉斯維加斯', '北海道', '台南', '布拉格', '比利時'];

  return (
    <div className='rounded-lg border-2 p-9 shadow-outlineCard'>
      <div className='mb-7'>
        <h3 className='mb-3 text-3xl'>熱門景點</h3>
        <Image src={CurveImg} alt='popular attractions' />
      </div>
      <div className='flex flex-wrap gap-x-2 gap-y-3'>
      {data.map((item) => (
        // Replace with Link after search page is ready
        <div key={item} className='rounded-[100px] border-2 border-primary-200 px-4 py-1 font-bold text-primary-200'>{item}</div>
      ))}
      </div>
    </div>
  );
}
