import React from 'react';

const NotesCard = ({ title, content }) => {
    return (
        <div className="bg-white shadow-md rounded-lg p-4 m-2">
            <h2 className="text-xl font-semibold text-gray-800">{title}</h2>
            <p className="text-gray-600">{content}</p>
        </div>
    );
};

export default NotesCard;