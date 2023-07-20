import { AuthProvider } from '@/contexts/AuthContext'
import { Inter } from 'next/font/google'
import { ReactNode } from 'react'
import './globals.css'

const inter = Inter({ subsets: ['latin'] })

export const metadata = {
  title: 'Enceladus',
  description: '',
}

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="pt-br">
      <body
        className={`${inter.className} bg-body font-medium text-neutral-500`}
      >
        <AuthProvider>{children}</AuthProvider>
        {/* {children} */}
      </body>
    </html>
  )
}
