import { useDebounce } from '@uidotdev/usehooks';
import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { Input } from './ui/input';

const SearchBar = () => {
    const navigate = useNavigate();
    const token = useSelector(state => state.auth.token)

    const [query, setQuery] = useState('');

    // OPTIMIZE: Implemented deboucing for optimizaiton
    const debouncedSearchTerm = useDebounce(query, 2000);


    const fetchVideos = async (searchQuery) => {
        try {
            const response = await axios.get(`http://localhost:8000/api/v1/video/search?query=${searchQuery}`,
                {
                    headers: {
                        "Authorization": `Bearer ${token}`
                    }
                }
            );
            console.log(response)

        } catch (error) {
            console.log('Error while fetch search videos: ', error)
        }
    }

    const handleSearch = (e) => {
        setQuery(e.target.value);

        if (e.key === 'Enter' || e.key === 'click') {
            console.log('hello');

            if (query.trim()) {
                navigate(`/search?query=${query}`)
            } else console.log('search query empty')
        }
    }


    useEffect(() => {
        if (query.length > 2) {
            fetchVideos(debouncedSearchTerm)
        } else {
            // console.log('search query is less than 3 characters')
        }

    }, [debouncedSearchTerm])

    return (
        <div>
            <Input
                type='text'
                className='w-full px-6 py-4 h-10 bg-transparent border border-gray-700 text-sm font-medium  rounded-full'
                placeholder='Search'
                value={query}
                onChange={handleSearch}
                onKeyDown={handleSearch}
            />
        </div>
    )
}

export default SearchBar