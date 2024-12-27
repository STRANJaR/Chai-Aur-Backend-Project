import React, { useEffect, useRef, useState } from 'react'
import { Avatar, AvatarFallback, AvatarImage } from './ui/avatar'
import { useSelector } from 'react-redux'
import dateFormat from 'dateformat'
import { Button } from './ui/button'
import { Input } from './ui/input'
import { Textarea } from './ui/textarea'
import axios from 'axios'
import { Loader2 } from 'lucide-react'
import { toast } from 'react-toastify'
export const Comment = ({ comment, avatar, username, userId, commentId, commentPostTime, onUpdate, onDelete }) => {

    const user = useSelector(state => state.auth.user);
    const token = useSelector(state => state.auth.token);

    // Check if the current user is the owner of this comment
    const isCurrentUserCommentOwner = userId === user._id;

    const textareaRef = useRef(null);
    const [loading, setLoading] = useState(false);
    const [isEditing, setIsEditing] = useState(false);
    const [editedComment, setEditedComment] = useState(comment);



    const handleCommentEdit = () => {
        setIsEditing(!isEditing);
    }


// Update comment
    const handleUpdateComment = async () => {
        setLoading(true);

        try {
            const response = await axios.patch(`http://localhost:8000/api/v1/comment/update-comment/${commentId}`,
                {
                    content: editedComment
                },
                {
                    headers: {
                        'Authorization': `Bearer ${token}`,
                        'Content-Type': 'application/json'
                    }
                }
            );

            console.log(response.data.data.content)
            toast.success(response.data.message)

            onUpdate(commentId, response.data.data.content)

            setLoading(false)
            comment = response.data.data.content;
            setIsEditing(false)
        } catch (error) {
            console.log('Error update comment', error)
            toast.error('Something went wrong while updating comment')
            setLoading(false)
        }

    }


    // Handle delete comment 
    const handleDeleteComment = async() => {
        setLoading(true)

        try {
            const response = await axios.delete(`http://localhost:8000/api/v1/comment/delete-comment/${commentId}`,
                {
                    headers: {
                        'Authorization': `Bearer ${token}`
                    }
                }
            );

            console.log(response.data.message)
            toast.success(response.data.message)

            // Remove the comment from the comments array
            onDelete(commentId)

            setLoading(false)
        } catch (error) {
            console.log('Error delete comment', error)
            toast.error('Something went wrong while deleting comment')
            setLoading(false)
        }
    }

    useEffect(() => {
        (isEditing && textareaRef.current) ? textareaRef.current.focus() : null
    }, [isEditing, comment])

    return (
        <div className='hover:bg-zinc-100 dark:hover:bg-zinc-900 my-2 px-3 rounded-md transition-all delay-75'>
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
                                <div className='flex gap-3 justify-end'>

                                    <Button
                                        // variant='ghost'
                                        onClick={handleCommentEdit}
                                        className='bg-zinc-100 dark:bg-zinc-900 transition-all text-sm h-8 font-medium text-gray-400 dark:text-gray-300 px-3 py-2'
                                    >
                                        Edit
                                    </Button>
                                    {
                                        isEditing ? (
                                            <Button
                                                onClick={handleUpdateComment}
                                                className='bg-green-100 dark:bg-green-950 transition-all text-sm h-8 font-medium text-green-500 dark:text-green-500 px-3 py-2'
                                            >
                                                {
                                                    loading ?
                                                        <Loader2 className='h-4 w-4 animate-spin' />
                                                        :
                                                        'Save'
                                                }
                                            </Button>
                                        ) :
                                            <Button
                                                // variant='ghost'
                                                onClick={handleDeleteComment}
                                                className='bg-red-100 dark:bg-red-950 transition-all text-sm h-8 font-medium text-red-500 dark:text-red-400 px-3 py-2'
                                            >
                                                {
                                                    loading ?
                                                        <Loader2 className='h-4 w-4 animate-spin' />
                                                        :
                                                        'Delete'
                                                }
                                            </Button>
                                    }
                                </div>
                            )
                        }
                    </div>
                </div>

            </div>
        </div>
    )

}
