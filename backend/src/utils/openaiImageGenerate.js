import { OpenAI } from 'openai'
import {stringify} from 'flatted'


const openai = new OpenAI({apiKey: process.env.OPENAI_API_KEY})
console.log(openai)


// FEATURE: IMAGE GENERATION SYSTEM
const generateAiImage = async (req, res) => {

    const {userThumbnailPrompt} = req.body;
    console.log('prompt: ', userThumbnailPrompt)

    try {
        const response = await openai.images.generate({
            model: 'dall-e-2',
            prompt: userThumbnailPrompt,
            n: 1,
            size: '512x512'

        })

        const generatedImage = response.data[0].url
        console.log(generatedImage)

        return stringify({ generatedImage })
    } catch (error) {
        console.error("Error IN GENERATE AI IMAGE: ", error.message)
    }
}


// FEATURE: TEXT GENERATION SYSTEM
const generateDescriptionForVideo = async(req, res) => {
    const {userDescriptionPrompt} = req.body;
    console.log('userDescriptionPrompt: ', userDescriptionPrompt);

    // CHECK: handle response and remove conflicts
    try {
        const response = await openai.completions.create({
            model: "davinci-002",
            prompt: userDescriptionPrompt,
            max_tokens: 1000,
            temperature: 1
            
        });

        console.log(response.choices)
    } catch (error) {
        console.log("Error IN GENERATE DESCRIPTION BODY", error.message)
    }
    
}

export { generateAiImage, generateDescriptionForVideo }