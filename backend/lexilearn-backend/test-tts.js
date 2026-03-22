const axios = require('axios');
const dotenv = require('dotenv');
dotenv.config({ path: './.env' });

const textToSpeechTest = async () => {
  try {
    const text = "Hello world";
    const response = await axios.post(
      'https://api.elevenlabs.io/v1/text-to-speech/ZT9u07TYPVl83ejeLakq',
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
    console.log("Success");
  } catch (error) {
    console.error("Error occurred:", error.message);
    if (error.response && error.response.data) {
        // Since responseType is arraybuffer, error.response.data is an arraybuffer
        const dataStr = Buffer.from(error.response.data, 'binary').toString('utf8');
        console.error("Error Response Body:", dataStr);
    }
  }
};

textToSpeechTest();
