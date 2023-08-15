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

interface Service {
  id: string
  description: string
  value: string
  client_id: string
  created_at?: Date
}

interface Services {
  services: Service[]
  generalBalanceOfServices: number
}

const createServiceFormSchema = z.object({
  description: z.string().nonempty('Insira uma descrição'),
  value: z
    .string()
    .nonempty('Deve ser um número válido')
    .transform((val) => parseFloat(val))
    .refine((val) => !isNaN(val), 'Deve ser um número válido'),
  client_id: z.string().uuid(),
})

type CreateServiceFormData = z.infer<typeof createServiceFormSchema>

interface SectionServicesProps {
  clientId: string
}

export function SectionServices({ clientId }: SectionServicesProps) {
  const [getServicesByClient, setGetServicesByClient] = useState<Services>()

  useEffect(() => {
    api
      .get(`/services/${clientId}`)
      .then(({ data }) => setGetServicesByClient(data))
  }, [clientId, getServicesByClient])

  const form = useForm<CreateServiceFormData>({
    resolver: zodResolver(createServiceFormSchema),
    defaultValues: {
      description: '',
      value: 0.0,
      client_id: clientId,
    },
  })

  async function onSubmitService({
    description,
    value,
    client_id,
  }: CreateServiceFormData) {
    await api.post('/services', { description, value, client_id })
    form.reset()
  }

  async function deleteService(serviceId: string) {
    await api.delete(`/services/${serviceId}`)
  }

  return (
    <section className="mt-8">
      <div className="flex justify-between items-center">
        <h2 className="text-neutral-600">Lista de Serviços</h2>
        <Dialog key="service">
          <DialogTrigger asChild>
            <button className="p-1 bg-white rounded-lg hover:bg-neutral-200 duration-150">
              <FilePlus className="stroke-green-500 fill-green-100" />
            </button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-[425px]">
            <DialogHeader>
              <DialogTitle>Novo Serviço</DialogTitle>
            </DialogHeader>
            <Form {...form}>
              <form
                id="createService"
                onSubmit={form.handleSubmit(onSubmitService)}
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
      {getServicesByClient && (
        <Table className="mt-4">
          <TableCaption className="text-sm font-medium bg-neutral-200 py-1 rounded-lg">
            <span>Total: </span>
            {formatterCurrency.format(
              getServicesByClient.generalBalanceOfServices
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
            {getServicesByClient.services.map((service) => (
              <TableRow key={service.id}>
                <TableCell className="font-medium rounded-tl-xl rounded-bl-xl">
                  {service.description}
                </TableCell>
                <TableCell>
                  {formatterCurrency.format(Number(service.value))}
                </TableCell>
                <TableCell className="w-8 rounded-tr-xl rounded-br-xl">
                  <button onClick={() => deleteService(service.id)}>
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
