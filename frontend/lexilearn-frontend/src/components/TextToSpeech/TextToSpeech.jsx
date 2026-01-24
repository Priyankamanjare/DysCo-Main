import React from 'react';

const TextToSpeech = () => {
    return (
        <div className="flex flex-col items-center justify-center p-4 bg-gray-100 rounded-lg shadow-md">
            <h1 className="text-2xl font-bold mb-4">Text to Speech</h1>
            <textarea
                className="w-full h-32 p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Type your text here..."
            />
            <button className="mt-4 px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600">
                Speak
            </button>
        </div>
    );
};

export default TextToSpeech;