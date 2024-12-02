import React from 'react'
import { useSelector } from 'react-redux'
import { Separator } from '../ui/separator'
import dateFormate from 'dateformat'
import { Button } from 'flowbite-react'


const Profile = () => {

    const user = useSelector(state => state.auth.user)
    console.log(user);

    return (
        <>

            <main className='h-screen w-full'>
                <section className='h-full w-full'>
                    <div className='h-[50%]'>
                        <div className=' h-full w-[70%] p-4 relative top-0 left-[15%]'>
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
                                        <span className='text-sm text-gray-300'>{`@${user.username}`}</span>
                                        <span className='text-sm text-gray-300'>{`Joined ${dateFormate(user.createdAt, "mmmm, dS, yyyy")}`}</span>
                                    </div>
                                </div>
                            </div>
                        </div>

                    </div>
                    <Separator />
                    <div>
                <Button>Flow Bite</Button>

                    </div>
                </section>
            </main>
        </>
    )
}

export default Profile