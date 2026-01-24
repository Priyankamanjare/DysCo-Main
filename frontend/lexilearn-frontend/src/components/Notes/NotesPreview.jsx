import React from 'react';

const NotesPreview = ({ note }) => {
    return (
        <div className="bg-white shadow-md rounded-lg p-4 mb-4">
            <h2 className="text-xl font-semibold text-gray-800">{note.title}</h2>
            <p className="text-gray-600">{note.content}</p>
        </div>
    );
};

export default NotesPreview;