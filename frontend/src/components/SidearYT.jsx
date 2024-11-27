import React from 'react'
import { Sidebar, Menu, MenuItem, SubMenu } from 'react-pro-sidebar';

const SidearYT = () => {
    return (
        <Sidebar backgroundColor='white' className='px-2 py-2 text-sm'>
            <div className='flex justify-center items-center py-3'>

            <img src="./yt-logo.svg" alt="youtybe logo" />
            </div>
            <Menu>
                
                <MenuItem className='hover:bg-black'>  Home </MenuItem>
                <MenuItem> Subscription </MenuItem>
                <MenuItem> Playlist </MenuItem>
                <MenuItem> Liked Video </MenuItem>
                <MenuItem> Settings </MenuItem>
            </Menu>
            <hr />
            <Menu>
                
                <MenuItem>  Home </MenuItem>
                <MenuItem> Subscription </MenuItem>
                <MenuItem> Playlist </MenuItem>
                <MenuItem> Liked Video </MenuItem>
                <MenuItem> Settings </MenuItem>
            </Menu>
        </Sidebar>
  )
}

export default SidearYT