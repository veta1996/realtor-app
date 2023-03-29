import { collection, getDocs, orderBy, query, where, limit } from 'firebase/firestore'
import React, { useEffect, useState } from 'react'
import { db } from '../firebase'
import ListingItem from './ListingItem'
import { Link } from 'react-router-dom'


const PlacesForSale = () => {
    const [saleListings, setSaleListings] = useState(null)

    useEffect(() => {
            const fetchData = async() => {
                try {
                    const listingsRef = collection(db, 'listings')
                    const q = query(listingsRef, 
                        where('type', '==', 'sale'),
                        orderBy('timestamp', 'desc'), 
                        limit(4))
                    const querySnap = await getDocs(q)
                    let listings = []
                    querySnap.forEach((doc) => {
                        return listings.push({
                            id: doc.id,
                            data: doc.data()
                        })
                    })
                    setSaleListings(listings)
                    
                } catch (error) {
                    console.log(error)
                }
            }
            fetchData()
    }, [])
    console.log(saleListings, 'saleListings')
  return (
    <div className="max-w-6xl mx-auto pt-4 space-y-6">
        {saleListings && saleListings.length > 0 && (
        <div className="m-2 mb-6">
                <h2 className='px-3 text-2xl mt-6 font-semibold tracking-wide'>Rent Offers</h2>
                <Link to='/category/sale'>
                    <p className="px-3 text-sm text-blue-600 hover:text-blue-800 transition duration-150 ease-in-out">
                    Show more sale offers
                </p>
                    </Link>
                    <ul className='sm:grid sm:grid-cols-2 md:grid-cols-4 ld:grid-cols-5'>
        
            {saleListings.map((listing) => (
                <ListingItem listing={listing.data} id={listing.id} key={listing.id} />
            ))}
        </ul>
        </div>
        )}
    </div>
  )
}

export default PlacesForSale