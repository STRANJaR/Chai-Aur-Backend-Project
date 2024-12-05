import React, { useCallback, useEffect, useState } from 'react'
import { Input } from '../ui/input'
import { useForm } from 'react-hook-form'
import { Button } from '../ui/button'
import { ArrowLeftCircle, Loader2, PencilLine } from 'lucide-react'
import { Separator } from '../ui/separator'
import FileUpload from '../FileUpload'
import { useSelector, useDispatch } from 'react-redux'
import axios from 'axios'
import { toast, ToastContainer } from 'react-toastify'
import store from '../../store/store'
import { Link } from 'react-router-dom'


const UpdateAccountDetails = () => {

    const user = useSelector(state => state.auth.user);
    const token = useSelector(state => state.auth.token);

    const { register, handleSubmit, formState: { errors } } = useForm()

    const [avatarFile, setAvatarFile] = useState(null);
    const [coverImage, setCoverImage] = useState(null);



    const [personalLoading, setIsPersonalLoading] = useState(false)
    const [avatarLoading, setIsAvatarLoading] = useState(false)
    const [coverImageLoading, setCoverImageLoading] = useState(false)


    // Personal detail update
    const personalDetailChange = useCallback(async (payload) => {
        console.log('payload: ', payload)
        setIsPersonalLoading(true);


        // TODO: update single field as per user req. 
        const updateData = {}

        if (payload.name) updateData.name = payload.name;
        if (payload.email) updateData.email = payload.email;

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

            // save fresh user object in local storage 
            localStorage.setItem('user', JSON.stringify(response.data.data))
        } catch (error) {
            console.log(error.data)
            toast.error('opps')
            setIsPersonalLoading(false)
        }

        setIsPersonalLoading(false)
    }, [store, user])


    // Update profile picture
    const handleAvatarChange = async () => {


        const formData = new FormData();
        if (avatarFile) formData.append('avatarLocalPath', avatarFile)

        setIsAvatarLoading(true);
        try {
            const response = await axios.patch('http://localhost:8000/api/v1/users/update-avatar',
                {
                    avatar: formData.get('avatarLocalPath')
                },
                {
                    headers: {
                        "Content-Type": "multipart/form-data",
                        "Authorization": `Bearer ${token}`
                    }
                }
            );

            console.log(response)
            toast.success(response.data.message)

            // save fresh user object to local storage
            localStorage.setItem('user', JSON.stringify(response.data.data))

        } catch (error) {
            console.log(error)
            toast.error(error.response.data.data)
            setIsAvatarLoading(false)
        }

        setIsAvatarLoading(false)
    }


    // Update cover image 
    const handleCoverImageChange = async () => {
        setCoverImageLoading(true);

        const formData = new FormData();
        if (coverImage) formData.append('coverImage', coverImage)

        try {
            const response = await axios.patch('http://localhost:8000/api/v1/users/update-cover-image',
                {
                    coverImage: coverImage
                },
                {
                    headers: {
                        "Content-Type": "multipart/form-data",
                        "Authorization": `Bearer ${token}`
                    }
                }
            );

            console.log(response)
            toast.success(response.data.message)


            // save fresh user object to local storage
            localStorage.setItem('user', JSON.stringify(response.data.data))

        } catch (error) {
            console.log(error)
            toast.error(error.response.data.data)
            setCoverImageLoading(false)
        }

        setCoverImageLoading(false)
    }

    useEffect(() => { }, [user, personalDetailChange])
    return (
        <>
            <section className='h-screen w-full text-xs'>
                <div className='grid grid-cols-3'>
                    <div className='h-screen w-full col-span-1 border-r-2'>
                        <span className='relative top-5 left-5'>
                            <Link to={'/u'}>
                                <ArrowLeftCircle className='h-5 w-5 text-gray-300' />
                            </Link>
                        </span>
                        <div className='flex flex-col gap-3 justify-center items-center relative top-20 left-[15%] h-auto w-[70%]  p-5'>
                            <div className='rounded-full border-2 border-gray-300'>
                                <img
                                    className='h-24 w-24 rounded-full'
                                    src={user.avatar || ''}
                                    alt="avatar"
                                />
                            </div>

                            <div className='flex flex-col justify-center items-center'>
                                <span className='text-2xl font-bold'>{user.fullName || ''}</span>
                                <span className='text-sm'>{user.email || ''}</span>
                                <Link to={'/forgot-password'} className='text-sm text-blue-500 hover:text-blue-700'>{'change password'}</Link>
                            </div>
                        </div>
                        {/* <Separator /> */}

                    </div>

                    <div className='h-screen w-full col-span-2 '>

                        <main className='h-auto w-[70%] relative top-10 left-32'>

                            {/* FEATURE: UPDATE SECTION FOR: NAME AND EMAIL  */}
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

                            {/* FEATURE: UPDATE SECTION FOR: AVATAR  */}
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

                                        <FileUpload

                                            handleChange={e => setAvatarFile(e.target.files[0])} />
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

                            {/* FEATURE: UPDATE SECTION FOR: COVER IMAGE  */}
                            <section className='h-auto w-full py-5'>
                                <form onSubmit={handleSubmit(handleCoverImageChange)}>
                                    <div className='flex flex-col justify-center  gap-3'>

                                        <div className='flex flex-row items-center gap-2'>
                                            <PencilLine className='h-4 w-4' />
                                            <h4 className='font-semibold text-gray-700 dark:text-gray-300'>COVER IMAGE</h4>
                                        </div>

                                        <FileUpload
                                            handleChange={e => setCoverImage(e.target.files[0])} />
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