import { getAuth, sendPasswordResetEmail } from 'firebase/auth';
import React, {useState} from 'react'
import { Link } from 'react-router-dom'
import { toast } from 'react-toastify';
import OAuth from '../components/OAuth'

const ForgotPassword = () => {
    const [email, setEmail] = useState('');

    const onChange = (e) => {
        setEmail(e.target.value)
    }
    const onSubmit = async(e) => {
        e.preventDefault()

        try {
            const auth = getAuth()
            await sendPasswordResetEmail(auth, email)
            toast.success('Email was sent')
        } catch (error) {
            toast.error('Could not send reset password')
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
                className='w-full hidden sm:flex max-h-[700px]'/>
            </div>

            <div className='flex-initial w-[100%] sm:basis-1/2 px-8'>
                <div className='mb-10'>
                <h1 className='text-2xl text-start font-bold mb-6'>Reset Your Password</h1>
                <div className='flex justify-between whitespace-nowrap text-xs sm:text-md'>
                        <p className='md-6'>Don't have an account?<Link to='/sign-up'
                        className='underline underline-offset-2 transition duration-200
                        ease-in-out ml-1 font-semibold'>Sign Up</Link></p>
                        <p><Link to='/sign-in' 
                        className='underline underline-offset-2 transition duration-200
                        ease-in-out ml-1 font-semibold'>Sign In instead</Link></p>
                    </div>
                    
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
                <button 
                className='w-full bg-gray-800 text-white px-7 py-2 text-xs font-mde
                uppercase rounded shadow-md hover:bg-gray-900 transition duration-150 ease-in-out
                hover:shadow-lg active:bg-gray-800 mb-4'
                type='submit'>Reset password</button>
                <OAuth/>
                </form>
            </div>
        </div>
    </section>
  )
}

export default ForgotPassword