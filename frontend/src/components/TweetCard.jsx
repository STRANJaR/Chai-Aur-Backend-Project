import React, { useEffect, useState } from 'react'
import { Card, CardDescription, CardHeader, CardTitle } from './ui/card'
import { Avatar, AvatarFallback, AvatarImage } from './ui/avatar'
import { Button } from './ui/button'
import { Textarea } from './ui/textarea'
import { Input } from './ui/input'
import { useForm } from 'react-hook-form'
import axios from 'axios'
import { useSelector } from 'react-redux'
import { Heart, Loader2, MessageSquare } from 'lucide-react'
import { toast, ToastContainer } from 'react-toastify'
import dateFormat from 'dateformat'
import { Link } from 'react-router-dom'


const TweetCard = () => {

    const token = useSelector((state) => state.auth.token)
    const user = useSelector((state) => state.auth.user)
    const { register, handleSubmit } = useForm()
    const [loading, setLoading] = useState(false)
    const [tweets, setTweets] = useState([])



    const fetchTweets = async () => {
        try {
            const response = await axios.get(`http://localhost:8000/api/v1/tweet/user-tweets/${user._id}`,
                {
                    headers: {
                        "Authorization": `Bearer ${token}`
                    }
                }
            )

            console.log(response)
            setTweets(response.data.data)
        } catch (error) {
            console.log('Error while fetching tweets: ', error)
        }
    }



    const handleTweet = async (payload) => {
        setLoading(true)
        try {
            const response = await axios.post(`http://localhost:8000/api/v1/tweet/`,
                { content: payload.content },
                {
                    headers: {
                        "Authorization": `Bearer ${token}`,
                        "Content-Type": "application/json"
                    }
                }
            )

            console.log(response)
            toast.success(response.data.message)
        } catch (error) {
            toast.error(error.response.data.message || 'Something went wrong while creating tweet')
            setLoading(false)
            console.log('Error while creating tweet: ', error)
        }
        setLoading(false)
    }


    useEffect(() => {
        fetchTweets();
    }, [])



    return (
        <>
            <div className='py-5 flex flex-col justify-center gap-5'>

                {/* post tweet  */}

                <Card className='w-[80%] min-h-48 transaltion-all'>
                    <div className='flex flex-row items-center gap-3 p-3'>
                        <Avatar>
                            <AvatarImage src={user?.avatar} alt='@' />
                            <AvatarFallback>CN</AvatarFallback>
                        </Avatar>

                        <span className='text-sm font-medium'>{user.fullName}</span>
                    </div>

                    {/* content fofilrm  */}
                    <div className='px-3 w-full h-auto text-sm'>
                        <form onSubmit={handleSubmit(handleTweet)}>

                            <Textarea
                                className='w-full h-32 resize-none bg-transparent outline-none'
                                placeholder='What is happening?'
                                {...register('content', { required: 'Content is required' })}
                            />


                            <div className='flex flex-row justify-between py-3'>
                                <div>
                                    <input
                                        className='rounded-full bg-zinc-800'
                                        type='file'
                                    />
                                </div>
                                <Button
                                    type='submit'
                                    variant='default'
                                    className='text-sm rounded-full w-28'>
                                    {
                                        loading ? (
                                            <Loader2 className='w-4 h-4 animate-spin' />
                                        ) : (
                                            'Tweet'
                                        )
                                    }
                                </Button>
                            </div>

                        </form>
                    </div>
                </Card>


                {/* TODO:  loop the tweets */}
                {tweets && tweets.map((tweet) => (

                    <Link
                    key={tweet._id}
                    to={`/tweet/${tweet._id}`}
                    >
                    <Card
                        className='w-[80%] min-h-48 '>
                        <div className='flex flex-row items-center gap-3 p-3'>
                            <Avatar>
                                <AvatarImage src={tweet.ownerDetails?.avatar} alt='@' />
                                <AvatarFallback>CN</AvatarFallback>
                            </Avatar>

                            <span className='text-sm font-medium'>{user.fullName || 'null'}</span>
                            <span className='text-xs text-gray-300'>{dateFormat(tweet.createdAt, 'dd, mmm, yyyy')}</span>
                        </div>

                        {/* content  */}
                        <div className='py-5 px-3 w-full h-full text-sm'>
                            {tweet.content}
                        </div>

                        <div className='flex flex-row justify-start gap-3 p-3'>
                            {/* <div>
                                    <input
                                        className='rounded-full bg-zinc-800'
                                        type='file'
                                    />
                                </div> */}

                            <Button
                                variant='ghost'
                                className='rounded-full'
                            >
                                <Heart className='h-4 w-4' />
                            </Button>

                            {/* <Button
                                variant='ghost'
                                className='rounded-full'
                            >
                                <Heart className='h-4 w-4' />
                            </Button> */}

                            <Button
                            variant='ghost'
                            >
                                <MessageSquare className='h-4 w-4' />
                            </Button>
                        </div>
                    </Card>
                    </Link>

                ))}

            </div>
            <ToastContainer />
        </>

    )
}

export default TweetCard