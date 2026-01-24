const axios = require('axios');

const textToSpeech = async (req, res) => {
  try {
    const { text } = req.body;

    if (!text) {
      return res.status(400).json({ message: 'Text is required' });
    }

    const response = await axios.post(
      'https://api.elevenlabs.io/v1/text-to-speech/ZT9u07TYPVl83ejeLakq', // Replace with your voice ID
      {
        text: text,
        voice_settings: {
          stability: 0.75,
          similarity_boost: 0.75
        }
      },
      {
        headers: {
          'Content-Type': 'application/json',
          'xi-api-key': process.env.TTS_KEY
        },
        responseType: 'arraybuffer'
      }
    );

    // Convert audio buffer to Base64 URL
    const audioBase64 = Buffer.from(response.data, 'binary').toString('base64');
    const audioUrl = `data:audio/mpeg;base64,${audioBase64}`;

    return res.status(200).json({
      message: 'Text to Speech Successful',
      audio: audioUrl
    });

  } catch (error) {
    console.error(error);
    res.status(500).json({
      message: 'Error converting text to speech',
      error: error.message
    });
  }
};

module.exports = { textToSpeech };
