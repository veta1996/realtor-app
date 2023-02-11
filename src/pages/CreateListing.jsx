import React from 'react'
import { useState } from 'react'

const CreateListing = () => {
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
    })
    const {type, name, bedrooms, bathrooms, parking, furnished, address, description,
    offer, regularPrice, discountPrice} = formData
    const onChange = (e) => {
        let boolean = null;
        if (e.target.value === "true") {
          boolean = true;
        }
        if (e.target.value === "false") {
          boolean = false;
        }
    }
  return (
    <main className='max-w-md mx-auto px-2'>
        <h1 className='text-bold text-center text-3xl'>Create a Listing</h1>
        <form>
            <p className='text-lg mt-6 font-semibold'>Sell / Rent</p>
            {/* Toggle buttons Rent/Sale */}
            <div className='flex'>
                <button 
                type='button'
                id='type'
                value='rent'
                onClick={onChange}
                className={`mr-3 px-3 py-2 font-medium text-sm uppercase shadow-md rounded
                hover:shadow-lg active:shadow focus:shadow-lg transition duration-150 ease-in-out
                w-full ${type === 'rent' ? 'bg-white text-black' : 
                'bg-slate-600 text-white'}`}>Sell</button>

                <button 
                type='button'
                id='type'
                value='sale'
                onClick={onChange}
                className={`ml-3 px-3 py-2 font-medium text-sm uppercase shadow-md rounded
                hover:shadow-lg active:shadow focus:shadow-lg transition duration-150 ease-in-out
                w-full ${type === 'sale' ? 'bg-white text-black' : 
                'bg-slate-600 text-white'}`}>Rent</button>
            </div>

            {/* input Name */}

            <p className='text-lg mt-6 font-semibold'>Name</p>
            <input 
            type="text"
            id="name"
            value={name}
            onClick={onChange}
            placeholder="Name"
            minLength='4'
            maxLength='32'
            required
            className='w-full px-4 text-lg text-gray-700 bg-white border-gray-300
            rounded transition duration-150 ease-in-out focus:text-gray-700
            focus:bg-white focus:border-slate-600 mb-6'/>

            {/* Beds and Bath */}

            <div className='flex space-x-6 mb-6'>
                <div>
                    <p className='text-lg font-semibold'>Bed(s)</p>
                    <input type='number'
                    id='bedrooms'
                    value={bedrooms}
                    onChange={onChange}
                    min='1'
                    max='50'
                    required
                    className='text-lg px-4 py-2 text-gray-700 bg-white
                    border border-gray-700 rounded transition ease-in-out duration-150
                    focus:text-gray-700 focus:bg-white focus:border-slate-600 text-center'
                    />

                </div>
                <div>
                    <p className='text-lg font-semibold'>Bath(s)</p>
                    <input type='number'
                    id='bathrooms'
                    value={bathrooms}
                    onChange={onChange}
                    min='1'
                    max='50'
                    required
                    className='text-lg px-4 py-2 text-gray-700 bg-white
                    border border-gray-700 rounded transition ease-in-out duration-150
                    focus:text-gray-700 focus:bg-white focus:border-slate-600 text-center'
                    />
                </div>
            </div>
                {/* Toggle buttons Parking Spot */}
            <div>
            <p className='text-lg mt-6 font-semibold'>Parking Spot</p>
                <div className='flex'>
                    <button 
                    type='button'
                    id='parking'
                    value={true}
                    onClick={onChange}
                    className={`mr-3 px-3 py-2 font-medium text-sm uppercase shadow-md rounded
                    hover:shadow-lg active:shadow focus:shadow-lg transition duration-150 ease-in-out
                    w-full ${!parking ? 'bg-white text-black' : 
                    'bg-slate-600 text-white'}`}>Yes</button>

                <button 
                type='button'
                id='parking'
                value={false}
                onClick={onChange}
                className={`ml-3 px-3 py-2 font-medium text-sm uppercase shadow-md rounded
                hover:shadow-lg active:shadow focus:shadow-lg transition duration-150 ease-in-out
                w-full ${parking ? 'bg-white text-black' : 
                'bg-slate-600 text-white'}`}>No</button>
            </div>
            </div>
                {/* Toggle buttons furnished */}
                <p className='text-lg mt-6 font-semibold'>Furnished</p>
                <div className='flex'>
                 <button 
                type='button'
                id='furnished'
                value={true}
                onClick={onChange}
                className={`mr-3 px-3 py-2 font-medium text-sm uppercase shadow-md rounded
                hover:shadow-lg active:shadow focus:shadow-lg transition duration-150 ease-in-out
                w-full ${!furnished ? 'bg-white text-black' : 
                'bg-slate-600 text-white'}`}>Yes</button>

                <button 
                type='button'
                id='furnished'
                value={furnished}
                onClick={onChange}
                className={`ml-3 px-3 py-2 font-medium text-sm uppercase shadow-md rounded
                hover:shadow-lg active:shadow focus:shadow-lg transition duration-150 ease-in-out
                w-full ${furnished ? 'bg-white text-black' : 
                'bg-slate-600 text-white'}`}>No</button>
            </div>

            {/* input Address*/}

            <p className='text-lg mt-6 font-semibold'>Residential Address</p>
                <textarea 
                type="text"
                id="address"
                value={address}
                onClick={onChange}
                required
                className='w-full px-4 text-lg text-gray-700 bg-white border-gray-300
                rounded transition duration-150 ease-in-out focus:text-gray-700
                focus:bg-white focus:border-slate-600 mb-6'/>

                {/*Description */}

              <p className='text-lg font-semibold'>Description</p>
                <textarea 
                type='textarea'
                id='description'
                value={description}
                onClick={onChange}
                required
                className='w-full px-4 text-lg text-gray-700 bg-white border-gray-300
                rounded transition duration-150 ease-in-out focus:text-gray-700
                focus:bg-white focus:border-slate-600 mb-6'/>

                {/* offer */}
                <p className='text-lg font-semibold'>Offer</p>
                <div className='flex mb-6'>
                 <button 
                    type='button'
                    id='offer'
                    value={true}
                    onClick={onChange}
                    className={`mr-3 px-3 py-2 font-medium text-sm uppercase shadow-md rounded
                    hover:shadow-lg active:shadow focus:shadow-lg transition duration-150 ease-in-out
                    w-full ${!offer ? 'bg-white text-black' : 
                    'bg-slate-600 text-white'}`}>Yes</button>

                <button 
                type='button'
                id='offer'
                value={false}
                onClick={onChange}
                className={`ml-3 px-3 py-2 font-medium text-sm uppercase shadow-md rounded
                hover:shadow-lg active:shadow focus:shadow-lg transition duration-150 ease-in-out
                w-full ${offer ? 'bg-white text-black' : 
                'bg-slate-600 text-white'}`}>No</button>
            </div>
            {/*Regular price */}
            <div className='flex items-center mb-6'>
                <div className=''>
                    <p className='text-lg font-semibold'>Regular price</p>
                    <div className='mb-6 flex justify-center w-full space-x-6 items-center'>
                        <input 
                        type='number'
                        id='regularPrice'
                        value={regularPrice}
                        onChange={onChange}
                        min='50'
                        max='40000000000'
                        required
                        className='w-fill px-4 py-2 text-xl text-gray-700 bg-white
                        border-gray-300 rounded transition duration-150 ease-in-out
                        focus:text-gray-700 focus:bg-white focus:border-slate-600 text-center'
                        />
                        {type === 'rent' && 
                        <div className=''>
                            <p className='text-md w-full whitespace-nowrap'>$ / Month</p>
                        </div>}
                    </div>
                    
                </div>
            </div>
        {/*discounted price */}
            {offer ? 
            <div className='flex items-center mb-6'>
            <div className=''>
                <p className='text-lg font-semibold'>Discounted price</p>
                <div className='mb-6 flex justify-center w-full space-x-6 items-center'>
                    <input 
                    type='number'
                    id='discountPrice'
                    value={discountPrice}
                    onChange={onChange}
                    min='50'
                    max='40000000000'
                    required
                    className='w-fill px-4 py-2 text-xl text-gray-700 bg-white
                    border-gray-300 rounded transition duration-150 ease-in-out
                    focus:text-gray-700 focus:bg-white focus:border-slate-600 text-center'
                    />
                    {type === 'rent' && 
                    <div className=''>
                        <p className='text-md w-full whitespace-nowrap'>$ / Month</p>
                    </div>}
                </div>
                
            </div>
        </div> : ''}

        {/*Image*/}
            <div className='mb-6'>
                    <p className='font-semibold text-lg'>Images</p>
                    <p className='text-gray-600 text-sm'>The first image will be cover (max 6)</p>
                    <input type='file'
                    id='images'
                    onChange={onChange}
                    accept=".jpg,.png,.jpeg"
                    multiple
                    required
                    className='w-full px-3 py-1.5 text-gray-700
                    bg-white border border-gray-300 rounded
                    transition ease-in-out duration-150
                    focus:bg-white focus:border-slate-600'
                    />
            </div>
            {/*Button*/}
            <button
            type='submit'
            className='w-full mb-6 bg-blue-600 py-3 px-7 rounded
            text-white text-sm uppercase shadow-md focus:bg-blue-700
            hover:bg-blue-700 hover:shadow-lg focus:shadow-lg
            active:bg-blue-700 active:shadow-lg
            transition ease-in-out duration-150'
            >Create Listing</button>
        </form>
    </main>
  )
}

export default CreateListing