import React from 'react'
import { Avatar, AvatarFallback, AvatarImage } from './ui/avatar'
import { useSelector } from 'react-redux'
import dateFormat from 'dateformat'
export const Comment = ({ comment, avatar, username, commentPostTime }) => {

    const user = useSelector(state => state.auth.user)

    return (
        <div className=''>
            <div className='flex flex-row items-center gap-2 py-5'>
                <Avatar className='h-10 w-10'>
                    <AvatarImage src={avatar} />
                    <AvatarFallback>
                        User
                    </AvatarFallback>
                </Avatar>
                <div className='flex flex-col gap-1 '>

                    <p className='text-sm font-medium'>  @{username} <span className='text-xs text-gray-400 dark:text-gray-300 '>
                            {dateFormat(commentPostTime, 'mmm, d, yyyy')}
                        </span>
                    </p>
                    <p className='dark:text-gray-300 text-gray-700 text-sm'> {comment} </p>
                </div>
            </div>
        </div>
    )

}
