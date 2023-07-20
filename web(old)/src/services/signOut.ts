'use client'

import { useRouter } from 'next/navigation'
import { destroyCookie } from 'nookies'

export async function signOut() {
  destroyCookie(undefined, 'enceladus.token')
  destroyCookie(undefined, 'refreshToken')

  // eslint-disable-next-line react-hooks/rules-of-hooks
  const router = useRouter()
  router.push('/')
}
