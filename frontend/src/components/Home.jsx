import React, { useEffect, useState } from 'react'
import VideoCard from './VideoCard'
import axios from 'axios'
import { useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import { Loader2 } from 'lucide-react'

const Home = () => {

  const [loading, setLoading] = useState(false)
  const [videos, setVideos] = useState([])
  const [ownerDetails, setOwnerDetails] = useState([])
  const token = useSelector(state => state.auth.token)


  const getAllVideos = async () => {
    setLoading(true)
    try {
      const response = await axios.get('http://localhost:8000/api/v1/video/get-all-videos',
        {
          headers: {
            "Authorization": `Bearer ${token}`
          }
        }
      );

      console.log(response)
      setVideos(response.data.data)
      setOwnerDetails(response.data.data.ownerDetails)

    } catch (error) {
      console.log(error)
    setLoading(false)
    }
    setLoading(false)

  }

  useEffect(() => {
    getAllVideos();
  }, [])

  if (loading) return <div className='h-screen w-full top-[50%]'> <Loader2 className='h-4 w-4 animate-spin'/> </div>
  return (
    <>

      <div className='h-auto w-full text-sm flex flex-row justify-center items-center flex-wrap gap-5 py-4'>
        {
          videos ? videos.map(video => (
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
                
              />

            </div>
              </Link>
          )

          ) : 'Videos Not Found'
        }
      </div>
    </>

  )
}

export default Home