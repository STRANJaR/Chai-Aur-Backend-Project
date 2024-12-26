import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import { useSelector } from 'react-redux'
import { toast, ToastContainer } from 'react-toastify'
import { Button } from './ui/button'
import { Loader2, Sparkles } from 'lucide-react'
import { Checkbox } from './ui/checkbox'
import { Input } from './ui/input'
import { Label } from './ui/label'
import { Textarea } from './ui/textarea'
import Modal from './Modal'
import GenerateDescription from './GenerateDescription';
import TagInput from './TagInput'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select'


const Categories = [
    {
        label: 'Film & Animation',
        value: 'film-animation',
    },
    {
        label: 'Comedy',
        value: 'comedy',
    },
    {
        label: 'Education',
        value: 'education',
    },
    {
        label: 'Entertainment',
        value: 'entertainment',
    },
    {
        label: 'Film and animation',
        value: 'film-animation',
    },
    {
        label: 'Gaming',
        value: 'gaming',
    },
    {
        label: 'How to',
        value: 'how-to',
    },
    {
        label: 'Music',
        value: 'music',
    },
    {
        label: 'News and politics',
        value: 'news-politics',
    },
    {
        label: 'People and blogs',
        value: 'people-blogs',
    },
    {
        label: 'Pet animals',
        value: 'pet-animal',
    },
    {
        label: 'Science and technology',
        value: 'science-technology',
    },
    {
        label: 'Sport',
        value: 'sport',
    },
    {
        label: 'Travel and event',
        value: 'Travel-event',
    },

];

const UploadVideo = () => {


    const token = useSelector(state => state.auth.token);
    const { register, handleSubmit } = useForm();


    const [loading, setLoading] = useState(false)
    const [videoFile, setVideoFile] = useState(null)
    const [thumbnailFile, setThumbnailFile] = useState(null)
    const [title, setTitle] = useState('')
    const [description, setDescription] = useState('')


    // Handle video upload 
    const handleUpload = async (payload) => {
        setLoading(true)
        console.log('payload: ', payload.videoTitle)
        console.log('payload: ', payload.videoDescription)

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




    return (
        <div className=' py-10 px-20 '>
            <form onSubmit={handleSubmit(handleUpload)}>
                <div className='flex flex-col gap-3 border rounded-md p-6'>

                    <Label>Title</Label>
                    <Input
                        type='text'
                        onChange={(e) => setTitle(e.target.value)}
                    />

                    <div className='flex flex-row justify-start items-center'>

                        <Label className='flex flex-row items-center gap-2'>Description | <span
                        >
                            {/* // TODO: Modal for genAI*/}
                            <Modal
                                trigger={<Button className='h-6 bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 dark:text-gray-300' >
                                    <Sparkles className='h-4 w-4' /> AI Generated
                                </Button>}
                                title={'AI Powered'}
                            >
                                <GenerateDescription />
                            </Modal>
                        </span>

                        </Label>
                    </div>

                    <Textarea
                        required={true}
                        rows={10}
                        onChange={(e) => setDescription(e.target.value)}
                    // {...register('videoDescription', { required: true })}
                    />


                    <Label>Tags</Label>
                    <TagInput />

                    <Label>Categories</Label>
                    <Select>
                        <SelectTrigger className="w-full">
                            <SelectValue placeholder="Categories" />
                        </SelectTrigger>
                        <SelectContent>
                            {Categories && Categories.map((item) => (

                                <SelectItem
                                    key={item.value}
                                    value={item.value}
                                >
                                    {item.label}
                                </SelectItem>
                            ))}

                        </SelectContent>
                    </Select>

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
                        <Checkbox
                            id="terms" />
                        <label
                            htmlFor="terms"
                            className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                        >
                            Want to publish ?
                        </label>
                    </div>

                    <div className='flex flex-row items-center gap-3 w-full justify-between'>

                        <Button
                            className='w-[50%]'
                            type='reset'
                            variant='destructive'
                        >
                            Reset
                        </Button>
                        <Button
                            className='w-[50%]'
                            onClick={handleUpload}
                        >
                            {
                                loading ? <Loader2 className=' h-4 w-4 animate-spin' /> : "Publish"
                            }
                        </Button>
                    </div>
                </div>
            </form>

            <ToastContainer />
        </div>
    )
}

export default UploadVideo