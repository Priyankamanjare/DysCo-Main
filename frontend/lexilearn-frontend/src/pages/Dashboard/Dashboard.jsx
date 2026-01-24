import React from 'react';

const Dashboard = () => {
    return (
        <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
            <h1 className="text-3xl font-bold text-gray-800 mb-4">Dashboard</h1>
            <p className="text-gray-600">Welcome to your dashboard!</p>
            <div className="mt-6 p-4 bg-white rounded-lg shadow-md w-full max-w-2xl">
                {/* Add your dashboard content here */}
            </div>
        </div>
    );
};

export default Dashboard;