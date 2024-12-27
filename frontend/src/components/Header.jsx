import React, { useCallback, useState } from 'react'
import { useForm } from 'react-hook-form'
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from './ui/dropdown-menu'
import { useTheme } from '../components/theme-provider'
import { Dock, Loader2, LogOut, LucideBell, Moon, SearchIcon, Settings, Sun, User, Video } from 'lucide-react'
import { Avatar, AvatarFallback, AvatarImage } from './ui/avatar'
import { useSelector, useDispatch } from 'react-redux'
import { toast, ToastContainer } from 'react-toastify'
import axios from 'axios'
import { logout as logoutStore } from '../store/authSlice'
import { Link, useNavigate } from 'react-router-dom'
import {
    Tooltip,
    TooltipContent,
    TooltipProvider,
    TooltipTrigger,
} from './ui/tooltip'

// OAuth by okta
import { useAuth0 } from '@auth0/auth0-react'
import { Button } from './ui/button'


const Header = () => {

    const { logout } = useAuth0();
    const dispatch = useDispatch()
    const navigate = useNavigate();

    const user = useSelector(state => state.auth.user)
    const token = useSelector(state => state.auth.token)


    const { setTheme, theme } = useTheme();
    const dark = theme === 'dark';

    const [query, setQuery] = useState('');



    const handleSearch = (e) => {
        if (e.key === 'Enter' || e.key === 'click') {
            console.log('hello');

            if (query.trim()) {
                navigate(`/search?query=${query}`)
            } else console.log('search query empty')
        }
        setQuery(e.target.value);
    }

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
        if (query.length > 2) {
            fetchVideos(query)
        } else {
            // console.log('search query is less than 3 characters')
        }

    }, [dispatch, handleLogout, query])


    return (
        <div className='shadow-sm border-b-2 h-18'>
            <div className='flex justify-around items-center p-3'>

                <div>
                    <Link to={'/dashboard'}>

                        <img className='w-32 h-8' src="./youtube-logo.svg" alt="youtube logo" />
                    </Link>
                </div>
                <div className='relative w-full'>
                    {/* <form onSubmit={handleSubmit(handleSearch)}> */}
                    <input
                        type='text'
                        className='w-full px-6 py-2 bg-transparent border border-gray-700 text-sm font-medium  rounded-full'
                        placeholder='Search'
                        value={query}
                        onChange={handleSearch}
                        onKeyDown={handleSearch}
                    />

                    {/* <Button variant='secondary' className='-m-12 h-8 rounded-full'> <SearchIcon className='h-6'/> </Button> */}

                    {/* </form>  */}
                </div>
                <div>
                    <div className='flex justify-between items-center gap-3'>

                        <div
                            className={` hover:transition-all p-2 rounded-full flex items-center cursor-pointer transition-transform duration-500
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
                        <div className=' transition-colors cursor-pointer p-2 rounded-full'>
                            <TooltipProvider>

                                <Tooltip>
                                    <TooltipTrigger>
                                        <Link to={'/upload-video'}>

                                            <Video className='h-5 w-5 dark:text-gray-300 ' />
                                        </Link>


                                    </TooltipTrigger>
                                    <TooltipContent>
                                        Upload
                                    </TooltipContent>
                                </Tooltip>
                            </TooltipProvider>

                        </div>
                        <div className=' transition-colors  cursor-pointer p-2 rounded-full'>
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
                        </div>
                        <div className='pt-2 transition-colors  cursor-pointer rounded-full'>


                            <DropdownMenu>
                                <DropdownMenuTrigger>
                                    <Avatar className='h-8 w-8'>
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