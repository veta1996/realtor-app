import { collection, getDocs, limit, orderBy, query, startAfter, where } from 'firebase/firestore'
import React, { useEffect, useState } from 'react'
import { toast } from 'react-toastify'
import ListingItem from '../components/ListingItem'
import Spinner from '../components/Spinner'
import { db } from '../firebase'


export default function Offers() {

  const [loading, setLoading] = useState(true)
  const [listings, setListings] = useState(null)
  const [lastFetchedListing, setLastFetchedListing] = useState(null)
  useEffect(() => {
      const fetchData = async() => {
        try {
          const listingsRef = collection(db, 'listings')
          const q = query(listingsRef, 
            where('offer', '==', true),
            orderBy('timestamp', 'desc'),
            limit(8)
            )
            const querySnap = await getDocs(q)
            const lastVisible = querySnap.docs[querySnap.docs.length - 1]
            setLastFetchedListing(lastVisible)
            const listings = []
            querySnap.forEach((doc) => {
              return listings.push({
                id: doc.id,
                data: doc.data()
              })
            })
            setListings(listings)
            setLoading(false)
        } catch (error) {
          toast.error("Could not fetch listings")
          console.log(error)
        }
      }
      fetchData()
  }, [])
console.log(listings)
console.log(lastFetchedListing, 'last')


      const onFetchMoreListings = async() => {
        try {
          const listingRef = collection(db, 'listings');
          const q = query(listingRef,
            where('offer', '==', true),
            orderBy('timestamp', 'desc'),
            startAfter(lastFetchedListing),
            limit(4))
            const querySnap = await getDocs(q)
            const lastVisible = querySnap.docs[querySnap.docs.length -1]
            setLastFetchedListing(lastVisible)
            const listings = []
            querySnap.forEach((doc) => {
              return listings.push({
                id: doc.id, 
                data: doc.data()
              })
            })
            setListings((prevState) => [...prevState, ...listings])
            setLoading(false)

        } catch (error) {
          toast.error("Could not fetch more listings")
        }
      }
  return (
    <div className="max-w-6xl mx-auto pt-4 space-y-6">
      <h2 className='px-3 text-3xl mt-6 font-bold text-center'>Offers</h2>
      {loading ? (
        <Spinner/>
      ) : listings && listings.length > 0 ? (
        <>
        <main>
          <ul className='sm:grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5'>
          {listings.map((item) => (
            <ListingItem listing={item.data} key={item.id} id={item.id} />
          ))}
          </ul>
        </main>
        {lastFetchedListing && (
          <div className='flex justify-center items-center '>
            <button onClick={onFetchMoreListings} 
                className="bg-white px-3 py-1.5 text-gray-700 border border-gray-300 mb-6 mt-6 hover:border-slate-600 rounded transition duration-150 ease-in-out"
                >Load more</button>
          </div>
        )}
        </>
      ) : (<p>There are no current offers</p>)
        }
    </div>
  )
}
