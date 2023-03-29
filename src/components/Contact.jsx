import { doc, getDoc } from "firebase/firestore";
import { useState } from "react";
import { useEffect } from "react";
import { toast } from "react-toastify";
import { db } from "../firebase";
import {BsPersonFill} from 'react-icons/bs'
import {IoIosMail} from 'react-icons/io'
import {FaPhoneAlt} from 'react-icons/fa'

export default function Contact({ userRef, listing }) {
  const [landlord, setLandlord] = useState(null);
  const [message, setMessage] = useState("");



  useEffect(() => {
    async function getLandlord() {
      const docRef = doc(db, "users", userRef);
      const docSnap = await getDoc(docRef);
      if (docSnap.exists()) {
        setLandlord(docSnap.data());
        console.log(docSnap.data(), 'docSnap.data()')
      } else {
        toast.error("Could not get landlord data");
      }
    }
    getLandlord();
  }, [userRef]);
  function onChange(e) {
    setMessage(e.target.value);
  }
  return (
    <>
      {landlord !== null && (
        <div className="flex flex-col w-full shadow-xl rounded px-8 pt-6 pb-8 mx-4">
          <p className="text-sm mb-3">
            Contact {landlord.name} for the {listing.name}
          </p>
          <div class="my-3 relative">
            <BsPersonFill className="absolute top-1/2 transform -translate-y-1/2 left-3 pointer-events-none
            text-blue-600 w-3 h-3"/>
            <input className="shadow w-full py-2 px-3 bg-gray-200 pl-10
            leading-tight focus:outline-none text-xs font-extralight
            border-none active:outline-none active:border-gray-200 focus:border-gray-200 focus:text-gray-700" 
            id="username" type="text" placeholder='First Name, Last Name'/>
          </div>
          <div class="my-3 relative">
            <IoIosMail className="absolute top-1/2 transform -translate-y-1/2 left-3 pointer-events-none
            text-blue-600 w-3 h-3"/>
            <input className="shadow w-full py-2 px-3 bg-gray-200 pl-10
            leading-tight focus:outline-none text-xs font-extralight
            border-none active:outline-none active:border-gray-200 focus:border-gray-200 focus:text-gray-700" 
            id="email" type="email" placeholder='Your Email Address'/>
          </div>
          <div class="my-3 relative">
            <FaPhoneAlt className="absolute top-1/2 transform -translate-y-1/2 left-3 pointer-events-none
            text-blue-600 w-3 h-3"/>
            <input className="shadow w-full py-2 px-3 bg-gray-200 pl-10
            leading-tight focus:outline-none text-xs font-extralight
            border-none active:outline-none active:border-gray-200 focus:border-gray-200 focus:text-gray-700" 
            id="number" type="text" placeholder='Your Phone'/>
          </div>
          <div className="mt-3 mb-4">
            <textarea
              name="message"
              id="message"
              rows="4"
              value={message}
              onChange={onChange}
              className="w-full px-4 py-2 text-sm font-extralight bg-gray-200 border 
              border-gray-200 transition duration-150 ease-in-out focus:text-gray-700
             focus:bg-gray-200 focus:border-gray-200"
            ></textarea>
          </div>
          <a
            href={`mailto:${landlord.email}?Subject=${listing.name}&body=${message}`}
          >
            <button className="px-7 py-3 bg-blue-600 text-white rounded text-xs uppercase 
            shadow-md hover:bg-blue-700 hover:shadow-lg focus:bg-blue-700 focus:shadow-lg 
            active:bg-blue-800 active:shadow-lg transition duration-150 ease-in-out w-full 
            text-center mb-6" type="button">
              Send Message
            </button>
          </a>
        </div>
      )}
    </>
  );
}