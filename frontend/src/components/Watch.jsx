import React, { useState } from 'react'
import { useParams } from 'react-router-dom'
import ReactPlayer from 'react-player/lazy'
import axios from 'axios'
import { useSelector } from 'react-redux'
import { useAuth0 } from '@auth0/auth0-react'
import { Button } from './ui/button'
import { ThumbsDown, ThumbsUp } from 'lucide-react'
import {
    Accordion,
    AccordionContent,
    AccordionItem,
    AccordionTrigger
} from './ui/accordion'

const Watch = () => {
    const { user } = useAuth0()
    console.log(user)

    const { id } = useParams()
    console.log('url:', id)

    const token = useSelector(state => state.auth.token)
    const [video, setVideo] = useState([])
    const [creatorDetails, setCreatorDetails] = useState([])
    console.log('creator: ', creatorDetails)
    console.log(video.videoFile)

    const fetchVideo = async () => {
        try {
            const response = await axios.post('http://localhost:8000/api/v1/video/get-single-video',
                {
                    id: id
                },
                {
                    headers: {
                        "Authorization": `Bearer ${token}`
                    }
                }

            )
            console.log(response)
            setVideo(response.data.data.singleVideo)
            setCreatorDetails(response.data.data.creatorInfo[0].creatorDetails[0])
        } catch (error) {
            console.log(error)
        }
    }

    React.useEffect(() => {
        fetchVideo()
    }, [])


    return (
        <>
            <div className='h-screen w-full '>

                <div className='rounded-md w-[70%] bg-gray-900 h-auto p-3'>

                    <ReactPlayer
                        controls
                        width="100%"
                        height={'25rem'}
                        url={video.videoFile}
                        volume={1}
                        playbackRate={1}
                    />
                </div>


                <section className='p-3'>
                    <h1 className='font-semibold text-xl'>
                        {video?.title || null}
                    </h1>

                    <div className='w-[70%]'>
                        <div className='flex flex-row justify-between items-center'>
                            <div className='flex flex-row items-center justify-start gap-1 py-4'>

                                <img
                                    className='h-12 w-12 rounded-full'
                                    src={creatorDetails?.avatar}
                                    alt={creatorDetails.fullName}
                                />
                                <div className='flex flex-col justify-start items-center'>
                                    <span className='text-sm font-medium pl-3'>{creatorDetails.fullName}</span>
                                    <span className='text-xs text-gray-300'>100K subscribers</span>
                                </div>

                                <div className='pl-3'>
                                    <span>
                                        <Button
                                            className='rounded-full font-medium'
                                        >
                                            Subscribe
                                        </Button>
                                    </span>
                                </div>
                            </div>


                            <div className='flex flex-row items-center gap-2'>
                                <Button
                                    className='rounded-full items-center'
                                    variant='outline'
                                >
                                    <ThumbsUp />
                                    Like
                                </Button>

                                <Button
                                    className='rounded-full items-center'
                                    variant='outline'
                                >
                                    <ThumbsDown />
                                    Dislike
                                </Button>
                            </div>
                        </div>

                        <div className=' h-auto w-full rounded-md'>
                            <Accordion type="single" collapsible>
                                <AccordionItem value="item-1">
                                    <AccordionTrigger>19B views | 3 months ago</AccordionTrigger>
                                    <AccordionContent>
                                        {video?.description}
                                    </AccordionContent>
                                </AccordionItem>
                            </Accordion>

                        </div>
                    </div>
                </section>
            </div>
        </>
    )
}

export default Watch