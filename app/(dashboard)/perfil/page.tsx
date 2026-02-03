import { redirect } from 'next/navigation'
import { createClient } from '@/lib/supabaseServer'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'

export default async function PerfilPage() {
    const supabase = await createClient()
    const { data: { user } } = await supabase.auth.getUser()

    if (!user) redirect('/login')

    const { data: profile } = await supabase.from('profiles').select('*').eq('id', user.id).single()

    // Sign out action
    async function signOut() {
        'use server'
        const supabase = await createClient()
        await supabase.auth.signOut()
        redirect('/login')
    }

    return (
        <div className="space-y-4 max-w-md mx-auto">
            <h2 className="text-2xl font-bold">Perfil</h2>

            <Card>
                <CardHeader className="flex flex-row items-center gap-4">
                    <Avatar className="h-14 w-14">
                        <AvatarImage src="" />
                        <AvatarFallback>{profile?.full_name?.charAt(0) || user.email?.charAt(0).toUpperCase()}</AvatarFallback>
                    </Avatar>
                    <div>
                        <CardTitle>{profile?.full_name}</CardTitle>
                        <p className="text-sm text-muted-foreground">{user.email}</p>
                        <span className="text-xs bg-primary/10 text-primary px-2 py-0.5 rounded-full capitalize">{profile?.role}</span>
                    </div>
                </CardHeader>
                <CardContent className="space-y-4">
                    {/* Account Details or Settings here */}
                    <form action={signOut}>
                        <Button variant="destructive" className="w-full">Sair (Logout)</Button>
                    </form>
                </CardContent>
            </Card>
        </div>
    )
}
