import React from 'react'
import {FcGoogle} from 'react-icons/fc'
const OAuth = () => {
  return (
    <button className='flex items-center justify-center w-full
    bg-red-700 text-white px-7 py-2 uppercase text-xs font-medium
    hover:bg-red-800 active:bg-red-900 shadow-md hover:shadow-lg active:shadow-lg
    transition duration-150 ease-in-out rounded'>
      <FcGoogle className='text-md bg-white rounded-full mr-2'/>Continue with Google</button>
  )
}

export default OAuth
