import { collection, getDocs, limit, orderBy, query, where } from 'firebase/firestore'
import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { db } from '../firebase'
import ListingItem from './ListingItem'


const RecentOffers = () => {

    const [offerListings, setOfferListings] = useState(null)

    useEffect(() => {
        const fetchListing = async() => {
        try{
            const listingRef = collection(db, 'listings')
            const q = query(listingRef,
                orderBy('timestamp', 'desc'), limit(4))
            const querySnap = await getDocs(q)
            let listings = [];
            querySnap.forEach((doc) => {
                return listings.push({
                    id: doc.id,
                    data: doc.data()
                })
            })
            setOfferListings(listings)
            console.log(offerListings, 'offerListings')
        }  catch(error){
            console.log(error)
          }
        }
        fetchListing()
    }, [])
  return (
        <div className="max-w-6xl mx-auto pt-4 space-y-6">
            {offerListings && offerListings.length > 0 && (
               <div className="m-2 mb-6">
                <h2 className='px-3 text-2xl mt-6 font-semibold tracking-wide'>Recent Offers</h2>
                <Link to='/offers'>
                    <p className="px-3 text-sm text-blue-600 hover:text-blue-800 transition duration-150 ease-in-out">
                    Show more offers
                </p>
                    </Link>
        <ul className='sm:grid sm:grid-cols-2 md:grid-cols-4 ld:grid-cols-5'>
            {offerListings.map((listing) => (
                <ListingItem listing={listing.data} key={listing.id} id={listing.id}/>
            ))}
        </ul>
        </div>
    )}
    </div>
  )
}

export default RecentOffers