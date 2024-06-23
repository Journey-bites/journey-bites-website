import type { LucideProps } from 'lucide-react';

type NoResultsProps = {
  title: string
  icon: React.ForwardRefExoticComponent<Omit<LucideProps, 'ref'> & React.RefAttributes<SVGSVGElement>>
}
export default function NoResults({ title, icon: Icon }: NoResultsProps) {
  return (
    <div className='flex min-h-[300px] flex-col items-center justify-center gap-3'>
      <Icon size={48} className='stroke-grey-300' />
      <p className='text-2xl text-grey-300'>{title}</p>
    </div>
  );
}