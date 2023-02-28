import {
  doc,
  getDoc,
} from "firebase/firestore";
import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router'

import { db } from "../firebase";
import Spinner from '../components/Spinner';
import {Swiper, SwiperSlide} from 'swiper/react'
import SwiperCore, {EffectFade, Autoplay, Navigation, Pagination} from 'swiper'
import 'swiper/css/bundle'
import {FaShare, FaMapMarkerAlt, FaBed, FaBath, FaParking} from 'react-icons/fa'
import {GiBedLamp} from 'react-icons/gi'

const Listing = () => {
  const params = useParams()
  const [listing, setListing] = useState(null);
  const [loading, setLoading] = useState(true);
  const [shareLinkCopy, setShareLinkCopy] = useState(false);

  SwiperCore.use([Autoplay, Navigation, Pagination])
  useEffect(() => {
    async function fetchListing() {
      const docRef = doc(db, "listings", params.listingId);
      const docSnap = await getDoc(docRef);
      if (docSnap.exists()) {
        setListing(docSnap.data());
        setLoading(false);
      }
    }
    fetchListing();
  }, [params.listingId]);

  if(loading){
    return <Spinner/>
  } 
  return (
    <main>
      <Swiper slidesPerView={1} navigation pagination={{type: 'progressbar'}}
      effect='fade' modules={{EffectFade}} autoplay={{delay: 3000}}>
        {listing.imgUrls.map((url, index) => (
          <SwiperSlide key={index}>
            <div className="w-full overflow-hidden h-[300px]" 
            style={{background: `url(${listing.imgUrls[index]}) center no-repeat`}}></div>
          </SwiperSlide>
        ))}
      </Swiper>
      <div className="fixed top-[10%] right-[3%] z-10 bg-white
          rounded-full cursor-pointer border-2 border-gray-400 
          w-12 h-12 flex justify-center items-center"
          onClick={() => {
            navigator.clipboard.writeText(window.location.href)
            setShareLinkCopy(true)
            setTimeout(() => {
              setShareLinkCopy(false)
            }, 2000)

          }}>
          <FaShare className="text-lg text-slate-500"/>
      </div>
      {shareLinkCopy && <p className="fixed top-[15%] right-[3%] z-10
      font-semibold border-2  text-slate-500 border-gray-400 bg-white
      rounded-md p-2 text-sm">Link Copied</p>}

      <div className="m-4 flex flex-col max-w-6xl lg:mx-auto md:flex-row p-4 rounded-lg
      bg-white lg:space-x-5">
        <div className="w-full h-[200px] px-2">
          <p className="text-2xl font-bold mb-3">
            {listing.name} - ${' '}
            {listing.offer ? 
                listing.discountPrice
                  .toString()
                  .replace(/\B(?=(\d{3})+(?!\d))/g, ",")
                : listing.regularPrice
                  .toString()
                  .replace(/\B(?=(\d{3})+(?!\d))/g, ",")
              }
              {listing.type === 'rent' ? ' / month' : ''}
          </p>
          <p className="flex items-center mt-6 mb-3 font-semibold">
            <FaMapMarkerAlt className="text-green-700 mr-1"/>
          {listing.address}</p>
          <div className="flex justify-start items-center space-x-4 w-[75%]">
            <p className="bg-red-600 w-full max-w-[200px] rounded-md text-center text-white font-semibold
            shadow-md p-1">
              {listing.type === 'rent' ? 'Rent' : 'Sale'}</p>
            <p className="bg-green-600 w-full max-w-[200px] rounded-md text-center text-white font-semibold
            shadow-md p-1">
              {listing.offer && (
              <p>${listing.regularPrice - listing.discountPrice} discount</p>
            )}</p>
          </div>
          <p className="my-3">
            <span className="font-semibold">Description</span> - {listing.description}
            </p>
            <div className="flex font-semibold text-sm space-x-2 sm:space-x-10">
              <p className="flex items-center whitespace-nowrap"><FaBed className="mr-1"/>
              {listing.bedrooms > 1 ? `${listing.bedrooms} Beds` : ` ${listing.bedrooms} Bed`}</p>
              <p className="flex items-center whitespace-nowrap"><FaBath className="mr-1"/>
              {listing.bathrooms > 1 ? `${listing.bathrooms} Baths` : `${listing.bathrooms} Bath`}</p>
              <p className="flex items-center whitespace-nowrap"><GiBedLamp className="mr-1"/>
              {listing.furnished ? 'Furnished' : 'Not Furnished'}</p>
              <p className="flex items-center whitespace-nowrap"><FaParking className="mr-1"/>
              {listing.parking ? 'Parking Spot' : 'No Parking Spot'}</p>
            </div>
        </div>
        <div className="bg-[#AA98A9] w-full h-[200px] lg-[400px] z-10 overflow-x-hidden"></div>
      </div>
    </main>
  )
}

export default Listing