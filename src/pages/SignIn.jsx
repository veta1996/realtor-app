import React, {useState} from 'react'
import {AiFillEye, AiFillEyeInvisible} from 'react-icons/ai'
import { Link } from 'react-router-dom'
import OAuth from '../components/OAuth'

const SignIn = () => {
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
  return (
    <section>
        <h1 className='text-3xl text-center mt-6 font-bold md:mb-6 mb-12'>Sign In</h1>
        <div className='flex justify-center flex-wrap items-center px-6 py-12 max-w-6xl mx-auto'>
            <div className='md:w-[68%] lg:w-[50%]'>
                <img src='https://images.unsplash.com/photo-1449844908441-8829872d2607?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2670&q=80'
                alt='sign-in'
                className='w-full rounded-2xl'/>
            </div>
            <div  className='w-full md:w-[67%] lg:w-[40%] lg:ml-20'>
                <form>
                    <input type='email' 
                    className='w-full px-4 py-2 text-l text-gray-700 bg-white border-gray-300
                    rounded transition ease-in-out mb-6' 
                    id='email' 
                    value={email}
                    onChange={onChange}
                    placeholder='Email Address'
                    />
                    <div className='relative mb-6'>
                    <input type={showPassword ? 'text' : 'password'}
                    className='w-full px-4 py-2 text-l text-gray-700 bg-white border-gray-300
                    rounded transition ease-in-out' 
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
                    <div className='flex justify-between whitespace-nowrap text-sm sm:text-md mb-4'>
                        <p className='md-6'>Don't have an account? <Link to='/sign-up'
                        className='text-red-600 hover:text-red-700 transition duration-200
                        ease-in-out ml-1'>Register</Link></p>
                        <p><Link to='/forgot-password' 
                        className='text-blue-600 hover:text-blue-800 transition duration-200
                        ease-in-out'>Forgot Password</Link></p>
                    </div>
                <button 
                className='w-full bg-blue-600 text-white px-7 py-2 text-small font-mde
                 uppercase rounded shadow-md hover:bg-blue-700 transition duration-150 ease-in-out
                 hover:shadow-lg active:bg-blue-800'
                type='submit'>Sign In</button>
                <div className='flex my-4 items-center before:border-t before:flex-1 
                before:border-gray-300 after:border-t after:flex-1 
                after:border-gray-300'>
                <p className='text-center font-semibold mx-4'>OR</p>
                </div>
                <OAuth/>
                </form>
            </div>
        </div>
    </section>
  )
}

export default SignIn