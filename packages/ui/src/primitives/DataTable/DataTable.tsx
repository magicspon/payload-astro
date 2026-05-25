import {
	ColumnDef,
	SortingState,
	flexRender,
	getCoreRowModel,
	getSortedRowModel,
	useReactTable,
} from '@tanstack/react-table'
import { ArrowDownIcon, ArrowUpDownIcon, ArrowUpIcon } from 'lucide-react'
import * as React from 'react'
import * as Table from '../Table'

interface DataTableProps<TData, TValue> {
	columns: ColumnDef<TData, TValue>[]
	data: TData[]
}

export function DataTable<TData, TValue>({
	columns,
	data,
}: DataTableProps<TData, TValue>) {
	const [sorting, setSorting] = React.useState<SortingState>([])

	const table = useReactTable({
		data,
		columns,
		getCoreRowModel: getCoreRowModel(),
		getSortedRowModel: getSortedRowModel(),
		onSortingChange: setSorting,
		state: { sorting },
	})

	return (
		<Table.Root>
			<Table.Header>
				{table.getHeaderGroups().map((headerGroup) => (
					<Table.Row key={headerGroup.id}>
						{headerGroup.headers.map((header) => {
							const sorted = header.column.getIsSorted()
							const canSort = header.column.getCanSort()

							return (
								<Table.Head key={header.id}>
									{header.isPlaceholder ? null : canSort ? (
										<button
											type="button"
											onClick={header.column.getToggleSortingHandler()}
											className="inline-flex items-center gap-1.5 cursor-pointer select-none"
										>
											{flexRender(
												header.column.columnDef.header,
												header.getContext(),
											)}
											{sorted === 'asc' ? (
												<ArrowUpIcon size={14} />
											) : sorted === 'desc' ? (
												<ArrowDownIcon size={14} />
											) : (
												<ArrowUpDownIcon size={14} className="opacity-40" />
											)}
										</button>
									) : (
										flexRender(
											header.column.columnDef.header,
											header.getContext(),
										)
									)}
								</Table.Head>
							)
						})}
					</Table.Row>
				))}
			</Table.Header>
			<Table.Body>
				{table.getRowModel().rows?.length ? (
					table.getRowModel().rows.map((row) => (
						<Table.Row
							key={row.id}
							data-state={row.getIsSelected() && 'selected'}
						>
							{row.getVisibleCells().map((cell) => (
								<Table.Cell key={cell.id}>
									{flexRender(cell.column.columnDef.cell, cell.getContext())}
								</Table.Cell>
							))}
						</Table.Row>
					))
				) : (
					<Table.Row>
						<Table.Cell colSpan={columns.length} className="h-24 text-center">
							No results.
						</Table.Cell>
					</Table.Row>
				)}
			</Table.Body>
		</Table.Root>
	)
}
