import { doc, getDoc } from "firebase/firestore";
import { useState } from "react";
import { useEffect } from "react";
import { useParams } from "react-router-dom";
import Spinner from "../components/Spinner";
import { db } from "../firebase";
import { Swiper, SwiperSlide } from "swiper/react";
import SwiperCore, {
  EffectFade,
  Autoplay,
  Navigation,
  Pagination,
} from "swiper";
import "swiper/css/bundle";
import {
  FaShare,
  FaMapMarkerAlt,
  FaBed,
  FaBath,
  FaParking,
  FaChair,
} from "react-icons/fa";
import { getAuth } from "firebase/auth";
import Contact from "../components/Contact";
import MapSection from "../components/MapSection";
import {MdLocationOn} from 'react-icons/md'
import FactsFeatures from "../components/FactsFeatures";

function Listing() {
  const auth = getAuth();
  const params = useParams();
  const [listing, setListing] = useState(null);
  const [loading, setLoading] = useState(true);
  const [shareLinkCopied, setShareLinkCopied] = useState(false);
  const [contactLandlord, setContactLandlord] = useState(false);
  SwiperCore.use([Autoplay, Navigation, Pagination]);

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
  if (loading) {
    return <Spinner />;
  }
  return (
    <main>
      <Swiper
        slidesPerView={1}
        navigation
        pagination={{ type: "progressbar" }}
        effect="fade"
        modules={[EffectFade]}
        autoplay={{ delay: 3000 }}
      >
        {listing.imgUrls.map((url, index) => (
          <SwiperSlide key={index}>
            <div
              className="relative w-full overflow-hidden h-[400px]"
              style={{
                background: `url(${listing.imgUrls[index]}) center no-repeat`,
                backgroundSize: "cover",
              }}
            ></div>
          </SwiperSlide>
        ))}
      </Swiper>
      <div
        className="fixed top-[18%] right-[3%] z-10 bg-white cursor-pointer border-2 
        border-gray-400 rounded-full w-10 h-10 flex justify-center items-center"
        onClick={() => {
          navigator.clipboard.writeText(window.location.href);
          setShareLinkCopied(true);
          setTimeout(() => {
            setShareLinkCopied(false);
          }, 2000);
        }}
      >
        <FaShare className="text-sm text-slate-500" />
      </div>
      {shareLinkCopied && (
        <p className="fixed top-[26%] right-[5%] font-semibold border-2 
        border-gray-400 rounded-md bg-white z-10 p-2 text-xs">
          Link Copied
        </p>
      )}

      <div className="m-4 flex flex-wrap max-w-6xl lg:mx-auto p-4 rounded-lg 
       bg-white">
        <div className="w-full sm:w-2/3 p-5">
          <div className='pb-2 flex items-center space-x-2 flex-col
          justify-between sm:flex-row'>

        <p className='text-black m-0 text-xl truncate font-semibold antialiased'>{listing.name}</p>
                  <p className='text-black font-semibold text-xl'>$ {listing.offer ? listing.discountPrice
                    .toString()
                    .replace(/\B(?=(\d{3})+(?!\d))/g, ",") : 
                    listing.regularPrice
                    .toString()
                  .replace(/\B(?=(\d{3})+(?!\d))/g, ",")}
                  {listing.type === 'rent' && '/mo'}
                  </p>
             </div>   
             <div className="border-solid border-b-2 border-stone-200">  
                <ul className="flex flex-row items-center space-x-2 sm:space-x-10 text-xs font-light my-6">
            <li className="flex items-center whitespace-nowrap">
              <FaBed className="w-4 h-4 text-green-400 mr-1" />
              {+listing.bedrooms > 1 ? `${listing.bedrooms} Beds` : "1 Bed"}
            </li>
            <li className="flex items-center whitespace-nowrap">
              <FaBath className="w-4 h-4 text-green-400 mr-1" />
              {+listing.bathrooms > 1 ? `${listing.bathrooms} Baths` : "1 Bath"}
            </li>
            <li className="flex items-center whitespace-nowrap">
              <FaParking className="w-4 h-4 text-green-400 mr-1" />
              {listing.parking ? "Parking spot" : "No parking"}
            </li>
            <li className="flex items-center whitespace-nowrap">
              <FaChair className="w-4 h-4 text-green-400 mr-1" />
              {listing.furnished ? "Furnished" : "Not furnished"}
            </li>
          </ul>
            </div>
         
         <div className="my-6 border-solid border-b-2 border-stone-200">
            <p className="font-semibold text-lg mb-6">Description</p>
            <p className="text-xs font-extralight mb-6">{listing.description}</p>
         </div>

        <div className="my-6 flex sm:flex-row items-center justify-center space-x-2 
        sm:justify-between flex-col">
         <p className="font-semibold text-lg">Location</p>
         <div className="flex flex-row items-center"> 
         <MdLocationOn className='h-4 w-4 text-green-400 mr-1'/>
         <p className="text-sm font-extralight">{listing.address}</p>
         </div>
                   
      </div>
      <div className="w-full h-[200px] md:h-[300px] z-10 overflow-x-hidden my-6 md:mt-0 md:ml-2
      border-solid border-b-2 border-stone-200">
            <MapSection listing={listing}/>
        </div>

        <div className="border-b-2 border-gray-200 pb-6">
        <p className="font-semibold text-lg my-6">Facts and Features</p>
            <div className="flex flex-row flex-wrap justify-between">
            <FactsFeatures/>
            </div>
        </div>
         
        </div> {/* first div*/}

        <div className="w-full sm:w-1/3">
        {listing.userRef !== auth.currentUser?.uid && !contactLandlord && (
            <Contact userRef={listing.userRef} listing={listing} />
          )}
        </div>
      </div>
    </main>
  )
}

export default Listing

