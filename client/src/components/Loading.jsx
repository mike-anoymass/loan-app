import React from 'react'
import loadingGif from '../assets/loading.gif'

const Loading = () => {
  return (
    <div className='absolute w-full h-full flex items-center top-0 right-0 justify-center'>
      <img src={loadingGif} alt="Loading ..." className='rounded-2xl w-14' />
    </div>
  )
}

export default Loading
