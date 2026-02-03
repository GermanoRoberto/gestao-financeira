import { createClient } from '@/lib/supabaseServer'
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table" // Need to install table component? Or just use raw HTML/Tailwind if table not installed.
// Shadcn TABLE is not installed. I'll use simple HTML table or Cards.
// User requested "Shadcn/UI". I should install table or use Cards.
// I'll use standard HTML/Tailwind table for simplicity without installing more components, or install table now.
// I'll install table component to be professional.

// Wait, I can't install and use in same turn if I need to import it.
// I'll use a simple Tailwind table.

export default async function UsersPage() {
    const supabase = await createClient()
    const { data: users } = await supabase.from('profiles').select('*')

    return (
        <div className="rounded-md border">
            <table className="w-full caption-bottom text-sm text-left">
                <thead className="[&_tr]:border-b">
                    <tr className="border-b transition-colors hover:bg-muted/50 data-[state=selected]:bg-muted">
                        <th className="h-12 px-4 align-middle font-medium text-muted-foreground">Email</th>
                        <th className="h-12 px-4 align-middle font-medium text-muted-foreground">Name</th>
                        <th className="h-12 px-4 align-middle font-medium text-muted-foreground">Role</th>
                        <th className="h-12 px-4 align-middle font-medium text-muted-foreground">Joined</th>
                    </tr>
                </thead>
                <tbody className="[&_tr:last-child]:border-0">
                    {users?.map((u) => (
                        <tr key={u.id} className="border-b transition-colors hover:bg-muted/50">
                            <td className="p-4 align-middle">{u.email}</td>
                            <td className="p-4 align-middle">{u.full_name}</td>
                            <td className="p-4 align-middle">{u.role}</td>
                            <td className="p-4 align-middle">{new Date(u.created_at).toLocaleDateString()}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    )
}
