'use client'
import { api } from '@/services/api'
import { usePathname } from 'next/navigation'
import { useEffect, useState } from 'react'

interface Extras {
  extras: [
    {
      id: string
      description: string
      value: number
      created_at: Date
    }
  ]
  generalBalanceOfExtras: number
}

export default function Client() {
  const [getExtrasByClient, setGetExtrasByClient] = useState<Extras>()
  const pathname = usePathname()
  const clientId = pathname.split('/')[2]

  useEffect(() => {
    api
      .get(`/extras/${clientId}`)
      .then(({ data }) => setGetExtrasByClient(data))
  }, [clientId])
  const formatter = new Intl.NumberFormat('pt-BR', {
    style: 'currency',
    currency: 'BRL',
    minimumFractionDigits: 2,
  })

  const money = formatter.format(getExtrasByClient?.generalBalanceOfExtras)
  return (
    <section>
      <h1>Clients</h1>
      {getExtrasByClient?.extras.map((extra) => {
        return (
          <div key={extra.id}>
            <p>{extra.description}</p>
            <p>{extra.value}</p>
          </div>
        )
      })}
      {money}
      {/* {getExtrasByClient?.generalBalanceOfExtras} */}
    </section>
  )
}
