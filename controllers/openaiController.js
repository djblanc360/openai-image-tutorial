const { Configuration, OpenAIApi } = require("openai");

const configuration = new Configuration({
  apiKey: process.env.OPENAI_API_KEY,
});
const openai = new OpenAIApi(configuration);

const generateImage = async (req, res) => {
    console.log('req.body',req.body)
    const { prompt, size } = req.body
    try {

        
    
        const imageSize =
            size === 'small' ? '256x256' : size === 'medium' ? '512x512' : '1024x1024'

        console.log(prompt, imageSize)

        const response = await openai.createImage({
            prompt: prompt, // query from form
            n: 1, // number of images
            size:imageSize
        })
        const imageUrl = response.data.data[0].url
        res.status(200).json({
            success:true,
            data: imageUrl
        })
    } catch(error) {
        if (error.response) {
            console.log(error.response.status);
            console.log(error.response.data);
        } else {
            console.log(error.message);
        }
        res.status(400).json({
            success:false,
            error: 'image could not be generated'
        })
    }
}

module.exports = { generateImage }
