import React, { useEffect, useState } from 'react'
import Modal from './Modal'
import { Loader2, Sparkles } from 'lucide-react'
import { useSelector } from 'react-redux'
import axios from 'axios'
import { toast } from 'react-toastify'
import { useForm } from 'react-hook-form'
import { Textarea } from './ui/textarea'
import { Button } from './ui/button'

const GenerateDescription = () => {

    const [generatedDescription, setGeneratedDescription] = useState([])
    const [loading, setLoading] = useState(false)
    const token = useSelector(state => state.auth.token)

    const { register, handleSubmit, formState: {errors} } = useForm();




    const handleAiGeneratedDescription = async (payload) => {
        setLoading(true)
        console.log('payload: ', payload)

        try {
            const response = await axios.post('http://localhost:8000/api/v1/video/generate-description',
                { userPrompt: payload.prompt },
                {
                    headers: {
                        "Authorization": `Bearer ${token}`,
                        "Content-Type": "application/json"
                    }
                }
            )

            console.log(response.data.data)
            if (response.status === 201) toast.success(response.statusText)
            setGeneratedDescription(response.data.data)

        } catch (error) {
            console.log("Error client: ", error)
            setLoading(false)
            toast.error(error.response.data.data.message)
        }
        setLoading(false)
    }


    useEffect(() => { }, [generatedDescription])

    return (
        <form onSubmit={handleSubmit(handleAiGeneratedDescription)}>
            <div className='flex flex-col gap-5'>

                <Textarea
                    type='text'
                    placeholder='Ex: generate description for my video based on cloud computing'
                    {...register('prompt', { required: 'This is required !' })}
                    // {errors.prompt && <p>{errors.prompt.message}</p>}

                />

                {
                    generatedDescription.length > 0 &&
                    generatedDescription.map((desc, index) => (
                        <Textarea 
                        className='text-xs'
                        rows={10}
                        key={index}
                        defaultValue={''} 
                        value={desc.generated_text}
                        />
                    ))
                }
                <Button
                    type='submit'
                    className='w-full'>
                    {
                        loading ?
                            <Loader2 className='h-4 w-4 animate-spin' />
                            : 'Generate'
                    }

                </Button>
            </div>
        </form>
    )
}

export default GenerateDescription