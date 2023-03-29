import React from 'react'
import { useState } from 'react'
import Spinner from '../components/Spinner';
import { toast } from 'react-toastify';
import { getStorage, ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import {getAuth} from 'firebase/auth'
import {v4 as uuidv4} from 'uuid'
import { addDoc, collection, serverTimestamp } from "firebase/firestore";
import { db } from "../firebase";
import {useNavigate} from 'react-router-dom'


const CreateListing = () => {

    const navigate = useNavigate()
    const auth = getAuth()
    const [geoLocation, setGeoLocation] = useState(true)
    const [loading, setLoading] = useState(false)
    const [formData, setFormData] = useState({
        type: 'rent',
        name: '',
        bedrooms: 1,
        bathrooms: 1,
        parking: false,
        furnished: false,
        address: '',
        description: '',
        offer: true,
        regularPrice: 0,
        discountPrice: 0,
        latitude: 0,
        longitude: 0,
        images: {}
    })
    const {type, name, bedrooms, bathrooms, parking, furnished, address, description,
    offer, regularPrice, discountPrice, latitude, longitude, images} = formData;
    const onChange = (e) => {
        let boolean = null;
        if (e.target.value === "true") {
          boolean = true;
        }
        if (e.target.value === "false") {
          boolean = false;
        }
        // Files
        if (e.target.files) {
          setFormData((prevState) => ({
            ...prevState,
            images: e.target.files,
          }));
        }
        // Text/Boolean/Number
        if (!e.target.files) {
          setFormData((prevState) => ({
            ...prevState,
            [e.target.id]: boolean ?? e.target.value,
          }));
        }
    }

    const onSubmitForm = async(e) => {
        e.preventDefault();
        //setLoading(true)
        if(+discountPrice >= +regularPrice){
            setLoading(false)
            toast.error('Discounted price needs to be less than regular price');
            return;
        } 
        if(images.length > 6){
            setLoading(false)
            toast.error('Maximum 6 images are allowed')
            return;
        }
        let geolocationMap = {}
        let location 
        if(geoLocation){
            const response = await 
            fetch(`https://maps.googleapis.com/maps/api/geocode/json?address=${address}&key=${process.env.REACT_APP_GEOCODE_API_KEY}`);
            const data = await response.json()
            console.log(data);
            geolocationMap.lat = data.results[0]?.geometry.location.lat ?? 0;
            geolocationMap.lng = data.results[0]?.geometry.location.lng ?? 0;

            location = data.status === 'ZERO_RESULTS' && undefined;
            if(location === undefined){
                setLoading(false);
                toast.error("Please enter a valid address")
                return;
            }
        } else {
            geolocationMap.lat = latitude;
            geolocationMap.lng = longitude;
        }
        const storeImage = async(image) => {
            return new Promise((resolve, reject) => {
                const storage = getStorage();
                const filename = `${auth.currentUser.uid}-${image.name}-${uuidv4()}`
                const storageRef = ref(storage, filename);
                const uploadTask = uploadBytesResumable(storageRef, image);
                uploadTask.on('state_changed', 
                (snapshot) => {
                    // Observe state change events such as progress, pause, and resume
                    // Get task progress, including the number of bytes uploaded and the total number of bytes to be uploaded
                    const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
                    console.log('Upload is ' + progress + '% done');
                    switch (snapshot.state) {
                    case 'paused':
                        console.log('Upload is paused');
                        break;
                    case 'running':
                        console.log('Upload is running');
                        break;
                    }
                }, 
                (error) => {
                    reject(error)
                }, 
                () => {
                   getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
                    resolve(downloadURL);
                    });
                }
                );

            })
        }
        const imgUrls = await Promise.all(
            [...images]
            .map((img) => storeImage(img)))
            .catch((error)=> {
                setLoading(false);
                toast.error("Images not uploaded")
                return;
            })

        const formDataCopy = {
            ...formData,
            imgUrls, 
            geolocationMap,
            timestamp: serverTimestamp(),
            userRef: auth.currentUser.uid,
        }
        delete formDataCopy.images; 
        !formDataCopy.offer && delete formDataCopy.discountPrice;
        delete formDataCopy.latitude;
        delete formDataCopy.longitude;
        const docRef = await addDoc(collection(db, 'listings'), formDataCopy)
        setLoading(false)
        toast.success('Listing Created')
        navigate(`/category/${formDataCopy.type}/${docRef.id}`)
    }

    if(loading){
        return <Spinner/>
    }
  return (
    <main className='flex flex-wrap flex-row mx-auto px-2 bg-[#3973ac]'
    >
        <div className='basis-1/2 hidden  md:flex flex-col justify-center text-white'>
            <div className='flex flex-row'>
                <p className='basis-1/2 capitalize text-2xl
                border-b mx-8 py-4 flex items-center'>
                    Why Houzez is the perfect choice?</p>
                <div className='basis-1/2 mx-8 py-4 flex flex-col flex-wrap justify-center border-b'>
                    <p className='text-3xl pb-2'>02.</p>
                    <p className='text-2xl pb-2'>Design Custom Leads Capture Forms</p>
                    <p className='text-xs'>
                Keep track of your leads without having to pay for an external CRM</p>
                </div>
            </div>
            <div className='flex flex-row mt-4'>
            <div className='basis-1/2 mx-8 py-4 flex flex-col flex-wrap justify-center border-b'>
                    <p className='text-3xl pb-2'>01.</p>
                    <p className='text-2xl pb-2'>Suitable For Agents And Agencies</p>
                    <p className='text-xs'>
                    Never miss a sale! It's never been easier to turn leads into real customers</p>
                </div>
                <div className='basis-1/2 mx-8 py-4 flex flex-col flex-wrap justify-center border-b'>
                    <p className='text-3xl pb-2'>03.</p>
                    <p className='text-2xl pb-2'>Highly Customizable Theme</p>
                    <p className='text-xs'>
                    Customize your listing according to your expectations and requirements</p>
                </div>
            </div>
        </div>
        <div className='flex-initial w-[400px] bg-white p-6 sm:my-6 
        shadow-lg'>
        <h1 className='text-bold text-center text-lg'>Create a Listing</h1>
        <form onSubmit={onSubmitForm}>
            <p className='text-sm mb-2 mt-3 font-semibold'>Sell / Rent</p>
            {/* Toggle buttons Rent/Sale */}
            <div className='flex'>
                <button 
                type='button'
                id='type'
                value='sale'
                onClick={onChange}
                className={`mr-3 px-3 py-2 font-medium text-xs uppercase shadow-md rounded
                hover:shadow-lg active:shadow focus:shadow-lg transition duration-150 ease-in-out
                w-full ${type === 'rent' ? 'bg-white text-black' : 
                'bg-slate-600 text-white'}`}>Sell</button>

                <button 
                type='button'
                id='type'
                value='rent'
                onClick={onChange}
                className={`ml-3 px-3 py-2 font-medium text-xs uppercase shadow-md rounded
                hover:shadow-lg active:shadow focus:shadow-lg transition duration-150 ease-in-out
                w-full ${type === 'sale' ? 'bg-white text-black' : 
                'bg-slate-600 text-white'}`}>Rent</button>
            </div>

            {/* input Name */}

            <p className='text-sm mb-2 mt-3 font-semibold'>Name</p>
            <input 
            type="text"
            id="name"
            value={name}
            onChange={onChange}
            placeholder="Name"
            minLength='4'
            maxLength='32'
            required
            className='w-full px-4 text-xs text-gray-700 bg-white border-gray-300
            rounded transition duration-150 ease-in-out focus:text-gray-700
            focus:bg-white focus:border-slate-600 mb-2'/>

            {/* Beds and Bath */}

            <div className='flex space-x-6 mb-2 mt-3'>
                <div>
                    <p className='text-sm font-semibold'>Bed(s)</p>
                    <input type='number'
                    id='bedrooms'
                    value={bedrooms}
                    onChange={onChange}
                    min='1'
                    max='50'
                    required
                    className='text-xs px-4 py-2 text-gray-700 bg-white
                    border border-gray-700 rounded transition ease-in-out duration-150
                    focus:text-gray-700 focus:bg-white focus:border-slate-600 text-center'
                    />

                </div>
                <div>
                    <p className='text-sm font-semibold'>Bath(s)</p>
                    <input type='number'
                    id='bathrooms'
                    value={bathrooms}
                    onChange={onChange}
                    min='1'
                    max='50'
                    required
                    className='text-xs px-4 py-2 text-gray-700 bg-white
                    border border-gray-700 rounded transition ease-in-out duration-150
                    focus:text-gray-700 focus:bg-white focus:border-slate-600 text-center'
                    />
                </div>
            </div>
                {/* Toggle buttons Parking Spot */}
            <div>
            <p className='text-sm mb-2 mt-3 font-semibold'>Parking Spot</p>
                <div className='flex'>
                    <button 
                    type='button'
                    id='parking'
                    value={true}
                    onClick={onChange}
                    className={`mr-3 px-3 py-2 font-medium text-xs uppercase shadow-md rounded
                    hover:shadow-lg active:shadow focus:shadow-lg transition duration-150 ease-in-out
                    w-full ${!parking ? 'bg-white text-black' : 
                    'bg-slate-600 text-white'}`}>Yes</button>

                <button 
                type='button'
                id='parking'
                value={false}
                onClick={onChange}
                className={`ml-3 px-3 py-2 font-medium text-xs uppercase shadow-md rounded
                hover:shadow-lg active:shadow focus:shadow-lg transition duration-150 ease-in-out
                w-full ${parking ? 'bg-white text-black' : 
                'bg-slate-600 text-white'}`}>No</button>
            </div>
            </div>
                {/* Toggle buttons furnished */}
                <p className='text-sm mb-2 mt-3 font-semibold'>Furnished</p>
                <div className='flex'>
                 <button 
                type='button'
                id='furnished'
                value={true}
                onClick={onChange}
                className={`mr-3 px-3 py-2 font-medium text-xs uppercase shadow-md rounded
                hover:shadow-lg active:shadow focus:shadow-lg transition duration-150 ease-in-out
                w-full ${!furnished ? 'bg-white text-black' : 
                'bg-slate-600 text-white'}`}>Yes</button>

                <button 
                type='button'
                id='furnished'
                value={false}
                onClick={onChange}
                className={`ml-3 px-3 py-2 font-medium text-xs uppercase shadow-md rounded
                hover:shadow-lg active:shadow focus:shadow-lg transition duration-150 ease-in-out
                w-full ${furnished ? 'bg-white text-black' : 
                'bg-slate-600 text-white'}`}>No</button>
            </div>

            {/* input Address*/}

            <p className='text-sm mb-2 mt-3 font-semibold'>Residential Address</p>
                <textarea
                type="text"
                id="address"
                value={address}
                onChange={onChange}
                required
                className='w-full px-4 text-xs text-gray-700 bg-white border-gray-300
                rounded transition duration-150 ease-in-out focus:text-gray-700
                focus:bg-white focus:border-slate-600 mb-2'/>
                {!geoLocation && (
                    <div className='flex space-x-6 justify-start mb-2'>
                        <div className=''>
                            <p className='text-xs font-semibold'>Latitude</p>
                            <input type='number' id='latitude' value={latitude}
                            onChange={onChange} required
                            min='-90' max='90'
                            className='w-full px-4 py-2 text-xs text-gray-700 bg-white
                            border border-gray-300 rounded transition-none duration-150
                            ease-in-out focus:bg-white focus:text-gray-700 focus:border-slate-600 text-center'/>
                        </div>
                        <div className=''>
                            <p className='text-xs font-semibold'>Longitude</p>
                            <input type='number' id='longitude' value={longitude}
                            onChange={onChange} required
                            min='-180' max='180'
                            className='w-full px-4 py-2 text-xs text-gray-700 bg-white
                            border border-gray-300 rounded transition-none duration-150
                            ease-in-out focus:bg-white focus:text-gray-700 focus:border-slate-600 text-center'/>
                        </div>
                    </div>
                )}
                {/*Description */}

              <p className='text-sm mb-2 mt-3 font-semibold'>Description</p>
                <textarea 
                type='textarea'
                id='description'
                value={description}
                onChange={onChange}
                required
                className='w-full px-4 text-xs text-gray-700 bg-white border-gray-300
                rounded transition duration-150 ease-in-out focus:text-gray-700
                focus:bg-white focus:border-slate-600 mb-2'/>

                {/* offer */}
                <p className='text-sm font-semibold'>Offer</p>
                <div className='flex mb-2'>
                 <button 
                    type='button'
                    id='offer'
                    value={true}
                    onClick={onChange}
                    className={`mr-3 px-3 py-2 font-medium text-xs uppercase shadow-md rounded
                    hover:shadow-lg active:shadow focus:shadow-lg transition duration-150 ease-in-out
                    w-full ${!offer ? 'bg-white text-black' : 
                    'bg-slate-600 text-white'}`}>Yes</button>

                <button 
                type='button'
                id='offer'
                value={false}
                onClick={onChange}
                className={`ml-3 px-3 py-2 font-medium text-xs uppercase shadow-md rounded
                hover:shadow-lg active:shadow focus:shadow-lg transition duration-150 ease-in-out
                w-full ${offer ? 'bg-white text-black' : 
                'bg-slate-600 text-white'}`}>No</button>
            </div>
            {/*Regular price */}
            <div className='flex items-center mb-2'>
                <div className=''>
                    <p className='text-sm font-semibold'>Regular price</p>
                    <div className='mb-2 flex justify-center w-full space-x-4 items-center'>
                        <input 
                        type='number'
                        id='regularPrice'
                        value={regularPrice}
                        onChange={onChange}
                        min='50'
                        max='40000000000'
                        required
                        className='w-fill px-4 py-2 text-xs text-gray-700 bg-white
                        border-gray-300 rounded transition duration-150 ease-in-out
                        focus:text-gray-700 focus:bg-white focus:border-slate-600 text-center'
                        />
                        {type === 'rent' && 
                        <div className=''>
                            <p className='text-xs w-full whitespace-nowrap'>$ / Month</p>
                        </div>}
                    </div>
                    
                </div>
            </div>
        {/*discounted price */}
            {offer ? 
            <div className='flex items-center mb-2'>
            <div className=''>
                <p className='text-sm font-semibold'>Discounted price</p>
                <div className='mb-6 flex justify-center w-full space-x-4 items-center'>
                    <input 
                    type='number'
                    id='discountPrice'
                    value={discountPrice}
                    onChange={onChange}
                    min='50'
                    max='40000000000'
                    required
                    className='w-fill px-4 py-2 text-xs text-gray-700 bg-white
                    border-gray-300 rounded transition duration-150 ease-in-out
                    focus:text-gray-700 focus:bg-white focus:border-slate-600 text-center'
                    />
                    {type === 'rent' && 
                    <div className=''>
                        <p className='text-xs w-full whitespace-nowrap'>$ / Month</p>
                    </div>}
                </div>
                
            </div>
        </div> : ''}

        {/*Image*/}
            <div className='mb-2'>
                    <p className='font-semibold text-sm'>Images</p>
                    <p className='text-gray-600 text-xs'>The first image will be cover (max 6)</p>
                    <input type='file'
                    id='images'
                    onChange={onChange}
                    accept=".jpg,.png,.jpeg"
                    multiple
                    required
                    className='w-full min-w-0 flex-auto cursor-pointer rounded border border-solid border-neutral-300 
                    bg-clip-padding py-1 px-3 leading-[2.15] font-normal text-neutral-700 transition duration-150 ease-in-out 
                    file:-mx-3 file:-my-1 file:cursor-pointer file:overflow-hidden file:rounded-none file:border-0 file:border-solid 
                    file:border-inherit file:bg-neutral-100 file:px-1 file:py-1 file:text-neutral-700 
                     file:transition file:duration-150 file:ease-in-out file:text-xs
                     file:[margin-inline-end:0.75rem] file:[border-inline-end-width:1px] 
                     hover:file:bg-neutral-200 focus:border-primary focus:text-neutral-700 
                    focus:shadow-[0_0_0_1px] focus:shadow-primary focus:outline-none text-xs' 
                    />
            </div>
            {/*Button*/}
            <button
            type='submit'
            className='w-full mb-2 bg-blue-600 py-2 px-3 rounded
            text-white text-xs uppercase shadow-md focus:bg-blue-700
            hover:bg-blue-700 hover:shadow-lg focus:shadow-lg
            active:bg-blue-700 active:shadow-lg
            transition ease-in-out duration-150'
            >Create Listing</button>
        </form>
        </div>
        
    </main>
  )
}

export default CreateListing


