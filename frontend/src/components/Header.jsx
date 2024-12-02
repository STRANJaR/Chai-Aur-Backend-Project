import React, { useCallback } from 'react'
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
import { Dock, LogOut, LucideBell, Moon, Settings, Sun, User, Video } from 'lucide-react'
import { Avatar, AvatarFallback, AvatarImage } from './ui/avatar'
import { useSelector, useDispatch } from 'react-redux'
import { toast } from 'react-toastify'
import axios from 'axios'
import { logout } from '../store/authSlice'
import { Link } from 'react-router-dom'
import {
    Tooltip,
    TooltipContent,
    TooltipProvider,
    TooltipTrigger,
} from './ui/tooltip'
import FileUpload from './FileUpload'
import Modal from './Modal'
import { Button } from './ui/button'
import { Label } from './ui/label'


const Header = () => {

    const dispatch = useDispatch()

    const user = useSelector(state => state.auth.user)
    const token = useSelector(state => state.auth.token)
    if (!user) toast.error('Unable to fetch user data')

    const { setTheme, theme } = useTheme();
    const dark = theme === 'dark';
    const { register, handleSubmit, watch, } = useForm();
    const searchField = watch('yt-search');



    const handleSearch = () => {
        return;
    }

    const handleUpload = async () => {
        try {
            axios.post()
        } catch (error) {
            console.log(error)
        }
    }

    // Handle Logout
    const handleLogout = useCallback(async () => {
        try {
            const response = await axios.post('http://localhost:8000/api/v1/users/logout', {}, {
                headers: {
                    "Authorization": `Bearer ${token}`
                }
            })

            if (!response) toast.error('Something wrong while logout')

            toast.success(response.data.message)

            dispatch(logout())

        } catch (error) {
            console.log(error)

        }
    }, [dispatch])

    React.useEffect(() => {
        const { unsubscribe } = watch((value) => {
            console.log(value)
        })
        return () => unsubscribe()
    }, [watch, dispatch, handleLogout])
    return (
        <div className='shadow-sm border-b-2 h-18'>
            <div className='flex justify-between p-3'>

                <div>
                    <img className='' src="./yt-logo.svg" alt="youtube logo" />
                </div>
                <div>
                    <form onSubmit={handleSubmit(handleSearch)}>
                        <input
                            type='text'
                            className='min-w-96 px-6 py-2 bg-transparent border border-gray-700   rounded-full'
                            placeholder='Search'
                            defaultValue={''}
                            onChange={searchField}
                            {...register('yt-search')}
                        />

                    </form>
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

                                        {/* TODO: */}
                                        <Modal
                                            trigger={<Video className='h-5 w-5 dark:text-gray-300 ' />}
                                            title={'Upload your content !'}
                                        >
                                            <div className='flex flex-col gap-3'>
                                                <Label>Video</Label>
                                                <FileUpload height={`h-22`}/>
                                                <Label>Thumbnail</Label>
                                                <FileUpload/>
                                                <Button className='w-full'>Publish</Button>
                                            </div>
                                        </Modal>

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
                                        <AvatarImage src={user.avatar} />
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

        </div>
    )
}

export default Header