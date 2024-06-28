import type { LucideProps } from 'lucide-react';

type TitleWIthIconProps = {
  title: string,
  icon: React.ForwardRefExoticComponent<Omit<LucideProps, 'ref'> & React.RefAttributes<SVGSVGElement>>
}

export default function TitleWIthIcon({ title, icon:Icon }: TitleWIthIconProps) {
  return (
    <h3 className='mb-10 flex items-center gap-2 text-xl text-grey-500 md:mb-6'>
      <Icon className='inline-block stroke-grey-500' size={32}/>
      {title}
    </h3>
  );
}
