import { Code, Dock, History, Home, ListVideo, MessagesSquare, PlayCircle, SettingsIcon, ThumbsUp, Youtube } from 'lucide-react';
import React from 'react'
import { Sidebar, Menu, MenuItem, SubMenu } from 'react-pro-sidebar';
import { Separator } from './ui/separator';


const SidearYT = () => {
    return (
        <Sidebar rootStyles={{backgroundColor: 'black'}} className='px-2 py-2 text-sm'>
            
            {/* <div className='flex justify-center items-center py-3'>

            <img src="./yt-logo.svg" alt="youtybe logo" />
            </div> */}
            <Menu>

                <MenuItem >
                    <span className='flex flex-row justify-start items-center gap-3'>
                        <Home className='h-5 w-5' />
                        <p>Home</p>
                    </span>
                </MenuItem>
                <MenuItem >
                    <span className='flex flex-row justify-start items-center gap-3'>
                        <Dock className='h-5 w-5' />
                        <p>Subscription</p>
                    </span>
                </MenuItem>
                <MenuItem >
                    <span className='flex flex-row justify-start items-center gap-3'>
                        <PlayCircle className='h-5 w-5' />
                        <p>Shorts</p>
                    </span>
                </MenuItem>
            </Menu>

            <Separator />
            <Menu>
                <MenuItem >
                    <span className='flex flex-row justify-start items-center gap-3'>
                        <History className='h-5 w-5' />
                        <p>History</p>
                    </span>
                </MenuItem>
                <MenuItem >
                    <span className='flex flex-row justify-start items-center gap-3'>
                        <ListVideo className='h-5 w-5' />
                        <p>Playlists</p>
                    </span>
                </MenuItem>
                <MenuItem >
                    <span className='flex flex-row justify-start items-center gap-3'>
                        <ThumbsUp className='h-5 w-5' />
                        <p>Liked Videos</p>
                    </span>
                </MenuItem>

            </Menu>
            <Separator/>
            <Menu>
            <MenuItem >
                    <span className='flex flex-row justify-start items-center gap-3'>
                        <SettingsIcon className='h-5 w-5' />
                        <p>Settings</p>
                    </span>
                </MenuItem>
            <MenuItem >
                    <span className='flex flex-row justify-start items-center gap-3'>
                        <MessagesSquare className='h-5 w-5' />
                        <p>Send Feedback</p>
                    </span>
                </MenuItem>
            <MenuItem >
                    <span className='flex flex-row justify-start items-center gap-3'>
                        <Code className='h-5 w-5' />
                        <p>Developer</p>
                    </span>
                </MenuItem>
            </Menu>

            <Separator/>
            <Menu>
                
            </Menu>
        </Sidebar>
    )
}

export default SidearYT