'clientside'
'use client'

import { destroyCookie, parseCookies, setCookie } from 'nookies'
import { ReactNode, createContext, useEffect, useState } from 'react'

// import { signOut } from '@/services/signOut'
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
  signOut: () => void
  user: User | undefined
  isAuthenticated: boolean
}

type AuthProviderProps = {
  children: ReactNode
}

export const AuthContext = createContext({} as AuthContextData)

// let authChannel: BroadcastChannel

// eslint-disable-next-line no-redeclare
export function signOut() {
  // eslint-disable-next-line react-hooks/rules-of-hooks
  const router = useRouter()
  destroyCookie(undefined, 'enceladus.token')
  destroyCookie(undefined, 'refreshToken')

  router.push('/')
}

export function AuthProvider({ children }: AuthProviderProps) {
  const [user, setUser] = useState<User>()
  const isAuthenticated = !!user
  const router = useRouter()

  useEffect(() => {
    const { 'enceladus.token': token } = parseCookies()
    if (token) {
      api
        .get('/me')
        .then((response) => {
          const { email, name, role } = response?.data
          setUser({ email, name, role })
        })
        .catch(() => {
          signOut()
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
    <AuthContext.Provider value={{ signIn, signOut, isAuthenticated, user }}>
      {children}
    </AuthContext.Provider>
  )
}
