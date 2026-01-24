const mongoose = require('mongoose');
const dotenv = require('dotenv');
dotenv.config();
const MONGO_URI = process.env.MONGO_URI;

const connectDB = async() => {
    if (!MONGO_URI) {
        console.error('Error: MONGO_URI is not defined in environment variables');
        process.exit(1);
    }
    
    try {
        await mongoose.connect(MONGO_URI);
        console.log("✅ Successfully connected to database");
        
        // Handle connection events
        mongoose.connection.on('connected', () => {
            console.log('MongoDB connected');
        });
        
        mongoose.connection.on('error', (err) => {
            console.error('MongoDB connection error:', err);
        });
        
        mongoose.connection.on('disconnected', () => {
            console.warn('MongoDB disconnected');
        });
        
        // Handle process termination
        process.on('SIGINT', async () => {
            await mongoose.connection.close();
            console.log('MongoDB connection closed due to app termination');
            process.exit(0);
        });
        
    } catch(error) {
        console.error(`❌ Error in database connection : ${error.message}`);
        console.error('Make sure MongoDB is running and MONGO_URI is correct');
        console.error('If using MongoDB Atlas, check your IP whitelist');
        // Don't exit in development - let server start but log the error
    }
}

module.exports = connectDB;