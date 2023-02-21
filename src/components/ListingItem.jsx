import React from 'react'
import { Link } from 'react-router-dom'
import Moment from 'react-moment'
import {MdLocationOn} from 'react-icons/md'
import {FaTrash} from 'react-icons/fa'
import {MdEdit} from 'react-icons/md'

const ListingItem = ({listing, id, onDelete, onEdit}) => {

  return (
    <li className='relative flex flex-col justify-between items-center shadow-md hover:shadow-xl
    rounded-md overflow-x-auto transition-shadow duration-150 m-[10px]'>
        <Link to={`/category/${listing.type}/${id}`} className="contents">
            <img src={listing.imgUrls[0]} alt={listing.description}
            className='h-[170px] w-full object-cover hover:scale-105 transition-scale 
            duration-200 ease-in'
            loading='lazy'/>
            <Moment fromNow className='absolute top-2 left-2 bg-[#3377cc] text-white
            text-xs font-semibold rounded-md px-2 py-1 shadow-lg'>{listing.timestamp?.toDate()}</Moment>
            <div className='w-full p-[10px]'>
                <div className='flex items-center space-x-1'>
                    <MdLocationOn className='h-4 w-4 text-green-600' />
                    <p className='font-semibold text-sm mb-[2px] text-gray-600 truncate'>{listing.address}</p>
                </div>
                    <p className='font-semibold m-0 text-lg truncate'>{listing.name}</p>
                    <p className='text-[#457b9d] mt-2 font-semibold'>${listing.offer ? listing.discountPrice
                    .toString()
                    .replace(/\B(?=(\d{3})+(?!\d))/g, ",") : 
                    listing.regularPrice
                    .toString()
                  .replace(/\B(?=(\d{3})+(?!\d))/g, ",")}
                  {listing.type === 'rent' && ' / month'}
                  </p>
                  <div className='flex items-center mt-[10px] space-x-3'>
                    <div className='flex items-center space-x-1'>
                        <p className='font-bold text-sm'>{listing.bedrooms > 1 ? `${listing.bedrooms} Beds` : `${listing.bedrooms} Bed`}</p>
                    </div>
                    <div className='flex items-center space-x-1'>
                        <p className='font-bold text-sm'>{listing.bathrooms > 1 ? `${listing.bathrooms} Baths` : `${listing.bathrooms} Bath`}</p>
                    </div>
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