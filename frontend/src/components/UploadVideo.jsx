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



const UploadVideo = () => {


    const token = useSelector(state => state.auth.token);
    const { register, handleSubmit } = useForm();


    const [loading, setLoading] = useState(false)
    const [videoFile, setVideoFile] = useState(null)
    const [thumbnailFile, setThumbnailFile] = useState(null)
    const [title, setTitle] = useState('')
    const [description, setDescription] = useState('')


    const [generatedDescription, setGeneratedDescription] = useState([])
    const generatedDesc = generatedDescription.map((desc) => (
        desc.generated_text
    ))

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
        <div className='py-4 px-10'>
            <form onSubmit={handleSubmit(handleUpload)}>
                <div className='flex flex-col gap-3'>

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
                        defaultValue={generatedDesc}
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
                        <Checkbox
                            id="terms" />
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
            </form>

            <ToastContainer />
        </div>
    )
}

export default UploadVideo