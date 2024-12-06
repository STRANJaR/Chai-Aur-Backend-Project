import React, { useEffect, useState } from 'react'
import Container from './Container/Container'
import VideoCard from './VideoCard'
import axios from 'axios'
import { useSelector } from 'react-redux'

const Home = () => {

  const [videos, setVideos] = useState([])
  const token = useSelector(state => state.auth.token)


  const getAllVideos = async() => {
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

    } catch (error) {
      console.log(error)
    }
  }

  useEffect(()=> {
    getAllVideos();
  }, [])
  return (
    <>
    <div className='h-auto w-full text-sm flex flex-row justify-center items-center flex-wrap gap-5 py-4'>
      {
        videos && videos.map(video => (
          <div 
          key={video._id}
          className=' flex flex-row '
          >

          <VideoCard
          thumbnail={video.thumbnail}
          />
          </div>
        ))
      }
    </div>
    </>

  )
}

export default Home