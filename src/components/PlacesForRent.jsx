import { collection, getDocs, limit, orderBy, query, where } from 'firebase/firestore'
import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { db } from '../firebase'
import ListingItem from './ListingItem'

const PlacesForRent = () => {
  
    const [rentListings, setRentListings] = useState(null)

    useEffect(() => {
        const fetchListing = async() => {
        try{
            const listingRef = collection(db, 'listings')
            const q = query(listingRef,
                where("type", "==", "rent"),
                orderBy("timestamp", "desc"),
                limit(4))
            const querySnap = await getDocs(q)
            let listings = [];
            querySnap.forEach((doc) => {
                return listings.push({
                    id: doc.id,
                    data: doc.data()
                })
            })
            setRentListings(listings)
            console.log(rentListings, 'rentListings')
        }  catch(error){
            console.log(error)
          }
        }
        fetchListing()
    }, [])
  return (

        <div className="max-w-6xl mx-auto pt-4 space-y-6">
            {rentListings && rentListings.length > 0 && (
               <div className="m-2 mb-6">
                <h2 className='px-3 text-2xl mt-6 font-semibold tracking-wide'>Sale Offers</h2>
                <Link to='/category/rent'>
                    <p className="px-3 text-sm text-blue-600 hover:text-blue-800 transition duration-150 ease-in-out">
                    Show more rent offers
                </p>
                    </Link>
        <ul className='sm:grid sm:grid-cols-2 md:grid-cols-4 ld:grid-cols-5'>
            {rentListings.map((listing) => (
                <ListingItem listing={listing.data} key={listing.id} id={listing.id}/>
            ))}
        </ul>
        </div>
    )}
    </div>

  )
}

export default PlacesForRent