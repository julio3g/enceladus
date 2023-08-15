'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { ReactElement, cloneElement } from 'react'

interface ActiveLinkProps {
  href: string
  children: ReactElement
}

export function ActiveLink({ href, children }: ActiveLinkProps) {
  const pathname = usePathname()

  let className = children.props.className || ''
  const defaultClass =
    'p-3 rounded-xl hover:bg-neutral-200/50 text-neutral-600 duration-150'
  if (pathname === href)
    className = `${className} bg-neutral-200/50 ${defaultClass}` // Cor para a página atual
  else className = `${className}  ${defaultClass}` // Cor para outras páginas

  return <Link href={href}>{cloneElement(children, { className })}</Link>
}
