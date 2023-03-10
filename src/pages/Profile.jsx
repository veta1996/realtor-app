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
    <section className='max-w-6xl mx-auto flex justify-center items-center flex-col'>
      <h1 className='text-3xl text-center mt-6 font-bold'>My Profile</h1>
      <div className='w-full md:w-[50%] mt-6 px-3'>
        <form>
          <input type='text' id='name' value={name}
          disabled={!changeDetails}
          onChange={onChangeInput}
          className={`w-full mb-6 px-4 py-2 text-xl text-gray-700 bg-white border border-gray-300
          rounded transition ease-in-out ${changeDetails && 'bg-red-200 focus:bg-red-200'}`}/>

          <input type='text' id='email' value={email}
          disabled
          className='w-full mb-6 px-4 py-2 text-xl text-gray-700 bg-white border border-gray-300
          rounded transition ease-in-out'/>

        <div className='flex justify-between whitespace-normal text-sm sm:text-lg mb-6'>
          <p className='flex items-center'>Do you want to change your name?
          <span className='text-red-600 hover:text-red-700 transition ease-in-out
          duration-200 ml-1 cursor-pointer'
          onClick={() => {
            changeDetails && onSubmit()
            setChangeDetails(prevState => !changeDetails)}}>
            {changeDetails ? 'Apply changes' : 'Edit'}
          </span>
          </p>
          <p className='text-blue-600 hover:text-blue-800 transition 
          duration-200 ease-in-out cursor-pointer'
          onClick={onLogOut}>Sign Out</p>
        </div>
        </form>
        <button type='submit' className=' w-full bg-blue-600 text-white 
        text-lg px-7 py-2 uppercase rounded hover:bg-blue-700 transition duration-200 ease-in-out'>
          <Link to='/create-listing' className='flex justify-center items-center'>
            <FcHome className='mr-2'/>Sell or rent your home</Link>
          </button>
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
