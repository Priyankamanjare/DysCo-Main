import React from 'react';

const ObjectDetector = () => {
    return (
        <div className="flex flex-col items-center justify-center p-4 bg-gray-100 rounded-lg shadow-md">
            <h2 className="text-2xl font-bold mb-4">Object Detector</h2>
            <p className="text-gray-700 mb-2">Upload an image to detect objects.</p>
            <input type="file" className="mb-4 p-2 border border-gray-300 rounded" />
            <button className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600">
                Detect Objects
            </button>
        </div>
    );
};

export default ObjectDetector;