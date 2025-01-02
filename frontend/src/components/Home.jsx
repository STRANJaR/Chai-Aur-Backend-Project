import React, { useEffect, useState } from 'react'
import VideoCard from './VideoCard'

import { useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import { Loader2 } from 'lucide-react'
import axios from '../hook/useFetch.js';

const Home = () => {
  const token = useSelector(state => state.auth.token)

  const [loading, setLoading] = useState(false)
  const [videos, setVideos] = useState([])
  const [page, setPage] = useState(1);
  const [hashMoreVideos, setHasMoreVideos] = useState(true);

  const [ownerDetails, setOwnerDetails] = useState([])



  useEffect(() => {
    const getAllVideos = async () => {
      setLoading(true)
      try {
        // const response = await axios.get('http://localhost:8000/api/v1/video/get-all-videos?page=3',
        const response = await axios.get(`/video/get-all-videos?page=${page}&limit=9`,
          {
            headers: {
              "Authorization": `Bearer ${token}`
            }
          }
        );

        console.log(response)
        // setVideos(response.data.data.videos)
        setVideos((prevVideos) => [...prevVideos, ...response.data.data.videos])
        setHasMoreVideos(response.data.data.currentPage < response.data.data.totalPages)



      } catch (error) {
        console.log('Error fetching videos client: ', error)
        setLoading(false)
      }
      setLoading(false)

    }

    if(hashMoreVideos) getAllVideos();

  }, [page])


  // Handle scroll event
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




  // if (loading) return <div className='h-screen w-full top-[50%]'> <Loader2 className='h-4 w-4 animate-spin' /> </div>
  return (
    <>

      <div className='h-auto w-full text-sm flex flex-row justify-center items-center flex-wrap gap-5 py-4'>
        {
          videos && videos.map(video => (
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
            <Loader2 className='h-4 w-4 animate-spin'/>
          </p>
        }

        {
          !hashMoreVideos && <p className='text-center  text-xs py-4 text-gray-300'>No more videos to load.</p>
        }
      </div>
    </>

  )
}

export default Home