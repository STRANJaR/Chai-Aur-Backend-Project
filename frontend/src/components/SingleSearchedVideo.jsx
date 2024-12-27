import React from 'react'
import dateFormat from 'dateformat'
import { Link } from 'react-router-dom'


const SingleSearchedVideo = ({ thumbail, title, description, views, createdAt }) => {
    return (
        <Link to={'#'}> 
        <div className='bg-zinc-900  hover:bg-transparent border h-auto w-full p-5 my-5 rounded-md transition-all'>

            <main className='flex flex-row justify-between'>

                <div className='h-full w-[40%]'>
                    <img
                        className='rounded-md'
                        src={thumbail} alt={title.substring(0, 10)} />
                </div>

                <div className='flex flex-col justify-start gap-2 w-[60%] px-5'>
                    <h1 className='font-medium text-lg'>{title}</h1>

                    <div className='flex flex-row items-center gap-1'>

                        <span className='font-normal text-xs '>{views} views |</span>
                        <span className='font-normal text-xs '>{dateFormat(createdAt, 'dd, mmm, yyyy')}</span>
                    </div>
                    <p className='text-sm py-8 text-gray-400 dark:text-gray-300'>{description.substring(0, 150)}...</p>
                </div>
            </main>

        </div>
        </Link>

    )
}

export default SingleSearchedVideo