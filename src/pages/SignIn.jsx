import React, {useState} from 'react'
import {AiFillEye, AiFillEyeInvisible} from 'react-icons/ai'
import { Link, useNavigate } from 'react-router-dom'
import OAuth from '../components/OAuth'
import { signInWithEmailAndPassword, getAuth } from 'firebase/auth'
import {toast} from 'react-toastify'
import {IoIosMail} from 'react-icons/io'

const SignIn = () => {
    const navigate = useNavigate()
    const [showPassword, setShowPassword] = useState(false)
    const [formData, setFormData] = useState({
        email: '',
        password: '',
    })
    const {email, password} = formData;

    const onChange = (e) => {
        setFormData((prevState) =>({
            ...prevState, [e.target.id]: e.target.value
        }))
    }

    const onSubmit = async(e) => {
        e.preventDefault();
            try {
            const auth = getAuth();
            const userCredential = await signInWithEmailAndPassword(
                auth,
                email,
                password
            );
            if (userCredential.user) {
                navigate("/");
            }
            } catch (error) {
            toast.error("Bad user credentials");
            }
    }
  return (
    <section>
        <div className='flex flex-row flex-wrap max-w-6xl items-center justify-center'>
            <div className='basis-1/2 mb-12 sm:w-full sm:px-4'>
                <img 
                //src='https://images.unsplash.com/photo-1449844908441-8829872d2607?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2670&q=80'
                src='https://w0.peakpx.com/wallpaper/385/670/HD-wallpaper-night-town-abstract-art-beutiful-cartoon-colorful-drawing-houses-lights-nice-stars-witch.jpg'
                alt='sign-in'
                className='w-full hidden sm:flex'/>
            </div>
            <div className='flex-initial w-[100%] basis-1/2 px-8'>
                <div className='mb-10'>
                <h1 className='text-2xl text-start font-bold'>Welcome to Houzez,</h1>
                <h1 className='text-2xl text-start font-bold mb-6'>Sign In To Continue.</h1>
                <div className='flex justify-between whitespace-nowrap text-xs sm:text-md'>
                        <p className='md-6'>Don't have an account?<Link to='/sign-up'
                        className='underline underline-offset-2 transition duration-200
                        ease-in-out ml-1 font-semibold'>Create an account</Link></p>
                    </div>
                    <p className='text-xs sm:text-md'>It takes less than a minute.</p>
                </div>
            
                <form onSubmit={onSubmit}>
                    <input type='email' 
                    className='w-full px-4 py-2 text-sm text-gray-700 bg-white border-gray-300
                    rounded transition ease-in-out mb-6
                    focus:border focus:border-gray-200 focus:ring-1 focus:ring-gray-300
                    hover:bg-gray-100 hover:border-gray-400
                    active:bg-gray-100 active:outline active:ring-2 active:ring-gray-300
                    active:border-gray-400'
                    id='email' 
                    value={email}
                    onChange={onChange}
                    placeholder='Email Address'
                    />
                    <div className='relative mb-6'>
                    <input type={showPassword ? 'text' : 'password'}
                    className='w-full px-4 py-2 text-sm text-gray-700 bg-white border-gray-300
                    rounded transition ease-in-out 
                    focus:border focus:border-gray-200 focus:ring-1 focus:ring-gray-300
                    hover:bg-gray-100 hover:border-gray-400
                    active:bg-gray-100 active:outline active:ring-2 active:ring-gray-300
                    active:border-gray-400' 
                    id='password' 
                    value={password}
                    onChange={onChange}
                    placeholder='Password'
                    />
                    
                    {showPassword ?
                    (<AiFillEyeInvisible className='absolute right-3 top-3 cursor-pointer' 
                    onClick={()=> setShowPassword(!showPassword)}/>) : 
                    (<AiFillEye className='absolute right-3 top-3 cursor-pointer'
                    onClick={()=> setShowPassword(!showPassword)}/>)}
                    </div>
                    <div className='flex justify-center whitespace-nowrap text-xs sm:text-md mb-4'>
                        <p><Link to='/forgot-password' 
                        className='underline underline-offset-2 text-gray-600 hover:text-black-800 transition duration-200
                        ease-in-out'>Forgot Password</Link></p>
                    </div>
                <button 
                className='w-full bg-gray-800 text-white px-7 py-2 text-xs font-mde
                 uppercase rounded shadow-md hover:bg-gray-900 transition duration-150 ease-in-out
                 hover:shadow-lg active:bg-gray-800 mb-4'
                type='submit'>Sign In</button>
                
                <OAuth/>
                </form>
            </div>
        </div>
    </section>
  )
}

export default SignIn

