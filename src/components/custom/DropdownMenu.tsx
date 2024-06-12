import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { cn } from '@/lib/utils';

export function DropdownMenuComponent({ triggerButton, children }: { triggerButton: React.ReactNode, children: React.ReactNode }) {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild className='focus-visible:outline-none'>
        {triggerButton}
      </DropdownMenuTrigger>
      <DropdownMenuContent className='min-w-[196px] p-4' align='start'>
        {children}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}

export function DropdownMenuLinkItem({ children, className, onClick }: { children: React.ReactNode, className?: string, onClick?: () => void }) {
  return (
    <DropdownMenuItem asChild className={cn('w-full cursor-pointer px-2 py-1 focus:bg-primary-100 leading-7', className)} onClick={onClick}>
      {children}
    </DropdownMenuItem>
  );
}
