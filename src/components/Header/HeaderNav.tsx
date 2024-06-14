'use client';

import * as React from 'react';

import { cn } from '@/lib/utils';
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
} from '@/components/ui/navigation-menu';
import { Separator } from '@/components/ui/separator';
import { Category } from '@/types';

const components: Category[] = [
  {
    id: '0',
    name: '熱門文章',
    path: '/articles/hot',
  },
  {
    id: '1',
    name: '最新文章',
    path: '/articles/new',
  },
];

// TODO: after API is ready, set categories is required
export default function HeaderNav({ categories }: { categories?: Category[] }) {
  return (
    <NavigationMenu>
      <NavigationMenuList>
        <NavigationMenuItem>
          <NavigationMenuTrigger className='p-0 [&>svg]:hidden'>
            探索
          </NavigationMenuTrigger>
          <NavigationMenuContent>
            <ul className='w-[180px] p-4 shadow-base'>
              {components.map((component) => (
                <ListItem
                  key={component.id}
                  title={component.name}
                  href={component.path}
                  className='font-bold'
                ></ListItem>
              ))}
            </ul>
            <Separator />
            <ul className='w-[180px] p-4 shadow-base'>
              <li className='mb-1 px-2 py-1 text-sm text-grey-300'>所有分類</li>
              {categories?.map((category) => (
                <ListItem
                  key={category.id}
                  title={category.name}
                  href={category.path}
                ></ListItem>
              ))}
            </ul>
          </NavigationMenuContent>
        </NavigationMenuItem>
      </NavigationMenuList>
    </NavigationMenu>
  );
}

const ListItem = React.forwardRef<
  React.ElementRef<'a'>,
  React.ComponentPropsWithoutRef<'a'>
>(({ className, title, children, ...props }, ref) => {
  return (
    <li className='[&:not(:last-child)]:mb-1'>
      <NavigationMenuLink asChild>
        <a
          ref={ref}
          className={cn(
            'block select-none rounded-lg px-2 py-1 leading-none no-underline outline-none transition-colors hover:bg-primary-100 focus:bg-primary-100',
            className,
          )}
          {...props}
        >
          <div className='text-sm leading-7'>{title}</div>
          <p className='line-clamp-2 text-sm leading-7 text-muted-foreground'>
            {children}
          </p>
        </a>
      </NavigationMenuLink>
    </li>
  );
});
ListItem.displayName = 'ListItem';
