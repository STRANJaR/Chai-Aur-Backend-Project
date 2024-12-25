import axios from 'axios'
import { stringify } from 'flatted'
import { ApiResponse } from './ApiResponse.js'


const HF_BASE_URL = process.env.HUGGING_FACE_API_URL
const API_TOKEN = process.env.HUGGINGFACE_API_KEY


// FEATURE: TEXT GENERATION SYSTEM
const generateText = async (req, res) => {

    const { userPrompt } = req.body;
    console.log('prompt: ', userPrompt)


    const model = 'gpt2'
    const headers = {
        'Authorization': `Bearer ${API_TOKEN}`,
        'Content-Type': 'application/json',
    };

    const data = {
        inputs: userPrompt,
    };

    try {
        const response = await axios.post(`${HF_BASE_URL}${model}`, data, { headers });

        const text = (response.data)
        console.log(`Generated text: ${text}`);

        return res
            .status(201)
            .json(
                new ApiResponse(201, { GeneratedText: text }, "Text generated successfully")
            )

    } catch (error) {
        console.error('Error generating text:', error.response ? error.response.data : error.message);
        return res
            .status(500)
            .json(new ApiResponse(500, error.message, "Something went wrong while generating text"));
    }
}

export { generateText }
