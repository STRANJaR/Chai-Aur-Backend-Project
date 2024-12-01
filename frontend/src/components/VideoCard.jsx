import React from 'react'

import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from '@/components/ui/card.tsx'
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar.tsx"



const VideoCard = ({thumbnail, avatarImage, videoTitle, channelName, videoViews, uploadTime}) => {


    return (
        <div>
            <Card className='w-80 h-72 p-2 flex flex-col gap-3 cursor-pointer dark:hover:shadow-slate-900 hover:shadow-md  transition-all'>
                <div className='rounded-md bg-slate-400  h-44 w-full'>
                    <img
                        className='rounded-md object-contain'
                        src={thumbnail} alt="video thumbnail" />
                </div>
                <div>
                    <div className=' flex flex-row justify-between items-center gap-3'>
                        <Avatar>
                            <AvatarImage src="https://github.com/stranjar.png" />
                            <AvatarFallback>CN</AvatarFallback>
                        </Avatar>
                        <div>
                            <p className=' text-sm font-medium'>
                                {videoTitle || 'Lorem, ipsum dolor sit amet consectetur adipisicing elit.'}
                            </p>
                        </div>
                    </div>
                    <div className='pl-[50px] pt-2 text-xs dark:text-gray-300'>
                        <span className='hover:text-white'>{channelName || 'Rohit Shrivastav'}</span>
                        <div className='flex flex-row items-center gap-3 py-1'>
                            <span>{videoViews || '4.9K views'}</span>
                            <span>{uploadTime || '7 hours ago'}</span>
                        </div>
                    </div>
                </div>
            </Card>

        </div>
    )
}

export default VideoCard