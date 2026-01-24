import React from 'react';

const FlashCards = () => {
    return (
        <div className="flex flex-col items-center justify-center p-4 bg-gray-100">
            <h1 className="text-2xl font-bold mb-4">Flash Cards</h1>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {/* Card components will be rendered here */}
            </div>
        </div>
    );
};

export default FlashCards;