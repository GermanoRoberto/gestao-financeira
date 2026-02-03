import { createClient } from '@/lib/supabaseServer'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { DashboardCharts } from '@/components/DashboardCharts'
import { formatCurrency } from '@/lib/utils'
import { ArrowUpIcon, ArrowDownIcon, DollarSign } from 'lucide-react'

export default async function DashboardPage() {
    const supabase = await createClient()

    const { data: { user } } = await supabase.auth.getUser()

    // Example data fetching logic (Mocked for now or structure ready for SQL)
    // In real app: fetch from recetas and despesas tables and aggregate

    // Mock Logic for MVP structure:
    // Fetch sums

    // Real usage with Supabase:
    /*
    const { data: receitas } = await supabase.from('receitas').select('amount')
    const { data: despesas } = await supabase.from('despesas').select('amount')
    */

    const totalReceitas = 0 // Sum
    const totalDespesas = 0 // Sum
    const saldo = totalReceitas - totalDespesas

    // Chart data mock
    const chartData = [
        { name: "Jan", total: Math.floor(Math.random() * 5000) + 1000 },
        { name: "Feb", total: Math.floor(Math.random() * 5000) + 1000 },
        { name: "Mar", total: Math.floor(Math.random() * 5000) + 1000 },
        { name: "Apr", total: Math.floor(Math.random() * 5000) + 1000 },
        { name: "May", total: Math.floor(Math.random() * 5000) + 1000 },
        { name: "Jun", total: Math.floor(Math.random() * 5000) + 1000 },
    ]

    return (
        <div className="flex-1 space-y-4">
            <div className="flex items-center justify-between space-y-2">
                <h2 className="text-3xl font-bold tracking-tight">Dashboard</h2>
            </div>
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
                <Card>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium">
                            Saldo Total
                        </CardTitle>
                        <DollarSign className="h-4 w-4 text-muted-foreground" />
                    </CardHeader>
                    <CardContent>
                        <div className={`text-2xl font-bold ${saldo >= 0 ? 'text-green-400' : 'text-red-400'}`}>
                            {formatCurrency(saldo)}
                        </div>
                        <p className="text-xs text-gray-400">
                            +20.1% from last month
                        </p>
                    </CardContent>
                </Card>
                <Card>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium">
                            Receitas
                        </CardTitle>
                        <ArrowUpIcon className="h-4 w-4 text-green-400" />
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold text-green-400">{formatCurrency(totalReceitas)}</div>
                        <p className="text-xs text-gray-400">
                            +180.1% from last month
                        </p>
                    </CardContent>
                </Card>
                <Card>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium">
                            Despesas
                        </CardTitle>
                        <ArrowDownIcon className="h-4 w-4 text-red-400" />
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold text-red-400">{formatCurrency(totalDespesas)}</div>
                        <p className="text-xs text-gray-400">
                            +19% from last month
                        </p>
                    </CardContent>
                </Card>
            </div>
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7">
                <DashboardCharts data={chartData} />
            </div>
        </div>
    )
}
