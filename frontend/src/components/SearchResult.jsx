import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { useLocation } from 'react-router-dom'
import SingleSearchedVideo from './SingleSearchedVideo'

const SearchResult = () => {
    const location = useLocation()

    const token = useSelector(state => state.auth.token);

    // Extract the search query
    const searchQuery = new URLSearchParams(location.search).get('query')

    const [videos, setVideos] = useState([]);
    console.log('videos', videos)


    const fetchSearchResult = async (searchQuery) => {
        try {
            const response = await axios.get(`http://localhost:8000/api/v1/video/search?query=${searchQuery}`,
                {
                    headers: {
                        "Authorization": `Bearer ${token}`
                    }

                }
            )
            setVideos(response.data.data)
            console.log('serach param: ', response)
        } catch (error) {
            console.error('Error while fetching search result: ', error)
        }
    }

    useEffect(() => {
        if (searchQuery) fetchSearchResult(searchQuery)
    }, [searchQuery])

    return (
        <div className='px-6 py-6 h-screen' >

            {videos ? videos.map(video => (
                <SingleSearchedVideo
                    key={video._id}
                    title={video.title}
                    description={video.description}
                    thumbail={video.thumbnail}
                    createdAt={video.createdAt}
                    views={video.views}
                />
            )) : 
            <div className='h-screen w-full'>
                <h1>No videos found for the given search query.</h1>
            </div>
        }

        </div>
    )
}

export default SearchResult