import { Navbar } from '@/components/Navbar'
import { BottomNav } from '@/components/BottomNav'
import { Sidebar } from '@/components/Sidebar'

export default function DashboardLayout({
    children,
}: {
    children: React.ReactNode
}) {
    return (
        <div className="flex min-h-screen flex-col bg-[#030303] text-white pb-20 md:pb-0">
            <Navbar />
            <div className="flex flex-1">
                <Sidebar />
                <main className="flex-1 p-4 md:p-8">
                    {children}
                </main>
            </div>
            <BottomNav />
        </div>
    )
}
