'use client'

import {
  createColumnHelper,
  flexRender,
  getCoreRowModel,
  useReactTable,
} from '@tanstack/react-table'
import { LotteryNumber } from './LotteryNumber'
import { toBRL } from '@/lib/intl'

export type Bet = {
  id: string
  totalTicketsCost: number
  totalRewards: number
  createdAt: Date
  sortedNumbers: number[]
}

const columnHelper = createColumnHelper<Bet>()

const defaultColumns = [
  columnHelper.accessor('id', {
    header: 'APOSTA',
    cell: (props) => (
      <strong className="text-text-medium">{props.getValue()}</strong>
    ),
  }),
  columnHelper.accessor('totalTicketsCost', {
    header: 'GASTO',
    cell: (props) => (
      <span className="text-red-600">{toBRL(props.getValue())}</span>
    ),
  }),
  columnHelper.accessor('totalRewards', {
    header: 'RECOMPENSAS',
    cell: (props) => (
      <span className="text-green-400">{toBRL(props.getValue())}</span>
    ),
  }),
  columnHelper.accessor((row) => row.totalRewards - row.totalTicketsCost, {
    header: 'LUCRO',
    cell: (props) => {
      const profit = props.getValue()

      return (
        <div
          data-is-positive={profit > 0}
          className="text-red-600 data-[is-positive=true]:text-green-400 flex items-center"
        >
          <span>{profit < 0 ? '-' : null}</span> {toBRL(Math.abs(profit))}
        </div>
      )
    },
  }),
  columnHelper.accessor('createdAt', {
    header: 'DATA',
    cell: (props) =>
      Intl.DateTimeFormat('pt-BR', {
        day: '2-digit',
        month: '2-digit',
        year: 'numeric',
      })
        .format(new Date(props.getValue()))
        .replace('/', '.'),
  }),
]

type ResultsTableProps = {
  data: Bet[]
}

export function ResultsTable({ data }: ResultsTableProps) {
  const table = useReactTable({
    columns: [
      ...defaultColumns,
      columnHelper.accessor('sortedNumbers', {
        header: 'NÚMEROS SORTEADOS',
        cell: (props) => (
          <div className="flex gap-2 flex-wrap">
            {props.getValue().map((number: number) => (
              <LotteryNumber key={number} number={number} variant={'cyan'} />
            ))}
          </div>
        ),
      }),
    ],
    data,
    getCoreRowModel: getCoreRowModel(),
  })

  return (
    <div className="w-screen max-w-7xl overflow-auto flex">
      <table className="w-full">
        <thead className="text-text-darker text-xs border-b-2 border-slate-800">
          {table.getHeaderGroups().map((headerGroup) => (
            <tr key={headerGroup.id}>
              {headerGroup.headers.map((header) => (
                <th
                  className="text-start first:pl-0 px-8 last:pr-4 py-4"
                  key={header.id}
                >
                  {header.isPlaceholder
                    ? null
                    : flexRender(
                        header.column.columnDef.header,
                        header.getContext(),
                      )}
                </th>
              ))}
            </tr>
          ))}
        </thead>
        <tbody className="text-text-darker text-xs font-bold">
          {table.getRowModel().rows.map((row) => (
            <tr className="border-b-2 border-slate-950" key={row.id}>
              {row.getVisibleCells().map((cell) => (
                <td key={cell.id} className="first:pl-0 px-8 last:pr-4 py-4">
                  {flexRender(cell.column.columnDef.cell, cell.getContext())}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
        <tfoot>
          {table.getFooterGroups().map((footerGroup) => (
            <tr key={footerGroup.id}>
              {footerGroup.headers.map((header) => (
                <th key={header.id}>
                  {header.isPlaceholder
                    ? null
                    : flexRender(
                        header.column.columnDef.footer,
                        header.getContext(),
                      )}
                </th>
              ))}
            </tr>
          ))}
        </tfoot>
      </table>
    </div>
  )
}
