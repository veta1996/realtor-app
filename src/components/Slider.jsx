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
          console.log(listings)
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
        pagination={{ type: "progressbar" }}
        effect="fade"
        modules={[EffectFade]}
        autoplay={{ delay: 3000 }}
      >
        {listings.map(({data, id}) => (
          <SwiperSlide key={id}
          onClick={() => navigate(`/category/${data.type}/${id}`)}>
            <div
              className="relative w-full overflow-hidden h-[300px]"
              style={{
                background: `url(${data.imgUrls[0]}) center no-repeat`,
                backgroundSize: "cover",
              }}
            >
              <p className='top-3 left-1 bg-[#457b9d] text-[#f1faee] rounded-br-3xl absolute p-2
              font-medium shadow-lg opacity-90'>{data.name}</p>
              <p className='absolute bottom-3 left-1 text-[#f1faee] bg-[#e63946] shadow-lg
              opacity-90 p-2 rounded-br-3xl'>
                ${data.discountPrice  ?? 
                data.regularPrice }
                {data.type === 'rent' ? ' / month' : ' for sale'}</p>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
      )
    )
}

export default Slider
