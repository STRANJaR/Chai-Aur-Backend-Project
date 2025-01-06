import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { useParams } from 'react-router-dom'
import axios from 'axios'
import { Button } from './ui/button'
import { Heart, MessageSquare } from 'lucide-react'
import { Avatar, AvatarFallback, AvatarImage } from './ui/avatar'
import dateFormat from 'dateformat'
import { Card } from './ui/card'


const SingleTweet = () => {
    const { id } = useParams();

    const token = useSelector(state => state.auth.token)
    const [tweet, setTweet] = useState({})
    const [loading, setLoading] = useState(false)


    const getSingleTweet = async () => {
        setLoading(true)

        try {
            const response = await axios.get(`http://localhost:8000/api/v1/tweet/${id}`,
                {
                    headers: {
                        "Authorization": `Bearer ${token}`
                    }
                }
            )

            console.log('response: ', response)
            setTweet(response.data.data)
        } catch (error) {
            console.log('Error while fetching tweet: ', error)
            setLoading(false)
        }
        setLoading(false)
    }


    useEffect(() => {
        getSingleTweet()
    }, [id])



    return (
        <div className='h-full w-full p-5'>
            <Card
                className='w-[80%] h-full '>
                <div className='flex flex-row items-center gap-3 p-3'>
                    <Avatar>
                        <AvatarImage src={''} alt='@' />
                        <AvatarFallback>CN</AvatarFallback>
                    </Avatar>

                    <span className='text-sm font-medium'>{'null'}</span>
                    <span className='text-xs text-gray-300'>{dateFormat('dd, mmm, yyyy')}</span>
                </div>

                {/* content  */}
                <div className='py-5 px-3 w-full h-full text-sm'>
                    {tweet.content}
                </div>

                <div className='flex flex-row justify-start gap-3 bg-blue-300'>
                    <Button
                        variant='ghost'
                        className='rounded-full'
                    >
                        <Heart className='h-4 w-4' />
                    </Button>

                    <Button
                        variant='ghost'
                    >
                        <MessageSquare className='h-4 w-4' />
                    </Button>
                </div>
            </Card>
        </div>
    )
}

export default SingleTweet