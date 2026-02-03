import { createClient } from '@/lib/supabaseServer'
import { TransactionManager } from '@/components/TransactionManager'

export default async function DespesasPage() {
    const supabase = await createClient()

    const { data: despesas } = await supabase
        .from('despesas')
        .select('*')
        .order('date', { ascending: false })

    return (
        <TransactionManager
            initialTransactions={despesas || []}
            type="despesas"
        />
    )
}
