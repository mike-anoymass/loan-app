import React, { useEffect } from 'react'
import { useNavigate } from 'react-router-dom';
import SmilingGif from "../../../assets/smiling.gif";

const Final = () => {

  const navigate = useNavigate()

  useEffect(() => {
    setTimeout(() => {
      navigate("/category/myApplications")
    }, 6000)
  }, [])

  return (
    <div className='flex flex-col items-center justify-center w-full h-full'>
      <p className='text-center md:text-lg'>
        Your loan application is being processed and you will contacted in less than an hour
      </p>
      <img src={SmilingGif} alt="Success" className='rounded-full my-7' />

      <p className='text-center md:text-lg italic'>
        Thank you for Choosing QuickLoans !
      </p>
    </div>
  )
}

export default Final
