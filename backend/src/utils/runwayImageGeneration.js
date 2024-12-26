// import axios from 'axios'


// const runwayApiKey = process.env.RUNWAY_ML_API_KEY;


// export const generateImage = async (req, res) => {

//     const {prompt} = req.body;
//     console.log('prompt: ', prompt)
    
//     const url = `https://api.runwayml.com/v1/models/text-to-image/outputs`;
//     const headers = {
//         'Authorization': `Bearer ${runwayApiKey}`,
//         'Content-Type': 'application/json',
//     };

//     const data = {
//         prompt: prompt,
//         n_samples: 1,
//         height: 768,
//         width: 1344,
//         image_format: 'png'

//     };

//     try {
//         const response = await axios.post(url, data, { headers });
//         console.log('Runway ML: ', response);

//         return response;
//     } catch (error) {
//         console.error('Error generating image:', error.response ? error.response.data : error.message);
//     }
// };



import { writeFile } from "node:fs/promises";
import Replicate from "replicate";
const replicate = new Replicate();

export const generateImage = async()=> {

    const input = 'generate laptop image with program'
    console.log(input)
    
const output = await replicate.run("bytedance/sdxl-lightning-4step:5599ed30703defd1d160a25a63321b4dec97101d98b4674bcc56e41f62f35637", { input });

for (const [index, item] of Object.entries(output)) {
    const output = await writeFile(`output_${index}.png`, item);
    console.log(output)
}
}
