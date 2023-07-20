import { ButtonHTMLAttributes, ReactNode } from 'react'

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  children: ReactNode
}

export function Button({ children, ...props }: ButtonProps) {
  return (
    <button
      {...props}
      className="bg-green-500 p-3 rounded-xl text-base text-white flex items-center justify-center gap-2 hover:bg-green-600 duration-150"
    >
      {children}
    </button>
  )
}
