'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { LayoutDashboard, ShoppingBag, Box, BarChart3, Settings, Coffee } from 'lucide-react';

export function Sidebar() {
    const pathname = usePathname();

    const isActive = (path: string) => {
        return pathname === path || pathname.startsWith(`${path}/`);
    };

    return (
        <aside className="fixed left-0 top-0 z-40 h-screen w-64 border-r bg-white dark:bg-zinc-950">
            <div className="flex h-16 items-center border-b px-6 gap-2">
                <div className="h-8 w-8 bg-black rounded-lg flex items-center justify-center">
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
                        <LayoutDashboard className="mr-2 h-4 w-4" />
                        Dashboard
                    </Button>
                </Link>
                <Link href="/orders">
                    <Button
                        variant={isActive('/orders') ? 'secondary' : 'ghost'}
                        className="w-full justify-start"
                    >
                        <ShoppingBag className="mr-2 h-4 w-4" />
                        Orders
                    </Button>
                </Link>
                <Link href="/products">
                    <Button
                        variant={isActive('/products') ? 'secondary' : 'ghost'}
                        className="w-full justify-start"
                    >
                        <Box className="mr-2 h-4 w-4" />
                        My Products
                    </Button>
                </Link>
                <Link href="/catalog">
                    <Button
                        variant={isActive('/catalog') ? 'secondary' : 'ghost'}
                        className="w-full justify-start"
                    >
                        <Box className="mr-2 h-4 w-4" />
                        Global Catalog
                    </Button>
                </Link>
                <Link href="/analytics">
                    <Button
                        variant={isActive('/analytics') ? 'secondary' : 'ghost'}
                        className="w-full justify-start"
                    >
                        <BarChart3 className="mr-2 h-4 w-4" />
                        Analytics
                    </Button>
                </Link>
                <Link href="/settings">
                    <Button
                        variant={isActive('/settings') ? 'secondary' : 'ghost'}
                        className="w-full justify-start"
                    >
                        <Settings className="mr-2 h-4 w-4" />
                        Settings
                    </Button>
                </Link>
            </nav>
        </aside>
    );
}
