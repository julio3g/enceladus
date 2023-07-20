'use client'

import { Button } from '@/components/Button'
import { Input } from '@/components/Input'
import { zodResolver } from '@hookform/resolvers/zod'
import Link from 'next/link'
import { useForm } from 'react-hook-form'
import { z } from 'zod'

const forgotPasswordFormSchema = z.object({
  email: z
    .string({ required_error: 'E-mail obrigatório' })
    .email({ message: 'Insira um e-mail válido' }),
})

type ForgotPasswordFormData = z.infer<typeof forgotPasswordFormSchema>

export default function ForgotPassword() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ForgotPasswordFormData>({
    resolver: zodResolver(forgotPasswordFormSchema),
  })

  async function handleForgotPassword(data: ForgotPasswordFormData) {
    console.log(data)
  }

  return (
    <main className="flex items-center justify-center h-screen text-center">
      <div>
        <h1 className="text-2xl text-neutral-700 mb-6 font-semibold">
          Recuperar senha
        </h1>
        <form
          className="flex flex-col gap-3 mb-4"
          onSubmit={handleSubmit(handleForgotPassword)}
        >
          <Input
            placeholder="Digite seu e-mail"
            {...register('email')}
            error={errors.email}
          />
          <Button>Recuperar</Button>
        </form>
        <Link href="/" className="text-xs block  hover:underline duration-150">
          voltar
        </Link>
      </div>
    </main>
  )
}
