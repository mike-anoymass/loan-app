import React from 'react'
import { Link } from 'react-router-dom'
const NotFound = () => {
  return (
    <div className='flex flex-col justify-center items-center h-screen bg-gray-200'>
        <h1 className='font-bold'>OOPS! Page not found</h1>
        <p>
            Go to <Link className='underline' to="/">home page</Link> instead
        </p>
        
    </div>
  )
}

export default NotFound
