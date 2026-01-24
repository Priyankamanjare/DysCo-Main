const { CohereClient } = require('cohere-ai');
const dotenv = require('dotenv');

dotenv.config();
const COHERE_API_KEY = process.env.COHERE_API_KEY;

// Initialize Cohere Client
let cohere = null;
if (!COHERE_API_KEY) {
  console.error('Warning: COHERE_API_KEY is not defined in environment variables');
} else {
  cohere = new CohereClient({
    token: COHERE_API_KEY,
  });
}

const summarizeText = async (req, res) => {
  try {
    // Validate API key
    if (!cohere) {
      return res.status(500).json({
        message: 'Cohere API key is not configured. Please set COHERE_API_KEY in your environment variables.',
      });
    }

    // Validate text input
    const { text } = req.body;
    if (!text || typeof text !== 'string' || text.trim().length === 0) {
      return res.status(400).json({
        message: 'Text is required and cannot be empty',
      });
    }

    // Check minimum text length
    if (text.trim().length < 10) {
      return res.status(400).json({
        message: 'Text must be at least 10 characters long to generate a summary',
      });
    }

    // Using Chat API for summarization as Summarize API is deprecated
    const response = await cohere.chat({
      message: `Please summarize the following text:\n\n${text.trim()}`,
      model: 'command-r-08-2024',
      temperature: 0.3,
    });

    // The chat SDK returns an object with a 'text' property
    const summary = response.text;

    if (!summary) {
      console.error('Unexpected Cohere API response structure:', JSON.stringify(response, null, 2));
      return res.status(500).json({
        message: 'Error in text summarization: No summary returned from Cohere API',
      });
    }

    return res.status(200).json({
      message: 'Text Summarization Successful',
      summary
    });
  } catch (error) {
    console.error('Error in summarizeText:', error);
    res.status(500).json({
      message: 'Error summarizing text',
      error: error.message,
      ...(process.env.NODE_ENV === 'development' && { stack: error.stack }),
    });
  }
};

module.exports = {
  summarizeText,
};
