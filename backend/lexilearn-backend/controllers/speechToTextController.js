const { Deepgram } = require("@deepgram/sdk");
const dotenv = require('dotenv');

dotenv.config();
const DEEPGRAM_API_KEY = process.env.DEEPGRAM_API_KEY;

const speechToText = async (req, res) => {
    try {
        const file = req.file;
        const deepgram = new Deepgram(DEEPGRAM_API_KEY);
        const audioSource = { buffer: file.buffer, mimetype: file.mimetype };
        const response = await deepgram.transcription.preRecorded(audioSource, {
            smart_format: true,
            model: "nova",
        });
        const transcript = await response?.results?.channels[0]?.alternatives[0]?.transcript;
        if(!transcript) {
            return res.status(500).json({ 
                message: 'Error transcribing audio',
            });
        }

        return res.status(200).json({
            message: "Speech to text successfull",
            transcript
        })
    } catch (error) {
      return res.status(500).json({ 
        message: 'Error transcribing audio',
        error: error.message 
        });
    }
};
  
module.exports = {
    speechToText
}
