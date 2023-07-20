'use client'

import { api } from "@/services/api"
import Link from "next/link"
import { useEffect, useState } from "react"

export default function Home() {
  const [listClients, setListClients] = useState()
  useEffect(() => {
    api.get('/clients').then((response) => setListClients(response.data))
  }, [])
  return (
    <main>
      <nav className="flex items-start">
        {/* <Sidebar /> */}
        <section className="w-full">
          <div className="flex items-center justify-between">

          </div>
          <table className="border-separate border-spacing-y-1 mt-16 w-full max-w-3xl m-auto table-auto">
            <thead className="bg-neutral-200 text-neutral-600">
              <tr>
                <th className="p-3 text-left rounded-tl-xl rounded-bl-xl">Nome</th>
                <th className="p-3 text-left">Contato</th>
                <th className="p-3 text-left">Telefone</th>
                <th className="p-3 text-left">Balanço</th>
                <th className="p-3 text-left rounded-tr-xl rounded-br-xl w-8"></th>
              </tr>
            </thead>
            <tbody className="bg-white w-full h-auto">
              {listClients &&
                listClients?.clients.map((client: any) => {
                  return (
                    <tr key={client.id}  className="w-full">
                      <td className="p-3 text-left rounded-tl-xl rounded-bl-xl">{client.name}</td>
                      <td className="p-3 text-left">{client.contact}</td>
                      <td className="p-3 text-left">{client.phone}</td>
                      <td className="p-3 text-left">{client.balance}</td>
                      <td className="p-3 text-left rounded-tr-xl rounded-br-xl w-8"><Link href={`clients/${client.id}`} key={client.id}> {'>'}</Link></td>
                    </tr>
                  )
                })}
            </tbody>
          </table>
        </section>
      </nav>
    </main>
  )
}
