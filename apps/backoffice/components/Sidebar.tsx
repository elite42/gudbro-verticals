'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useTranslations } from 'next-intl';
import { Button } from '@/components/ui/button';
import { SquaresFour, Bag, Cube, ChartBar, Gear, Coffee, Handshake } from '@phosphor-icons/react';

export function Sidebar() {
  const pathname = usePathname();
  const t = useTranslations('nav');

  const isActive = (path: string) => {
    return pathname === path || pathname.startsWith(`${path}/`);
  };

  return (
    <aside className="fixed left-0 top-0 z-40 h-screen w-64 border-r bg-white dark:bg-zinc-950">
      <div className="flex h-16 items-center gap-2 border-b px-6">
        <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-black">
          <Coffee className="h-5 w-5 text-white" />
        </div>
        <span className="text-lg font-bold text-zinc-900 dark:text-zinc-50">GUDBRO Hub</span>
      </div>
      <nav className="space-y-1 p-4">
        <Link href="/">
          <Button
            variant={pathname === '/' ? 'secondary' : 'ghost'}
            className="w-full justify-start"
          >
            <SquaresFour className="mr-2 h-4 w-4" />
            {t('dashboard')}
          </Button>
        </Link>
        <Link href="/orders">
          <Button
            variant={isActive('/orders') ? 'secondary' : 'ghost'}
            className="w-full justify-start"
          >
            <Bag className="mr-2 h-4 w-4" />
            {t('orders')}
          </Button>
        </Link>
        <Link href="/products">
          <Button
            variant={isActive('/products') ? 'secondary' : 'ghost'}
            className="w-full justify-start"
          >
            <Cube className="mr-2 h-4 w-4" />
            {t('products')}
          </Button>
        </Link>
        <Link href="/catalog">
          <Button
            variant={isActive('/catalog') ? 'secondary' : 'ghost'}
            className="w-full justify-start"
          >
            <Cube className="mr-2 h-4 w-4" />
            {t('catalog')}
          </Button>
        </Link>
        <Link href="/analytics">
          <Button
            variant={isActive('/analytics') ? 'secondary' : 'ghost'}
            className="w-full justify-start"
          >
            <ChartBar className="mr-2 h-4 w-4" />
            {t('analytics')}
          </Button>
        </Link>
        <Link href="/partnerships">
          <Button
            variant={isActive('/partnerships') ? 'secondary' : 'ghost'}
            className="w-full justify-start"
          >
            <Handshake className="mr-2 h-4 w-4" />
            {t('partnerships')}
          </Button>
        </Link>
        <Link href="/settings">
          <Button
            variant={isActive('/settings') ? 'secondary' : 'ghost'}
            className="w-full justify-start"
          >
            <Gear className="mr-2 h-4 w-4" />
            {t('settings')}
          </Button>
        </Link>
      </nav>
    </aside>
  );
}
