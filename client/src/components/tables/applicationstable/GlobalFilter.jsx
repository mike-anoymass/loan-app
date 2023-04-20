import React from 'react'

const GlobalFilter = ({ filter, setFilter }) => {
  return (
    <div className='p-5'>
        <input 
            type="text" 
            value={filter} 
            onChange={(e) => setFilter(e.target.value)} 
            className='border-2 p-1 text-center'  
            placeholder='Search Loans'
        />
    </div>
  )
}

export default GlobalFilter
