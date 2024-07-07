import type { PropsWithChildren } from 'react';
import type { LucideProps } from 'lucide-react';

type NoResultsProps = {
  title: string
  icon: React.ForwardRefExoticComponent<Omit<LucideProps, 'ref'> & React.RefAttributes<SVGSVGElement>>,
} & PropsWithChildren;

export default function NoResults({ title, icon: Icon, children }: NoResultsProps) {
  return (
    <div className='flex min-h-[300px] flex-col items-center justify-center gap-3'>
      <Icon size={48} className='stroke-grey-300' />
      <p className='mb-2 text-2xl text-grey-300'>{title}</p>
      {children}
    </div>
  );
}