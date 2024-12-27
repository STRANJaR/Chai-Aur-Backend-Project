import React, { useEffect, useRef, useState } from 'react'
import { Avatar, AvatarFallback, AvatarImage } from './ui/avatar'
import { useSelector } from 'react-redux'
import dateFormat from 'dateformat'
import { Button } from './ui/button'
import { Input } from './ui/input'
import { Textarea } from './ui/textarea'
export const Comment = ({ comment, avatar, username, userId, commentPostTime }) => {

    const user = useSelector(state => state.auth.user)

    // Check if the current user is the owner of this comment
    const isCurrentUserCommentOwner = userId === user._id

    const textareaRef = useRef(null);
    const [isEditing, setIsEditing] = useState(false)
    const [editedComment, setEditedComment] = useState(comment)



    const handleCommentEdit = () => {
        setIsEditing(!isEditing);
    }


    useEffect(() => {
        (isEditing && textareaRef.current) ? textareaRef.current.focus() : null
    }, [isEditing])

    return (
        <div className='hover:bg-zinc-900 my-2 px-3 rounded-md transition-all delay-75'>
            <div className='flex flex-row items-center gap-2 py-5'>
                <Avatar className='h-10 w-10'>
                    <AvatarImage src={avatar} />
                    <AvatarFallback>
                        User
                    </AvatarFallback>
                </Avatar>

                <section className='flex flex-row w-full'>

                    <div className='w-full'>

                        {/* Edit comment  */}
                        {
                            isEditing ? (
                                <div>
                                    <Textarea
                                        type='text'
                                        ref={textareaRef}
                                        value={editedComment}
                                        onChange={(e) => setEditedComment(e.target.value)}
                                        className='w-full px-3 py-2'
                                    />
                                    {/* <button
                                        onClick={() => {
                                            setIsEditing(false);
                                        }}
                                        className='text-sm font-medium text-gray-400 dark:text-gray-300 px-3 py-2'
                                    >
                                        Save
                                    </button> */}
                                </div>
                            ) :
                                <div className='flex flex-col justify-start'>

                                    <p className=' text-sm font-medium'>  @{username} <span className='text-xs text-gray-400 dark:text-gray-300 '>
                                        {dateFormat(commentPostTime, 'mmm, d, yyyy')}
                                    </span>
                                    </p>
                                    <p className='dark:text-gray-300 text-gray-700 text-sm'> {comment} </p>
                                </div>
                        }
                    </div>
                </section>

                <div className='flex flex-row items-center gap-1 justify-start w-full'>



                    <div className='w-full flex flex-row justify-end items-center'>
                        {
                            isCurrentUserCommentOwner && (
                                <div className='flex gap-1'>

                                    <Button
                                        variant='ghost'
                                        onClick={handleCommentEdit}
                                        className='text-sm h-8 font-medium text-gray-400 dark:text-gray-300 px-3 py-2'
                                    >
                                        Edit
                                    </Button>
                                    <Button
                                        variant='ghost'
                                        onClick={() => {
                                            // Delete comment
                                        }}
                                        className='text-sm h-8 font-medium text-red-500 dark:text-red-400 px-3 py-2'
                                    >
                                        Delete
                                    </Button>
                                </div>
                            )
                        }
                    </div>
                </div>

            </div>
        </div>
    )

}
