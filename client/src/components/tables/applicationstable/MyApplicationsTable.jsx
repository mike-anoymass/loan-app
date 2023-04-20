import React, { useEffect, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import { useTable, useSortBy, useFilters, useGlobalFilter, usePagination } from 'react-table';
import ColumnFilter from './ColumnFilter';
import GlobalFilter from './GlobalFilter';

function MyApplicationsTable({ data, columns }) {
  const navigate = useNavigate()

  const defaultColumn = useMemo(() => {
    return {
      Filter: ColumnFilter
    }
  }, [])

  const tableHooks = hooks => {
    hooks.visibleColumns.push(columns => [
      ...columns,
      {
        Header: "Actions",
        Footer: "Actions",
        accessor: "actions",
        Cell: ({row}) => { return (
            <>
              <button 
                onClick={() => handleDetails(row.values)} 
                className="p-2 border-2 rounded-xl bg-green-400">
                  All Details
              </button>
            </>
          )},
        disableFilters: true
      }
    ])
  }


  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    page,
    nextPage,
    previousPage,
    canPreviousPage,
    canNextPage,
    pageOptions,
    gotoPage,
    pageCount,
    setPageSize,
    prepareRow,
    state,  
    setGlobalFilter, 
  } = useTable({ columns, data, defaultColumn} , useFilters, useGlobalFilter, useSortBy, usePagination, tableHooks)

  const { globalFilter, pageIndex, pageSize } = state

  const handleDetails= loan => {
    navigate(`/loanDetails/${loan.id}`)
  } 

  useEffect(() => {
    setPageSize(5)
  }, [])

  return (

    <>
      {/* On mobile */}
      <div className='w-full md:hidden flex flex-col justify-center overflow-auto'> 
        {
          data.map(row => {
            return (
               <div class="w-full my-5 p-6 bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700">
                  <div className='flex items-center justify-between'>
                    <p className='text-2xl font-bold py-2 '>
                      ID: {row.id}
                    </p>
                    <p className='text-lg py-2 mr-4'>
                      Percentage: {row.termId}
                    </p>
                  </div>

                  <div className='border-r-2 border-gray-300'>
                      <h5 class="mb-2 pt-2   text-lg font-semibold tracking-tight text-gray-900 dark:text-white">Reason for Loan ?</h5>
                      <p class="mb-5 font-normal text-gray-500 dark:text-gray-400">{row.loanFor}</p>
                      <p className='text-lg py-2'>
                        Borrowed: {row.amount.toLocaleString('en-MW', { style: 'currency', currency: 'MWK' })}
                      </p>
                      <p className='text-lg py-2 mb-2'>
                        Payback: {row.paybackAmount.toLocaleString('en-MW', { style: 'currency', currency: 'MWK' })}
                      </p>
                  </div>
                  <button 
                    class="inline-flex items-center text-blue-600 hover:underline cursor-pointer text-lg"
                    onClick={() => handleDetails(row)}
                  >
                      More Details
                      <svg class="w-5 h-5 ml-2" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path d="M11 3a1 1 0 100 2h2.586l-6.293 6.293a1 1 0 101.414 1.414L15 6.414V9a1 1 0 102 0V4a1 1 0 00-1-1h-5z"></path><path d="M5 5a2 2 0 00-2 2v8a2 2 0 002 2h8a2 2 0 002-2v-3a1 1 0 10-2 0v3H5V7h3a1 1 0 000-2H5z"></path></svg>
                  </button>
                </div>
            )
          })
        }

      </div>

      {/* On desktop */}
      <div className='w-full hidden md:flex flex-col items-center justify-center'>
        <GlobalFilter filter={globalFilter} setFilter={setGlobalFilter}/>
        <table {...getTableProps()} className="min-w-full text-left font-light overflow-auto">
          <thead>
            {
              headerGroups.map(headerGroup =>
                <tr {...headerGroup.getHeaderGroupProps()}>
                  {
                    headerGroup.headers.map(col => 
                      <th {...col.getHeaderProps(col.getSortByToggleProps())} className='px-6 py-4'>
                        {col.render("Header")}
                        <span>
                          {col.isSorted ? (col.isSortedDesc ? ' ▼' : ' ▲') :''}
                        </span>
                        <div>
                          {
                            col.canFilter ? col.render('Filter') : null
                          }
                        </div>
                      </th>
                    )
                  }
                </tr> 
              )
            }  
          </thead>

          <tbody {...getTableBodyProps()}>
            {
              page.map(row => {
                prepareRow(row)
                return  (
                  <tr {...row.getRowProps()}
                    className='border-b transition duration-300 ease-in-out hover:bg-neutral-100 dark:border-neutral-500 dark:hover:bg-neutral-600'>
                    {
                      row.cells.map(cell => 
                      <td {...cell.getCellProps} className='whitespace-nowrap px-6 py-4'>
                        {cell.render("Cell")}
                      </td>)
                    }
                    
                  </tr>
                )   
              })
            }
          </tbody>
        </table>

        <div className='gap-3'>
          Page{' '}
          <strong>
            {pageIndex + 1 } of {pageOptions.length}
          </strong>
          <span>
            {' | '} Go to page {' '} 
            <input type="number" defaultValue={pageIndex + 1} onChange={(e) => {
              const pageNumber = e.target.value ? Number(e.target.value) -1 : 0
              gotoPage(pageNumber)
            }} className='w-10 border-2'/>
          </span>
          <select value={pageSize} className="border-2"
            onChange={e => setPageSize(Number(e.target.value))}
          >
            {
              [5,10,15,20,25].map(pageSize => (
                <option value={pageSize} key={pageSize}>
                  Show {pageSize}
                </option>
              ))
            }
          </select>
          <button onClick={() => gotoPage(0)} disabled={!canPreviousPage}>{' << '}</button>
          <button onClick={() => previousPage()} disabled={!canPreviousPage} className='border-2 px-2 py-1 mx-2 my-2 rounded-2xl bg-gray-300'>Previous</button>
          <button onClick={() => nextPage()}  disabled={!canNextPage} className='border-2 px-2 py-1 mx-2 my-2 rounded-2xl bg-gray-300'>Next</button>
          <button onClick={() => gotoPage(pageCount - 1)} disabled={!canNextPage} >{' >> '}</button>
        </div>
      </div>
    </>
  )
}

export default MyApplicationsTable;
