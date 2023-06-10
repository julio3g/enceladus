'clientside'
'use client'

import { parseCookies, setCookie } from 'nookies'
import { ReactNode, createContext, useEffect, useState } from 'react'

import { useRouter } from 'next/navigation'
import { api } from '../services/apiClient'

type User = {
  name: string
  email: string
  role: string
}

type SignInCredentials = {
  email: string
  password: string
}

type AuthContextData = {
  signIn: (credentials: SignInCredentials) => Promise<void>
  user: User | undefined
  isAuthenticated: boolean
}

type AuthProviderProps = {
  children: ReactNode
}

export const AuthContext = createContext({} as AuthContextData)

// let authChannel: BroadcastChannel

export function AuthProvider({ children }: AuthProviderProps) {
  const [user, setUser] = useState<User>()
  const isAuthenticated = !!user
  const router = useRouter()

  useEffect(() => {
    const { 'enceladus.token': token } = parseCookies()
    if (token) {
      api.get('/me').then((response) => {
        const { email, name, role } = response?.data
        setUser({ email, name, role })
      })
    }
  }, [])

  async function signIn({ email, password }: SignInCredentials) {
    try {
      const response = await api.post('sessions', {
        email,
        password,
      })

      const { token } = response.data

      setCookie(undefined, 'enceladus.token', token, {
        maxAge: 60 * 60 * 24 * 30, // 30 dias
        path: '/', // qualquer endereço da aplicação
      })

      api.defaults.headers.Authorization = `Bearer ${token}`

      router.push('/dashboard')
    } catch (err) {
      console.log(err)
    }
  }

  return (
    <AuthContext.Provider value={{ signIn, isAuthenticated, user }}>
      {children}
    </AuthContext.Provider>
  )
}
