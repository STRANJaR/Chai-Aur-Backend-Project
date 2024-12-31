import React, { useRef, useState } from 'react'
import { useParams } from 'react-router-dom'
import axios from 'axios'
import { useSelector } from 'react-redux'
import { useAuth0 } from '@auth0/auth0-react'
import { Button } from './ui/button'
import { Loader2, ThumbsDown, ThumbsUp } from 'lucide-react'
import {
    Accordion,
    AccordionContent,
    AccordionItem,
    AccordionTrigger
} from './ui/accordion'
import { Input } from './ui/input'
import { Comment } from './Comment.jsx'
import { useForm } from 'react-hook-form'
import { toast } from 'react-toastify'
import dateFormat from 'dateformat'
import LikeButton from './LikeButton'
import VideoPlayer from './VideoPlayer'
import videojs from 'video.js'


const Watch = () => {

    const { id } = useParams()


    const token = useSelector(state => state.auth.token)
    const user = useSelector(state => state.auth.user)
    const playerRef = useRef(null)

    const { register, handleSubmit } = useForm();

    const [loading, setLoading] = useState(false)
    const [video, setVideo] = useState({})
    const [allvideos, setAllVideos] = useState([])



    const [comments, setComments] = useState([]);



    // Fetch videos from server 
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



            // console.log(response)
            setVideo(response.data.data.singleVideo)

        } catch (error) {
            console.log(error)
        }
    }


    // HANDLE LIKE 
    const handleLike = async () => {
        try {
            const response = await axios.post(`http://localhost:8000/api/v1/like/v/${id}`, {}, {
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            });

            console.log(response)
            setVideo(prevState => ({ ...prevState, likes: response.data.data.likes }))
            toast.success(response.data.data)

        } catch (error) {
            console.log('LIKE ERROR: ', error)
            toast.error('try again')
        }
    }


    // Fetch comments from server
    const fetchComments = async () => {
        try {
            const response = await axios.get(`http://localhost:8000/api/v1/comment/all-comments/${id}`, {
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            });

            console.log(response)
            setComments(response.data.data)

        } catch (error) {
            console.log('COMMENT ERROR: ', error)
        }
    }


    // Handle updated comment 
    const handleUpdatedComment = (commentId, updatedComment) => {
        setComments(
            comments.map(comment => comment._id === commentId ? { ...comment, content: updatedComment } : comment)
        )
    }


    // Handle deleted comment 
    const handleDeletedComments = (commentId) => {
        setComments(
            comments.filter(comment => comment._id !== commentId)
        )
    }


    // Add a comment 
    const handleComment = async (payload) => {
        setLoading(true)

        try {
            const response = await axios.post(`http://localhost:8000/api/v1/comment/${id}`,
                {
                    content: payload.comment
                },
                {
                    headers: {
                        'Authorization': `Bearer ${token}`,
                        'Content-Type': 'application/json'
                    }
                }
            );

            setLoading(false)
            toast.success(response.data.message)
            console.log('new comment: ', response)

        } catch (error) {
            console.log('ADD COMMENT ERROR: ', error)
            toast.error('something went wrong while comment')
            setLoading(false)
        }
        setLoading(false)
    }


    // OPTIMIZE: INTEGRATE VIDEO JS PLAYER FOR BETTER PERFOMANCE AND STABILITY
    const videoPlayerOptions = {
        controls: true,
        responsive: true,
        fluid: true,
        sources: [
            {
                src: 'https://youtube-yard.s3.ap-south-1.amazonaws.com/drone/drone.m3u8',
                type: 'application/x-mpegURL'
            }
        ]
    }

    const handlePlayerReady = async (player) => {
        playerRef.current = player;

        // You can handle player events here, for example:
        player.on("waiting", () => {
            videojs.log("player is waiting");
        });

        player.on("dispose", () => {
            videojs.log("player will dispose");
        });
    }

    React.useEffect(() => {
        fetchVideo()
        fetchComments()
    }, [])


    return (
        <>
            <div className='h-screen w-full '>

                <div className='rounded-sm w-[70%] bg-zinc-900 h-auto p-2'>

                    {/* <ReactPlayer
                        controls
                        width="100%"
                        height={'25rem'}
                        url={video.videoFile}
                        volume={1}
                        playbackRate={1}
                        loop={true}
                    /> */}

                    {/* VIDEO JS PLAYER  */}

                    <VideoPlayer
                        onReady={handlePlayerReady}
                        options={videoPlayerOptions}
                    />
                </div>


                <section className='p-3'>
                    <div className='w-[70%]'>

                        <h1 className='font-semibold text-xl'>
                            {video?.title || null}
                        </h1>
                    </div>

                    <div className='w-[70%]'>
                        <div className='flex flex-row justify-between items-center'>
                            <div className='flex flex-row items-center justify-start gap-1 py-4'>

                                <img
                                    className='h-12 w-12 rounded-full'
                                    src={''}
                                    alt={''}
                                />
                                <div className='flex flex-col justify-start items-center'>
                                    <span className='text-sm font-medium pl-3'>{allvideos?.fullName}</span>
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
                                    onClick={handleLike}
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

                        <div className=' h-auto w-full rounded-md bg-slate-50 dark:bg-zinc-900 px-4'>
                            <Accordion type="single" collapsible>
                                <AccordionItem value="item-1">
                                    <AccordionTrigger>
                                        <div className='flex flex-row items-center gap-3'>

                                            <span>{video?.views} views</span>
                                            |
                                            <span> {dateFormat(video?.createdAt, 'dd-mmm-yyyy')} </span>
                                        </div>
                                    </AccordionTrigger>
                                    <AccordionContent>
                                        {video?.description}
                                    </AccordionContent>
                                </AccordionItem>
                            </Accordion>

                        </div>


                        {/* TODO: comment section  */}
                        <section className='h-auto w-full  rounded-md p-5 my-5 border'>
                            <span> {comments.length} Comments</span>

                            <form onSubmit={handleSubmit(handleComment)}>
                                <div className='flex flex-row gap-2 px-3 py-5'>
                                    <img
                                        className='h-10 w-10 rounded-full'
                                        src={user?.avatar}
                                        alt={user?.name}
                                    />
                                    <Input
                                        type='text'
                                        placeholder='Add a comment...'
                                        className='w-full px-3 py-2'
                                        {...register('comment', { required: true })}
                                    />
                                    <Button
                                        type='submit'
                                        className=''
                                        variant='outline'
                                    >
                                        {
                                            loading ?
                                                <Loader2 className='transition-all h-4 w-4 animate-spin' />
                                                : 'Comment'
                                        }
                                    </Button>
                                </div>

                            </form>


                            <div className='h-auto w-full'>
                                {
                                    comments && comments.map(comment => (

                                        <Comment
                                            key={comment._id}
                                            commentId={comment._id}
                                            userId={comment.ownerDetails._id}
                                            comment={comment.content}
                                            avatar={comment.ownerDetails.avatar}
                                            username={comment.ownerDetails.username}
                                            commentPostTime={comment.createdAt}
                                            onUpdate={handleUpdatedComment}
                                            onDelete={handleDeletedComments}
                                        />
                                    ))
                                }
                            </div>
                        </section>
                    </div>
                </section>
            </div>
        </>
    )
}

export default Watch