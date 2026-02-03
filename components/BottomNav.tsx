'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { Home, TrendingUp, TrendingDown, User, PlusCircle } from 'lucide-react'
import { cn } from '@/lib/utils'

export function BottomNav() {
    const pathname = usePathname()

    const navItems = [
        { name: 'Home', href: '/', icon: Home },
        { name: 'Receitas', href: '/receitas', icon: TrendingUp },
        { name: 'Despesas', href: '/despesas', icon: TrendingDown },
        { name: 'Perfil', href: '/perfil', icon: User },
    ]

    return (
        <div className="fixed bottom-0 left-0 right-0 border-t border-[#1f1f1f] bg-[#030303] p-2 pb-safe shadow-lg md:hidden z-50">
            <nav className="flex justify-around items-center">
                {navItems.map((item) => {
                    const isActive = pathname === item.href
                    return (
                        <Link
                            key={item.href}
                            href={item.href}
                            className={cn(
                                "flex flex-col items-center justify-center w-full py-1 text-xs font-medium transition-colors",
                                isActive ? "text-primary" : "text-muted-foreground hover:text-primary/80"
                            )}
                        >
                            <item.icon className={cn("h-6 w-6 mb-1", isActive && "stroke-[2.5px]")} />
                            {item.name}
                        </Link>
                    )
                })}
            </nav>
        </div>
    )
}
