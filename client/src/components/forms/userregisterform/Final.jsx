import React, { useEffect } from 'react'
import checkMark from "../../../assets/checkmark.gif"
import { useNavigate } from 'react-router-dom'

const Final = () => {
  const navigate = useNavigate()

  useEffect(() => {
    setTimeout(()=> navigate("/"), 3000)
  }, [])

  return (
    <div className='w-full h-full bg-gray-400 border-0 rounded-full'>
      <img src={checkMark} alt="Done" className='w-full h-full'/>
    </div>
  )
}

export default Final
