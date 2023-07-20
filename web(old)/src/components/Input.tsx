import {
  forwardRef,
  ForwardRefRenderFunction,
  InputHTMLAttributes,
} from 'react'
import { FieldError } from 'react-hook-form'

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  name: string
  label?: string
  error?: FieldError | undefined
}

const InputBase: ForwardRefRenderFunction<HTMLInputElement, InputProps> = (
  { name, label, error, ...rest },
  ref,
) => {
  return (
    <div className="w-full flex flex-col gap-1">
      {label && (
        <label htmlFor={name} className="text-sm block">
          {label}
        </label>
      )}
      <input
        name={name}
        id={name}
        ref={ref}
        {...rest}
        className="border border-neutral-300 bg-neutral-200 p-3 rounded-xl outline-0 placeholder:text-neutral-500 hover:border-green-500 hover:shadow-3xl hover:bg-white duration-150 focus:shadow-3xl focus:border-green-500 focus:bg-white"
      />
      {!!error && <p className="text-xs text-red-500">{error.message}</p>}
    </div>
  )
}

export const Input = forwardRef(InputBase)
