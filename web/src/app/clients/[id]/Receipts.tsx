'use client'

import { api } from '@/services/api'
import { formatterCurrency } from '@/utils/formatterCurrency'
import { useEffect, useState } from 'react'

import { Button } from '@/components/ui/button'
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog'
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'
import { zodResolver } from '@hookform/resolvers/zod'
import * as DialogPrimitive from '@radix-ui/react-dialog'
import { FilePlus, Trash2 } from 'lucide-react'
import { useForm } from 'react-hook-form'
import { z } from 'zod'

interface Receipt {
  id: string
  description: string
  value: string
  client_id: string
  created_at?: Date
}

interface Receipts {
  receipts: Receipt[]
  generalBalanceOfReceipts: number
}

const createReceiptFormSchema = z.object({
  description: z.string().nonempty('Insira uma descrição'),
  value: z
    .string()
    .nonempty('Deve ser um número válido')
    .transform((val) => parseFloat(val))
    .refine((val) => !isNaN(val), 'Deve ser um número válido'),
  client_id: z.string().uuid(),
})

type CreateReceiptFormData = z.infer<typeof createReceiptFormSchema>

interface SectionReceiptsProps {
  clientId: string
}

export function SectionReceipts({ clientId }: SectionReceiptsProps) {
  const [getReceiptsByClient, setGetReceiptsByClient] = useState<Receipts>()

  useEffect(() => {
    api
      .get(`/receipts/${clientId}`)
      .then(({ data }) => setGetReceiptsByClient(data))
  }, [clientId, getReceiptsByClient])

  const form = useForm<CreateReceiptFormData>({
    resolver: zodResolver(createReceiptFormSchema),
    defaultValues: {
      description: '',
      value: 0.0,
      client_id: clientId,
    },
  })

  async function onSubmitReceipt({
    description,
    value,
    client_id,
  }: CreateReceiptFormData) {
    await api.post('/receipts', { description, value, client_id })
    form.reset()
  }

  async function deleteReceipt(receiptId: string) {
    await api.delete(`/receipts/${receiptId}`)
  }

  return (
    <section className="mt-8">
      <div className="flex justify-between items-center">
        <h2 className="text-neutral-600">Lista de Recebimentos</h2>
        <Dialog key="receipt">
          <DialogTrigger asChild>
            <button className="p-1 bg-white rounded-lg hover:bg-neutral-200 duration-150">
              <FilePlus className="stroke-green-500 fill-green-100" />
            </button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-[425px]">
            <DialogHeader>
              <DialogTitle>Novo Recebimento</DialogTitle>
            </DialogHeader>
            <Form {...form}>
              <form
                id="createReceipt"
                onSubmit={form.handleSubmit(onSubmitReceipt)}
                className="space-y-3"
              >
                <FormField
                  control={form.control}
                  name="description"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Descrição</FormLabel>
                      <FormControl>
                        <Input placeholder="Descrição" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="value"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Valor</FormLabel>
                      <FormControl>
                        <Input
                          type="number"
                          step="0.01"
                          placeholder="Valor"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <DialogPrimitive.Close>
                  <Button type="submit" className="block ml-auto">
                    Cadastrar
                  </Button>
                </DialogPrimitive.Close>
              </form>
            </Form>
          </DialogContent>
        </Dialog>
      </div>
      {getReceiptsByClient && (
        <Table className="mt-4">
          <TableCaption className="text-sm font-medium bg-neutral-200 py-1 rounded-lg">
            <span>Total: </span>
            {formatterCurrency.format(
              getReceiptsByClient.generalBalanceOfReceipts
            )}
          </TableCaption>
          <TableHeader>
            <TableRow className="bg-neutral-200 text-neutral-600">
              <TableHead className="w-1/2 rounded-tl-xl rounded-bl-xl">
                Descrição do serviço
              </TableHead>
              <TableHead>Valor</TableHead>
              <TableHead className="rounded-tr-xl rounded-br-xl" />
            </TableRow>
          </TableHeader>
          <TableBody>
            {getReceiptsByClient.receipts.map((receipt) => (
              <TableRow key={receipt.id}>
                <TableCell className="font-medium rounded-tl-xl rounded-bl-xl">
                  {receipt.description}
                </TableCell>
                <TableCell>
                  {formatterCurrency.format(Number(receipt.value))}
                </TableCell>
                <TableCell className="w-8 rounded-tr-xl rounded-br-xl">
                  <button onClick={() => deleteReceipt(receipt.id)}>
                    <Trash2 className="h-5 w-5 stroke-red-400 hover:stroke-red-500 duration-150" />
                  </button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      )}
    </section>
  )
}
