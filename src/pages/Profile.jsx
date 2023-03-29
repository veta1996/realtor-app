import { getAuth, updateProfile } from 'firebase/auth';
import {
  collection,
  deleteDoc,
  doc,
  getDocs,
  orderBy,
  query,
  updateDoc,
  where,
} from "firebase/firestore";import React, { useEffect } from 'react'
import { useState } from 'react'
import { useNavigate } from 'react-router';
import { toast } from 'react-toastify';
import { db } from "../firebase";
import {FcHome} from 'react-icons/fc'
import { Link } from 'react-router-dom';
import ListingItem from '../components/ListingItem';


export default function Profile() {

  const auth = getAuth()
  const navigate = useNavigate()
  const [changeDetails, setChangeDetails] = useState(false);
  const [listings, setListings] = useState(null);
  const [loading, setLoading] = useState(true);
  const [formData, setFormData] = useState({
    name: auth.currentUser.displayName,
    email: auth.currentUser.email,
  })

  const {name, email} = formData;

  const onLogOut = () => {
    auth.signOut();
    navigate('/')
  }

  const onChangeInput = (e) => {
    setFormData((prevState) => ({
      ...prevState, [e.target.id] : e.target.value
    }))
  }

  const onSubmit = async() => {
    try {
      if(auth.currentUser.displayName !== name){
        await updateProfile(auth.currentUser, {
          displayName: name
        })
      }

      const docRef = doc(db, 'users', auth.currentUser.uid);
      await updateDoc(docRef, {
        name,
      })

      toast.success('Profile has been updated successfully')
    } catch (error) {
      toast.error('Could not update the profile details')
    }
  }

  useEffect(() => {
      const fetchUserListings = async() => {
          const lisitingRef = collection(db, 'listings');
          const q = query(lisitingRef, where('userRef', '==', auth.currentUser.uid), 
          orderBy('timestamp', 'desc'))
          const querySnap = await getDocs(q);
          let listings = [];
          querySnap.forEach((doc) => {
            return listings.push({
                id: doc.id,
                data: doc.data()
            })
          })
          setListings(listings)
          setLoading(false)
      }
      fetchUserListings()
  }, [auth.currentUser.uid])


  const onDelete = async(listingId) => {
      if(window.confirm('Please confirm that you want to delete this listing')){
        await deleteDoc(doc(db, 'listings', listingId))
        const updatedListings = listings.filter((listing) => listing.id !== listingId)
        setListings(updatedListings)
        toast.success("The listing has been deleted successfully")
      }
  }

  const onEdit = (listingId) => {
    navigate(`/edit-listing/${listingId}`)
  }
  return (
    <>
    <section className='max-w-6xl mx-auto flex justify-center items-center flex-col w-full p-4 bg-white border border-gray-200 rounded-lg shadow sm:p-6 md:p-8'>
      <h1 className='text-2xl font-bold text-gray-900 text-center mt-6'>My Profile</h1>
      <div className='w-full md:w-[50%] mt-6 px-3'>
        <form className='space-y-4'>
        <div>
            <label for="name" className="block mb-2 text-sm font-semibold text-gray-900">Your Name</label>
            <input type="text" nameName="email" id="name" 
            value={name}
            disabled={!changeDetails}
            onChange={onChangeInput}
            className={`w-full px-2 py-2 text-sm text-gray-700 bg-white border-gray-300
            rounded transition ease-in-out mb-2
            focus:border focus:border-gray-200 focus:ring-1 focus:ring-gray-300
            active:bg-gray-100 active:outline active:ring-2 active:ring-gray-300
            active:border-gray-400 
               required ${changeDetails && 'bg-red-200 focus:bg-red-200'}`}/>
        </div>
        <div>
            <label for="email" className="block mb-2 text-sm font-semibold text-gray-900">Your email</label>
            <input type="text" name="email" value={email} disabled
            id="email" className="w-full px-2 py-2 text-sm text-gray-700 bg-white border-gray-300
            rounded transition ease-in-out mb-2 
             focus:ring-blue-500 focus:border-blue-500 block p-2.5 required" />
        </div>
         
        <div className='flex justify-between whitespace-normal sm:text-lg mb-6 font-semibold text-gray-900'>
          <p className='flex items-center text-xs'>Do you want to change your name?
          <span className='text-red-600 hover:text-red-700 transition ease-in-out
          duration-200 ml-1 cursor-pointer'
          onClick={() => {
            changeDetails && onSubmit()
            setChangeDetails(prevState => !changeDetails)}}>
            {changeDetails ? 'Apply changes' : 'Edit'}
          </span>
          </p>
          <p className='text-white bg-red-600 hover:bg-red-700 focus:ring-4 focus:outline-none focus:ring-red-300 
          font-medium rounded-lg text-sm px-4 py-2 text-center transition 
          duration-200 ease-in-out cursor-pointer'
          onClick={onLogOut}>Sign Out</p>
        </div>
        </form>
        
      </div>
    </section>

    <div className='max-w-6xl px-3 mt-6 mx-auto'>
      {!loading && listings.length > 1 && (
        <>
        <h2 className='text-2xl text-center font-semibold mb-6'>My Listings</h2>
        <ul className='sm:grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4
        2xl:grid-cols-5 mt-6 mb-6'>
          {listings.map((listing)=> (
          <ListingItem listing={listing.data} key={listing.id} id={listing.id}
          onDelete={() => onDelete(listing.id)}
          onEdit={()=> onEdit(listing.id)}/>
        ))}</ul>
        </>
      )}
    </div>
    </>
  )
}

