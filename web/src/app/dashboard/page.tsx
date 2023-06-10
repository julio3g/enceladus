'use client'

import { Header } from '@/components/Header'
import { Sidebar } from '@/components/Sidebar'
import { api } from '@/services/apiClient'
import { useEffect, useState } from 'react'

export default function Dashboard() {
  const [listClients, setListClients] = useState()
  useEffect(() => {
    api.get('/clients').then((response) => setListClients(response.data))
  }, [])
  // console.log(clients.clients)
  return (
    <main>
      <nav className="flex items-start">
        <Sidebar />
        <div className="w-full">
          <Header />
          <section className="pt-16 max-w-3xl m-auto">content</section>
        </div>
      </nav>
    </main>
  )
}
