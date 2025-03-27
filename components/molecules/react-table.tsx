import React, { FC, useEffect, useState } from 'react';
import {
  useReactTable,
  getCoreRowModel,
  getSortedRowModel,
  getFilteredRowModel,
  getExpandedRowModel,
  getPaginationRowModel,
  flexRender,
} from '@tanstack/react-table';
import Skeleton from 'react-loading-skeleton';
import { SortDownIcon, SortIcon, SortUpIcon } from '@/components/ui/icons/SortIcon';
import NoResult from '../ui/illustrations/NoResult';

type Props = {
  columns: any;
  data: any;
  onSort?: any;
  onFilters?: any;
  columnFilters?: boolean;
  containerClass?: string;
  rowSelectType?: string;
  rowSelect?: boolean;
  selectedRows?: any;
  loading?: boolean;
  noData?: boolean;
  styles?: any;
  perPage?: any;
  hiddenCols?: any;
  hideHeader?: boolean;
};

const ReactTable: FC<Props> = ({
  columns,
  data,
  onSort,
  onFilters,
  columnFilters = false,
  rowSelectType = 'checkbox',
  rowSelect = false,
  selectedRows,
  loading,
  noData,
  perPage = 10,
  hiddenCols = [],
  hideHeader = false,
}) => {

  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    getExpandedRowModel: getExpandedRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    state: {
      columnVisibility: hiddenCols.reduce((acc: any, col: string) => ({ ...acc, [col]: false }), {}),
    },
  });

  useEffect(() => {
    if (onSort) {
      onSort(table.getState().sorting);
    }
  }, [table.getState().sorting]);

  useEffect(() => {
    if (onFilters) {
      onFilters(table.getState().columnFilters);
    }
  }, [table.getState().columnFilters]);

  return (
    <div className="relative overflow-x-auto border dark:border-gray-700 sm:rounded-lg" style={{ minHeight: '13rem' }}>
      <table className='w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400'>
        {!hideHeader && (
          <thead className='text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400'>
            {table.getHeaderGroups().map((headerGroup) => (
              <tr key={headerGroup.id}>
                {headerGroup.headers.map((header) => (
                  <th key={header.id} scope="col" className="px-6 py-3">
                    <div>
                      {flexRender(header.column.columnDef.header, header.getContext())}
                      {header.column.getCanSort() && (
                        <span {...header.column.getToggleSortingHandler()}>
                          {header.column.getIsSorted() === 'desc' ? <SortUpIcon /> : <SortDownIcon />}
                        </span>
                      )}
                    </div>
                  </th>
                ))}
              </tr>
            ))}
          </thead>
        )}
        <tbody>
          {loading
            ? [...Array(perPage)].map((_, i) => (
              <tr key={i} className='bg-white border-b dark:bg-gray-800 dark:border-gray-700 border-gray-200'>
                {columns.map((_: any, index: any) => (
                  <td key={index}><Skeleton style={{ height: '1.435rem' }} /></td>
                ))}
              </tr>
            ))
            : noData
              ? <tr>
                  <td colSpan={columns?.length} className='px-6 py-4 text-center font-semibold text-gray-500'>
                    <div className='flex justify-center w-full text-emerald-500'>
                      {/* <img src="/img/no-result.svg" alt="" style={{ width: '10rem' }} /> */}
                      <NoResult />
                    </div>
                    <span>Maaf, belum ada data</span>
                  </td>
                </tr>
              : table.getRowModel()?.rows?.map((row) => {
                return(
                <tr key={row.id} className='bg-white border-b dark:bg-gray-800 dark:border-gray-700 border-gray-200'>
                  {row.getVisibleCells().map((cell) => (
                    <td key={cell.id} className='px-6 py-4'>{flexRender(cell.column.columnDef.cell, cell.getContext())}</td>
                  ))}
                </tr>
              )})}
        </tbody>
      </table>
    </div>
  );
};

export default ReactTable;