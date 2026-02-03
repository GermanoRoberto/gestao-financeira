'use server'

import { revalidatePath } from 'next/cache'
import { createClient } from '@/lib/supabaseServer'

type TransactionType = 'receitas' | 'despesas'

export async function createTransaction(type: TransactionType, formData: FormData) {
    const supabase = await createClient()

    const user = (await supabase.auth.getUser()).data.user
    if (!user) return { error: 'Not authenticated' }

    const data = {
        user_id: user.id,
        description: formData.get('description') as string,
        amount: parseFloat(formData.get('amount') as string),
        category: formData.get('category') as string,
        date: formData.get('date') as string,
    }

    const { error } = await supabase.from(type).insert(data)

    if (error) {
        return { error: error.message }
    }

    revalidatePath(`/${type}`)
    revalidatePath('/')
    return { success: true }
}

export async function deleteTransaction(type: TransactionType, id: string) {
    const supabase = await createClient()

    const { error } = await supabase.from(type).delete().eq('id', id)

    if (error) {
        return { error: error.message }
    }

    revalidatePath(`/${type}`)
    revalidatePath('/')
    return { success: true }
}

// Update action (simplified)
export async function updateTransaction(type: TransactionType, id: string, formData: FormData) {
    const supabase = await createClient()
    const data = {
        description: formData.get('description') as string,
        amount: parseFloat(formData.get('amount') as string),
        category: formData.get('category') as string,
        date: formData.get('date') as string,
    }

    const { error } = await supabase.from(type).update(data).eq('id', id)
    if (error) return { error: error.message }

    revalidatePath(`/${type}`)
    revalidatePath('/')
    return { success: true }
}
