import React from 'react'
import spinner1 from '../assets/svg/spinner1.svg'
const Spinner = () => {
  return (
    <div className="flex items-center justify-center fixed left-0 right-0 bottom-0 top-0 z-50">
    <div>
            <img src={spinner1} alt='Loading...' className='h-24 bg-transparent'/>
        </div>
    </div>
  )
}

export default Spinner