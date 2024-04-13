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
  price: number
  date: Date
  numbersSelected: number[]
}

const columnHelper = createColumnHelper<Bet>()

const defaultColumns = [
  columnHelper.accessor('id', {
    header: 'APOSTA',
    cell: (props) => (
      <strong className="text-text-medium">{props.getValue()}</strong>
    ),
  }),
  columnHelper.accessor('price', {
    header: 'PREÇO',
    cell: (props) => (
      <span className="text-green-400">{toBRL(props.getValue())}</span>
    ),
  }),
  columnHelper.accessor('date', {
    header: 'DATA',
    cell: (props) =>
      Intl.DateTimeFormat('pt-BR', {
        day: '2-digit',
        month: '2-digit',
        year: 'numeric',
      })
        .format(props.getValue())
        .replace('/', '.'),
  }),
]

type ResultsTableProps = {
  sortedNumbers: Set<number>
  data: Bet[]
}

export function ResultsTable({ sortedNumbers, data }: ResultsTableProps) {
  const table = useReactTable({
    columns: [
      ...defaultColumns,
      columnHelper.accessor('numbersSelected', {
        header: 'SELECIONADOS',
        cell: (props) => (
          <div className="flex items-center gap-14">
            <span className="text-sm text-text-darker">
              {props.getValue().length}
            </span>
            <div className="flex gap-2 flex-wrap">
              {props.getValue().map((number: number) => (
                <LotteryNumber
                  key={number}
                  number={number}
                  variant={sortedNumbers.has(number) ? 'cyan' : 'default'}
                />
              ))}
            </div>
          </div>
        ),
      }),
    ],
    data,
    getCoreRowModel: getCoreRowModel(),
  })

  return (
    <div className="w-screen max-w-7xl overflow-auto">
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
