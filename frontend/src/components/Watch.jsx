import React, { useState } from 'react'
import { useParams } from 'react-router-dom'
import ReactPlayer from 'react-player/lazy'
import axios from 'axios'
import { useSelector } from 'react-redux'

const Watch = () => {

    const { id } = useParams()
    console.log('url:', id)

    const token = useSelector(state => state.auth.token)
    const [video, setVideo] = useState([])
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
            setVideo(response.data.data)
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
            </div>
        </>
    )
}

export default Watch