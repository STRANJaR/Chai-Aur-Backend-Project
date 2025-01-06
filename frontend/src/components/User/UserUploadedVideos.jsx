import React, { useEffect, useState } from 'react'
import axios from '../../hook/useFetch.js'
import { useSelector } from 'react-redux'
import VideoCard from '../VideoCard.jsx'
import { Link } from 'react-router-dom'
import { Loader2 } from 'lucide-react'

const UserUploadedVideos = () => {

    const token = useSelector(state => state.auth.token)
    const user = useSelector(state => state.auth.user)

    const [loading, setLoading] = useState(false)
    const [videos, setVideos] = useState([])
    const [page, setPage] = useState(1);
    const [hashMoreVideos, setHasMoreVideos] = useState(true);


    // TODO: filter the user specifific uploaded video...
    const userUploadedVideos = videos.filter(video => video.owner === user._id)
    console.log('userUploadedVideos: ', userUploadedVideos)

    useEffect(() => {
        const fetchVideos = async () => {
            setLoading(true)

            try {
                const response = await axios.get(`/video/get-all-videos?page=${page}&limit=70`,
                    {
                        headers: {
                            "Authorization": `Bearer ${token}`
                        }
                    }
                )

                console.log(response)
                setVideos((prevVideos) => [...prevVideos, ...response.data.data.videos])
                setHasMoreVideos(response.data.data.currentPage < response.data.data.totalPages)

            } catch (error) {
                setLoading(false)
                console.log('Error fetching videos: ', error);
            }
            setLoading(false)
        }
        if (hashMoreVideos) fetchVideos();
    }, [page])


    const handleScroll = () => {
        if (
            window.innerHeight + document.documentElement.scrollTop !==
            document.documentElement.offsetHeight
        )
            return;

        if (!loading && hashMoreVideos) {
            setPage((prevPage) => prevPage + 1);
        }
    };

    useEffect(() => {
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, [loading, hashMoreVideos])


    return (
        <>

            <div className='h-auto w-full text-sm flex flex-row justify-center items-center flex-wrap gap-5 py-4'>
                {
                    userUploadedVideos && userUploadedVideos.map(video => (
                        <Link
                            key={video._id}
                            to={`/watch/${video._id}`}>
                            <div
                                className=' flex flex-row'
                            >

                                <VideoCard
                                    thumbnail={video.thumbnail}
                                    videoViews={video.views}
                                    uploadTime={video.createdAt}
                                    videoTitle={video.title}
                                    creator={video.ownerDetails}

                                />

                            </div>
                        </Link>
                    ))}


            </div>

            <div className='h-20 w-full'>
                {
                    loading && <p className='flex flex-row justify-center items-center py-4 text-gray-300'>
                        <Loader2 className='h-4 w-4 animate-spin' />
                    </p>
                }

                {
                    !hashMoreVideos && <p className='text-center  text-xs py-4 text-gray-300'>No more videos to load.</p>
                }
            </div>
        </>

    )
}

export default UserUploadedVideos