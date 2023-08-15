'use client'

import { ListAllClients } from '@/components/ListAllClients'
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
import { api } from '@/services/api'
import { zodResolver } from '@hookform/resolvers/zod'
import * as DialogPrimitive from '@radix-ui/react-dialog'
import { Plus } from 'lucide-react'
import { useForm } from 'react-hook-form'
import { z } from 'zod'

const createClientFormSchema = z.object({
  name: z.string({ required_error: 'Insira um nome' }),
  contact: z.string({ required_error: 'Insira contato' }),
  phone: z
    .string({ required_error: 'Insira um telefone válido' })
    .nonempty('Insira um telefone válido')
    .regex(/^\([1-9]{2}\) (?:[2-8]|9[1-9])[0-9]{3}-[0-9]{4}$/g),
  description: z.string(),
  registration: z
    .string()
    .transform((val) => parseFloat(val))
    .refine((val) => !isNaN(val), 'Deve ser um número válido'),
})

type CreateClientFormData = z.infer<typeof createClientFormSchema>

export default function Clients() {
  const form = useForm<CreateClientFormData>({
    resolver: zodResolver(createClientFormSchema),
    defaultValues: {
      name: '',
      contact: '',
      phone: '',
      description: '',
      registration: 0,
    },
  })

  async function onSubmit({
    name,
    contact,
    phone,
    description,
    registration,
  }: CreateClientFormData) {
    await api.post('/clients', {
      name,
      contact,
      phone,
      description,
      registration,
    })
    form.reset()
  }

  return (
    <>
      <div className="w-full max-w-3xl m-auto mt-16">
        <section className="flex justify-between text-center">
          <h2 className="text-neutral-800 text-2xl font-semibold">
            Lista de Clientes
          </h2>
          <Dialog>
            <DialogTrigger asChild>
              <Button>
                Cadastrar <Plus />
              </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[425px]">
              <DialogHeader>
                <DialogTitle className="text-2xl text-neutral-800">
                  Cadastrar Cliente
                </DialogTitle>
              </DialogHeader>
              <Form {...form}>
                <form
                  onSubmit={form.handleSubmit(onSubmit)}
                  className="space-y-3"
                >
                  <FormField
                    control={form.control}
                    name="name"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Nome do Cliente</FormLabel>
                        <FormControl>
                          <Input placeholder="Nome" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="contact"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Contato</FormLabel>
                        <FormControl>
                          <Input placeholder="Contato" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="phone"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Telefone</FormLabel>
                        <FormControl>
                          <Input placeholder="Telefone" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
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
                    name="registration"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Número de Matrícula</FormLabel>
                        <FormControl>
                          <Input
                            placeholder="Número de Matrícula"
                            type="number"
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
        </section>
        <ListAllClients />
      </div>
    </>
  )
}
