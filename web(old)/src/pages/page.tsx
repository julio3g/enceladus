'use client'

import { Button } from '@/components/Button'
import { Input } from '@/components/Input'
import { AuthContext } from '@/contexts/AuthContext'
import { zodResolver } from '@hookform/resolvers/zod'
import Link from 'next/link'
import { useContext } from 'react'
import { FormProvider, useForm } from 'react-hook-form'
import { z } from 'zod'
import Login from '../assets/icons/login.svg'

const loginFormSchema = z.object({
  email: z
    .string({ required_error: 'E-mail obrigatório' })
    .email({ message: 'Insira um e-mail válido' }),
  password: z
    .string({ required_error: 'Senha obrigatória' })
    .min(6, { message: 'A senha deve conter no mínimo 6 caracteres' }),
})

type LoginFormData = z.infer<typeof loginFormSchema>

export default function Home() {
  const methods = useForm()
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginFormData>({
    resolver: zodResolver(loginFormSchema),
  })

  const { signIn } = useContext(AuthContext)

  async function handleLogin(data: LoginFormData) {
    await signIn(data)
  }

  return (
    <main className="flex items-center justify-center h-screen">
      <FormProvider {...methods}>
        <form
          className="rounded-xl bg-white p-12 flex w-full flex-col max-w-[364px] text-center"
          onSubmit={handleSubmit(handleLogin)}
        >
          <div className="flex flex-col gap-4 mb-6">
            <h1 className="font-semibold text-3xl text-neutral-700">Entrar</h1>
            <p className="text-sm">Bem-vindo de volta, você fez falta</p>
          </div>
          <div className="flex flex-col gap-3 mb-2 w-full">
            <Input
              type="email"
              placeholder="E-email"
              error={errors.email}
              {...register('email')}
            />
            <Input
              type="password"
              placeholder="Senha"
              error={errors.password}
              {...register('password')}
            />
          </div>
          <Link
            href="/forgot-password"
            className="mb-6 text-green-500 text-sm text-right hover:underline duration-150"
          >
            Esqueceu sua senha?
          </Link>
          <Button>
            <Login />
            Entrar
          </Button>
        </form>
      </FormProvider>
    </main>
  )
}

// export const getServerSideProps = withSSRGuest(async (ctx) => {
//   return {
//     props: {},
//   }
// })
