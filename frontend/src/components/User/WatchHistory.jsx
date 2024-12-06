import axios from 'axios'
import { EyeOff } from 'lucide-react'
import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'

const WatchHistory = () => {

    const token = useSelector(state => state.auth.token)
    const [history, setHistory] = useState([])

    const getWatchHistory = async()=> {
        try {
            const response = await axios.get('http://localhost:8000/api/v1/users/history', {
                headers: {
                    "Authorization": `Bearer ${token}`
                }
            });

            console.log(response)
            setHistory(response.data.data)
        } catch (error) {
            console.log(error)
        }
    }
    useEffect(()=> {
        getWatchHistory();
    }, [])


    if(history.length === 0) return(
        <>
        <div className='h-screen w-full text-sm'>
            <div className='h-full w-full flex flex-col justify-center items-center gap-3'>
                <EyeOff className='h-6 w-6 text-red-500'/>
                <p className='font-semibold'>Oops! Look like don't have watch history.</p>
            </div>
        </div>
        </>
    )

  return (
    <div>
        
    </div>
  )
}

export default WatchHistory