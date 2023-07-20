import { ReactNode } from 'react'

export const metadata = {
  title: 'Enceladus',
  description: '',
}
export default function ForgotPasswordLayout({
  children,
}: {
  children: ReactNode
}) {
  return <main>{children}</main>
}
