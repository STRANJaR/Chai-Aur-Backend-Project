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
import { Dock, Loader2, LogOut, LucideBell, Moon, Settings, Sun, User, Video } from 'lucide-react'
import { Avatar, AvatarFallback, AvatarImage } from './ui/avatar'
import { useSelector, useDispatch } from 'react-redux'
import { toast, ToastContainer } from 'react-toastify'
import axios from 'axios'
import { logout as logoutStore} from '../store/authSlice'
import { Link } from 'react-router-dom'
import {
    Tooltip,
    TooltipContent,
    TooltipProvider,
    TooltipTrigger,
} from './ui/tooltip'
import Modal from './Modal'
import { Button } from './ui/button'
import { Label } from './ui/label'
import { Input } from './ui/input'
import { Textarea } from "./ui/textarea"
import { Checkbox } from "./ui/checkbox"

// OAuth by okta
import { useAuth0 } from '@auth0/auth0-react'


const Header = () => {

    const { logout } = useAuth0();
    const dispatch = useDispatch()

    const user = useSelector(state => state.auth.user)
    const token = useSelector(state => state.auth.token)

    const [loading, setLoading] = useState(false)
    const [videoFile, setVideoFile] = useState(null)
    const [thumbnailFile, setThumbnailFile] = useState(null)
    const [title, setTitle] = useState('')
    const [description, setDescription] = useState('')



    const { setTheme, theme } = useTheme();
    const dark = theme === 'dark';
    const { register, handleSubmit, watch, } = useForm();
    const searchField = watch('yt-search');



    const handleSearch = () => {
        return;
    }

    // Handle video upload 
    const handleUpload = async (payload) => {
        setLoading(true)
        console.log('payload: ',payload.videoTitle)
        console.log('payload: ',payload.videoDescription)

        const formData = new FormData();
        formData.append('videoTitle', title)
        formData.append('videoDescription', description)
        if (videoFile) formData.append('videoFile', videoFile)
        if (thumbnailFile) formData.append('thumbnailFile', thumbnailFile)

        try {
            const response = await axios.post('http://localhost:8000/api/v1/video/',
                {
                    videoFile: formData?.get('videoFile'),
                    thumbnail: formData?.get('thumbnailFile'),
                    title: formData.get('videoTitle'),
                    description: formData.get('videoDescription'),
                    isPublished: false
                },
                {
                    headers: {
                        "Content-Type": "multipart/form-data",
                        "Authorization": `Bearer ${token}`
                    }
                }
            );

            if (!response) toast.error('Video not uploaded !')
            toast.success(response.data.message)
            console.log(response.data)
        } catch (error) {
            console.log(error)
            setLoading(false)
        }
        setLoading(false)
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
        const { unsubscribe } = watch((value) => {
            // console.log(value)
        })
        return () => unsubscribe()
    }, [watch, dispatch, handleLogout])

    
    return (
        <div className='shadow-sm border-b-2 h-18'>
            <div className='flex justify-between items-center p-3'>

                <div>
                    <Link to={'/dashboard'}>

                        <img className='w-32 h-8' src="./youtube-logo.svg" alt="youtube logo" />
                    </Link>
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

                                        {/* TODO: Upload video modal with api integration*/}

                                        <form onSubmit={handleSubmit(handleUpload)}>

                                            <Modal
                                                trigger={<Video className='h-5 w-5 dark:text-gray-300 ' />}
                                                title={'Upload your content !'}
                                            >
                                                <div className='flex flex-col gap-3'>

                                                    <Label>Title</Label>
                                                    <Input
                                                        type='text'
                                                        onChange={(e)=> setTitle(e.target.value)}
                                                    />

                                                    <Label>Description</Label>
                                                    <Textarea
                                                        onChange={(e)=> setDescription(e.target.value)}
                                                        // {...register('videoDescription', { required: true })}
                                                    />



                                                    <Label>Video</Label>
                                                    <Input
                                                        className="block w-full  text-xs text-gray-900 border border-gray-300 rounded-lg cursor-pointer bg-gray-300  dark:text-gray-400 focus:outline-none dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400"
                                                        type="file"
                                                        onChange={(e) => setVideoFile(e.target.files[0])}
                                                    />
                                                    <Label>Thumbnail</Label>
                                                    <Input
                                                        className="block w-full  text-xs text-gray-900 border border-gray-300 rounded-lg cursor-pointer bg-gray-300  dark:text-gray-400 focus:outline-none dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400"
                                                        type="file"
                                                        onChange={(e) => setThumbnailFile(e.target.files[0])}
                                                    />
                                                    <div className="flex items-center space-x-2">
                                                        <Checkbox id="terms" />
                                                        <label
                                                            htmlFor="terms"
                                                            className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                                                        >
                                                            Want to publish ?
                                                        </label>
                                                    </div>

                                                    <Button
                                                        className='w-full'
                                                        onClick={handleUpload}
                                                    >
                                                        {
                                                            loading ? <Loader2 className=' h-4 w-4 animate-spin' /> : "Publish"
                                                        }
                                                    </Button>


                                                </div>
                                            </Modal>
                                        </form>

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
                            <ToastContainer/>
        </div>
    )
}

export default Header