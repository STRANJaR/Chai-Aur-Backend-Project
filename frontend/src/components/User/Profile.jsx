import React from 'react'
import { useSelector } from 'react-redux'
import { Separator } from '../ui/separator'
import dateFormate from 'dateformat'
import { Button } from 'flowbite-react'
import { Link } from 'react-router-dom'
import { ArrowLeftCircle, AtSign, CalendarDays, PenLineIcon } from 'lucide-react'
import UserProfileTab from '../UserProfileTab'


const Profile = () => {

    const user = useSelector(state => state.auth.user)
    console.log(user);

    return (
        <>

            <main className='h-screen w-full'>

                <section className='h-full w-full'>
                    <span className='absolute top-5 left-5'>
                        <Link to={'/dashboard'}>
                            <ArrowLeftCircle className='h-5 w-5 text-gray-300' />
                        </Link>
                    </span>
                    <div className='h-[60%]'>

                        {/* <Link className='text-right bg-blue-600 px-2 py-1'>
                            Change Passowrd
                        </Link> */}

                        <div className=' h-full w-[70%] p-4 relative top-0 left-[15%] '>
                            <div className=' bg-black rounded-md h-[60%] w-[70%] overflow-hidden relative left-[15%]'>
                                <img
                                    className='w-full h-full object-cover object-center'
                                    src={user?.coverImage || ''}
                                    alt="cover image"
                                />
                            </div>
                            <div className='flex justify-start  w-[70%] relative left-[15%] gap-5 py-5 items-center'>

                                <div className=' rounded-full border-2 border-gray-300 '>
                                    <img
                                        className='h-24 w-24 rounded-full'
                                        src={user?.avatar || ''}
                                        alt="profile imgage"
                                    />
                                </div>
                                <div className=''>
                                    <div className='flex flex-col gap-1'>

                                        <span className='text-3xl font-bold'>{user.fullName}</span>
                                        <Separator />


                                        <span className='text-sm text-gray-300 flex flex-row gap-2 items-center'>
                                            <AtSign className='h-4 w-4' /> {`${user.username}`}
                                        </span>

                                        <span className='text-sm text-gray-300 flex flex-row items-center gap-2'>
                                            <CalendarDays className='h-4 w-4' /> {`Joined ${dateFormate(user.createdAt, "mmmm, dS, yyyy")}`}
                                        </span>
                                        <span className='text-sm text-gray-300 flex flex-row items-center gap-2'>
                                            <PenLineIcon className='h-4 w-4' />
                                            <Link
                                                to={'/update-account'}
                                                className='hover:text-blue-500'
                                            > Update account details</Link>
                                        </span>

                                    </div>
                                </div>
                            </div>
                        </div>

                    </div>
                    {/* <Separator /> */}

                    <main className='h-full w-full py-1'>
                        <UserProfileTab/>
                    </main>
                </section>
            </main>
        </>
    )
}

export default Profile