import { flexRender, Row } from '@tanstack/react-table'

interface TableBodyProps<TData> {
  rows: Row<TData>[]
  columnsCount: number
}

export function TableBody<TData>({ rows, columnsCount }: TableBodyProps<TData>) {
  return (
    <tbody>
      {rows?.length ? (
        rows.map((row) => (
          <tr
            key={row.id}
            className="border-b transition-colors hover:bg-muted/50"
          >
            {row.getVisibleCells().map((cell) => (
              <td key={cell.id} className="p-4 align-middle">
                {flexRender(
                  cell.column.columnDef.cell,
                  cell.getContext()
                )}
              </td>
            ))}
          </tr>
        ))
      ) : (
        <tr>
          <td
            colSpan={columnsCount}
            className="h-24 text-center text-muted-foreground"
          >
            No results found.
          </td>
        </tr>
      )}
    </tbody>
  )
}

