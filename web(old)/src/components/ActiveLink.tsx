'use client'

import Link, { LinkProps } from 'next/link'
import { usePathname } from 'next/navigation'
import { ReactElement, cloneElement } from 'react'

interface ActiveLinkProps extends LinkProps {
  children: ReactElement
  activeClassName: string
  className?: string
}

export function ActiveLink({
  children,
  activeClassName,
  className,
  ...rest
}: ActiveLinkProps) {
  const pathname = usePathname()
  const classNameActive = pathname === rest.href ? activeClassName : ''
  return (
    <Link {...rest} className={className}>
      {cloneElement(children, { className: classNameActive })}
    </Link>
  )
}

// import { ReactNode } from 'react'

// interface ActiveLinkProps extends LinkProps {
//   children: ReactNode
// }

// export function ActiveLink({ children, href, ...rest }: ActiveLinkProps) {
//   const pathname = usePathname()
//   const isCurrentPath =
//     pathname === href ||
//     pathname === rest.as ||
//     pathname?.startsWith(String(rest.as))

//   return (
//     <Link {...rest} href={href}>
//       {children}
//     </Link>
//   )
// }
