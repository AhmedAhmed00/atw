import { flexRender, HeaderGroup } from '@tanstack/react-table'

interface TableHeaderProps<TData> {
  headerGroups: HeaderGroup<TData>[]
}

export function TableHeader<TData>({ headerGroups }: TableHeaderProps<TData>) {
  return (
    <thead>
      {headerGroups.map((headerGroup) => (
        <tr key={headerGroup.id} className="border-b bg-muted/50">
          {headerGroup.headers.map((header) => (
            <th
              key={header.id}
              className="h-12 px-4 text-left align-middle font-medium text-muted-foreground"
            >
              {header.isPlaceholder
                ? null
                : flexRender(
                    header.column.columnDef.header,
                    header.getContext()
                  )}
            </th>
          ))}
        </tr>
      ))}
    </thead>
  )
}

