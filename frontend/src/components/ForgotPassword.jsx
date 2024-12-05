import React, { useEffect, useState } from 'react'
import { Card } from './ui/card'
import { Input } from './ui/input'
import { useForm } from 'react-hook-form'
import { Button } from './ui/button'
import { ArrowLeftCircleIcon, FingerprintIcon, Loader2 } from 'lucide-react'
import axios from 'axios'
import { useSelector } from 'react-redux'
import { Link, redirect } from 'react-router-dom'
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from './ui/tooltip'
import { toast, ToastContainer } from 'react-toastify'




const ForgotPassword = () => {

    const token = useSelector(state => state.auth.token)
    console.log(token);

    const { register, handleSubmit } = useForm()
    const [loading, setLoading] = useState(false)

    const handleUpdatePassword = async (payload) => {
        setLoading(true)
        try {
            const response = await axios.post(`http://localhost:8000/api/v1/users/change-password`,
                {
                    oldPassword: payload.oldPassword,
                    newPassword: payload.newPassword
                },
                {
                    headers: {
                        "Content-Type": "application/json",
                        "Authorization": `Bearer ${token}`
                    }
                }
            )

            console.log(response.data)
            toast.success(response.data.message)
            redirect('/u')
        } catch (error) {
            console.log(error.response.data.data)
            toast.error(error.response.data.data)
            setLoading(false)
        }

        setLoading(false)
    }

    useEffect(() => { }, [redirect])


    return (
        <div className='h-screen w-full '>
            <div className='w-5  relative top-5 left-5'>

                <TooltipProvider>
                    <Tooltip>
                        <TooltipTrigger>

                            <span className='text-sm text-gray-300'>
                                <Link
                                    to={'/update-account'}
                                >
                                    <ArrowLeftCircleIcon className='h-5 w-5' />
                                </Link>
                            </span>
                        </TooltipTrigger>
                        <TooltipContent>
                            <p>
                                Back to home
                            </p>

                        </TooltipContent>
                    </Tooltip>
                </TooltipProvider>
            </div>
            <Card className='h-72 w-[50%] relative top-20 left-[25%]'>

                {/* Back to home  */}
                <div className='h-full flex flex-col gap-4 relative top-[20%] left-24 w-[70%]'>
                
                <span className='flex flex-row justify-center items-center gap-3'>

                 <FingerprintIcon className='text-green-500'/>
                 <p className='font-semibold'>Secured </p>
                </span>

                    <form onSubmit={handleSubmit(handleUpdatePassword)}>
                        <div className='flex flex-col justify-center items-center gap-3'>

                            <Input
                                className='bg-transparent focus:outline-none focus:ring focus:border-green-400'
                                placeholder='Old password'
                                {...register('oldPassword', { required: true })}
                            />

                            <Input
                                className='bg-transparent focus:outline-none focus:ring focus:border-green-400'
                                placeholder='New password'
                                {...register('newPassword', { required: true })}
                            />

                            <Button
                                type='submit'
                                variant='default'
                                className='w-full'
                            >
                                {
                                    loading ?
                                        <Loader2 className='h-4 w-4 transition-all animate-spin' />
                                        :
                                        'Change Password'
                                }
                            </Button>
                        </div>
                    </form>
                </div>
            </Card>

            <ToastContainer
                theme='dark'
            />
        </div>
    )
}

export default ForgotPassword