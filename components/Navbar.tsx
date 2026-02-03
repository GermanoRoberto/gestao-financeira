import Link from 'next/link'
import { Wallet } from 'lucide-react'

export function Navbar() {
    return (
        <header className="sticky top-0 z-50 w-full border-b border-[#1f1f1f] bg-[#030303]">
            <div className="container flex h-14 items-center">
                <Link href="/" className="flex items-center gap-2 font-bold text-lg px-4 md:px-0">
                    <Wallet className="h-6 w-6 text-primary" />
                    <span>IAFinance</span>
                </Link>
                <div className="ml-auto flex items-center gap-2 px-4">
                    {/* Add User Menu or Theme Toggle here */}
                </div>
            </div>
        </header>
    )
}
