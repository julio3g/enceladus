'use client'
import { ActiveLink } from './ActiveLink'

export function Header() {
  return (
    <header className="w-full h-16 bg-white flex justify-between">
      <ActiveLink
        activeClassName="text-red-500 bg-gray-200 p-3 block"
        className="bg-gray-200/50"
        href="/dashboard"
      >
        <span>tes</span>
      </ActiveLink>
      <ActiveLink activeClassName="text-red-500" href="/dashboard/clients">
        <span>client</span>
      </ActiveLink>
    </header>
  )
}
