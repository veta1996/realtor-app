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
} from "firebase/firestore";import React from 'react'
import { useState } from 'react'
import { useNavigate } from 'react-router';
import { toast } from 'react-toastify';
import { db } from "../firebase";


export default function Profile() {

  const auth = getAuth()
  const navigate = useNavigate()
  const [changeDetails, setChangeDetails] = useState(false)
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
      </div>
    </section>
    </>
  )
}
