import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Button } from './ui/button'
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


const Login = () => {

  const [loading, setLoading] = useState(false)
  const { register, handleSubmit, reset } = useForm()

  const navigate = useNavigate();

  // handle login 
  const handleLogin = async (payload) => {
    setLoading(true);

    try {
      const user = await axios.post(`http://localhost:8000/api/v1/users/login`,
        {
          email: payload.email,
          password: payload.password
        }, {
        headers: {
          "Content-Type": "application/json"
        }
      });

      if (user) {
        setLoading(false)
        console.log(user.data)
        toast.success(user.data.message)

        // set secret token in localStorage
        localStorage.setItem('accessToken', user.data.data.accessToken)
        localStorage.setItem('refreshToken', user.data.data.refreshToken)

        // clear form fields
        reset();

        // navigate to dashboard
        setTimeout(() => {
          navigate('/dashboard')
        }, 2000);
      }
    } catch (error) {
      setLoading(false)
      console.log(error)
      toast.error(error.response.data.data)
    }

    setLoading(false)
  }
  return (
    <>
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
                <CardTitle>Sign in</CardTitle>
                <CardDescription>Unlock Your World of Entertainment, Unlock Your World of Entertainment, Join the YouTube Community

                </CardDescription>
              </CardHeader>

              <form onSubmit={handleSubmit(handleLogin)}>

                <main className='flex flex-col gap-3'>


                  {/* <Label>First Name</Label> */}
                  <Input
                    className='bg-transparent border border-gray-500 outline-none '
                    placeholder='Email or Username'
                    type='text'
                    {...register('email', { required: true })}
                  />

                  <Input
                    className='bg-transparent border border-gray-500 outline-none mb-5 '
                    placeholder='Password'
                    type='password'
                    {...register('password', { required: true })}
                  />

                </main>

                <Button
                  type='submit'
                  className='w-full py-3'
                  variant='default'
                > {loading ? <Loader2 className='transition-all animate-spin' /> : 'Submit'}</Button>

              </form>
            </Card>
          </div>

        </div>
        <ToastContainer />
      </section>
    </>
  )
}

export default Login