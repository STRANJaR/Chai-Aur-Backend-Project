import React, { useCallback, useState } from 'react'
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from './ui/dropdown-menu'
import { useTheme } from '../components/theme-provider'
import { ArrowUp, Dock, Loader2, LogOut, LucideBell, Moon, Settings, Sun, User, Video } from 'lucide-react'
import { Avatar, AvatarFallback, AvatarImage } from './ui/avatar'
import { useSelector, useDispatch } from 'react-redux'
import { toast, ToastContainer } from 'react-toastify'
import axios from 'axios'
import { logout as logoutStore } from '../store/authSlice'
import { Link } from 'react-router-dom'
import {
    Tooltip,
    TooltipContent,
    TooltipProvider,
    TooltipTrigger,
} from './ui/tooltip'


// OAuth by okta
import { useAuth0 } from '@auth0/auth0-react'
import SearchBar from './SearchBar'
import { Button } from './ui/button'



const Header = () => {

    const { logout } = useAuth0();
    const dispatch = useDispatch()

    const user = useSelector(state => state.auth.user)
    const token = useSelector(state => state.auth.token)


    const { setTheme, theme } = useTheme();
    const dark = theme === 'dark';


    // Handle User Logout
    const handleLogout = useCallback(async () => {
        try {
            const response = await axios.post('http://localhost:8000/api/v1/users/logout', {}, {
                headers: {
                    "Authorization": `Bearer ${token}`
                }
            });

            if (!response) toast.error('Something wrong while logout')

            dispatch(logoutStore())
            logout()
            toast.success(response.data.message)

        } catch (error) {
            console.log(error)

        }
    }, [dispatch])




    React.useEffect(() => {

    }, [dispatch, handleLogout])


    return (
        <div className='shadow-sm border-b-2 h-18'>
            <div className='flex justify-around items-center p-3'>

                <div className=' w-[30%]'>
                    <Link to={'/dashboard'}>

                        <img className='w-32 h-8' src="./youtube-logo.svg" alt="youtube logo" />
                    </Link>
                </div>
                <div className='relative w-[50%]'>

                    {/* // OPTIMIZE: search bar  */}
                    <SearchBar />
                </div>
                <div className=' flex w-[30%] flex-row justify-end'>
                    <div className='flex justify-between items-center gap-3'>


                    <div className=' transition-colors cursor-pointer  rounded-full'>
                            <TooltipProvider>

                                <Tooltip>
                                    <TooltipTrigger>
                                        <Link to={'/upload-video'}>

                                            {/* <Video className='h-6 w-6 dark:text-gray-300 ' /> */}
                                            <Button 
                                            variant='secondary' 
                                            className='rounded-full h-9'> 
                                                <ArrowUp className='h-56 w-6'/>
                                                Create</Button>
                                        </Link>


                                    </TooltipTrigger>
                                    <TooltipContent>
                                        Upload
                                    </TooltipContent>
                                </Tooltip>
                            </TooltipProvider>

                        </div>


                        <div
                            className={` hover:transition-all  rounded-full flex items-center cursor-pointer transition-transform duration-500
                            ${dark ? 'rotate-180' : 'rotate-0'}`
                            }
                            onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}>
                            {dark
                                ?
                                <>
                                    <Sun className='h-5 w-5 text-yellow-500 rotate-0 transition-all' />
                                </>
                                :
                                <>

                                    <Moon className='h-5 w-5 text-blue-500 rotate-0 transition-all' />

                                </>
                            }

                        </div>
                     

                        {/* TODO: NOTIFICATION SYSTEM  */}
                        {/* <div className=' transition-colors  cursor-pointer p-2 rounded-full'>
                            <TooltipProvider>

                                <Tooltip>
                                    <TooltipTrigger>

                                        <LucideBell className='h-5 w-5 dark:text-gray-300 ' />
                                    </TooltipTrigger>
                                    <TooltipContent>
                                        Notification
                                    </TooltipContent>
                                </Tooltip>
                            </TooltipProvider>
                        </div> */}
                        <div className=' transition-colors  cursor-pointer rounded-full'>


                            <DropdownMenu>
                                <DropdownMenuTrigger>
                                    <Avatar className='h-9 w-9'>
                                        <AvatarImage src={user?.avatar} />
                                        <AvatarFallback>
                                            Me
                                        </AvatarFallback>
                                    </Avatar>
                                </DropdownMenuTrigger>
                                <DropdownMenuContent>
                                    <DropdownMenuLabel>My Account</DropdownMenuLabel>
                                    <DropdownMenuSeparator />
                                    <DropdownMenuItem>
                                        <User />
                                        <Link to={'/u'}>Profile</Link>
                                    </DropdownMenuItem>
                                    <DropdownMenuItem>
                                        <Dock />
                                        <span>Subscription</span>
                                    </DropdownMenuItem>
                                    <DropdownMenuItem>
                                        <Settings />
                                        <span>Settings</span>
                                    </DropdownMenuItem>
                                    <DropdownMenuItem className='bg-red-500 text-white cursor-pointer my-1'>
                                        <LogOut />
                                        <span onClick={handleLogout}>Log out</span>
                                    </DropdownMenuItem>
                                </DropdownMenuContent>
                            </DropdownMenu>

                        </div>

                    </div>

                </div>
            </div>
            <ToastContainer />
        </div>
    )
}

export default Header