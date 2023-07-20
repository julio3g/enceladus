'clientside'
'use client'

import { Header } from '@/components/Header'
import { Sidebar } from '@/components/Sidebar'
import * as Dialog from '@radix-ui/react-dialog'
import { z } from 'zod'

import { Input } from '@/components/Input'
import { zodResolver } from '@hookform/resolvers/zod'
import { useFieldArray, useForm } from 'react-hook-form'
import ReactInputMask from 'react-input-mask'
import Exit from '../../../assets/icons/close.svg'

const createClientFormSchema = z.object({
  name: z.string({ required_error: 'Insira um nome' }),
  contact: z.string(),
  phone: z
    .string({ required_error: 'Insira um telefone' })
    .regex(/^\([1-9]{2}\) (?:[2-8]|9[1-9])[0-9]{3}-[0-9]{4}$/g),
  services: z.array(
    z.object({
      description: z
        .string({ required_error: 'Insira uma descrição válida' })
        .min(1),
      value: z.coerce.number({ required_error: 'Insira um valor' }).min(1),
    }),
  ),
})

type CreateClientFormData = z.infer<typeof createClientFormSchema>

export default function Client() {
  const {
    register,
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<CreateClientFormData>({
    resolver: zodResolver(createClientFormSchema),
    defaultValues: {
      services: [{ description: '', value: 0 }],
    },
  })

  const { fields, append, remove } = useFieldArray({
    name: 'services',
    control,
    rules: {
      required: 'Deve ter pelo menos um serviço',
    },
  })

  async function handleCreateClient(data: CreateClientFormData) {
    console.log(data)
  }

  return (
    <main>
      <nav className="flex items-start">
        <Sidebar />
        <div className="w-full">
          <Header />
          <section className="pt-12 max-w-3xl m-auto">
            <div>Clients</div>
            <Dialog.Root>
              <Dialog.Trigger asChild>
                <button>Adicionar Novo Client</button>
              </Dialog.Trigger>
              <Dialog.Portal>
                <Dialog.Overlay className="bg-neutral-900/60 inset-0 fixed data-[state=open]:animate-overlayShow" />
                <Dialog.Content className="data-[state=open]:animate-contentShow fixed top-1/2 left-1/2 max-w-md max-h-[85vh] w-[90vw] bg-white -translate-x-1/2 -translate-y-1/2 focus:outline-none py-4 px-4 rounded-2xl gap-6 overflow-auto">
                  <Dialog.Title className="text-4xl text-neutral-800 font-semibold mb-4">
                    Cadastro
                  </Dialog.Title>
                  <Dialog.Description />
                  <form
                    onSubmit={handleSubmit(handleCreateClient)}
                    className="block"
                  >
                    <div className="flex flex-col gap-3 mb-4">
                      <Input
                        label="Nome"
                        {...register('name')}
                        error={errors.name}
                      />
                      <Input
                        label="Contato"
                        {...register('contact')}
                        error={errors.contact}
                      />
                      <div className="w-full flex flex-col gap-1">
                        <label htmlFor="dsa" className="text-sm block">
                          Telefone
                        </label>
                        <ReactInputMask
                          mask={'(99) 99999-9999'}
                          {...register('phone')}
                          className="border border-neutral-300 bg-neutral-200 p-3 rounded-xl outline-0 placeholder:text-neutral-500 hover:border-green-500 hover:shadow-3xl hover:bg-white duration-150 focus:shadow-3xl focus:border-green-500 focus:bg-white"
                        />
                        {!!errors && (
                          <p className="text-xs text-red-500">
                            {errors.phone?.message}
                          </p>
                        )}
                      </div>
                    </div>
                    <div className="mb-6">
                      <h2 className="text-2xl text-neutral-700 font-semibold mb-4">
                        Serviço
                      </h2>
                      <div className="flex flex-col gap-3">
                        {fields.map((field, index) => {
                          return (
                            <div key={field.id}>
                              <Input
                                {...register(`services.${index}.description`)}
                              />
                              <Input
                                type="number"
                                {...register(`services.${index}.value`, {
                                  valueAsNumber: true,
                                })}
                              />
                              <button onClick={() => remove(index - 1)}>
                                Delete
                              </button>
                            </div>
                          )
                        })}
                        <button
                          onClick={() =>
                            append({
                              description: '',
                              value: 0,
                            })
                          }
                        >
                          +
                        </button>
                      </div>
                    </div>
                    <button
                      type="submit"
                      className="w-full bg-green-500 p-3 rounded-xl text-base text-white flex items-center justify-center gap-2 hover:bg-green-600 duration-150"
                    >
                      Cadastrar
                    </button>
                  </form>
                  <Dialog.Close asChild>
                    <button className="absolute top-2 right-2 h-10 w-10 rounded-xl flex items-center justify-center hover:bg-neutral-200 hover:border-neutral-300 duration-150">
                      <Exit />
                    </button>
                  </Dialog.Close>
                </Dialog.Content>
              </Dialog.Portal>
            </Dialog.Root>
          </section>
        </div>
      </nav>
    </main>
  )
}
