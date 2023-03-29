import React from 'react'
import {BsHouseDoor} from 'react-icons/bs'
import {IoConstructOutline} from 'react-icons/io5'
import {GiHotSurface, GiColdHeart} from 'react-icons/gi'

const FactsFeatures = () => {
  return (
    <>
    
    <div className='flex flex-row my-2 mb-3'>
                    <IoConstructOutline className='w-8 h-8 text-blue-600 mr-2'/>
                    <div className='flex flex-col'>
                        <p className='uppercase font-thin text-xs text-gray-400'>year built</p>
                        <p className='font-semibold text-xs text-black'>2018</p>
                    </div>
                </div>
                <div className='flex flex-row my-2 mb-3'>
                    <BsHouseDoor className='w-8 h-8 text-blue-600 mr-2'/>
                    <div className='flex flex-col'>
                        <p className='uppercase font-thin text-xs text-gray-400'>stories</p>
                        <p className='font-semibold text-xs text-black'>Multi Family</p>
                    </div>
                </div>
                
                <div className='flex flex-row my-2 mb-3'>
                    <GiHotSurface className='w-8 h-8 text-blue-600 mr-2'/>
                    <div className='flex flex-col'>
                        <p className='uppercase font-thin text-xs text-gray-400'>heating</p>
                        <p className='font-semibold text-xs text-black'>No</p>
                    </div>
                </div>
                <div className='flex flex-row my-2 mb-3'>
                    <GiColdHeart className='w-8 h-8 text-blue-600 mr-2'/>
                    <div className='flex flex-col'>
                        <p className='uppercase font-thin text-xs text-gray-400'>cooling</p>
                        <p className='font-semibold text-xs text-black'>Yes</p>
                    </div>
                </div>
                

                
                
    </>
  )
}

export default FactsFeatures