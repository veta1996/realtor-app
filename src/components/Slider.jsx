import { collection, getDocs, orderBy, query, limit } from 'firebase/firestore'
import React, { useEffect, useState } from 'react'
import { db } from '../firebase'
import Spinner from './Spinner';
import { Swiper, SwiperSlide } from "swiper/react";
import SwiperCore, {
  EffectFade,
  Autoplay,
  Navigation,
  Pagination,
} from "swiper";
import { useNavigate } from 'react-router';
import {MdBathtub, MdBed} from "react-icons/md";
import {FaSquarespace} from "react-icons/fa";


const Slider = () => {

  const [listings, setListings] = useState(null);
  const [loading, setLoading] = useState(true)
  const navigate = useNavigate()
  SwiperCore.use([Autoplay, Navigation, Pagination]);

  useEffect(() => {
      const fetchListings = async() => {
          const listingsRef = collection(db, 'listings')
          const q = query(listingsRef, orderBy('timestamp', 'desc'), limit(5))
          const querySnap = await getDocs(q)
          let listings = [];
          querySnap.forEach((doc) => {
              return listings.push({
                  id: doc.id,
                  data: doc.data()
              })
          })
          setListings(listings);
          setLoading(false)
        
      }
      fetchListings()
  }, [])
  if (loading){
    return <Spinner/>
  }
  if (listings.length === 0 ){
      return <></>
  }
    return (
      listings && (
        <Swiper
        slidesPerView={1}
        navigation
        pagination={{ clickable: true, dynamicBullets: true }}
        loop='true'
        effect='fade'
        modules={[EffectFade]}
        autoplay={{ delay: 6000 }}
      >
        {listings.map(({data, id}) => (
          <SwiperSlide key={id}
          onClick={() => navigate(`/category/${data.type}/${id}`)}>
            <div
              className="w-full overflow-hidden h-[400px] 
              flex items-end"
              style={{
                background: `url(${data.imgUrls[0]}) center no-repeat`,
                backgroundSize: "cover",
              }}
            >
              {/*  */}
             <div className='text-black mx-auto my-6 rounded-lg
             max-h-[200px] overflow-hidden bg-white sm:w-[80%] p-7
             flex sm:flex-row flex-col justify-between'>
             
               {/* Address section*/}
              <div className='sm:flex-col mb-2 sm:mb-0'>
                <p className='sm:text-xl font-bold text-sm '>{data.name}</p>
                <p className='sm:text-xs text-gray-500 text-xs'>{data.address}</p>
              </div>
              <div className='flex sm:hidden py-1 items-center before:border-t before:flex-1 
                before:border-gray-300 after:border-t after:flex-1 
                after:border-gray-300'>
                </div>
              {/* Bath and Bedroom section*/}
                <div className='flex flex-row items-center mb-2 sm:mb-0 mt-2'>
                  <div className='flex mr-7'>
                  <div className='bg-blue-700 p-1 fill-white flex items-center justify-center
                  rounded-md'>
                    <MdBed className='text-white w-6 h-6'/>
                    </div>
                    <div className='ml-2'>
                        <p className='text-xs text-gray-500'>{data.bedrooms > 1 ? `Beds` : `Bed`}</p>
                        <p className='text-xs font-bold'>{data.bedrooms > 1 ? `${data.bedrooms}` : `1`}</p>
                    </div>
                  </div>

                  <div className='flex mr-7'>
                  <div className='bg-blue-700 p-1 fill-white flex items-center justify-center
                  rounded-md'>
                    <MdBathtub className='text-white w-6 h-6'/>
                    </div>
                    <div className='ml-2'>
                        <p className='text-xs text-gray-500'>{data.bathrooms > 1 ? `Baths` : `Bath`}</p>
                        <p className='text-xs font-bold'>{data.bathrooms > 1 ? `${data.bathrooms}` : `1`}</p>
                    </div>
                  </div>

                  <div className='flex mr-7'>
                  <div className='bg-blue-700 p-1 fill-white flex items-center justify-center
                  rounded-md'>
                    <FaSquarespace className='text-white w-6 h-6'/>
                    </div>
                    <div className='ml-2'>
                        <p className='text-xs text-gray-500'>Area</p>
                        <p className='text-xs font-bold'>1590 Sq Ft</p>
                    </div>
                  </div>

                  </div> {/*bath section */}
                  {/* price info*/}
                  <div className='flex sm:hidden py-1 items-center before:border-t before:flex-1 
                before:border-gray-300 after:border-t after:flex-1 
                after:border-gray-300'>
                </div>
                  <div className='flex sm:flex-col sm:items-start items-center flex-row mb-2 sm:mb-0'>
                    <p className='sm:mr-0 mr-1 text-xs text-gray-500'>{data.type === 'rent' ? 'For rent' : 'For sale'}</p>
                    <p className='text-blue-700 text-bold text-xl'>${data.discountPrice ? data.discountPrice.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",") : 
                    data.regularPrice.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",") }</p>
                  </div>
                
                </div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
      )
    )
}

export default Slider

