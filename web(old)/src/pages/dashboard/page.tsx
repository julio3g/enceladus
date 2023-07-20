'use client'

import { Header } from '@/components/Header'
import { Sidebar } from '@/components/Sidebar'
import { api } from '@/services/apiClient'
import Link from 'next/link'
import { useEffect, useState } from 'react'

export default function Dashboard() {
  const [listClients, setListClients] = useState()
  useEffect(() => {
    api.get('/clients').then((response) => setListClients(response.data))
  }, [])
  console.log(listClients?.clients)
  return (
    <main>
      <nav className="flex items-start">
        <Sidebar />
        <div className="w-full">
          <Header />
          <section className="pt-16 max-w-3xl m-auto">content</section>
          {listClients &&
            listClients?.clients.map((client) => {
              return (
                <Link href={`dashboard/clients/${client.id}`} key={client.id}>
                  <p>{client.name}</p>
                  <p>{client.contact}</p>
                  <p>{client.phone}</p>
                  <p>{client.balance}</p>
                </Link>
              )
            })}
        </div>
      </nav>
    </main>
  )
}

// export const getServerSideProps = withSSRAuth(async (ctx) => {
//   const apiClient = setupAPIClient(ctx)
//   const response = await apiClient.get('/me')
//   console.log(response.data)
//   return {
//     props: {},
//   }
// })
