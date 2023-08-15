'use client'
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
import { api } from '@/services/api'
import { zodResolver } from '@hookform/resolvers/zod'
import * as DialogPrimitive from '@radix-ui/react-dialog'
import { FilePlus, Trash2 } from 'lucide-react'
import { usePathname } from 'next/navigation'
import { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import { z } from 'zod'
import { SectionReceipts } from './Receipts'
import { SectionServices } from './Services'

interface Extras {
  extras: {
    id: string
    description: string
    value: number
    client_id: string
    created_at: Date
  }[]
  generalBalanceOfExtras: number
}

interface DataClient {
  client: {
    id: string
    name: string
    contact: string
    phone: string
    balance: number | null
    created_at: Date
  }
}

const createExtraFormSchema = z.object({
  description: z.string().nonempty('Insira uma descrição'),
  value: z
    .string()
    .transform((val) => parseFloat(val))
    .refine((val) => !isNaN(val), 'Deve ser um número válido'),
  client_id: z.string().uuid(),
})

type CreateExtraFormData = z.infer<typeof createExtraFormSchema>

export default function Client() {
  const [getExtrasByClient, setGetExtrasByClient] = useState<Extras>()
  const [dataClient, setDataClient] = useState<DataClient>()
  const pathname = usePathname()
  const clientId = pathname.split('/')[2]

  const form = useForm<CreateExtraFormData>({
    resolver: zodResolver(createExtraFormSchema),
    defaultValues: {
      description: '',
      value: 0.0,
      client_id: clientId,
    },
  })

  useEffect(() => {
    api.get(`/clients/${clientId}`).then(({ data }) => setDataClient(data))
    api
      .get(`/extras/${clientId}`)
      .then(({ data }) => setGetExtrasByClient(data))
  }, [clientId, setGetExtrasByClient, setDataClient, dataClient])

  async function onSubmitExtra({
    description,
    value,
    client_id,
  }: CreateExtraFormData) {
    await api.post('/extras', { description, value, client_id })
    form.reset()
  }

  async function deleteExtra(extraId: string) {
    await api.delete(`/extras/${extraId}`)
  }

  const formatter = new Intl.NumberFormat('pt-BR', {
    style: 'currency',
    currency: 'BRL',
    minimumFractionDigits: 2,
  })

  return (
    <div className="w-full max-w-3xl m-auto h-screen mt-24 space-y-8">
      <section className="h-[48px] flex items-center">
        <h1 className="font-semibold text-2xl text-neutral-800">
          {dataClient && dataClient.client.name}
        </h1>
      </section>
      <SectionServices clientId={clientId} />
      <section className="mt-auto">
        <div className="flex justify-between items-center">
          <h2 className="text-neutral-600">Lista de Extras</h2>
          <Dialog>
            <DialogTrigger asChild>
              <button className="p-1 bg-white rounded-lg hover:bg-neutral-100 duration-150">
                <FilePlus className="stroke-green-500 fill-green-100" />
              </button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[425px]">
              <DialogHeader>
                <DialogTitle>Novo Extra</DialogTitle>
              </DialogHeader>
              <Form {...form}>
                <form
                  id="createExtra"
                  onSubmit={form.handleSubmit(onSubmitExtra)}
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
                            step="any"
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
        {getExtrasByClient && (
          <Table className="mt-4">
            <TableCaption className="text-sm font-medium bg-neutral-200 py-1 rounded-lg">
              <span>Total: </span>
              {formatter.format(getExtrasByClient.generalBalanceOfExtras)}
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
              {getExtrasByClient.extras.map((extra) => (
                <TableRow key={extra.id} className="bg-white">
                  <TableCell className="font-medium rounded-tl-xl rounded-bl-xl">
                    {extra.description}
                  </TableCell>
                  <TableCell>{formatter.format(extra.value)}</TableCell>
                  <TableCell className="w-8 rounded-tr-xl rounded-br-xl">
                    <button onClick={() => deleteExtra(extra.id)}>
                      <Trash2 className="h-5 w-5 stroke-red-400 hover:stroke-red-500 duration-150" />
                    </button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        )}
      </section>
      <SectionReceipts clientId={clientId} />
    </div>
  )
}
