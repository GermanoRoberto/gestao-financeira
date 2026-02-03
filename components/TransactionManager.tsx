'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { createTransaction, deleteTransaction, updateTransaction } from '@/app/(dashboard)/transactions/actions'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger, DialogFooter } from '@/components/ui/dialog'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { PlusCircle, Trash2, Edit2 } from 'lucide-react'
import { toast } from 'sonner'
import { formatCurrency } from '@/lib/utils'

interface Transaction {
    id: string
    description: string
    amount: number
    category: string
    date: string
}

interface TransactionManagerProps {
    initialTransactions: Transaction[]
    type: 'receitas' | 'despesas'
}

export function TransactionManager({ initialTransactions, type }: TransactionManagerProps) {
    const [isDialogOpen, setIsDialogOpen] = useState(false)
    const [editingTransaction, setEditingTransaction] = useState<Transaction | null>(null)
    const router = useRouter()

    const handleSubmit = async (formData: FormData) => {
        // If editing, append ID or handle update
        let result;
        if (editingTransaction) {
            result = await updateTransaction(type, editingTransaction.id, formData)
        } else {
            result = await createTransaction(type, formData)
        }

        if (result.error) {
            toast.error(result.error)
        } else {
            toast.success('Saved successfully')
            setIsDialogOpen(false)
            setEditingTransaction(null)
            router.refresh()
        }
    }

    const handleDelete = async (id: string) => {
        if (confirm('Are you sure?')) {
            const result = await deleteTransaction(type, id)
            if (result.error) toast.error(result.error)
            else {
                toast.success('Deleted')
                router.refresh()
            }
        }
    }

    const openEdit = (t: Transaction) => {
        setEditingTransaction(t)
        setIsDialogOpen(true)
    }

    const openNew = () => {
        setEditingTransaction(null)
        setIsDialogOpen(true)
    }

    return (
        <div className="space-y-4">
            <div className="flex justify-between items-center">
                <h2 className="text-2xl font-bold capitalize">{type}</h2>
                <Button onClick={openNew} size="sm" className="gap-1">
                    <PlusCircle className="h-4 w-4" />
                    Novo
                </Button>
            </div>

            <div className="grid gap-4">
                {initialTransactions.map((t) => (
                    <Card key={t.id} className="cursor-pointer hover:shadow-md transition-shadow">
                        <CardContent className="p-4 flex justify-between items-center">
                            <div>
                                <p className="font-medium">{t.description}</p>
                                <p className="text-sm text-muted-foreground">{t.category} • {new Date(t.date).toLocaleDateString('pt-BR')}</p>
                            </div>
                            <div className="flex items-center gap-4">
                                <span className={`font-bold ${type === 'receitas' ? 'text-green-400' : 'text-red-400'}`}>
                                    {type === 'despesas' ? '-' : '+'}{formatCurrency(t.amount)}
                                </span>
                                <div className="flex gap-1">
                                    <Button variant="ghost" size="icon" onClick={() => openEdit(t)}><Edit2 className="h-4 w-4" /></Button>
                                    <Button variant="ghost" size="icon" className="text-destructive hover:text-destructive" onClick={() => handleDelete(t.id)}><Trash2 className="h-4 w-4" /></Button>
                                </div>
                            </div>
                        </CardContent>
                    </Card>
                ))}
                {initialTransactions.length === 0 && <p className="text-center text-muted-foreground">Nenhuma transação encontrada.</p>}
            </div>

            <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
                <DialogContent>
                    <DialogHeader>
                        <DialogTitle>{editingTransaction ? 'Editar' : 'Nova'} {type === 'receitas' ? 'Receita' : 'Despesa'}</DialogTitle>
                    </DialogHeader>
                    <form action={handleSubmit} className="space-y-4">
                        <div className="grid gap-2">
                            <Label htmlFor="description">Descrição</Label>
                            <Input name="description" required defaultValue={editingTransaction?.description} />
                        </div>
                        <div className="grid gap-2">
                            <Label htmlFor="amount">Valor (R$)</Label>
                            <Input name="amount" type="number" step="0.01" required defaultValue={editingTransaction?.amount} />
                        </div>
                        <div className="grid gap-2">
                            <Label htmlFor="category">Categoria</Label>
                            <Select name="category" defaultValue={editingTransaction?.category || (type === 'receitas' ? 'Salário' : 'Alimentação')}>
                                <SelectTrigger>
                                    <SelectValue placeholder="Selecione" />
                                </SelectTrigger>
                                <SelectContent>
                                    {type === 'receitas' ? (
                                        <>
                                            <SelectItem value="Salário">Salário</SelectItem>
                                            <SelectItem value="Freelance">Freelance</SelectItem>
                                            <SelectItem value="Investimentos">Investimentos</SelectItem>
                                            <SelectItem value="Outros">Outros</SelectItem>
                                        </>
                                    ) : (
                                        <>
                                            <SelectItem value="Alimentação">Alimentação</SelectItem>
                                            <SelectItem value="Moradia">Moradia</SelectItem>
                                            <SelectItem value="Transporte">Transporte</SelectItem>
                                            <SelectItem value="Lazer">Lazer</SelectItem>
                                            <SelectItem value="Saúde">Saúde</SelectItem>
                                            <SelectItem value="Outros">Outros</SelectItem>
                                        </>
                                    )}
                                </SelectContent>
                            </Select>
                        </div>
                        <div className="grid gap-2">
                            <Label htmlFor="date">Data</Label>
                            <Input name="date" type="date" required defaultValue={editingTransaction?.date ? new Date(editingTransaction.date).toISOString().split('T')[0] : new Date().toISOString().split('T')[0]} />
                        </div>
                        <DialogFooter>
                            <Button type="submit">Salvar</Button>
                        </DialogFooter>
                    </form>
                </DialogContent>
            </Dialog>
        </div>
    )
}
