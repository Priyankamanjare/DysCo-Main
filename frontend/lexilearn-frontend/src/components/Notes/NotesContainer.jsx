import React from 'react';
import NotesCard from './NotesCard';

const NotesContainer = ({ notes }) => {
    return (
        <div className="flex flex-col space-y-4 p-4">
            {notes.map((note) => (
                <NotesCard key={note.id} note={note} />
            ))}
        </div>
    );
};

export default NotesContainer;