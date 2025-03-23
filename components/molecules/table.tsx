import { ChevronDownIcon, ChevronUpDownIcon, ChevronUpIcon } from '@heroicons/react/20/solid'
import { Dispatch, SetStateAction } from 'react'

export interface Column {
  title: string
  sort?: 'ASC' | 'DESC' | 'NONE'
}

const Table = ({
  columns,
  dataLists,
  setColumns,
  onChangeSort,
  ...props
}: {
  columns: Column[]
  dataLists: {
    [key: string]: string | number
  }[]
  setColumns: Dispatch<SetStateAction<Column[]>>
  onChangeSort?: (columnIndex: number, sortOrder: 'ASC' | 'DESC' | 'NONE') => void
} & React.HTMLProps<HTMLTableElement>) => {
  const handleSort = (index: number) => {
    setColumns((prev) => {
      const columnIndex = prev.findIndex((col, i) => i === index)
      const newSortOrder =
        prev[columnIndex].sort === 'ASC' ? 'DESC' : prev[columnIndex].sort === 'DESC' ? 'NONE' : 'ASC'
      prev[columnIndex].sort = newSortOrder

      if (onChangeSort) {
        onChangeSort(columnIndex, newSortOrder)
      }

      return [...prev]
    })
  }

  return (
    <table
      className="min-w-full table-auto border-collapse border divide-gray-200 dark:divide-gray-700 text-center"
      {...props}
    >
      <thead className="bg-gray-50 dark:bg-zinc-700">
        <tr>
          {columns.map((column, index) => (
            <th key={index} scope="col" className="px-6 py-3 border text-[1em] font-medium uppercase tracking-wider">
              <div
                className="flex justify-center items-center relative hover:cursor-pointer"
                onClick={() => handleSort(index)}
              >
                {column.title}
                <div className="relative transition-all">
                  {column.sort === 'NONE' && <ChevronUpDownIcon className="h-5 absolute -top-2.5" />}
                  {column.sort === 'ASC' && <ChevronUpIcon className="h-5 absolute -top-2.5" />}
                  {column.sort === 'DESC' && <ChevronDownIcon className="h-5 absolute -top-2.5" />}
                </div>
              </div>
            </th>
          ))}
        </tr>
      </thead>
      <tbody className="bg-white dark:bg-zinc-800 divide-gray-200 dark:divide-gray-700">
        {dataLists?.map((column, index) => (
          <tr key={index}>
            {Object.values(column).map((data, index) => {
              return (
                <td key={index} className="px-6 py-4 whitespace-nowrap text-[1em] border">
                  {data}
                </td>
              )
            })}
          </tr>
        ))}
      </tbody>
    </table>
  )
}

export default Table
