import { ApiResponse } from "../utils/ApiResponse.js";
import { generateImage } from "../utils/runwayImageGeneration.js";


const aiGeneratedThumbnail = async (req, res) => {
    const { prompt } = req.body;
    if (!prompt) console.log('prompt empty')

    try {
        const response = await generateImage(prompt);
        console.log(response)

        return res
            .status(201)
            .json(
                new ApiResponse(201, response, 'Thumbnail generated')
            )
    } catch (error) {
        return res
            .status(500)
            .json(
                new ApiResponse(500, {}, 'Oops ! thumbnail not generated')
            )
    }

}

export { aiGeneratedThumbnail }