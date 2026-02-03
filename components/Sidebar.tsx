'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { Home, TrendingUp, TrendingDown, User, Settings } from 'lucide-react'
import { cn } from '@/lib/utils'

export function Sidebar() {
    const pathname = usePathname()

    const navItems = [
        { name: 'Dashboard', href: '/', icon: Home },
        { name: 'Receitas', href: '/receitas', icon: TrendingUp },
        { name: 'Despesas', href: '/despesas', icon: TrendingDown },
        { name: 'Perfil', href: '/perfil', icon: User },
    ]

    return (
        <aside className="hidden w-64 flex-col border-r border-[#1f1f1f] bg-[#030303] p-6 md:flex h-[calc(100vh-3.5rem)] sticky top-14">
            <nav className="flex flex-col gap-2">
                {navItems.map((item) => {
                    const isActive = pathname === item.href
                    return (
                        <Link
                            key={item.href}
                            href={item.href}
                            className={cn(
                                "flex items-center gap-2 rounded-lg px-3 py-2 text-sm font-medium transition-colors hover:bg-accent hover:text-accent-foreground",
                                isActive ? "bg-accent text-accent-foreground" : "text-muted-foreground"
                            )}
                        >
                            <item.icon className="h-4 w-4" />
                            {item.name}
                        </Link>
                    )
                })}
            </nav>
        </aside>
    )
}
