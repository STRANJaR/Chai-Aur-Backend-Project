import axios from 'axios'


const runwayApiKey = process.env.RUNWAY_ML_API_KEY;


export const generateImage = async (prompt) => {
    const url = `{${process.env.RUNWAY_ML_BASE_URL}/stable-diffusion-v1/outputs}}`;
    const headers = {
        'Authorization': `Bearer ${runwayApiKey}`,
        'Content-Type': 'application/json'
    };

    const data = {
        prompt: prompt,
        n_samples: 1,
        height: 768,
        width: 1344,
        image_format: 'png'

    };

    try {
        const response = await axios.post(url, data, { headers });
        console.log('Runway ML: ', response);

        return response;
    } catch (error) {
        console.error('Error generating image:', error.response ? error.response.data : error.message);
    }
};