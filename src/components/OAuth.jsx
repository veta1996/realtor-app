import React from 'react'
import {FcGoogle} from 'react-icons/fc'
import { getAuth, GoogleAuthProvider, signInWithPopup } from 'firebase/auth'
import { toast } from 'react-toastify'
import { doc, getDoc, serverTimestamp, setDoc } from "firebase/firestore";
import { db } from "../firebase";
import { useNavigate } from 'react-router';

const OAuth = () => {

  const navigate = useNavigate()
  const onGoogleClick =async() => {
      try {
        const auth = getAuth()
        const provider = new GoogleAuthProvider()
        const result = await signInWithPopup(auth, provider);
        const user = result.user;
        //check if user already is at database

        const docRef = doc(db, 'users', user.uid)
        const docSnap = await getDoc(docRef);

        if (!docSnap.exists()){
          await setDoc(docRef, {
            name: user.displayName,
            email: user.email,
            timestamp: serverTimestamp()
          })
        }
        navigate('/')
      } catch (error) {
        toast.error('Could not be authorized with Google')
        console.log(error)
      }
  }
  return (
    <button 
    type='button'
    onClick={onGoogleClick}
    className='flex items-center justify-center w-full
    bg-gray-100 text-black px-7 py-2 text-xs font-medium
    hover:bg-gray-200 active:bg-gray-200 shadow-md hover:shadow-lg active:shadow-lg
    transition duration-150 ease-in-out rounded'>
      <FcGoogle className='text-md bg-white rounded-full mr-2 font-semibold'/>Sign In With Google</button>
  )
}

export default OAuth
