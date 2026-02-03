import { redirect } from 'next/navigation'
import { createClient } from '@/lib/supabaseServer'
import { Navbar } from '@/components/Navbar'

export default async function AdminLayout({
    children,
}: {
    children: React.ReactNode
}) {
    const supabase = await createClient()
    const { data: { user } } = await supabase.auth.getUser()

    if (!user) {
        redirect('/login')
    }

    // Check role
    const { data: profile } = await supabase
        .from('profiles')
        .select('role')
        .eq('id', user.id)
        .single()

    if (profile?.role !== 'admin') {
        redirect('/')
    }

    return (
        <div className="flex min-h-screen flex-col">
            <Navbar />
            <main className="flex-1 p-8">
                <h1 className="text-3xl font-bold mb-6 text-red-600">Admin Panel</h1>
                {children}
            </main>
        </div>
    )
}
