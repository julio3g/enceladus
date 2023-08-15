'use client'

import { api } from '@/services/api'
import { useEffect, useState } from 'react'

import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'
import { formatterCurrency } from '@/utils/formatterCurrency'
import { ChevronRight, Trash2 } from 'lucide-react'
import Link from 'next/link'

interface ListClientsProps {
  clients: {
    id: string
    name: string
    contact: string
    phone: string
    balance: number
    registration: number
    description: string
  }[]
}

export function ListAllClients() {
  const [listClients, setListClients] = useState<ListClientsProps>()
  useEffect(() => {
    api.get('/clients').then(({ data }) => setListClients(data))
  }, [])

  async function deleteClient(clientId: string) {
    api.delete(`/clients/${clientId}`)
  }

  return (
    <>
      {listClients && (
        <Table className="mt-8">
          <TableCaption>Listagem de todos os clientes</TableCaption>
          <TableHeader className="text-neutral-600">
            <TableRow className="bg-neutral-200">
              <TableHead className="w-[200px] rounded-tl-xl rounded-bl-xl">
                Nome
              </TableHead>
              <TableHead>Contato</TableHead>
              <TableHead>Telefone</TableHead>
              <TableHead className="w-[100px]">Balanço</TableHead>
              <TableHead className="rounded-tr-xl rounded-br-xl"></TableHead>
            </TableRow>
          </TableHeader>
          <TableBody className="h-auto">
            {listClients.clients.map((client) => {
              return (
                <TableRow key={client.id}>
                  <TableCell className="font-medium rounded-tl-xl rounded-bl-xl">
                    {client.name}
                  </TableCell>
                  <TableCell>{client.contact}</TableCell>
                  <TableCell>{client.phone}</TableCell>
                  <TableCell className="text-right w-[120px]">
                    {formatterCurrency.format(client.balance)}
                  </TableCell>
                  <TableCell className="w-16 rounded-tr-xl rounded-br-xl">
                    <div className="flex gap-2 ">
                      <button
                        onClick={() => deleteClient(client.id)}
                        className="p-1 rounded-xl block hover:bg-neutral-200"
                      >
                        <Trash2 className="h-5 w-5 stroke-red-400  hover:stroke-red-500 duration-150" />
                      </button>
                      <Link
                        href={`clients/${client.id}`}
                        className="p-1 rounded-xl block hover:bg-neutral-200"
                      >
                        <ChevronRight />
                      </Link>
                    </div>
                  </TableCell>
                </TableRow>
              )
            })}
          </TableBody>
        </Table>
      )}
    </>
  )
}
