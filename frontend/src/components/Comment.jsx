import React from 'react'
import { Avatar, AvatarFallback, AvatarImage } from './ui/avatar'
import { useSelector } from 'react-redux'

export const Comment = ({ comment }) => {

    const user = useSelector(state => state.auth.user)

    return (
        <div className=''>
            <div className='flex flex-row items-center gap-2 py-5'>
                <Avatar className='h-10 w-10'>
                    <AvatarImage src={user?.avatar} />
                    <AvatarFallback>
                        User
                    </AvatarFallback>
                </Avatar>
                <div className='flex flex-col  justify '>

                <p className='text-sm font-medium'> @ {user?.username}</p>
                <p className='text-gray-300 text-xs'> {comment} </p>
                </div>
            </div>
        </div>
    )

}
