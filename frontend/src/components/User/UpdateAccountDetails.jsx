import React, { useState } from 'react'
import { Input } from '../ui/input'
import { useForm } from 'react-hook-form'
import { Button } from '../ui/button'
import { Loader2, PencilLine } from 'lucide-react'
import { Separator } from '../ui/separator'
import FileUpload from '../FileUpload'
import { useSelector } from 'react-redux'
import axios from 'axios'
import { toast, ToastContainer } from 'react-toastify'


const UpdateAccountDetails = () => {

    const user = useSelector(state => state.auth.user);
    const token = useSelector(state => state.auth.token);

    const { register, handleSubmit, formState: { errors } } = useForm()


    const [personalLoading, setIsPersonalLoading] = useState(false)
    const [avatarLoading, setIsAvatarLoading] = useState(false)
    const [coverImageLoading, setCoverImageLoading] = useState(false)


    // Personal detail update
    const personalDetailChange = async (payload) => {
        console.log('payload: ', payload)
        setIsPersonalLoading(true);

        const updateData = {}

        if(payload.name) updateData.name = payload.name;
        if(payload.email) updateData.email = payload.email;

        try {
            const response = await axios.patch('http://localhost:8000/api/v1/users/update-account-details',
                {
                    fullName: payload.name,
                    email: payload.email
                },
                {
                    headers: {
                        "Content-Type": "application/json",
                        "Authorization": `Bearer ${token}`
                    }
                }
            );

            console.log(response)
            toast.success(response.data.message)
        } catch (error) {
            console.log(error.data)
            toast.error('opps')
            setIsPersonalLoading(false)
        }

        setIsPersonalLoading(false)
    }


    const handleAvatarChange = () => {

    }

    const handleCoverImageChange = () => {

    }


    return (
        <>
        <section className='h-screen w-full text-xs'>
            <div className='grid grid-cols-3'>
                <div className='h-screen w-full col-span-1 border-r-2'>

                </div>
                {/* <Separator/> */}

                <div className='h-screen w-full col-span-2 '>

                    <main className='h-auto w-[70%] relative top-10 left-32'>

                        {/* UPDATE SECTION FOR: NAME AND EMAIL  */}
                        <section className='h-auto w-full py-5'>
                            <form onSubmit={handleSubmit(personalDetailChange)}>
                                <div className='flex flex-col justify-center  gap-3'>
                                    <div className='flex flex-row items-center gap-2'>
                                        <PencilLine className='h-4 w-4' />
                                        <h4 className='font-semibold text-gray-700 dark:text-gray-300'>PERSONAL DETAILS</h4>
                                    </div>
                                    <Input
                                        className='outline-none '
                                        type='text'
                                        defaultValue={user.fullName}
                                        placeholder='Enter your name'
                                        {...register('name')}
                                    />
                                    {errors.name && <p className='text-red-500'>This field is required*</p>}

                                    <Input
                                        className='outline-none'
                                        type='email'
                                        defaultValue={user.email}
                                        placeholder='Enter your email'
                                        {...register('email')}
                                    />
                                    {errors.email && <p className='text-red-500'>This field is required*</p>}

                                    <Button
                                        className='w-full'
                                        type='submit'>
                                        {
                                            personalLoading ?
                                                <Loader2 className='h-4 w-4 animate-spin' />
                                                :
                                                'Update'
                                        }
                                    </Button>
                                </div>
                            </form>
                        </section>

                        <Separator />

                        {/* UPDATE SECTION FOR: AVATAR  */}
                        <section className='h-auto w-full py-5'>
                            <form onSubmit={handleSubmit(handleAvatarChange)}>
                                <div className='flex flex-col justify-center  gap-3'>
                                    <div className='flex flex-row items-center gap-2'>
                                        <PencilLine className='h-4 w-4' />
                                        <h4 className='font-semibold text-gray-700 dark:text-gray-300'>PROFILE PICTURE</h4>
                                    </div>
                                    {/* <Input
                                        className='outline-none '
                                        type='file'
                                        {...register('avatar', { required: true })}
                                    />
                                    {errors.name && <p className='text-red-500'>error.name.message</p>} */}

                                    <FileUpload handleChange={handleAvatarChange} />
                                    <Button
                                        className='w-full'
                                        type='submit'>
                                        {
                                            avatarLoading ?
                                                <Loader2 className='h-4 w-4 animate-spin' />
                                                :
                                                'Update'
                                        }
                                    </Button>
                                </div>
                            </form>
                        </section>



                        <Separator />

                        {/* UPDATE SECTION FOR: COVER IMAGE  */}
                        <section className='h-auto w-full py-5'>
                            <form onSubmit={handleSubmit(handleCoverImageChange)}>
                                <div className='flex flex-col justify-center  gap-3'>

                                    <div className='flex flex-row items-center gap-2'>
                                        <PencilLine className='h-4 w-4' />
                                        <h4 className='font-semibold text-gray-700 dark:text-gray-300'>COVER IMAGE</h4>
                                    </div>

                                    <FileUpload
                                        handleChange={handleAvatarChange} />
                                    <Button
                                        className='w-full'
                                        type='submit'>
                                        {
                                            coverImageLoading ?
                                                <Loader2 className='h-4 w-4 animate-spin' />
                                                :
                                                'Update'
                                        }
                                    </Button>
                                </div>
                            </form>
                        </section>
                    </main>
                </div>
            </div>

        </section>
        <ToastContainer 
        position='top-right'
        theme='dark'
        />
        </>

    )
}

export default UpdateAccountDetails