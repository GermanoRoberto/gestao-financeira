import { createClient } from '@/lib/supabaseServer'
import { TransactionManager } from '@/components/TransactionManager'

export default async function ReceitasPage() {
    const supabase = await createClient()

    const { data: receitas } = await supabase
        .from('receitas')
        .select('*')
        .order('date', { ascending: false })

    return (
        <TransactionManager
            initialTransactions={receitas || []}
            type="receitas"
        />
    )
}
