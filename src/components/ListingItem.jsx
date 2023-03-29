import React from 'react'
import { Link } from 'react-router-dom'
import Moment from 'react-moment'
import {MdLocationOn} from 'react-icons/md'
import {FaTrash} from 'react-icons/fa'
import {MdEdit} from 'react-icons/md'
import {MdBathtub, MdBed} from "react-icons/md";
import {FaParking} from "react-icons/fa";
import {TbSofa} from "react-icons/tb";

const ListingItem = ({listing, id, onDelete, onEdit}) => {

  return (
    <li className='relative flex flex-col justify-between items-center hover:shadow-xl p-1
    rounded-sm overflow-x-auto transition ease-in-out duration-100 m-[10px]'>
        <Link to={`/category/${listing.type}/${id}`} className="contents">
            <img src={listing.imgUrls[0]} alt={listing.description}
            className='h-[170px] w-full object-cover hover:scale-105 transition-scale 
            duration-200 ease-in'
            loading='lazy'/>
            
            <Moment fromNow className='absolute top-2 left-2 bg-green-600 text-white
            text-[8px] font-semibold rounded-md px-2 py-1 shadow-lg'>{listing.timestamp?.toDate()}</Moment>
            <p className='uppercase absolute top-2 right-2 bg-red-600 text-white
            text-[8px] font-semibold rounded-md px-2 py-1 shadow-lg'>{listing.type === 'rent' ? 'Rent' : 'Buy'}</p>
            
            <div className='w-full py-3'>
                <div className='flex items-center space-x-1'>
                    <MdLocationOn className='h-4 w-4 text-green-600' />
                    <p className='text-sm mb-[2px] text-gray-600 truncate font-extralight'>{listing.address}</p>
                </div>
                    <p className='text-black m-0 text-md truncate font-semibold antialiased hover:text-blue-600'>{listing.name}</p>
                    <div className='pb-2 flex space-x-2 items-center border-solid border-b-2 border-stone-200'>
                    <p className='text-gray-400 mt-2 font-medium text-xs line-through'>${listing.offer ? listing.regularPrice
                    .toString()
                  .replace(/\B(?=(\d{3})+(?!\d))/g, ",") : 
                    listing.regularPrice
                    .toString()
                  .replace(/\B(?=(\d{3})+(?!\d))/g, ",")}
                  {listing.type === 'rent' && '/mo'}
                  </p>
                    <p className='text-black mt-2 font-medium text-sm'>${listing.offer ? listing.discountPrice
                    .toString()
                    .replace(/\B(?=(\d{3})+(?!\d))/g, ",") : 
                    listing.regularPrice
                    .toString()
                  .replace(/\B(?=(\d{3})+(?!\d))/g, ",")}
                  {listing.type === 'rent' && '/mo'}
                  </p>
                  </div>
                
                  <div className='flex items-center mt-[10px] space-x-5'>
                    <div className='flex items-center space-x-1 text-gray-500 hover:text-green-500'>
                      <MdBed className='w-4 h-4'/>
                        <p className='text-xs'>{listing.bedrooms}</p>
                    </div>
                    <div className='flex items-center space-x-1 text-gray-500 hover:text-green-500'>
                    <MdBathtub className='w-4 h-4'/>
                        <p className='text-xs'>{listing.bathrooms}</p>
                    </div>
                    
                    {listing.parking && 
                    (<div className="flex items-center"> <FaParking className="w-4 h-4 text-gray-500 hover:text-green-500" /></div>)}
                    {listing.furnished && 
                    (<div className="flex items-center"><TbSofa className='w-4 h-4 text-gray-500 hover:text-green-500'/></div>)}
                    
                  </div>
            </div>
        </Link>
        {onDelete && (
            <FaTrash className='absolute bottom-2 right-2 h-[14px] cursor-pointer text-red-500'
            onClick={() => onDelete(listing.id)}/>
        )}
        {onEdit && (
            <MdEdit className='absolute bottom-2 right-7 h-4 cursor-pointer text-gray-500'
            onClick={() => onEdit(listing.id)}/>
        )}
    </li>
  )
}

export default ListingItem


{/*
<Moment fromNow className='absolute top-2 left-2 bg-green-600 text-white
            text-xs font-semibold rounded-md px-2 py-1 shadow-lg'>{listing.timestamp?.toDate()}</Moment>*/}