'use client'
import { ActiveLink } from './ActiveLink'

export function Header() {
  return (
    <header className="w-full h-16 bg-white flex justify-center items-center gap-3">
      <ActiveLink href="/">
        <span>Home</span>
      </ActiveLink>
      <ActiveLink href="/clients">
        <span>Clientes</span>
      </ActiveLink>
    </header>
  )
}
