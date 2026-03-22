const axios = require('axios');

const textToSpeech = async (req, res) => {
  try {
    const { text } = req.body;

    if (!text) {
      return res.status(400).json({ message: 'Text is required' });
    }

    const response = await axios.post(
      'https://api.deepgram.com/v1/speak?model=aura-asteria-en',
      {
        text: text
      },
      {
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Token ${process.env.DEEPGRAM_API_KEY}`
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
    const status = error.response ? error.response.status : 500;
    let errorMsg = error.message;
    
    if (error.response && error.response.data) {
      if (Buffer.isBuffer(error.response.data)) {
        errorMsg = error.response.data.toString('utf-8');
      } else if (error.response.data instanceof ArrayBuffer) {
        errorMsg = Buffer.from(error.response.data).toString('utf-8');
      } else {
        errorMsg = JSON.stringify(error.response.data);
      }
    }

    res.status(status).json({
      message: 'Error converting text to speech',
      error: errorMsg
    });
  }
};

module.exports = { textToSpeech };
