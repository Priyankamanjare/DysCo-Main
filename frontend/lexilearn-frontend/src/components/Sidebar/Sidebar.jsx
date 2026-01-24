import React from 'react';

const Sidebar = () => {
    return (
        <div className="w-64 h-full bg-gray-800 text-white flex flex-col">
            <div className="flex items-center justify-center h-16 border-b border-gray-700">
                <h1 className="text-xl font-bold">Lexilearn</h1>
            </div>
            <nav className="flex-1 p-4">
                <ul className="space-y-2">
                    <li>
                        <a href="/dashboard" className="block p-2 rounded hover:bg-gray-700">Dashboard</a>
                    </li>
                    <li>
                        <a href="/notes" className="block p-2 rounded hover:bg-gray-700">Notes</a>
                    </li>
                    <li>
                        <a href="/flashcards" className="block p-2 rounded hover:bg-gray-700">Flashcards</a>
                    </li>
                    <li>
                        <a href="/speech-to-text" className="block p-2 rounded hover:bg-gray-700">Speech to Text</a>
                    </li>
                    <li>
                        <a href="/text-to-speech" className="block p-2 rounded hover:bg-gray-700">Text to Speech</a>
                    </li>
                    <li>
                        <a href="/summary" className="block p-2 rounded hover:bg-gray-700">Summary</a>
                    </li>
                </ul>
            </nav>
            <footer className="p-4 border-t border-gray-700">
                <p className="text-sm text-center">© 2023 Lexilearn</p>
            </footer>
        </div>
    );
};

export default Sidebar;