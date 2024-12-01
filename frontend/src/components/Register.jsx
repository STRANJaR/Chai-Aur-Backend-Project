import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { Button } from './ui/button'
import { Label } from './ui/label'
import { Input } from './ui/input'
import {
  Card,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { useForm } from 'react-hook-form'
import axios from 'axios'
import { toast, ToastContainer } from 'react-toastify'
import "react-toastify/dist/ReactToastify.css";
import { Loader2 } from 'lucide-react'

const BASE_URL = String(import.meta.BASE_URL)

const Register = () => {

  const navigate = useNavigate()
  const [avatarFile, setAvatarFile] = useState(null)
  const [coverImageFile, setCoverImageFile] = useState(null)
  const [loading, setLoading] = useState(false)


  const { register, handleSubmit, reset } = useForm();


  const handleRegister = async (payload) => {
    setLoading(true)

    // Created form data for file specific payload 
    const formData = new FormData()
    formData.append('username', payload.username)
    formData.append('email', payload.email)
    formData.append('fullName', payload.fullName)
    formData.append('password', payload.password)

    if (avatarFile) formData.append('avatar', avatarFile)
    if (coverImageFile) formData.append('coverImage', coverImageFile)

    try {
      const user = await axios.post(`http://localhost:8000/api/v1/users/register`,
        {
          username: formData.get('username'),
          email: formData.get('email'),
          fullName: formData.get('fullName'),
          password: formData.get('password'),
          avatar: formData.get('avatar'),
          coverImage: formData.get('coverImage'),
        },
        { headers: { 'Content-Type': 'multipart/form-data' } }
      )

      if (user) {
        setLoading(false)
        console.log('user registered successfully', user)
        toast.success('User registered successfully')

        setTimeout(() => {
          navigate('/login')
        }, 2000);
      }

    } catch (error) {
      console.log(error.response.data.data)
      toast.error(error.response.data.data, {
        position: 'top-right',
      })
    }
    // reset();

    setLoading(false)
  }


  return (
    <section className='dark:bg-gray-800 h-screen w-full  text-sm'>
      <div className='grid grid-cols-2'>

        <div className='col-span-1'>
          <div className='flex justify-center items-center h-screen bg-red-500'>

            <img src="./yt-logo.svg" alt="" />
          </div>
        </div>

        <div className='w-full'>
          <Card className='bg-transparent border border-gray-500 outline-none  relative top-10 px-24  flex flex-col justify-center   border-none'>
            <CardHeader className='text-center'>
              <CardTitle>Create Your Account</CardTitle>
              <CardDescription>Unlock Your World of Entertainment, Unlock Your World of Entertainment, Join the YouTube Community

              </CardDescription>
            </CardHeader>

            <form onSubmit={handleSubmit(handleRegister)}>

              <main className='flex flex-col gap-3'>


                {/* <Label>First Name</Label> */}
                <Input
                  className='bg-transparent border border-gray-500 outline-none '
                  placeholder='Username'
                  type='text'
                  {...register('username', { required: true })}
                />

                <Input
                  className='bg-transparent border border-gray-500 outline-none '
                  placeholder='Email'
                  type='text'
                  {...register('email', {
                    required: true, validate: {
                      matchPatern: (value) => /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(value) ||
                        "Email address must be a valid address",
                    }
                  })}

                />

                <Input
                  className='bg-transparent border border-gray-500 outline-none '
                  placeholder='Full Name'
                  type='text'
                  {...register('fullName', { required: true })}
                />

                <Input
                  className='bg-transparent border border-gray-500 outline-none '
                  placeholder='Password'
                  type='password'
                  {...register('password', { required: true })}
                />

                <Label>Profile Picture</Label>
                <Input
                  className="block w-full  text-xs text-gray-900 border border-gray-300 rounded-lg cursor-pointer bg-gray-300  dark:text-gray-400 focus:outline-none dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400"
                  type="file"
                  onChange={(e) => setAvatarFile(e.target.files[0])}
                />

                <Label>Cover Image (Optional)</Label>
                <Input
                  className="block w-full mb-5 text-xs text-gray-900 border border-gray-300 rounded-lg cursor-pointer bg-gray-300 dark:text-gray-400 focus:outline-none dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400"
                  type="file"
                  onChange={(e) => setCoverImageFile(e.target.files[0])}
                />
              </main>

              <Button
                type='submit'
                className='w-full'
                variant='default'
              > {loading ? <Loader2 className='transition-all animate-spin' /> : 'Submit'}</Button>

            </form>
            <p className='font-medium py-2 text-center'>Already have an account?
              <Link
                className='text-blue-500 px-1 font-medium hover:underline'
                to={'/login'}>Loing</Link>
            </p>
          </Card>
        </div>

      </div>
      <ToastContainer />
    </section>
  )
}

export default Register