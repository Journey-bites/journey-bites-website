/* eslint-disable tailwindcss/no-custom-classname */
import * as React from 'react';
import { Slot } from '@radix-ui/react-slot';
import { cva, type VariantProps } from 'class-variance-authority';
import { Loader2 } from 'lucide-react';

import { cn } from '@/lib/utils';

const buttonVariants = cva(
  'line-height-[28px] inline-flex items-center justify-center whitespace-nowrap rounded-md text-base font-medium ring-offset-background transition-colors focus-visible:outline-none disabled:pointer-events-none disabled:opacity-50',
  {
    variants: {
      size: {
        default: 'px-5 py-3',
        sm: 'rounded-md px-4 py-2',
        lg: 'rounded-md px-8',
      },
      variant: {
        default:
          'bg-primary text-white hover:border-primary-300 hover:bg-primary-300 active:border-primary-400 active:bg-primary-400',
        destructive: 'bg-destructive text-destructive-foreground hover:bg-destructive/90',
        outline:
          'border-2 border-primary bg-transparent text-primary hover:border-primary-300 hover:bg-primary-300 hover:text-white active:border-primary-400 active:bg-primary-400',
        secondary: 'text-secondary-foreground hover:bg-secondary/80 bg-secondary',
        ghost: 'hover:bg-accent hover:text-accent-foreground',
        fullLink: 'mb-3 block w-full rounded-lg py-4 text-center text-grey-500',
        link: 'text-primary underline-offset-4 hover:underline',
        pillPrimary:
          'rounded-full border-2 border-primary font-bold text-primary hover:border-primary-300 hover:bg-primary-300 hover:text-white  active:border-primary-400 active:bg-primary-400',
        icon: 'color-primary flex size-11 rounded-full border-none bg-primary-100 p-0 hover:bg-primary-300 active:bg-primary-400',
        clean: 'p-0'
      },
    },
    defaultVariants: {
      variant: 'default',
      size: 'default',
    },
  },
);

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean;
  isLoading?: boolean;
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, asChild = false, isLoading, children, ...props }, ref) => {
    const Comp = asChild ? Slot : 'button';
    return (
      <Comp
        className={cn(buttonVariants({ variant, size, className }))}
        ref={ref}
        {...props}
      >
        {isLoading ?
          <Loader2 className='size-6 animate-spin' />
        : children}
      </Comp>
    );
  },
);
Button.displayName = 'Button';

export { Button, buttonVariants };
