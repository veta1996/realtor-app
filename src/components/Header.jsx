import { getAuth, onAuthStateChanged } from 'firebase/auth';
import React, { useEffect, useState } from 'react'
import { useLocation, useNavigate } from 'react-router'
import palmLogo from '../images/houzez.png'
import { Link } from 'react-router-dom';
import {RxHome} from 'react-icons/rx'
import {IoPersonOutline} from 'react-icons/io5'
import { Select, Option } from "@material-tailwind/react";


const Header = () => {
    const location = useLocation()
    const navigate = useNavigate();
    const auth = getAuth();
    
    useEffect(() => {
        onAuthStateChanged(auth, (user) => {
          if(user){
            setPageState('Profile')
          } else {
            setPageState('Sign in')
          }
        })
    }, [auth])
    const [pageState, setPageState] = useState('Sign in')
    const pathMatchRoute = (route) => {
        if(route === location.pathname){
            return true;
        }
    }
  return (
    <header>
    <nav className='bg-white border-b shadow-sm sticky border-gray-200 px-4 sm:px-6 py-2.5 z-40'>
        <div className='flex flex-wrap justify-between items-center mx-auto max-w-screen-xl'>
           <img src={palmLogo}
            alt='logo'
            className='sm:h-16 sm:w-[160px] cursor-pointer w-[130px] mr-3 h-12'
            onClick={() => navigate('/')}/>
        
        <div className='flex items-center sm:order-2'>
        <ul className='flex flex-row sm:flex-row space-x-3 sm:space-x-3 sm:mt-0 sm:text-sm sm:font-medium sm:border-0 sm:bg-transparent'>
              <li className=' text-black border border-gray-300 sm:p-2 p-1
               hover:bg-gray-50 focus:ring-4  focus:ring-gray-300 text-xs rounded-xl '>
                    <Link to='/create-listing' className='flex flex-row justify-center items-center'>
                      <RxHome className='w-[20px]'/>Add listing</Link>
                  </li>
                  <li className={`cursor-pointer flex flex-row text-black border border-gray-300 sm:p-2 p-1
               hover:bg-gray-50 focus:ring-4  focus:ring-gray-300 text-xs rounded-xl
                  ${(pathMatchRoute('/sign-in') || pathMatchRoute('/profile'))}`}
                          onClick={() => navigate('/profile')}>
                      <IoPersonOutline className='w-[20px]'/>
                      {pageState}
                  </li>
              </ul>
        <button data-collapse-toggle="navbar-dropdown" type="button" 
        className="inline-flex items-center p-2 ml-3 text-sm text-gray-500 rounded-lg md:hidden hover:bg-gray-100 
        focus:outline focus:ring-2 focus:ring-gray-200 dark:text-blue-400 dark:hover:bg-transparent 
        dark:focus:ring-blue-600 hover:outline" aria-controls="navbar-dropdown" aria-expanded="false">
          <span className="sr-only">Open main menu</span>
          <svg className="w-6 h-6" aria-hidden="true" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M3 5a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 10a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 15a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z" clip-rule="evenodd"></path></svg>
        </button>
        </div>
       
        <div class="hidden w-full sm:flex sm:w-auto sm:order-1 justify-between items-center" id="navbar-dropdown">
    
                  <ul className='flex flex-col mt-4 font-medium sm:flex-row sm:space-x-2 sm:mt-0'>
                      <li className={`font-semibold uppercase cursor-pointer p-3 text-xs text-black border-b-[3px]
                      border-b-transparent hover:bg-blue-600 hover:text-gray-100 hover:border-transparent ${pathMatchRoute('/') && 'bg-blue-600 p-2 text-gray-100'}`}
                      onClick={() => navigate('/')}>Home</li>
                      <li className={`uppercase cursor-pointer p-3 text-xs font-semibold text-black border-b-[3px]
                      border-b-transparent hover:bg-blue-600 hover:text-gray-100 hover:border-transparent ${pathMatchRoute('/offers') && 'bg-blue-600 p-2 text-gray-100'}`}
                      onClick={() => navigate('/offers')}>Offers</li>
                      
                      <li> 
                      <button id="dropdownDefaultButton" data-dropdown-toggle="dropdown" 
                      className="flex items-center justify-between w-full p-3 uppercase cursor-pointer text-xs font-semibold text-black border-b-[3px]
                      border-b-transparent hover:bg-blue-600 hover:text-gray-100 hover:border-transparent
                      dark:hover:bg-blue-600 dark:focus:ring-blue-600" type="button">Properties <svg class="w-4 h-4 ml-2" aria-hidden="true" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7"></path></svg></button>
                  <div id="dropdown" className="z-10 hidden bg-white divide-y divide-gray-100 shadow-lg md:w-40 w-[80%]
                  hover:border-blue-600 hover:border-t-[2px]">

                  <ul className="text-sm text-black bg-white shadow-lg" aria-labelledby="dropdownDefaultButton">
                              <li onClick={() => navigate('/category/rent')} 
                                className="cursor-pointer p-3 text-xs text-black
                                border-b-transparent hover:text-blue-600
                                ">Rent Properties
                              </li>
                              <li onClick={() => navigate('/category/sale')} 
                                className="cursor-pointer p-3 text-xs text-black
                                border-b-transparent hover:text-blue-600 hover:border-transparent">Sale Properties
                              </li>
                            </ul>
                        </div>
                </li>
                </ul>
               
        </div>
  </div>
    </nav>
    </header>
  )
}

export default Header

//src <img src="https://static.rdc.moveaws.com/images/logos/rdc-logo-default.svg"

{/*
<li className={`cursor-pointer py-3 text-sm font-semibold text-black border-b-[3px]
                border-b-transparent ${(pathMatchRoute('/sign-in') || pathMatchRoute('/profile')) && 'bg-blue-600 p-2 text-gray-100'}`}
                onClick={() => navigate('/profile')}>{pageState}</li>


                <button className={`uppercase cursor-pointer py-3 text-xs font-semibold text-black border-b-[3px]
                border-b-transparent hover:bg-blue-600 hover:text-gray-100 hover:border-transparent
                dark:hover:bg-blue-700 dark:focus:ring-blue-800`}
                id="dropdownDefaultButton" data-dropdown-toggle="dropdown">Property</button> 


                className='flex justify-center items-center bg-transparent hover:bg-blue-600 text-black uppercase text-[10px] hover:text-white border
            border-blue-600 hover:border-transparent rounded-xl'>
             <Link to='/create-listing' className='flex justify-center items-center'>



             font-semibold uppercase cursor-pointer p-3 text-xs text-black border-b-[3px]
                      border-b-transparent hover:bg-blue-600 hover:text-gray-100 hover:border-transparent 
              */}